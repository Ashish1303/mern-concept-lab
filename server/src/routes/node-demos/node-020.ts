

export const examples = [
  (input: string) => {
    const url = new URL(input, 'https://example.test');
    return { protocol: url.protocol, path: url.pathname, query: url.searchParams.get('q') };
  },
  (input: string) => {
    const params = new URLSearchParams();
    params.append('tag', input);
    params.append('tag', 'backend');
    return { encoded: params.toString(), tags: params.getAll('tag') };
  }
];
