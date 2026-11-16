import ts from 'typescript';
import type { CompilerAssets, CompiledSnippet, PreparedSnippet, SnippetDefinition } from './types';

export function prepareSnippet(definition: SnippetDefinition): PreparedSnippet {
  const text = definition.files.find(file => file.name === definition.entry)?.content;
  if (text === undefined) throw new Error('The lesson source is missing.');
  if (definition.mode === 'typecheck') return { code: text.replace(/^.*@ts-expect-error.*$/gm, '// Fix the deliberately invalid statement below.'), start: 0, end: text.length };
  const source = ts.createSourceFile(definition.entry, text, ts.ScriptTarget.Latest, true, definition.entry.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const node = source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === definition.functionName);
  if (!node) throw new Error('This example has no editable function.');
  const needed = new Set<string>();
  const identifiers = (item:ts.Node) => { const walk=(item:ts.Node)=>{if(ts.isIdentifier(item))needed.add(item.text);ts.forEachChild(item,walk);};walk(item); };
  identifiers(node);
  const declarations = source.statements.filter(statement => !ts.isImportDeclaration(statement) && !(ts.isFunctionDeclaration(statement) && /^example\d+$/i.test(statement.name?.text ?? '')) && !(ts.isVariableStatement(statement) && statement.declarationList.declarations.some(item=>ts.isIdentifier(item.name)&&item.name.text==='lesson')));
  const selected = new Set<ts.Statement>([node]);
  let changed=true;
  while(changed){changed=false;for(const statement of declarations){
    const names=ts.isVariableStatement(statement) ? statement.declarationList.declarations.flatMap(item=>ts.isIdentifier(item.name)?[item.name.text]:[]) : 'name' in statement && statement.name && ts.isIdentifier(statement.name as ts.Node) ? [(statement.name as ts.Identifier).text] : [];
    if(!selected.has(statement)&&names.some(name=>needed.has(name))){selected.add(statement);identifiers(statement);changed=true;}
  }}
  const printer=ts.createPrinter();
  const imports=source.statements.flatMap(statement=>{
    if(!ts.isImportDeclaration(statement)||!statement.importClause)return [];
    const clause=statement.importClause;const name=clause.name && needed.has(clause.name.text)?clause.name:undefined;
    let bindings=clause.namedBindings;
    if(bindings&&ts.isNamedImports(bindings)){const elements=bindings.elements.filter(item=>needed.has(item.name.text));bindings=elements.length?ts.factory.updateNamedImports(bindings,elements):undefined;}
    else if(bindings&&ts.isNamespaceImport(bindings)&&!needed.has(bindings.name.text))bindings=undefined;
    if(!name&&!bindings)return [];
    return [printer.printNode(ts.EmitHint.Unspecified,ts.factory.updateImportDeclaration(statement,statement.modifiers,ts.factory.updateImportClause(clause,clause.isTypeOnly,name,bindings),statement.moduleSpecifier,statement.attributes),source)];
  });
  let focusFile: string | undefined;
  if (ts.isFunctionDeclaration(node) && node.body?.statements.length === 1) {
    const statement = node.body.statements[0]!;
    if (ts.isReturnStatement(statement) && statement.expression && ts.isJsxSelfClosingElement(statement.expression) &&
        !statement.expression.attributes.properties.some(attribute => ts.isJsxAttribute(attribute) &&
          attribute.initializer && ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression &&
          ts.isArrowFunction(attribute.initializer.expression))) {
      const tag = statement.expression.tagName.getText(source);
      for (const statement of source.statements) if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text.startsWith('.') && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings) && statement.importClause.namedBindings.elements.some(element => element.name.text === tag)) {
        const parts: string[] = [];
        for (const part of (definition.entry.slice(0,definition.entry.lastIndexOf('/')+1)+statement.moduleSpecifier.text).split('/')) { if (part==='..') parts.pop(); else if (part && part!=='.') parts.push(part); }
        focusFile = definition.files.find(file => [parts.join('/')+'.tsx',parts.join('/')+'.ts'].includes(file.name))?.name;
      }
    }
  }
  return { code:[...imports,...source.statements.filter(statement=>selected.has(statement)).map(statement => statement.getText(source))].join('\n\n'), start:0, end:text.length, ...(focusFile ? {focusFile} : {}) };
}

