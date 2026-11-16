import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

function SaveForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  return <><form onSubmit={event => {
    event.preventDefault();
    if (name.trim()) void navigate('/saved', { state: { name: name.trim() } });
  }}><label>Draft name <input value={name} onChange={event => setName(event.target.value)} /></label><button>Save draft</button></form>
    <Result value={location.state ? 'Saved ' + location.state.name : 'Editing draft'} />
  </>;
}
export function Example01() { return <RouterLab><SaveForm /></RouterLab>; }
function History() {
  const navigate = useNavigate();
  return <><button onClick={() => void navigate('/replacement', { replace: true })}>Replace current entry</button>
    <button onClick={() => void navigate(-1)}>Go back</button><Result value={useLocation().pathname} />
  </>;
}
export function Example02() { return <RouterLab entries={['/start', '/draft']}><History /></RouterLab>; }
