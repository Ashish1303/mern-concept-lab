export function factorial(value: number): bigint {
  let result = 1n;
  for (let current = 2; current <= value; current++) result *= BigInt(current);
  return result;
}

export function fibonacci(value: number): number {
  let a = 0; let b = 1;
  for (let index = 0; index < value; index++) [a, b] = [b, a + b];
  return a;
}

export function isPrime(value: number): boolean {
  if (value < 2) return false;
  for (let divisor = 2; divisor * divisor <= value; divisor++) if (value % divisor === 0) return false;
  return true;
}

export function twoSum(values: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();
  for (let index = 0; index < values.length; index++) {
    const value = values[index]!;
    const earlier = seen.get(target - value);
    if (earlier !== undefined) return [earlier, index];
    seen.set(value, index);
  }
  return null;
}

export function normalizeWords(value: string): string {
  return value.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

export function anagram(a: string, b: string): boolean {
  const counts = new Map<string, number>();
  for (const character of normalizeWords(a)) counts.set(character, (counts.get(character) ?? 0) + 1);
  for (const character of normalizeWords(b)) {
    const count = counts.get(character) ?? 0;
    if (!count) return false;
    counts.set(character, count - 1);
  }
  return [...counts.values()].every(count => count === 0);
}

export type NumberTree = number | NumberTree[];
export function parseTree(input: string): NumberTree[] {
  if (input.length > 500) throw new Error('Nested input is limited to 500 characters.');
  const value: unknown = JSON.parse(input);
  let nodes = 0;
  function valid(item: unknown, depth: number): item is NumberTree {
    if (++nodes > 100 || depth > 5) return false;
    return typeof item === 'number' ? Number.isFinite(item) : Array.isArray(item) && item.every((child: unknown) => valid(child, depth + 1));
  }
  if (!Array.isArray(value) || !valid(value, 0)) throw new Error('Use a numeric array with at most five nested levels and 100 nodes.');
  return value;
}

export function flatten(values: NumberTree[]): number[] {
  const output: number[] = [];
  function visit(items: NumberTree[]) {
    for (const item of items) { if (Array.isArray(item)) visit(item); else output.push(item); }
  }
  visit(values);
  return output;
}

export function missingNumber(values: number[]): number {
  if (new Set(values).size !== values.length || values.some(value => !Number.isInteger(value) || value < 0 || value > values.length)) throw new Error('Use distinct integers from 0 through n with exactly one missing.');
  return values.length * (values.length + 1) / 2 - values.reduce((sum, value) => sum + value, 0);
}

export function secondLargest(values: number[]): number | null {
  let first = -Infinity; let second = -Infinity;
  for (const value of values) {
    if (value > first) { second = first; first = value; }
    else if (value < first && value > second) second = value;
  }
  return second === -Infinity ? null : second;
}

// Deliberately a plain-data clone, not a universal JS object clone.
export function clonePlain<T>(input: T): T {
  const seen = new WeakMap<object, object>();
  function copy(value: unknown): unknown {
    if (value === null || typeof value !== 'object') {
      if (typeof value === 'function' || typeof value === 'symbol') throw new TypeError('Only plain data is supported.');
      return value;
    }
    const prototype: unknown = Object.getPrototypeOf(value);
    if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) throw new TypeError('Only plain objects and arrays are supported.');
    const known = seen.get(value); if (known) return known;
    const output: object = Array.isArray(value) ? new Array<unknown>(value.length) : Object.create(prototype === null ? null : Object.prototype) as object;
    seen.set(value, output);
    for (const key of Object.keys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
      if (!('value' in descriptor)) throw new TypeError('Accessors are outside this plain-data contract.');
      Object.defineProperty(output, key, { value: copy(descriptor.value as unknown), enumerable: true, configurable: true, writable: true });
    }
    return output;
  }
  return copy(input) as T;
}

export function mapNumbers(values: number[], callback: (value: number, index: number) => number): number[] {
  const length = values.length; const output = new Array<number>(length);
  for (let index = 0; index < length; index++) if (index in values) output[index] = callback(values[index]!, index);
  return output;
}
export function filterNumbers(values: number[], predicate: (value: number, index: number) => boolean): number[] {
  const length = values.length; const output: number[] = [];
  for (let index = 0; index < length; index++) if (index in values && predicate(values[index]!, index)) output.push(values[index]!);
  return output;
}
export function reduceNumbers(values: number[], callback: (sum: number, value: number, index: number) => number, initial: number): number {
  const length = values.length; let result = initial;
  for (let index = 0; index < length; index++) if (index in values) result = callback(result, values[index]!, index);
  return result;
}
