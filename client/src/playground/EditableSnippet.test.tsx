import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EditableSnippet } from './EditableSnippet';
import type { CompiledSnippet, SnippetDefinition, WorkerRequest, WorkerResult } from './types';

const initial='export function Example01() { return <p>Original</p>; }';
const definition:SnippetDefinition={id:'react-test.e01',mode:'react',entry:'modules/react/test.tsx',functionName:'Example01',files:[{name:'modules/react/test.tsx',content:initial}]};
class CompilerDouble {
  static instances:CompilerDouble[]=[];
  onmessage:((event:{data:WorkerResult})=>void)|null=null;
  onerror:(()=>void)|null=null;
  messages:WorkerRequest[]=[];
  terminate=vi.fn();
  constructor(){CompilerDouble.instances.push(this);}
  postMessage(message:WorkerRequest){this.messages.push(message);if(message.action==='prepare')queueMicrotask(()=>this.reply({kind:'prepared',prepared:{code:initial,start:0,end:initial.length}}));}
  reply(data:WorkerResult){this.onmessage?.({data});}
}
beforeEach(()=>{CompilerDouble.instances=[];vi.stubGlobal('Worker',CompilerDouble);const meta=document.createElement('meta');meta.name='playground-origin';meta.content='http://127.0.0.2:4001';document.head.append(meta);});
afterEach(()=>{cleanup();document.querySelector('meta[name="playground-origin"]')?.remove();vi.unstubAllGlobals();vi.restoreAllMocks();vi.useRealTimers();});
async function open(){render(<EditableSnippet definition={definition}/>);expect(screen.getByRole('button',{name:'Stop snippet'})).toBeDisabled();await waitFor(()=>expect(screen.getByRole('button',{name:'Run snippet'})).toBeEnabled());return CompilerDouble.instances[0]!;}
function mountPreview(compiler:CompilerDouble){
  const compiled:CompiledSnippet={mode:'react',entry:definition.entry,functionName:'Example01',modules:{[definition.entry]:'code'},input:''};
  act(()=>compiler.reply({kind:'compiled',compiled}));
  const frame=screen.getByTitle<HTMLIFrameElement>('Edited snippet preview');
  const post=vi.spyOn(frame.contentWindow!,'postMessage');fireEvent.load(frame);
  const channel=(post.mock.calls[0]![0] as {channel:string}).channel;
  return {frame,channel};
}
describe('editor controls and preview lifecycle',()=>{
  it('sends edited code to the compiler and resets code, output and preview',async()=>{
    const compiler=await open();const changed='export function Example01(){return <p>Changed</p>}';
    fireEvent.change(screen.getByRole('textbox',{name:'Editable code'}),{target:{value:changed}});fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));
    expect(compiler.messages.at(-1)?.code).toBe(changed);mountPreview(compiler);
    fireEvent.click(screen.getByRole('button',{name:'Reset snippet'}));
    expect(screen.getByRole('textbox',{name:'Editable code'})).toHaveValue(initial);
    expect(screen.queryByTitle('Edited snippet preview')).toBeNull();expect(compiler.terminate).toHaveBeenCalled();
  });
  it('shows compilation errors and allows correction and another run',async()=>{
    const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));act(()=>compiler.reply({kind:'error',error:'TS1005: } expected.'}));
    expect(screen.getByRole('alert')).toHaveTextContent('TS1005');expect(screen.getByRole('button',{name:'Run snippet'})).toBeEnabled();
    fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));expect(screen.queryByRole('alert')).toBeNull();
  });
  it('stops a compilation by terminating its worker and recreates it on the next run',async()=>{
    const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));fireEvent.click(screen.getByRole('button',{name:'Stop snippet'}));
    expect(compiler.terminate).toHaveBeenCalled();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));expect(CompilerDouble.instances).toHaveLength(2);
  });
  it('accepts results only from the current frame, origin and run channel',async()=>{
    const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));const {frame,channel}=mountPreview(compiler);
    const send=(origin:string,token:string)=>fireEvent(window,new MessageEvent('message',{source:frame.contentWindow!,origin,data:{channel:token,type:'result',value:'Edited output'}}));
    send('https://unrelated.invalid',channel);send('http://127.0.0.2:4001','old-run');expect(screen.getByTestId('snippet-output')).not.toHaveTextContent('Edited output');
    send('http://127.0.0.2:4001',channel);expect(screen.getByTestId('snippet-output')).toHaveTextContent('Edited output');
  });
  it('rejects arbitrary API targets instead of forwarding them',async()=>{
    const fetch=vi.fn();vi.stubGlobal('fetch',fetch);const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));const {frame,channel}=mountPreview(compiler);
    fireEvent(window,new MessageEvent('message',{source:frame.contentWindow!,origin:'http://127.0.0.2:4001',data:{channel,type:'request',value:{id:1,path:'https://unrelated.invalid/private',method:'GET'}}}));
    expect(fetch).not.toHaveBeenCalled();
  });
  it('terminates the compiler and removes its frame when the lesson unmounts',async()=>{
    const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));mountPreview(compiler);cleanup();expect(compiler.terminate).toHaveBeenCalled();
  });
  it('ignores a late compiler result after Stop',async()=>{
    const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));fireEvent.click(screen.getByRole('button',{name:'Stop snippet'}));
    act(()=>compiler.reply({kind:'compiled',compiled:{mode:'react',entry:definition.entry,functionName:'Example01',modules:{},input:''}}));
    expect(screen.queryByTitle('Edited snippet preview')).toBeNull();
  });
  it('shows a returned value without leaving an empty preview frame',async()=>{
    const compiler=await open();fireEvent.click(screen.getByRole('button',{name:'Run snippet'}));const {frame,channel}=mountPreview(compiler);
    fireEvent(window,new MessageEvent('message',{source:frame.contentWindow!,origin:'http://127.0.0.2:4001',data:{channel,type:'result',value:{output:'42',hasPreview:false}}}));
    expect(screen.getByTestId('snippet-output')).toHaveTextContent('42');expect(screen.queryByTitle('Edited snippet preview')).toBeNull();
  });
});
