import { useState, useEffect, useEffectEvent } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
function EffectEventChannel({ variant }: {
    variant: 'count' | 'theme' | 'room' | 'mute';
}) {
    const [count, setCount] = useState(0);
    const [theme, setTheme] = useState('light');
    const [room, setRoom] = useState('A');
    const [muted, setMuted] = useState(false);
    const [target] = useState(() => new EventTarget());
    const { trace } = useLab();
    const onNotice = useEffectEvent(() => { trace.emit('latest effect event', { count, theme, room, muted, notified: !muted }); });
    useEffect(() => { const listener = () => onNotice(); target.addEventListener('notice', listener); trace.emit('channel subscribe', room); return () => { target.removeEventListener('notice', listener); trace.emit('channel unsubscribe', room); }; }, [room, target, trace]);
    return <>{variant === 'count' && <button onClick={() => setCount(value => value + 1)}>Change latest count</button>}{variant === 'theme' && <button onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')}>Change latest theme</button>}{variant === 'room' && <><button onClick={() => setRoom(value => value === 'A' ? 'B' : 'A')}>Change reactive room</button><button onClick={() => setTheme('dark')}>Change room notification theme</button></>}{variant === 'mute' && <button onClick={() => setMuted(value => !value)}>Toggle latest mute</button>}<button onClick={() => target.dispatchEvent(new Event('notice'))}>Dispatch effect-installed notice</button><Result value={{ count, theme, room, muted }}/></>;
}
export function Example01() {
    return <EffectEventChannel variant="count"/>;
}
export function Example02() {
    return <EffectEventChannel variant="theme"/>;
}
export function Example03() {
    return <EffectEventChannel variant="room"/>;
}
export function Example04() {
    const [stepSize, setStepSize] = useState(1);
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);
    const { trace } = useLab();
    const tick = useEffectEvent(() => { setCount(value => value + stepSize); trace.emit('latest timer increment', stepSize); });
    useEffect(() => {
        if (!running) return;
        let ticks = 0;
        const timer = setInterval(() => {
            tick();
            if (++ticks >= 5) {
                clearInterval(timer);
                setRunning(false);
            }
        }, 120);
        return () => { clearInterval(timer); trace.emit('effect-event timer cleanup'); };
    }, [running, trace]);
    return <><button onClick={() => setStepSize(2)}>Use increment two</button><button onClick={() => setRunning(true)}>Start effect-event timer</button><button onClick={() => setRunning(false)}>Stop effect-event timer</button><Result value={{ count, stepSize, running }}/></>;
}
export function Example05() {
    return <EffectEventChannel variant="mute"/>;
}
