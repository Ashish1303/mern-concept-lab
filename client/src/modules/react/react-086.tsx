import { Link, Route, Routes, useParams } from 'react-router';
import { Result } from './LabWidgets';
import { RouterLab } from './RouterLab';

const products: Record<string, string> = { pen: 'Ink pen', pad: 'Notebook' };
function Product() {
  const { sku } = useParams();
  return <Result value={sku && Object.hasOwn(products, sku) ? products[sku] : 'Product not found'} />;
}
export function Example01() {
  return <RouterLab entries={['/products/pen']}><Link to="/products/pad">Open notebook</Link> <Link to="/products/missing">Open missing product</Link>
    <Routes><Route path="/products/:sku" element={<Product />} /></Routes>
  </RouterLab>;
}
export function Example02() {
  return <RouterLab entries={['/products/pen']}><Link to="/products/new">Create product</Link>
    <Routes><Route path="/products/:sku" element={<Product />} /><Route path="/products/new" element={<Result value="Create product form" />} /></Routes>
  </RouterLab>;
}
