import { readFileSync } from 'node:fs';
import { createContext, runInNewContext, Script } from 'node:vm';
import type { Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as Toolkit from '@reduxjs/toolkit';
import { createApp } from '../../../server/src/app';
import { createRunContext } from '../modules/runtime';
import ts from 'typescript';
import { compileSnippet, createTypeChecker, prepareSnippet } from './compiler';
import type { CompilerAssets, SnippetDefinition } from './types';
import type { Lesson } from '../modules/lesson-types';
import { loadLesson } from '../modules/load-lesson';
import { reduxCatalog } from '../modules/react/redux-catalog';
import { advancedCatalog } from '../modules/react/advanced-catalog';
import { reactCatalog } from '../modules/react/react-catalog';
import { loadReactLesson } from '../modules/react/load-react-lesson';
import { mongoCatalog } from '../modules/mongodb/mongo-catalog';
import { mernCatalog } from '../modules/mern/mern-catalog';
import { mernSnippet } from '../modules/mern/mern-snippet';
import { expressCatalog } from '../modules/express/express-catalog';
import { nodeCatalog } from '../modules/node/node-catalog';
import { backendSnippet } from '../modules/backend/backend-snippet';
import { foundationExamples } from '../foundation/definitions';
import { foundationSnippet, languageSnippet, reactSnippet } from './definitions';

const lessons = Object.values(import.meta.glob<{lesson:Lesson}>('../modules/{javascript,typescript}/*-*.ts',{eager:true})).map(module=>module.lesson);
const assets = JSON.parse(readFileSync('public/playground/types.json','utf8')) as CompilerAssets;
const checkTypes = createTypeChecker(assets);
let server:Server;let origin:string;
beforeAll(async()=>{server=createApp().listen(0,'127.0.0.1');await new Promise<void>((resolve,reject)=>{server.once('listening',resolve);server.once('error',reject);});const address=server.address();if(!address||typeof address==='string')throw new Error('No test address.');origin=`http://127.0.0.1:${address.port}`;});
afterAll(async()=>{if(server)await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));});

async function executeRuntime(definition:SnippetDefinition, modules:Record<string,string>, input:string){
  const host=document.createElement('div');document.body.append(host);const abort=new AbortController();
  const scope=createRunContext(input,host,abort.signal,(path,options)=>fetch(new URL(path,origin),options));
  const realm=createContext({window,document,localStorage,sessionStorage,Event,CustomEvent,EventTarget,MouseEvent,KeyboardEvent,HTMLElement,HTMLButtonElement,HTMLInputElement,HTMLFormElement,HTMLDivElement,Element,Node,AbortController,DOMException,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,WeakRef,FinalizationRegistry,setTimeout,clearTimeout,setInterval,clearInterval,queueMicrotask,console,__labCheckpoint(){}});
  // The real frame constructs broker errors in its own realm. Mirror that
  // identity here instead of exposing Node-fetch errors across the VM boundary.
  const RealmError=new Script('Error').runInContext(realm) as ErrorConstructor;
  const request=scope.context.request;
  scope.context.request=async(path,options)=>{try{return await request(path,options);}catch(error){const transferred=new RealmError(error instanceof Error?error.message:String(error));transferred.name=error instanceof Error?error.name:'Error';throw transferred;}};
  const cache=new Map<string,{exports:Record<string,unknown>}>();
  function load(path:string,from=''):Record<string,unknown>{
    if(path==='@reduxjs/toolkit')return Toolkit;
    const parts:string[]=[];for(const part of (path.startsWith('.')?from.slice(0,from.lastIndexOf('/')+1)+path:path).split('/')){if(part==='..')parts.pop();else if(part&&part!=='.')parts.push(part);}
    const key=[parts.join('/'),parts.join('/')+'.ts',parts.join('/')+'.tsx'].find(key=>key in modules);if(!key)throw new Error(`Missing module ${path}`);
    const existing=cache.get(key);if(existing)return existing.exports;const module={exports:{}};cache.set(key,module);
    const factory=new Script(`(function(require,module,exports){${modules[key]}\n})`).runInContext(realm) as (require:(path:string)=>unknown,module:{exports:Record<string,unknown>},exports:Record<string,unknown>)=>void;
    factory(path=>load(path,key),module,module.exports);return module.exports;
  }
  try{return await (load(definition.entry)[definition.functionName!] as (context:typeof scope.context)=>unknown)(scope.context);}
  finally{abort.abort();scope.dispose();host.remove();}
}

