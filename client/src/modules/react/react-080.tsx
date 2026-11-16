import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Result } from './LabWidgets';

export function Example01() {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  return <><section><button onClick={() => setOpen(true)}>Open portal</button>
    {open && target && createPortal(<aside aria-label="Portal panel"><Result value="In the portal target" /><button onClick={() => setOpen(false)}>Close portal</button></aside>, target)}
  </section><div ref={setTarget} aria-label="Portal target" /></>;
}
const Accent = createContext('Default');
function PortalButton() {
  return <button>{useContext(Accent)}</button>;
}
export function Example02() {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [clicks, setClicks] = useState(0);
  return <><Accent value="Click portal child"><div onClick={() => setClicks(value => value + 1)}>
    {target && createPortal(<PortalButton />, target)}
  </div></Accent><div ref={setTarget} aria-label="Portal target" /><Result value={clicks} /></>;
}
