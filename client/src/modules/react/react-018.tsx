import { useState, useEffect, Component } from 'react';
import type { LabTrace } from './lab-context';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
function FunctionalLifecycle({ value, trace }: {
    value: number;
    trace: LabTrace;
}) { useEffect(() => { trace.emit('function setup', value); return () => trace.emit('function cleanup', value); }, [trace, value]); return <Result value={{ value }}/>; }
class ClassLifecycle extends Component<{
    value: number;
    trace: LabTrace;
}> {
    override componentDidMount() { this.props.trace.emit('class mount', this.props.value); }
    override componentDidUpdate(previous: Readonly<{
        value: number;
        trace: LabTrace;
    }>) { this.props.trace.emit('class update', { previous: previous.value, current: this.props.value }); }
    override componentWillUnmount() { this.props.trace.emit('class unmount', this.props.value); }
    override render() { return <Result value={{ value: this.props.value }}/>; }
}
export function Example01() {
    const [value, setValue] = useState(0);
    const { trace } = useLab();
    return <><button onClick={() => setValue(number => number + 1)}>Change lifecycle prop</button><FunctionalLifecycle value={value} trace={trace}/></>;
}
export function Example02() {
    const [value, setValue] = useState(0);
    const { trace } = useLab();
    return <><button onClick={() => setValue(number => number + 1)}>Update class child</button><ClassLifecycle value={value} trace={trace}/></>;
}
