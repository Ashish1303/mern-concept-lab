import { useNavigate, useSearchParams } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

function Sort() {
  const [params, setParams] = useSearchParams();
  const sort = params.get('sort') ?? 'name';
  return <><label>Sort order <select value={sort} onChange={event => {
    const next = new URLSearchParams(params);
    next.set('sort', event.target.value);
    setParams(next);
  }}><option value="name">Name</option><option value="price">Price</option></select></label>
    <Result value={params.toString()} />
  </>;
}
export function Example01() { return <RouterLab entries={['/?page=2&sort=name']}><Sort /></RouterLab>; }

function Tags() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const tags = params.getAll('tag');
  return <><button onClick={() => setParams({ tag: ['react', 'router'] })}>Add router tag</button>
    <button onClick={() => void navigate(-1)}>Undo navigation</button><Result value={tags} />
  </>;
}
export function Example02() { return <RouterLab entries={['/?tag=react']}><Tags /></RouterLab>; }
