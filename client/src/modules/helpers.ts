export function debounce<T>(callback: (value: T) => void, milliseconds: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => { clearTimeout(timer); timer = undefined; };
  return {
    call(value: T) { cancel(); timer = setTimeout(() => { timer = undefined; callback(value); }, milliseconds); },
    cancel
  };
}

export function throttle<T>(callback: (value: T) => void, milliseconds: number) {
  let blocked = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => { clearTimeout(timer); blocked = false; timer = undefined; };
  return {
    call(value: T) {
      if (blocked) return;
      blocked = true;
      timer = setTimeout(cancel, milliseconds);
      callback(value);
    },
    cancel
  };
}

export function promiseAll<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]> {
  return new Promise((resolve, reject) => {
    const results: Awaited<T>[] = [];
    let remaining = 1;
    let index = 0;
    for (const item of values) {
      const position = index++;
      remaining++;
      Promise.resolve(item).then((value) => {
        results[position] = value;
        if (--remaining === 0) resolve(results);
      }, reject);
    }
    if (--remaining === 0) resolve(results);
  });
}

export async function itemsResponse(request: (path: string, options?: RequestInit) => Promise<Response>, path = '/api/v1/lab/items') {
  const response = await request(path);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const body: unknown = await response.json();
  if (!body || typeof body !== 'object' || !('data' in body) || !Array.isArray(body.data)) throw new Error('Invalid lab data.');
  return body.data.map((item: unknown) => {
    if (!item || typeof item !== 'object' || !('name' in item) || typeof item.name !== 'string') throw new Error('Invalid lab item.');
    return item.name;
  });
}
