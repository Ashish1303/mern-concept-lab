import { useState } from 'react';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';

type Settings = { name: string; rename: () => void };
function Profile({ name, rename }: Settings) {
  return <><button onClick={rename}>Rename profile</button><Result value={name} /></>;
}
function Header(props: Settings) { return <header><Profile {...props} /></header>; }
function Layout(props: Settings) { return <section><Header {...props} /></section>; }
export function Example01() {
  const [name, setName] = useState('Ada');
  return <Layout name={name} rename={() => setName('Grace')} />;
}
function Shell({ profile }: { profile: ReactNode }) { return <section><header>{profile}</header></section>; }
export function Example02() {
  const [name, setName] = useState('Ada');
  return <Shell profile={<Profile name={name} rename={() => setName('Linus')} />} />;
}
