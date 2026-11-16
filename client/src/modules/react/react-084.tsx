import { lazy, Suspense, useState } from 'react';
import { Result } from './LabWidgets';

const Report = lazy(() => import('./advanced-panel'));
export function Example01() {
  const [route, setRoute] = useState<'home' | 'reports'>('home');
  return <><button onClick={() => setRoute('home')}>Show home</button><button onClick={() => setRoute('reports')}>Show reports</button>
    <Suspense fallback={<Result value="Loading report chunk" />}>{route === 'reports' ? <Report /> : <Result value="Home is ready" />}</Suspense>
  </>;
}

export function Example02() {
  const [result, setResult] = useState<string | number>('Calculator idle');
  async function calculate() {
    setResult('Loading calculator');
    try {
      const { totalWithTax } = await import('./advanced-calculation');
      setResult(totalWithTax([20, 15, 5], 0.1));
    } catch {
      setResult('Calculator could not be loaded');
    }
  }
  return <><button onClick={() => void calculate()}>Calculate invoice</button><Result value={result} /></>;
}
