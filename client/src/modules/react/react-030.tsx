import { useRef, useReducer } from 'react';
import { Result } from './LabWidgets';
function counterReducer(state: number, action: {
    type: 'increment' | 'reset';
}) { return action.type === 'reset' ? 0 : state + 1; }
type Todo = {
    id: number;
    done: boolean;
};
function todoReducer(state: Todo[], action: {
    type: 'add' | 'toggle' | 'remove';
    id: number;
}): Todo[] { switch (action.type) {
    case 'add': return [...state, { id: action.id, done: false }];
    case 'toggle': return state.map(item => item.id === action.id ? { ...item, done: !item.done } : item);
    case 'remove': return state.filter(item => item.id !== action.id);
} }
export function Example01() {
    const [count, dispatch] = useReducer(counterReducer, 0);
    return <><button onClick={() => dispatch({ type: 'increment' })}>Reducer increment</button><button onClick={() => dispatch({ type: 'reset' })}>Reducer reset</button><Result value={{ count }}/></>;
}
export function Example02() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const next = useRef(1);
    return <><button onClick={() => { const id = next.current++; dispatch({ type: 'add', id }); }}>Add reducer todo</button>{todos.map(todo => <div key={todo.id}><button onClick={() => dispatch({ type: 'toggle', id: todo.id })}>Toggle todo {todo.id}</button><button onClick={() => dispatch({ type: 'remove', id: todo.id })}>Remove todo {todo.id}</button></div>)}<Result value={todos}/></>;
}
