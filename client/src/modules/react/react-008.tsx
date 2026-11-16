import { KeyedRows } from './fundamental-widgets';
export function Example01() {
    return <KeyedRows strategy="index"/>;
}
export function Example02() {
    return <KeyedRows strategy="id"/>;
}
