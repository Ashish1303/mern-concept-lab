import { lazy, Suspense, useState } from 'react';
import { Result } from './LabWidgets';

const Report = lazy(() => import('./advanced-panel'));
const Details = lazy(() => import('./advanced-panel').then(module => ({ default: module.Details })));

export function Example01() {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(!open)}>Toggle report</button>
    <Suspense fallback={<Result value="Loading report" />}>{open && <Report />}</Suspense>
  </>;
}
export function Example02() {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(!open)}>Toggle details</button>
    <Suspense fallback={<Result value="Loading details" />}>{open && <Details />}</Suspense>
  </>;
}
