import { useState, useId } from 'react';
import { Result } from './LabWidgets';
function IdField({ label }: {
    label: string;
}) { const id = useId(); const [value, setValue] = useState(''); return <><label htmlFor={id}>{label}</label><input id={id} value={value} onChange={event => setValue(event.target.value)}/><Result label={`${label} output`} value={{ id, value }}/></>; }
export function Example01() {
    return <><IdField label="First generated field"/><IdField label="Second generated field"/></>;
}
export function Example02() {
    const id = useId();
    const [error, setError] = useState(false);
    return <><label htmlFor={id}>ID-associated name</label><input id={id} aria-invalid={error} aria-describedby={`${id}-hint ${id}-error`}/><p id={`${id}-hint`}>Use a display name.</p><p id={`${id}-error`}>{error ? 'A name is required.' : 'No validation error.'}</p><button onClick={() => setError(value => !value)}>Toggle ID-associated error</button><Result value={{ error, inputId: id, errorId: `${id}-error` }}/></>;
}
