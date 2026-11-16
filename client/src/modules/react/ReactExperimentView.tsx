import { useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { LabContext, createTrace } from './lab-context';
import { LabBoundary, TracePanel } from './LabWidgets';
type Props = ({ component: ComponentType; children?: never } | { component?: never; children: ReactNode }) & { showTrace?: boolean };

export function ReactExperimentView({ component: Demo, children, showTrace = true }: Props) {
    const [services] = useState(() => ({ trace: createTrace(), request: (path: string, options?: RequestInit) => fetch(path, options) }));
    const [mounted, setMounted] = useState(true);
    const [generation, setGeneration] = useState(0);
    return <LabContext value={services}>
    <div className="button-row"><button className="secondary" onClick={() => setMounted(value => !value)}>{mounted ? 'Unmount example' : 'Mount example'}</button><button className="secondary" onClick={() => { services.trace.clear(); setGeneration(value => value + 1); setMounted(true); }}>Reset example</button></div>
    <div className="react-demo" data-testid="demo-surface">{mounted ? <LabBoundary key={generation}>{Demo ? <Demo /> : children}</LabBoundary> : <p>{showTrace ? "Example unmounted. Its cleanup is visible in the trace below." : "Example unmounted."}</p>}</div>
    {showTrace && <TracePanel />}
  </LabContext>;
}

