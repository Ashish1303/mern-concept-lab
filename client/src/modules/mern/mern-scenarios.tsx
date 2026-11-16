import { MernWorkspace } from './MernWorkspace';

export function Example01() {
  const initial = "MERN form entry";
  return <MernWorkspace mode="form" initial={initial} />;
}

export function Example02() {
  const initial = "Read-back fixture";
  return <MernWorkspace mode="persist" initial={initial} />;
}

export function Example03() {
  const initial = "CRUD sample item";
  return <MernWorkspace mode="crud" initial={initial} />;
}

export function Example04() {
  const initial = "reader-lab";
  return <MernWorkspace mode="register" initial={initial} />;
}

export function Example05() {
  const initial = "reader-lab";
  return <MernWorkspace mode="login" initial={initial} />;
}

export function Example06() {
  const initial = "hash-lab";
  return <MernWorkspace mode="hash" initial={initial} />;
}

export function Example07() {
  const initial = "jwt-reader";
  return <MernWorkspace mode="jwt" initial={initial} />;
}

export function Example08() {
  const initial = "refresh-reader";
  return <MernWorkspace mode="refresh" initial={initial} />;
}

export function Example09() {
  const initial = "route-reader";
  return <MernWorkspace mode="protected" initial={initial} />;
}

export function Example10() {
  const initial = "role-reader";
  return <MernWorkspace mode="roles" initial={initial} />;
}

export function Example11() {
  const initial = "A cached item";
  return <MernWorkspace mode="query" initial={initial} />;
}

export function Example12() {
  const initial = "Mongo";
  return <MernWorkspace mode="search" initial={initial} />;
}

export function Example13() {
  const initial = "asc";
  return <MernWorkspace mode="sort" initial={initial} />;
}

export function Example14() {
  const initial = "1";
  return <MernWorkspace mode="page" initial={initial} />;
}

export function Example15() {
  const initial = "x";
  return <MernWorkspace mode="validation" initial={initial} />;
}

export function Example16() {
  const initial = "MERN upload sample";
  return <MernWorkspace mode="upload" initial={initial} />;
}

export function Example17() {
  const initial = "A proposed title";
  return <MernWorkspace mode="optimistic" initial={initial} />;
}

export function Example18() {
  const initial = "";
  return <MernWorkspace mode="error" initial={initial} />;
}

export function Example19() {
  const initial = "";
  return <MernWorkspace mode="loading" initial={initial} />;
}

export function Example20() {
  const initial = "API assertion entry";
  return <MernWorkspace mode="api-test" initial={initial} />;
}

export function Example21() {
  const initial = "React integration item";
  return <MernWorkspace mode="react-test" initial={initial} />;
}

export function Example22() {
  const initial = "";
  return <MernWorkspace mode="environment" initial={initial} />;
}

export function Example23() {
  const initial = "";
  return <MernWorkspace mode="production" initial={initial} />;
}
