import { createContext, useContext, useEffect, useRef } from 'react';
export interface TraceEvent {
    sequence: number;
    event: string;
    value?: unknown;
}
export function createTrace() {
    let events: readonly TraceEvent[] = [];
    let sequence = 0;
    const listeners = new Set<() => void>();
    return {
        emit(event: string, value?: unknown) {
            events = [...events, { sequence: ++sequence, event, ...(value === undefined ? {} : { value }) }].slice(-80);
            for (const listener of listeners)
                listener();
        },
        clear() { events = []; for (const listener of listeners)
            listener(); },
        subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
        snapshot: () => events,
        subscribers: () => listeners.size
    };
}
export type LabTrace = ReturnType<typeof createTrace>;
export type LabRequest = (path: string, options?: RequestInit) => Promise<Response>;
export interface LabServices {
    trace: LabTrace;
    request: LabRequest;
}
export const LabContext = createContext<LabServices | null>(null);
export function useLab() {
    const value = useContext(LabContext);
    if (!value)
        throw new Error('A React lab provider is required.');
    return value;
}
export function useOwnedRequests() {
    const { request } = useLab();
    const controllers = useRef(new Set<AbortController>());
    const active = useRef(true);
    useEffect(() => {
        active.current = true;
        const owned = controllers.current;
        return () => { active.current = false; for (const controller of owned)
            controller.abort(); owned.clear(); };
    }, []);
    return async (path: string, options?: RequestInit) => {
        if (!active.current)
            throw new DOMException('The example is unmounted.', 'AbortError');
        const controller = new AbortController();
        controllers.current.add(controller);
        const timeout = setTimeout(() => controller.abort(), 3000);
        try {
            const response = await request(path, { ...options, signal: controller.signal });
            if (!active.current || controller.signal.aborted)
                throw new DOMException('Request cancelled.', 'AbortError');
            return response;
        }
        finally {
            clearTimeout(timeout);
            controllers.current.delete(controller);
        }
    };
}
export async function acknowledge(request: LabRequest, label: string, fail = false, slow = false): Promise<string> {
    const response = await request('/api/v1/lab/ack', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label, fail, slow }) });
    if (!response.ok)
        throw new Error(`HTTP ${response.status}: acknowledgement rejected.`);
    const body: unknown = await response.json();
    if (!body || typeof body !== 'object' || !('data' in body) || !body.data || typeof body.data !== 'object' || !('label' in body.data) || typeof body.data.label !== 'string')
        throw new Error('Invalid acknowledgement.');
    return body.data.label;
}
