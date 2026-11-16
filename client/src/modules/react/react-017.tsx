import { useState, useRef } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);
    return <><form noValidate onSubmit={event => { event.preventDefault(); const valid = Boolean(name.trim()) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email); setError(valid ? '' : 'Enter a name and a basic valid email address.'); setAccepted(valid); }}><label>Display name<input value={name} onChange={event => setName(event.target.value)} maxLength={40}/></label><label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={80}/></label><button type="submit">Validate form</button></form>{error && <p role="alert">{error}</p>}<Result value={{ accepted, error }}/></>;
}
export function Example02() {
    const form = useRef<HTMLFormElement>(null);
    const [valid, setValid] = useState<boolean | null>(null);
    return <><form ref={form} noValidate onSubmit={event => { event.preventDefault(); setValid(event.currentTarget.checkValidity()); }}><label>Required email<input type="email" required name="email" maxLength={80}/></label><button type="submit">Check native constraints</button></form><Result value={{ valid }}/></>;
}
