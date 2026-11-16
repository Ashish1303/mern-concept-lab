import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { Ref } from 'react';
import { Result } from './LabWidgets';

const LegacyInput = forwardRef<HTMLInputElement>(function LegacyInput(_, ref) {
  return <label>Legacy input <input ref={ref} /></label>;
});
export function Example01() {
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  function focus() {
    input.current?.focus();
    setFocused(document.activeElement === input.current);
  }
  return <><LegacyInput ref={input} /><button onClick={focus}>Focus input</button><Result value={focused ? 'Input focused' : 'Ready'} /></>;
}

type FieldHandle = { clear: () => void };
function Field({ ref }: { ref: Ref<FieldHandle> }) {
  const [value, setValue] = useState('Ada');
  useImperativeHandle(ref, () => ({ clear: () => setValue('') }), []);
  return <><label>Modern input <input value={value} onChange={event => setValue(event.target.value)} /></label><Result value={value || 'Empty field'} /></>;
}
export function Example02() {
  const field = useRef<FieldHandle>(null);
  return <><button onClick={() => field.current?.clear()}>Clear through ref</button><Field ref={field} /></>;
}
