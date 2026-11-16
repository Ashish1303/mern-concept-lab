import { useState } from 'react';
import { Result } from './LabWidgets';
function SelectionChild({ onSelect }: {
    onSelect: (value: string) => void;
}) { return <><button onClick={() => onSelect('Ada')}>Choose Ada</button><button onClick={() => onSelect('Grace')}>Choose Grace</button></>; }
function DraftChild({ onSubmit }: {
    onSubmit: (value: string) => void;
}) { const [draft, setDraft] = useState('Hello'); return <><label>Child draft<input value={draft} onChange={event => setDraft(event.target.value)} maxLength={40}/></label><button onClick={() => { if (draft.trim())
    onSubmit(draft.trim()); }}>Send to parent</button></>; }
export function Example01() {
    const [selected, setSelected] = useState('none');
    return <><SelectionChild onSelect={setSelected}/><Result value={{ selected }}/></>;
}
export function Example02() {
    const [submitted, setSubmitted] = useState<string | null>(null);
    return <><DraftChild onSubmit={setSubmitted}/><Result value={{ submitted }}/></>;
}
