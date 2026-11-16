import { useState, type ChangeEvent, type ReactNode } from 'react';
export interface Props { start: number; children?: ReactNode }
export function TypedCounter({ start, children }: Props) { const [count, setCount] = useState(start); const change = (event: ChangeEvent<HTMLInputElement>) => setCount(Number(event.target.value));
 const invalidUpdate = () => {
  // @ts-expect-error -- State was inferred as numeric.
  setCount('wrong');
 };
 return <label>{children}<input value={count} onChange={change} /><button onClick={invalidUpdate}>Compile-only invalid update</button></label>;
}
