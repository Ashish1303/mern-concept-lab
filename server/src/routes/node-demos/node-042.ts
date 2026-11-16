

export const examples = [
  async () => {
    let attempts = 0;
    async function operation() {
      if (++attempts === 1) throw new Error('Temporary failure');
      return 'Recovered';
    }
    try { return await operation(); }
    catch { return { result: await operation(), attempts }; }
  },
  () => {
    const events: string[] = [];
    try { events.push('resource acquired'); throw new Error('controlled error'); }
    catch (error) { events.push((error as Error).message); }
    finally { events.push('resource released'); }
    return events;
  }
];
