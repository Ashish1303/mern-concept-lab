import { useState } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [count, setCount] = useState(0);
    return <><button onClick={() => setCount(value => value + 1)}>Invoke event handler</button><Result value={{ count }}/></>;
}
export function Example02() {
    const [eventInfo, setEventInfo] = useState({ target: 'none', currentTarget: 'none' });
    return <><button aria-label="Inspect React event" onClick={event => setEventInfo({ target: (event.target as HTMLElement).tagName, currentTarget: event.currentTarget.tagName })}><span>Inner label</span></button><Result value={eventInfo}/></>;
}
