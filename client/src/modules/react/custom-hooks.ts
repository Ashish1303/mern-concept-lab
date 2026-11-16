import { useDebugValue, useEffect, useState, useSyncExternalStore } from 'react';
export function useBoundedCounter(initial = 0) {
    const [count, setCount] = useState(initial);
    return { count, increment: () => setCount(value => Math.min(5, value + 1)), decrement: () => setCount(value => Math.max(0, value - 1)) };
}
export function useEscapeToggle() {
    const [open, setOpen] = useState(false);
    useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape')
        setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
    return { open, show: () => setOpen(true) };
}
export function useDebugCounter() {
    const result = useBoundedCounter();
    useDebugValue(result.count);
    return result;
}
export function formatDebugCounter(value: {
    count: number;
}) { return `Bounded count: ${value.count}`; }
export function useFormattedDebugCounter() {
    const result = useBoundedCounter();
    useDebugValue({ count: result.count }, formatDebugCounter);
    return result;
}
export function createCounterStore() {
    let count = 0;
    const listeners = new Set<() => void>();
    return {
        getSnapshot: () => count,
        subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
        increment() { count++; for (const listener of listeners)
            listener(); },
        subscriptions: () => listeners.size
    };
}
const subscribeResize = (listener: () => void) => { window.addEventListener('resize', listener); return () => window.removeEventListener('resize', listener); };
const widthSnapshot = () => window.innerWidth;
export function useWindowWidth() { return useSyncExternalStore(subscribeResize, widthSnapshot, () => 0); }
