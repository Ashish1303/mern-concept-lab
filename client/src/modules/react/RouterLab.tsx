import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { MemoryRouter } from 'react-router';

// A separate root keeps the exercise history independent of the lesson's router.
export function RouterLab({ children, entries = ['/'] }: { children: ReactNode; entries?: string[] }) {
  const host = useRef<HTMLDivElement>(null);
  const root = useRef<Root | null>(null);
  useEffect(() => {
    const element = host.current!;
    const mount = document.createElement('div');
    element.append(mount);
    const routerRoot = createRoot(mount);
    root.current = routerRoot;
    return () => {
      mount.remove();
      root.current = null;
      queueMicrotask(() => routerRoot.unmount());
    };
  }, []);
  useEffect(() => {
    root.current?.render(<MemoryRouter initialEntries={entries}>{children}</MemoryRouter>);
  }, [children, entries]);
  return <div ref={host} />;
}
