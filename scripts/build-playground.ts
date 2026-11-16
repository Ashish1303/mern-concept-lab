import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { build } from 'vite';
const root = fileURLToPath(new URL('..', import.meta.url));
const path = resolve(root, 'client/tsconfig.fixtures.json');
const config = ts.readConfigFile(path, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, dirname(path));
const files: Record<string,string> = {};
const virtual = (name: string) => `/workspace/${relative(root, name).replaceAll('\\','/')}`;
const host = ts.createCompilerHost(parsed.options);
const read = host.readFile.bind(host);
host.readFile = name => {
  const content = read(name);
  if (content !== undefined && !relative(root,name).startsWith('..') && (name.endsWith('.d.ts') || name.endsWith('/package.json') || name.endsWith('\\package.json') || parsed.fileNames.includes(name))) files[virtual(name)] = content;
  return content;
};
for (const source of ts.createProgram(parsed.fileNames, parsed.options, host).getSourceFiles()) {
  if (!relative(root,source.fileName).startsWith('..')) files[virtual(source.fileName)] = source.text;
}
for (const name of parsed.fileNames) files[virtual(name)] = readFileSync(name,'utf8');
const target = resolve(root, 'client/public/playground'); mkdirSync(target,{recursive:true});
const { configFilePath: _config, ...options } = parsed.options;
void _config;
writeFileSync(resolve(target,'types.json'),JSON.stringify({ files, options, roots: parsed.fileNames.map(virtual) }));
await build({ configFile:false, publicDir:false, root:resolve(root,'client'), define:{'process.env.NODE_ENV':JSON.stringify('production')}, build:{ outDir:'playground-dist', emptyOutDir:true, lib:{entry:resolve(root,'client/src/playground/frame.tsx'),name:'MernPreview',formats:['iife'],fileName:()=> 'runtime.js'}, minify:true, sourcemap:false } });
console.log(`Prepared browser-only compiler assets (${Object.keys(files).length} public source/declaration files) and isolated React preview.`);
