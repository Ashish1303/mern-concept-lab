import { Link, Outlet, Route, Routes, useParams } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

function Order() {
  const { orderId } = useParams<'orderId'>();
  return <Result value={orderId && /^[1-9][0-9]*$/.test(orderId) ? 'Order ' + orderId : 'Invalid order ID'} />;
}
export function Example01() {
  return <RouterLab entries={['/orders/7']}><Link to="/orders/42">Open order 42</Link> <Link to="/orders/nope">Open invalid order</Link>
    <Routes><Route path="/orders/:orderId" element={<Order />} /></Routes>
  </RouterLab>;
}
function Issue() {
  const { project, issue } = useParams<'project' | 'issue'>();
  return <Result value={project + ' / ' + issue} />;
}
export function Example02() {
  return <RouterLab entries={['/projects/orbit/issues/1']}><Link to="/projects/orbit/issues/2">Open issue 2</Link>
    <Routes><Route path="/projects/:project" element={<Outlet />}><Route path="issues/:issue" element={<Issue />} /></Route></Routes>
  </RouterLab>;
}
