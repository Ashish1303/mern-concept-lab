import { useEffect, useRef, useState } from 'react';
import { itemsResponse } from '../helpers';
import { useLab } from './lab-context';
export function useLabQuery(query: string, fail = false, delay = 0) {
    const { request, trace } = useLab();
    const [attempt, setAttempt] = useState(0);
    const controller = useRef<AbortController | null>(null);
    const key = `${query}|${fail}|${delay}|${attempt}`;
    const [result, setResult] = useState({ key: '', status: 'loading', names: [] as string[], error: '' });
    useEffect(() => {
        let active = true;
        const owned = new AbortController();
        controller.current = owned;
        trace.emit('request start', { query, fail, attempt });
        const path = `/api/v1/lab/items?q=${encodeURIComponent(query)}&fail=${fail ? 1 : 0}&delay=${delay}`;
        void itemsResponse((url, options) => request(url, { ...options, signal: owned.signal }), path).then(names => {
            if (active) {
                setResult({ key, status: 'success', names, error: '' });
                trace.emit('request success', { query, names });
            }
        }).catch((error: unknown) => {
            if (!active)
                return;
            const status = owned.signal.aborted ? 'cancelled' : 'error';
            setResult({ key, status, names: [], error: owned.signal.aborted ? 'Request cancelled.' : error instanceof Error ? error.message : 'Request failed.' });
            trace.emit(`request ${status}`, { query });
        });
        return () => { active = false; owned.abort(); if (controller.current === owned)
            controller.current = null; trace.emit('request cleanup', { query }); };
    }, [attempt, delay, fail, key, query, request, trace]);
    return {
        status: result.key === key ? result.status : 'loading',
        names: result.key === key ? result.names : [],
        error: result.key === key ? result.error : '',
        retry: () => setAttempt(value => value + 1),
        cancel: () => controller.current?.abort()
    };
}
