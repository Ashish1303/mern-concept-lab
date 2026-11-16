import { useEffect, useState } from 'react';
import { itemsResponse } from '../helpers';
import { useLab } from './lab-context';
import { Result } from './LabWidgets';
export function EffectRace() {
    const [run, setRun] = useState(0);
    const [unchecked, setUnchecked] = useState('none');
    const [guarded, setGuarded] = useState('none');
    const { request, trace } = useLab();
    useEffect(() => {
        if (!run)
            return;
        let active = true;
        let latest = 0;
        const controllers: AbortController[] = [];
        const tasks = [{ query: 'Ada', delay: 160 }, { query: 'Grace', delay: 0 }].map(({ query, delay }) => {
            const token = ++latest;
            const controller = new AbortController();
            controllers.push(controller);
            trace.emit('race request', { query, token });
            return itemsResponse((path, options) => request(path, { ...options, signal: controller.signal }), `/api/v1/lab/items?q=${query}&delay=${delay}`).then(names => {
                if (!active)
                    return;
                setUnchecked(names.join(', '));
                if (token === latest)
                    setGuarded(names.join(', '));
                trace.emit('race response', { query, token, latest });
            });
        });
        void Promise.allSettled(tasks).then(results => { if (active)
            trace.emit('race complete', results.map(value => value.status)); });
        return () => { active = false; controllers.forEach(controller => controller.abort()); trace.emit('race cleanup'); };
    }, [request, run, trace]);
    return <><button onClick={() => setRun(value => value + 1)}>Run request race</button><Result value={{ run, unchecked, guarded }}/></>;
}
