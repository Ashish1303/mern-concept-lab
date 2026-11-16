import { useState } from 'react';
import { Result } from './LabWidgets';
function ReadOnlyChild({ name }: {
    name: string;
}) { return <Result value={{ childName: name }}/>; }
function QuantityChild({ quantity, onIncrease }: {
    quantity: number;
    onIncrease: () => void;
}) { return <button onClick={onIncrease}>Request another item ({quantity})</button>; }
export function Example01() {
    const [name, setName] = useState('Ada');
    return <><label>Parent name<input value={name} onChange={event => setName(event.target.value)} maxLength={30}/></label><ReadOnlyChild name={name}/></>;
}
export function Example02() {
    const [quantity, setQuantity] = useState(1);
    return <><QuantityChild quantity={quantity} onIncrease={() => setQuantity(value => value + 1)}/><Result value={{ quantity, subtotal: quantity * 5 }}/></>;
}
