import { useState } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [visible, setVisible] = useState(false);
    return <><button onClick={() => setVisible(value => !value)}>Toggle conditional greeting</button>{visible ? <p>Hello, Ada</p> : <p>Greeting is absent</p>}<Result value={{ visible }}/></>;
}
export function Example02() {
    const [count, setCount] = useState(0);
    return <><button onClick={() => setCount(value => value + 1)}>Increase guarded count</button><p>Numeric guard: {count && <strong>Badge</strong>}</p><p>Boolean guard: {count > 0 && <strong>Badge</strong>}</p><Result value={{ count, numericGuard: count && 'Badge', booleanGuard: count > 0 ? 'Badge' : null }}/></>;
}
