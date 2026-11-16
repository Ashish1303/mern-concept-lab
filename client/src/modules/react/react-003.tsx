import { useState } from 'react';
import { Result } from './LabWidgets';
function Score({ value }: {
    value: number;
}) { return <Result value={{ score: value }}/>; }
function DefaultName({ name = 'Guest' }: {
    name?: string | null;
}) { return <Result value={name}/>; }
export function Example01() {
    const [score, setScore] = useState(1);
    return <><button onClick={() => setScore(value => value + 1)}>Change parent score</button><Score value={score}/></>;
}
export function Example02() {
    const [empty, setEmpty] = useState(false);
    return <><button onClick={() => setEmpty(value => !value)}>Toggle explicit null</button>{empty ? <DefaultName name={null}/> : <DefaultName />}</>;
}
