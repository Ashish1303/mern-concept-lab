

export const examples = [
  (input: string) => {
    const cache = new Map<string, number>();
    let computations = 0;
    function get(key: string) {
      if (!cache.has(key)) { computations++; cache.set(key, Buffer.byteLength(key)); }
      return cache.get(key);
    }
    return { first: get(input), second: get(input), computations };
  },
  () => {
    const cache = new Map([['item', { value: 'stored', expiresAt: 10 }]]);
    function get(now: number) {
      const entry = cache.get('item');
      if (entry && now >= entry.expiresAt) { cache.delete('item'); return 'miss'; }
      return entry?.value ?? 'miss';
    }
    return { before: get(9), atExpiry: get(10), size: cache.size };
  }
];