// Checkpoints bound accidental loops, recursion and promise microtask chains.
// They do not replace origin isolation and are not a general resource quota.
const bounded: ts.TransformerFactory<ts.SourceFile> = context => source => {
  const checkpoint = () => ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('globalThis'), '__labCheckpoint'), undefined, []));
  const visit: ts.Visitor = node => {
    if (ts.isPropertyAccessExpression(node) && node.name.text === 'DEV' && node.expression.getText(source) === 'import.meta.env') return ts.factory.createFalse();
    const updated = ts.visitEachChild(node, visit, context);
    if (ts.isFunctionLike(updated) && 'body' in updated && updated.body && ts.isBlock(updated.body)) {
      const body = updated.body;
      return ts.visitEachChild(updated, child => child === body ? ts.factory.updateBlock(body, [checkpoint(), ...body.statements]) : child, context);
    }
    if (ts.isArrowFunction(updated) && !ts.isBlock(updated.body)) return ts.factory.updateArrowFunction(updated, updated.modifiers, updated.typeParameters, updated.parameters, updated.type, updated.equalsGreaterThanToken, ts.factory.createBlock([checkpoint(), ts.factory.createReturnStatement(updated.body)], true));
    // Single-statement loops also need a checkpoint, including an empty body.
    const loopBody = (statement: ts.Statement) => ts.factory.createBlock([checkpoint(), ...(ts.isBlock(statement) ? statement.statements : [statement])], true);
    if (ts.isWhileStatement(updated)) return ts.factory.updateWhileStatement(updated, updated.expression, loopBody(updated.statement));
    if (ts.isDoStatement(updated)) return ts.factory.updateDoStatement(updated, loopBody(updated.statement), updated.expression);
    if (ts.isForStatement(updated)) return ts.factory.updateForStatement(updated, updated.initializer, updated.condition, updated.incrementor, loopBody(updated.statement));
    if (ts.isForOfStatement(updated)) return ts.factory.updateForOfStatement(updated, updated.awaitModifier, updated.initializer, updated.expression, loopBody(updated.statement));
    if (ts.isForInStatement(updated)) return ts.factory.updateForInStatement(updated, updated.initializer, updated.expression, loopBody(updated.statement));
    return updated;
  };
  return ts.visitNode(source, visit) as ts.SourceFile;
};
function diagnosticText(diagnostics: readonly ts.Diagnostic[]) {
  return diagnostics.map(item => {
    const position = item.file?.getLineAndCharacterOfPosition(item.start ?? 0);
    return `${item.file?.fileName.split('/').at(-1) ?? 'Code'}${position ? `:${position.line + 1}:${position.character + 1}` : ''} TS${item.code}: ${ts.flattenDiagnosticMessageText(item.messageText, '\n')}`;
  }).join('\n');
}
export function compileSnippet(definition: SnippetDefinition, code: string, input = ''): CompiledSnippet {
  if (code.length > 30000) throw new Error('Keep the snippet under 30,000 characters.');
  const prepared = prepareSnippet(definition);
  const modules: Record<string, string> = {};
  for (const file of definition.files) {
    if (file.name.startsWith('server/') || file.name.endsWith('.json')) continue;
    const content = file.name === definition.entry ? file.content.slice(0, prepared.start) + code + file.content.slice(prepared.end) + (definition.mode === 'runtime' ? `\nexport { ${definition.functionName} };` : '') : file.content;
    const result = ts.transpileModule(content, { fileName: file.name, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, sourceMap: false }, transformers: { before: [bounded] } });
    const errors = result.diagnostics?.filter(item => item.category === ts.DiagnosticCategory.Error) ?? [];
    if (errors.length) throw new Error(diagnosticText(errors));
    modules[file.name] = result.outputText;
  }
  if (definition.mode === 'typecheck') throw new Error('Use the type checker for compiler fixtures.');
  return { modules, entry: definition.entry, functionName: definition.functionName, mode: definition.mode, input };
}

export function createTypeChecker(assets: CompilerAssets) {
  const files = new Map(Object.entries(assets.files));
  const cache = new Map<string, ts.SourceFile>();
  const options = assets.options as ts.CompilerOptions;
  const directories = new Set<string>();
  for (const name of files.keys()) { let directory=name.slice(0,name.lastIndexOf('/')); while(directory) { directories.add(directory);directory=directory.slice(0,directory.lastIndexOf('/')); } }
  const resolutions=ts.createModuleResolutionCache('/workspace',name=>name,options);
  let previous: ts.Program | undefined;
  return (entry: string, code: string) => {
    if (code.length > 30000) throw new Error('Keep the snippet under 30,000 characters.');
    const path = `/workspace/client/src/modules/${entry}`;
    const original = files.get(path);
    files.set(path, code); cache.delete(path);
    const host: ts.CompilerHost = {
      getSourceFile(name, version) { const text = files.get(name); if (text === undefined) return; let source = cache.get(name); if (!source) { source = ts.createSourceFile(name, text, version, true); cache.set(name, source); } return source; },
      getDefaultLibFileName: () => '/workspace/node_modules/typescript/lib/lib.d.ts',
      writeFile() { /* Compiler fixtures are checked, never executed or written. */ },
      getCurrentDirectory: () => '/workspace', getDirectories: () => [],
      fileExists: name => files.has(name), readFile: name => files.get(name),
      directoryExists: directory => directories.has(directory.replace(/\/$/,'')),
      getCanonicalFileName: name => name, useCaseSensitiveFileNames: () => true, getNewLine: () => '\n', realpath: name => name
    };
    host.resolveModuleNames=(names,containingFile)=>names.map(name=>ts.resolveModuleName(name,containingFile,options,host,resolutions).resolvedModule);
    try {
      const program = ts.createProgram({ rootNames: assets.roots, options, host, oldProgram: previous });
      previous = program;
      const source=program.getSourceFile(path);
      if (!source) throw new Error('The edited compiler fixture could not load.');
      const errors = [...program.getOptionsDiagnostics(),...program.getGlobalDiagnostics(),...program.getSyntacticDiagnostics(source),...program.getSemanticDiagnostics(source)].filter(item => item.category === ts.DiagnosticCategory.Error);
      if (errors.length) throw new Error(diagnosticText(errors).slice(0,16000));
      return 'Type check passed. No TypeScript errors. This compiler fixture was not executed.';
    } finally { if (original !== undefined) files.set(path, original); else files.delete(path); cache.delete(path); }
  };
}
