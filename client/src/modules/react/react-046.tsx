import { Result } from './LabWidgets';
import { SharedCounterView } from './hook-widgets';
import { useBoundedCounter, useEscapeToggle } from './custom-hooks';
export function Example01() {
    const first = useBoundedCounter();
    const second = useBoundedCounter();
    return <><SharedCounterView label="First custom" count={first.count} increment={first.increment}/><SharedCounterView label="Second custom" count={second.count} increment={second.increment}/><Result value={{ first: first.count, second: second.count }}/></>;
}
export function Example02() {
    const toggle = useEscapeToggle();
    return <><button onClick={toggle.show}>Open custom-hook panel</button><button onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>Dispatch Escape key</button>{toggle.open && <section aria-label="Custom hook panel">Escape closes this panel.</section>}<Result value={{ open: toggle.open }}/></>;
}
