import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('..', import.meta.url));
const configPath = resolve(root, 'client/tsconfig.fixtures.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, dirname(configPath));
const diagnostics = [...config.errors, ...ts.getPreEmitDiagnostics(ts.createProgram(config.fileNames, config.options))];
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCanonicalFileName: name => name, getCurrentDirectory: () => root, getNewLine: () => '\n' }));
  process.exit(1);
}

const normalize = (path: string) => resolve(path).replaceAll('\\', '/').toLowerCase();
const fixtureFiles = new Set(config.fileNames.map(normalize));
const host = ts.createCompilerHost(config.options);
const read = host.readFile.bind(host);
host.readFile = path => {
  const contents = read(path);
  return contents && fixtureFiles.has(normalize(path)) ? contents.replace(/^.*@ts-expect-error.*$/gm, '// Expected error exposed for negative verification.') : contents;
};
const negative = ts.getPreEmitDiagnostics(ts.createProgram(config.fileNames, config.options, host));
const report = { compiler: ts.version, checkedAt: new Date().toISOString(), fixtures: {} as Record<string, { sha256: string; positive: 'passed'; negative: { code: number; line: number; message: string }[] }> };
let cases = 0;
for (const path of config.fileNames) {
  const source = readFileSync(path, 'utf8');
  const expectedLines = source.split(/\r?\n/).flatMap((line, index) => line.includes('@ts-expect-error') ? [index + 2] : []);
  if (!expectedLines.length) throw new Error(`Fixture lacks a checked negative case: ${relative(root, path)}`);
  const errors = negative.filter(item => item.file && normalize(item.file.fileName) === normalize(path)).map(item => ({
    code: item.code,
    line: item.file!.getLineAndCharacterOfPosition(item.start ?? 0).line + 1,
    message: ts.flattenDiagnosticMessageText(item.messageText, '\n')
  }));
  for (const line of expectedLines) if (!errors.some(error => error.line === line)) throw new Error(`Expected a real diagnostic on ${relative(root, path)}:${line}`);
  if (errors.some(error => !expectedLines.includes(error.line))) throw new Error(`Unexpected negative diagnostic in ${relative(root, path)}`);
  report.fixtures[relative(resolve(root, 'client/src/modules'), path).replaceAll('\\', '/')] = { sha256: createHash('sha256').update(source).digest('hex'), positive: 'passed', negative: errors };
  cases += expectedLines.length;
}
if (negative.some(item => !item.file || !fixtureFiles.has(normalize(item.file.fileName)))) throw new Error('Negative checking reported an error outside the intended fixtures.');
const destination = resolve(root, 'client/src/modules/typescript/compiler-evidence.json');
mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Verified ${config.fileNames.length} TypeScript fixtures, ${cases} negative cases; diagnostics and source hashes saved.`);
