import { Link } from 'react-router';

export function RecoveryPage({ message = 'This page does not exist.' }: { message?: string }) {
  return <section className="recovery panel-section"><span className="eyebrow">PAGE NOT FOUND</span><h1>Let’s get you back to the lab.</h1><p>{message}</p><Link className="button primary" to="/foundation">Open the foundation checks</Link></section>;
}
