import { useState, useLayoutEffect } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import { BatchingComparison } from './observations';
export function Example01() {
    return <BatchingComparison />;
}
export function Example02() {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const { trace } = useLab();
    useLayoutEffect(() => { trace.emit('async batch commit', { left, right }); });
    return <><button onClick={async () => { await Promise.resolve(); setLeft(value => value + 1); setRight(value => value + 1); }}>Update after await</button><Result value={{ left, right }}/></>;
}
