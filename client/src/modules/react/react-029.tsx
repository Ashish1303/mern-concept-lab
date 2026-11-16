import { useState, useContext, createContext } from 'react';
import { Result } from './LabWidgets';
const ThemeContext = createContext('default');
function ThemeReader({ label }: {
    label: string;
}) { const theme = useContext(ThemeContext); return <Result label={`${label} context`} value={{ label, theme }}/>; }
export function Example01() {
    const [theme, setTheme] = useState('light');
    return <><button onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')}>Toggle context theme</button><ThemeContext value={theme}><ThemeReader label="First"/><ThemeReader label="Second"/></ThemeContext></>;
}
export function Example02() {
    const [theme, setTheme] = useState('outer');
    return <><button onClick={() => setTheme('changed outer')}>Change outer context</button><ThemeReader label="Outside"/><ThemeContext value={theme}><ThemeReader label="Outer"/><ThemeContext value="inner"><ThemeReader label="Inner"/></ThemeContext></ThemeContext></>;
}
