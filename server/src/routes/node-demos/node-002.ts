import { getHeapStatistics, serialize, deserialize } from 'node:v8';

export const examples = [
  () => {
    const heap = getHeapStatistics();
    return { usedHeapBytes: heap.used_heap_size, heapLimitBytes: heap.heap_size_limit };
  },
  (input: string) => {
    const data = new Map([['name', input]]);
    const bytes = serialize(data);
    const result = deserialize(bytes) as Map<string, string>;
    return { isMap: result instanceof Map, name: result.get('name'), bytes: bytes.length };
  }
];
