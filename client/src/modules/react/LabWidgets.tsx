import { Component, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { print } from '../runtime';
import { useLab } from './lab-context';
export function Result({ value, label = 'Actual output' }: {
    value: unknown;
    label?: string;
}) {
    return <div className="actual-output"><h4>{label}</h4><pre data-testid="react-result" role="status" aria-label={label}>{print(value)}</pre></div>;
}
export function TracePanel() {
    const { trace } = useLab();
    const events = useSyncExternalStore(trace.subscribe, trace.snapshot, trace.snapshot);
    return <section className="react-trace"><h3>Observed React events</h3><p className="muted">Real effect/commit events, capped at 80 entries. Development StrictMode can add setup and cleanup checks.</p><button className="secondary" onClick={() => trace.clear()}>Clear trace</button><pre data-testid="react-trace" role="log" aria-live="polite">{events.length ? print(events) : 'No events recorded yet.'}</pre></section>;
}
export class LabBoundary extends Component<{
    children: ReactNode;
}, {
    error: string | null;
}> {
    override state = { error: null as string | null };
    static getDerivedStateFromError(error: unknown) { return { error: error instanceof Error ? error.message : 'This React example failed.' }; }
    override render() { return this.state.error ? <p role="alert">{this.state.error} Reset the example or load another resource to recover.</p> : this.props.children; }
}
