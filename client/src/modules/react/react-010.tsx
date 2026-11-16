import { useState } from 'react';
import { Result } from './LabWidgets';
export function Example01() {
    const [name, setName] = useState('Ada');
    return <><label>Controlled name<input value={name} onChange={event => setName(event.target.value)} maxLength={40}/></label><Result value={{ name }}/></>;
}
export function Example02() {
    const [notifications, setNotifications] = useState(false);
    const [theme, setTheme] = useState('light');
    return <><label><input type="checkbox" checked={notifications} onChange={event => setNotifications(event.target.checked)}/>Notifications</label><label>Theme<select value={theme} onChange={event => setTheme(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label><Result value={{ notifications, theme }}/></>;
}
