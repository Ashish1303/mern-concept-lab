import { useState } from 'react';
import { ApiLab, QueryOutput } from './redux-api-widgets';

function Pages({ workspace }: { workspace: string }) {
  const [page, setPage] = useState(1);
  return <><button disabled={page === 1} onClick={() => setPage(1)}>Previous page</button>
    <button disabled={page === 2} onClick={() => setPage(2)}>Next page</button>
    <p>Page {page}</p><QueryOutput workspace={workspace} page={page} />
  </>;
}

export function Example01() {
  return <ApiLab>{workspace => <Pages workspace={workspace} />}</ApiLab>;
}

export function Example02() {
  return <ApiLab>{workspace => <Pages workspace={workspace} />}</ApiLab>;
}
