import { Link, Outlet, Route, Routes, useOutletContext } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

function Dashboard() {
  return <section><h3>Dashboard layout</h3><Link to="settings">Settings tab</Link><Outlet /></section>;
}
export function Example01() {
  return <RouterLab entries={['/dashboard']}><Routes><Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<Result value="Dashboard overview" />} /><Route path="settings" element={<Result value="Dashboard settings" />} />
  </Route></Routes></RouterLab>;
}
function Team() {
  return <section><Link to="members">Show members</Link><Outlet context="Team Orbit" /></section>;
}
function Members() { return <Result value={useOutletContext<string>()} />; }
export function Example02() {
  return <RouterLab entries={['/team']}><Routes><Route path="/team" element={<Team />}>
    <Route index element={<Result value="Team overview" />} /><Route path="members" element={<Members />} />
  </Route></Routes></RouterLab>;
}
