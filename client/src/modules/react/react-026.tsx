import { useState, useRef, useId } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const id = useId();
    const [expanded, setExpanded] = useState(false);
    return <><button aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}>Toggle accessible details</button>{expanded && <section id={id} aria-label="Accessible details">Keyboard-operable native button controls this region.</section>}<Result value={{ expanded }}/></>;
}
export function Example02() {
    const id = useId();
    const input = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    return <><form noValidate onSubmit={event => { event.preventDefault(); const invalid = !name.trim(); setError(invalid); if (invalid)
        input.current?.focus(); }}><label htmlFor={id}>Accessible name</label><input ref={input} id={id} value={name} onChange={event => setName(event.target.value)} maxLength={40} aria-invalid={error} aria-describedby={`${id}-help`}/><p id={`${id}-help`} role={error ? 'alert' : undefined}>{error ? 'Enter a name.' : 'A nonempty name is required.'}</p><button type="submit">Validate accessible name</button></form><Result value={{ error, name }}/></>;
}
