import { useRef, useState } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
function DraftRow({ person }: {
    person: {
        id: string;
        name: string;
    };
}) {
    const [draft, setDraft] = useState(person.name);
    return <li><label>Draft {person.name}<input value={draft} onChange={event => setDraft(event.target.value)} maxLength={40}/></label><Result value={{ person: person.name, draft }}/></li>;
}
export function KeyedRows({ strategy }: {
    strategy: 'index' | 'id';
}) {
    const [people, setPeople] = useState([{ id: 'a', name: 'Ada' }, { id: 'g', name: 'Grace' }]);
    return <><button onClick={() => setPeople(previous => [...previous].reverse())}>Reverse rows</button><ul>{people.map((person, index) => <DraftRow key={strategy === 'id' ? person.id : index} person={person}/>)}</ul><Result value={{ strategy, order: people.map(person => person.name) }}/></>;
}
export function NodeIdentity({ changeType }: {
    changeType: boolean;
}) {
    const [value, setValue] = useState(0);
    const [sameNode, setSameNode] = useState<boolean | null>(null);
    const node = useRef<HTMLElement>(null);
    const remembered = useRef<HTMLElement | null>(null);
    return <><button onClick={() => { remembered.current = node.current; setSameNode(null); }}>Remember DOM node</button><button onClick={() => setValue(number => number + 1)}>Update node content</button><button onClick={() => setSameNode(remembered.current !== null && remembered.current === node.current)}>Compare DOM node</button>{changeType && value > 0 ? <strong ref={node}>{value}</strong> : <span ref={node}>{value}</span>}<Result value={{ value, sameNode }}/></>;
}
export function ReactPropagation({ stop }: {
    stop: boolean;
}) {
    const { trace } = useLab();
    return <div onClickCapture={() => trace.emit('parent capture')} onClick={() => trace.emit('parent bubble')}>
    <button onClick={event => { trace.emit('child handler', { target: (event.target as HTMLElement).tagName, currentTarget: event.currentTarget.tagName, nativePhase: event.eventPhase }); if (stop)
        event.stopPropagation(); }}>Dispatch React click</button>
  </div>;
}
