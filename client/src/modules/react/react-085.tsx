import { Link, NavLink, Route, Routes } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

export function Example01() {
  return <RouterLab><nav><Link to="/">Home</Link> <Link to="/about">About</Link></nav>
    <Routes><Route path="/" element={<Result value="Home page" />} /><Route path="/about" element={<Result value="About page" />} /></Routes>
  </RouterLab>;
}
export function Example02() {
  return <RouterLab><nav><NavLink to="/" end>Overview</NavLink> <NavLink to="/unknown">Unknown page</NavLink></nav>
    <Routes><Route path="/" element={<Result value="Overview page" />} /><Route path="*" element={<Result value="Page not found" />} /></Routes>
  </RouterLab>;
}