function assertImports(definition:SnippetDefinition, modules:Record<string,string>) {
  for (const [from,code] of Object.entries(modules)) for (const match of code.matchAll(/require\("([^"]+)"\)/g)) {
    const dependency=match[1]!;
    if (['react','react/jsx-runtime','react-dom/client','react-dom','react-router','react-redux','@reduxjs/toolkit','@reduxjs/toolkit/query/react'].includes(dependency)) continue;
    const parts:string[]=[];
    for (const part of (from.slice(0,from.lastIndexOf('/')+1)+dependency).split('/')) { if (part==='..') parts.pop(); else if (part && part!=='.') parts.push(part); }
    expect([parts.join('/'),parts.join('/')+'.ts',parts.join('/')+'.tsx'].some(name=>name in modules),`${definition.id}: missing ${dependency} from ${from}`).toBe(true);
  }
}
describe('all existing lessons have actual editable source',()=>{
  for (const lesson of lessons) for (const example of lesson.examples) it(`${example.id}: prepares and compiles its actual snippet`,async()=>{
    const loaded=await loadLesson(lesson.id);const definition=languageSnippet(loaded,example);const prepared=prepareSnippet(definition);
    expect(prepared.code).not.toContain('"questions":');
    if (example.runtime==='typecheck') {
      const original=definition.files[0]!.content;
      // Every original positive fixture still uses the real installed declarations.
      expect(checkTypes(definition.entry,original)).toContain('Type check passed');
      expect(()=>checkTypes(definition.entry,prepared.code)).toThrow(/TS\d+:/);
    } else {
      expect(prepared.code).toContain(`function ${definition.functionName}`);
      const compiled=compileSnippet(definition,prepared.code,example.input?.initial);
      expect(compiled.modules[definition.entry]).toContain(`exports.${definition.functionName}`);
      assertImports(definition,compiled.modules);
      expect(await executeRuntime(definition,compiled.modules,example.input?.initial??''),example.id).toEqual(example.expected);
    }
  },example.runtime==='typecheck'?30000:10000);
  for (const lesson of [...reactCatalog, ...advancedCatalog, ...reduxCatalog]) for (const example of lesson.examples) it(`${example.id}: compiles a real React component and all supporting imports`,async()=>{
    const loaded=await loadReactLesson(lesson.id);const definition=reactSnippet(loaded.sources,example);const prepared=prepareSnippet(definition);
    expect(prepared.code).toContain(`function ${example.component}`);
    expect(prepared.code).not.toContain('function Example99');
    assertImports(definition,compileSnippet(definition,prepared.code).modules);
  });
  for (const lesson of [...nodeCatalog, ...expressCatalog, ...mongoCatalog]) for (const example of lesson.examples) it(example.id + ' compiles the editable backend request', async () => {
    const definition = backendSnippet(example.id, example.initial);
    const compiled = compileSnippet(definition, prepareSnippet(definition).code);
    assertImports(definition, compiled.modules);
    expect(compiled.modules[definition.entry]).toContain(example.id);
  });
  for (const lesson of mernCatalog) it(lesson.id + ' compiles an editable full-stack scenario', () => {
    const definition = mernSnippet(lesson.examples[0]!.id, lesson.component);
    const compiled = compileSnippet(definition, prepareSnippet(definition).code);
    assertImports(definition, compiled.modules);
    expect(compiled.modules[definition.entry]).toContain(lesson.component);
  });
  for (const example of foundationExamples) it(`foundation-${example.id}: supports the actual infrastructure component`,()=>{
    const definition=foundationSnippet(example.sources,example.id);assertImports(definition,compileSnippet(definition,prepareSnippet(definition).code).modules);
  });
});
describe('edited output, errors and execution bounds',()=>{
  const definition:SnippetDefinition={id:'test',mode:'runtime',entry:'modules/javascript/test.ts',functionName:'example1',files:[{name:'modules/javascript/test.ts',content:'function example1() { return 1; }'}]};
  it('actually executes changed code, rather than the expected output',()=>{
    const compiled=compileSnippet(definition,'function example1() { return 7 * 6; }');const module={exports:{}};
    runInNewContext(compiled.modules[definition.entry]!,{exports:module.exports,module,globalThis:{__labCheckpoint(){}}});
    expect((module.exports as {example1:()=>number}).example1()).toBe(42);
  });
  it('reports syntax errors with a real TypeScript diagnostic',()=>{
    expect(()=>compileSnippet(definition,'function example1( { return ;')).toThrow(/TS\d+:/);
  });
  it.each(['while(true) {}','for(;;);','do {} while(true);','function recurse(){ return recurse(); } recurse();'])('bounds edited loops and recursion: %s',body=>{
    const compiled=compileSnippet(definition,`function example1() { ${body} }`);const module={exports:{}};let calls=0;
    runInNewContext(compiled.modules[definition.entry]!,{exports:module.exports,module,globalThis:{__labCheckpoint(){if(++calls>20)throw new Error('budget');}}});
    expect(()=>(module.exports as {example1:()=>unknown}).example1()).toThrow('budget');
  });
  it('exposes semantic errors and accepts their correction without any filesystem access',()=>{
    const entry='typescript/fixtures/typescript-001.e01.ts';
    expect(()=>checkTypes(entry,'export const answer: number = "wrong";')).toThrow(/TS2322/);
    expect(checkTypes(entry,'export const answer: number = 42;')).toContain('Type check passed');
    expect(()=>checkTypes(entry,'import secret from "/private/secrets"; export {secret};')).toThrow(/Cannot find module/);
  });
  it('keeps the useEffect setup visible when the selected component uses a local child',async()=>{
    const loaded=await loadReactLesson('react-028');const definition=reactSnippet(loaded.sources,loaded.lesson.examples[0]!);
    expect(prepareSnippet(definition).code).toContain('useEffect(');
  });
  it('opens the actual helper implementation for a thin wrapper',async()=>{
    const loaded=await loadReactLesson('react-028');const definition=reactSnippet(loaded.sources,loaded.lesson.examples[11]!);
    expect(prepareSnippet(definition).focusFile).toBe('modules/react/EffectRace.tsx');
  });
  it('uses production React semantics for the isolated preview',()=>{
    const compiled=compileSnippet(definition,'function example1(){ return import.meta.env.DEV; }');
    expect(compiled.modules[definition.entry]).not.toContain('import.meta');
  });
  it('rejects oversized edits before transpilation',()=>{expect(()=>compileSnippet(definition,' '.repeat(30001))).toThrow('30,000');});
  it('does not bundle test modules in editable lesson support',()=>{
    expect(Object.keys(import.meta.glob('../modules/react/react-[0-9][0-9][0-9].tsx')).every(path=>!path.includes('.test'))).toBe(true);
    expect(ts.version).toBe('6.0.3');
  });
});

