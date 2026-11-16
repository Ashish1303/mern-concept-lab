import { useState } from 'react';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';
function ComposablePanel({ title, children, outlined = true }: {
    title: string;
    children: ReactNode;
    outlined?: boolean;
}) { return <section className={outlined ? 'demo-outlined' : 'demo-filled'}><h3>{title}</h3>{children}</section>; }
function CompositionCounter() { const [count, setCount] = useState(0); return <><button onClick={() => setCount(value => value + 1)}>Composition child increment</button><Result value={{ count }}/></>; }
export function Example01() {
    const [title, setTitle] = useState('Profile');
    return <><button onClick={() => setTitle(value => value === 'Profile' ? 'Settings' : 'Profile')}>Change shell title</button><ComposablePanel title={title}><p>Caller-owned content</p></ComposablePanel><Result value={{ title }}/></>;
}
export function Example02() {
    const [outlined, setOutlined] = useState(true);
    return <><button onClick={() => setOutlined(value => !value)}>Toggle panel appearance</button><ComposablePanel title="Stable child" outlined={outlined}><CompositionCounter /></ComposablePanel></>;
}
