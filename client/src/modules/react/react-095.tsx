import { useRef, useState } from 'react';
import { Result } from './LabWidgets';

const count = 10_000;
const rowHeight = 32;
const visibleRows = 5;
function WindowedList({ overscan }: { overscan: number }) {
  const [top, setTop] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  function jump(index: number) {
    const offset = Math.max(0, Math.min(index, count - visibleRows)) * rowHeight;
    if (viewport.current) viewport.current.scrollTop = offset;
    setTop(offset);
  }
  const first = Math.floor(top / rowHeight);
  const start = Math.max(0, first - overscan);
  const end = Math.min(count, Math.ceil(top / rowHeight) + visibleRows + overscan);
  return <><button onClick={() => jump(4999)}>Jump to row 5000</button> <button onClick={() => jump(count - visibleRows)}>Jump to end</button>
    <div ref={viewport} tabIndex={0} aria-label="Virtual list viewport" onScroll={event => setTop(event.currentTarget.scrollTop)}
      style={{ height: visibleRows * rowHeight, overflowY: 'auto', border: '1px solid currentColor', boxSizing: 'content-box' }}>
      <div role="list" style={{ position: 'relative', height: count * rowHeight }}>
        {Array.from({ length: end - start }, (_, offset) => {
          const index = start + offset;
          return <div role="listitem" aria-posinset={index + 1} aria-setsize={count} key={index}
            style={{ position: 'absolute', top: index * rowHeight, height: rowHeight, lineHeight: rowHeight + 'px', left: 8 }}>Row {index + 1}</div>;
        })}
      </div>
    </div><Result value={{ firstVisible: first + 1, mounted: end - start, total: count }} />
  </>;
}
export function Example01() { return <WindowedList overscan={0} />; }
export function Example02() { return <WindowedList overscan={2} />; }
