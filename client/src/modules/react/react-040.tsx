import { useState, useSyncExternalStore } from 'react';
import { Result } from './LabWidgets';
import { createCounterStore, useWindowWidth } from './custom-hooks';
function StoreReader({ store, label }: {
    store: ReturnType<typeof createCounterStore>;
    label: string;
}) { const count = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot); return <Result label={label} value={{ count }}/>; }
export function Example01() {
    const [store] = useState(createCounterStore);
    const [second, setSecond] = useState(true);
    const [subscriptions, setSubscriptions] = useState<number | null>(null);
    return <><StoreReader store={store} label="First external"/>{second && <StoreReader store={store} label="Second external"/>}<button onClick={store.increment}>Increment external store</button><button onClick={() => setSecond(value => !value)}>Toggle second subscriber</button><button onClick={() => setSubscriptions(store.subscriptions())}>Inspect subscriptions</button><Result value={{ subscriptions }}/></>;
}
export function Example02() {
    const width = useWindowWidth();
    return <><p>Resize the browser to observe the actual viewport.</p><button onClick={() => window.dispatchEvent(new Event('resize'))}>Read current viewport</button><Result value={{ width }}/></>;
}
