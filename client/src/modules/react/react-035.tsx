import { useState, useRef, useImperativeHandle } from 'react';
import type { Ref } from 'react';
import { Result } from './LabWidgets';
type InputHandle = {
    focus: () => void;
    clear: () => void;
    read: () => string;
};
function CommandInput({ ref }: {
    ref: Ref<InputHandle>;
}) { const input = useRef<HTMLInputElement>(null); useImperativeHandle(ref, () => ({ focus: () => input.current?.focus(), clear: () => { if (input.current)
        input.current.value = ''; }, read: () => input.current?.value ?? '' }), []); return <label>Command input<input ref={input} maxLength={40}/></label>; }
type ValidationHandle = {
    validate: () => boolean;
    reset: () => void;
};
function ValidationInput({ ref }: {
    ref: Ref<ValidationHandle>;
}) { const input = useRef<HTMLInputElement>(null); useImperativeHandle(ref, () => ({ validate: () => { const valid = input.current?.checkValidity() ?? false; if (!valid)
        input.current?.focus(); return valid; }, reset: () => { if (input.current)
        input.current.value = ''; } }), []); return <label>Required handle name<input ref={input} required/></label>; }
export function Example01() {
    const handle = useRef<InputHandle>(null);
    const [read, setRead] = useState('');
    return <><CommandInput ref={handle}/><button onClick={() => handle.current?.focus()}>Handle focus</button><button onClick={() => { handle.current?.clear(); setRead(handle.current?.read() ?? ''); }}>Handle clear</button><button onClick={() => setRead(handle.current?.read() ?? '')}>Handle read</button><Result value={{ read }}/></>;
}
export function Example02() {
    const handle = useRef<ValidationHandle>(null);
    const [valid, setValid] = useState<boolean | null>(null);
    return <><ValidationInput ref={handle}/><button onClick={() => setValid(handle.current?.validate() ?? false)}>Handle validate</button><button onClick={() => { handle.current?.reset(); setValid(null); }}>Handle reset</button><Result value={{ valid }}/></>;
}
