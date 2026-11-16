import { UsersLab } from './redux-thunks';

export function Example01() {
  return <UsersLab mode="load" />;
}

export function Example02() {
  return <UsersLab mode="failure" />;
}

export function Example03() {
  return <UsersLab mode="unwrap" />;
}
