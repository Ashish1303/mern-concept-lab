import { ActionLab } from './redux-local';
import { inventory, selectProducts, selectValue } from './redux-store';

export function Example01() {
  return <ActionLab label="Read selector" run={() => selectValue({ counter: { value: 7, note: '' } })} />;
}

export function Example02() {
  const selectTotal = (items: typeof inventory) => items.reduce((total, item) => total + item.price, 0);
  return <ActionLab label="Compute total" run={() => selectTotal([...selectProducts({ category: '' })])} />;
}
