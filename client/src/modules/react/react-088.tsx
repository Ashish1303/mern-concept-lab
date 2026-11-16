import { createContext, useContext, useState } from 'react';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

const Session = createContext<{ role: string; signIn: () => void }>({ role: 'guest', signIn: () => {} });
function RequireMember() {
  const { role } = useContext(Session);
  const location = useLocation();
  return role === 'guest' ? <Navigate to="/login" replace state={{ from: location.pathname }} /> : <Outlet />;
}
function Login() {
  const { role, signIn } = useContext(Session);
  const { state } = useLocation();
  const target = state?.from === '/account' ? '/account' : '/';
  return role === 'guest' ? <><Result value="Sign-in required" /><button onClick={signIn}>Simulate sign-in</button></> : <Navigate to={target} replace />;
}
function MemberRoutes() {
  const [role, setRole] = useState('guest');
  return <Session value={{ role, signIn: () => setRole('member') }}><Link to="/account">Open account</Link>
    <Routes><Route path="/" element={<Result value="Public home" />} /><Route path="/login" element={<Login />} />
      <Route element={<RequireMember />}><Route path="/account" element={<Result value="Account page" />} /></Route>
    </Routes>
  </Session>;
}
export function Example01() { return <RouterLab><MemberRoutes /></RouterLab>; }

function AdminGate() {
  const [role, setRole] = useState('member');
  return <><button onClick={() => setRole(role === 'member' ? 'admin' : 'member')}>Toggle demo role</button>
    <Routes><Route path="/admin" element={<Result value={role === 'admin' ? 'Admin tools' : 'Forbidden for member'} />} /></Routes>
  </>;
}
export function Example02() { return <RouterLab entries={['/admin']}><AdminGate /></RouterLab>; }
