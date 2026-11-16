import { Result } from './LabWidgets';
import { DebugHelp } from './hook-widgets';
import { useDebugCounter, useFormattedDebugCounter } from './custom-hooks';
export function Example01() {
    const counter = useDebugCounter();
    return <><DebugHelp lazy={false}/><button onClick={counter.increment}>Debug counter increment</button><Result value={{ count: counter.count }}/></>;
}
export function Example02() {
    const counter = useFormattedDebugCounter();
    return <><DebugHelp lazy/><button onClick={counter.increment}>Formatted debug increment</button><Result value={{ count: counter.count }}/></>;
}
