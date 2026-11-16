import { useState, useRef } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const input = useRef<HTMLInputElement>(null);
    const [captured, setCaptured] = useState('Not read');
    return <><label>Uncontrolled name<input ref={input} defaultValue="Ada" maxLength={40}/></label><button onClick={() => setCaptured(input.current?.value ?? '')}>Read DOM value</button><Result value={{ captured }}/></>;
}
export function Example02() {
    const [submitted, setSubmitted] = useState<Record<string, string>>({});
    return <><form onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); setSubmitted({ name: String(data.get('name')), role: String(data.get('role')) }); }}><label>Form name<input name="name" defaultValue="Ada" maxLength={40}/></label><label>Form role<select name="role" defaultValue="engineer"><option value="engineer">Engineer</option><option value="reviewer">Reviewer</option></select></label><button type="submit">Read form data</button></form><Result value={submitted}/></>;
}
