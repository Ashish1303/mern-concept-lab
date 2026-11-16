import { useState } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [query, setQuery] = useState('');
    const items = [{ id: 'a', name: 'Ada' }, { id: 'g', name: 'Grace' }, { id: 'l', name: 'Linus' }];
    const filtered = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    return <><label>Filter names<input value={query} maxLength={30} onChange={event => setQuery(event.target.value)}/></label><ul>{filtered.map(item => <li key={item.id}>{item.name}</li>)}</ul><Result value={filtered.map(item => item.name)}/></>;
}
export function Example02() {
    const [items, setItems] = useState(['Ada', 'Grace']);
    return <><button onClick={() => setItems([])}>Remove all rows</button><button onClick={() => setItems(['Ada', 'Grace'])}>Restore rows</button>{items.length ? <ul>{items.map(name => <li key={name}>{name}</li>)}</ul> : <p role="status">No rows to display.</p>}<Result value={{ count: items.length }}/></>;
}
