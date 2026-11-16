import { Component, useState } from 'react';
import type { ReactNode } from 'react';
import { Result } from './LabWidgets';

class PanelBoundary extends Component<{ children: ReactNode; retry?: () => void }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() {
    if (this.state.failed) return <><Result value="Panel recovered with fallback" />{this.props.retry && <button onClick={this.props.retry}>Retry panel</button>}</>;
    return this.props.children;
  }
}
function Panel({ broken }: { broken: boolean }) {
  if (broken) throw new Error('Intentional panel failure');
  return <Result value="Panel healthy" />;
}
export function Example01() {
  const [broken, setBroken] = useState(false);
  return <><button onClick={() => setBroken(true)}>Break panel</button><PanelBoundary><Panel broken={broken} /></PanelBoundary><p>Sibling panel stays mounted.</p></>;
}
export function Example02() {
  const [broken, setBroken] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <><button onClick={() => setBroken(true)}>Break panel</button>
    <PanelBoundary key={attempt} retry={() => { setBroken(false); setAttempt(value => value + 1); }}><Panel broken={broken} /></PanelBoundary>
  </>;
}
