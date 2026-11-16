import { Profiler, useLayoutEffect, useState } from 'react';
import type { ProfilerOnRenderCallback } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';

function MeasuredValue({ count, id }: { count: number; id: string }) {
  const { trace } = useLab();
  useLayoutEffect(() => { trace.emit(id + '.commit', count); }, [id, count, trace]);
  return <Result value={count} label={id} />;
}
function useProfileCallback(): ProfilerOnRenderCallback {
  const { trace } = useLab();
  return (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    trace.emit('profiler.render', { id, phase, actualDuration, baseDuration, startTime, commitTime });
  };
}
const note = 'React timing callbacks require a development or profiling build. Commit markers also work in the standard production build.';

export function Example01() {
  const [count, setCount] = useState(0);
  const onRender = useProfileCallback();
  return <><p>{note}</p><button onClick={() => setCount(value => value + 1)}>Profile update</button>
    <Profiler id="Counter" onRender={onRender}><MeasuredValue id="Counter" count={count} /></Profiler>
  </>;
}
function Region({ id }: { id: string }) {
  const [count, setCount] = useState(0);
  const onRender = useProfileCallback();
  return <section><button onClick={() => setCount(value => value + 1)}>Update {id}</button>
    <Profiler id={id} onRender={onRender}><MeasuredValue id={id} count={count} /></Profiler>
  </section>;
}
export function Example02() { return <><p>{note}</p><Region id="Left" /><Region id="Right" /></>; }
