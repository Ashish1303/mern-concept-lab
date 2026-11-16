export function OutputViewer({ children, error = false }: { children: React.ReactNode; error?: boolean }) {
  return <div className={`actual-output${error ? ' output-error' : ''}`}>
    <h4>Actual output</h4>
    <div role="status" aria-live="polite" aria-atomic="true">{children}</div>
  </div>;
}
