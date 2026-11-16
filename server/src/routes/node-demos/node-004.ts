import { getCallSites } from 'node:util';

export const examples = [
  () => {
    function inner() { return getCallSites(5).map(site => site.functionName).filter(Boolean); }
    function outer() { return inner(); }
    return outer();
  },
  (input: string) => {
    const count = Math.max(0, Math.min(8, Number.parseInt(input, 10) || 0));
    const events: string[] = [];
    function visit(level: number) {
      events.push('enter ' + level);
      if (level) visit(level - 1);
      events.push('leave ' + level);
    }
    visit(count);
    return events;
  }
];
