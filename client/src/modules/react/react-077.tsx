import { createContext, useContext, useState } from 'react';
import { Result } from './LabWidgets';

const Theme = createContext('System');
function ThemeLabel() { return <Result value={useContext(Theme)} />; }
function Layout() { return <section><ThemeLabel /></section>; }
export function Example01() {
  const [dark, setDark] = useState(false);
  return <Theme value={dark ? 'Dark' : 'Light'}><button onClick={() => setDark(!dark)}>Toggle theme</button><Layout /></Theme>;
}
export function Example02() {
  const [preview, setPreview] = useState(false);
  return <><button onClick={() => setPreview(!preview)}>Toggle preview scope</button>
    <Theme value="Outer">{preview ? <Theme value="Preview"><ThemeLabel /></Theme> : <ThemeLabel />}</Theme>
  </>;
}
