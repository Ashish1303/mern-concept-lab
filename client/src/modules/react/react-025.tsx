import { useState } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import { StrictComparison } from './observations';
export function Example01() {
    return <StrictComparison />;
}
export function Example02() {
    const [show, setShow] = useState(true);
    const { trace } = useLab();
    return <><button onClick={() => setShow(value => !value)}>Toggle ref target</button>{show && <input aria-label="Strict ref target" defaultValue="Ada" ref={node => { if (!node)
        return; trace.emit('ref attached', node.tagName); return () => trace.emit('ref cleanup'); }}/>}<Result value={{ show }}/></>;
}
