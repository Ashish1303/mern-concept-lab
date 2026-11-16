import { useEffect, useRef, useState } from 'react';
import { OutputViewer } from '../components/examples/OutputViewer';
import { createRunContext, print } from './runtime';
import type { CompilerEvidence, CompilerExample, RuntimeExample } from './lesson-types';

export function LearningRunner({ example }: { example: RuntimeExample }) {
  const [input, setInput] = useState(example.input?.initial ?? '');
  const [result, setResult] = useState({ state: 'idle', text: 'Not run yet. Expected output is shown separately below.' });
  const host = useRef<HTMLDivElement>(null);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => { active.current?.abort(); active.current = null; }, []);

  function reset() {
    active.current?.abort(); active.current = null;
    host.current?.replaceChildren();
    setInput(example.input?.initial ?? '');
    setResult({ state: 'idle', text: 'Reset. Run the example again.' });
  }

  async function run() {
    if (!host.current) return;
    active.current?.abort();
    const controller = new AbortController(); active.current = controller;
    host.current.replaceChildren();
    const scope = createRunContext(input, host.current, controller.signal);
    const timeout = setTimeout(() => {
      controller.abort();
      if (active.current === controller) {
        active.current = null;
        setResult({ state: 'error', text: 'This run exceeded the 3-second limit and was cancelled.' });
      }
    }, 3000);
    setResult({ state: 'running', text: 'Running the actual TypeScript implementation…' });
    try {
      if (input.length > 500) throw new Error('Input is limited to 500 characters.');
      const value = await example.run(scope.context);
      if (!controller.signal.aborted && active.current === controller) setResult({ state: 'success', text: print(value) });
    } catch (error) {
      if (!controller.signal.aborted && active.current === controller) setResult({ state: 'error', text: error instanceof Error ? error.message : 'The example failed.' });
    } finally {
      clearTimeout(timeout); scope.dispose();
      if (active.current === controller) {
        active.current = null;
        // The DOM is a completed fixed-event snapshot, not additional live controls.
        host.current?.querySelectorAll('button,input').forEach(node => { (node as HTMLButtonElement | HTMLInputElement).disabled = true; });
        host.current?.querySelectorAll('a').forEach(node => { node.removeAttribute('href'); node.setAttribute('aria-disabled', 'true'); });
      }
    }
  }

  return <>
    <p>{example.explanation}</p>
    {example.input && <label className="lab-input-label">{example.input.label}<input value={input} maxLength={500} disabled={result.state === 'running'} onChange={event => setInput(event.target.value)} /></label>}
    <div className="button-row">
      <button className="primary" disabled={result.state === 'running'} onClick={() => void run()}>Run example</button>
      <button className="secondary" onClick={reset}>{result.state === 'running' ? 'Cancel and reset' : 'Reset'}</button>
    </div>
    {example.network && <p className="muted">Uses the real Express API. Start both development servers, or run the production build.</p>}
    <OutputViewer error={result.state === 'error'}><pre>{result.text}</pre></OutputViewer>
    <div ref={host} className="dom-snapshot" aria-label="DOM snapshot from the last run" />
  </>;
}

export function CompilerRunner({ example, evidence, checkedAt, compiler }: { example: CompilerExample; evidence: CompilerEvidence['fixtures'][string] | undefined; checkedAt: string; compiler: string }) {
  const [visible, setVisible] = useState(false);
  return <>
    <p>{example.explanation}</p>
    <p className="compiler-notice"><strong>Compiler reference.</strong> This panel shows the real TypeScript checks from the build. Use the editable snippet above to run a new type check in your browser. Invalid statements are never executed.</p>
    <div className="button-row"><button className="primary" onClick={() => setVisible(true)}>Show compiler verification</button><button className="secondary" onClick={() => setVisible(false)}>Reset</button></div>
    <OutputViewer error={!evidence}><pre>{!visible ? 'Not displayed yet.' : evidence ? print({ compiler, checkedAt, validCode: evidence.positive, negativeDiagnostics: evidence.negative, sourceSHA256: evidence.sha256 }) : 'Compiler evidence is missing. Run npm run check:types.'}</pre></OutputViewer>
  </>;
}
