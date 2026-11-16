import { ApiLab, Profile } from './redux-api-widgets';

export function Example01() {
  return <ApiLab>{() => <Profile mode="request" />}</ApiLab>;
}

export function Example02() {
  return <ApiLab token="redux-lab-demo">{() => <Profile mode="request" />}</ApiLab>;
}

export function Example03() {
  return <ApiLab token="expired-demo">{() => <Profile mode="request" />}</ApiLab>;
}

export function Example04() {
  return <ApiLab>{() => <Profile mode="gated" />}</ApiLab>;
}

export function Example05() {
  return <ApiLab token="redux-lab-demo">{() => <Profile mode="logout" />}</ApiLab>;
}
