import { useState } from 'react';
import { OutputViewer } from '../components/examples/OutputViewer';

export function InteractionDemo() {
  const [count, setCount] = useState(0);
  return <>
    <p>Click the button, observe the result, then reset this check.</p>
    <div className="button-row">
      <button className="primary" onClick={() => setCount((value) => value + 1)}>Record a click</button>
      <button className="secondary" onClick={() => setCount(0)}>Reset</button>
    </div>
    <OutputViewer><span className="count-output">{count}</span> clicks recorded</OutputViewer>
  </>;
}
