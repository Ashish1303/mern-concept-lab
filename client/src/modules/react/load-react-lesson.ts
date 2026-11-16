import type { ReactDemoModule } from './react-types';
import helpersSource from '../helpers.ts?raw';
import labRouteSource from '../../../../server/src/routes/lab.ts?raw';
import reduxRouteSource from '../../../../server/src/routes/redux-lab.ts?raw';
const modules = import.meta.glob<ReactDemoModule>('./{react,redux}-[0-9][0-9][0-9].tsx');
const sources = import.meta.glob<string>(['./*.tsx', './*.ts', '!./react-catalog.ts', '!./advanced-catalog.ts', '!./advanced-summary.ts', '!./redux-catalog.ts', '!./redux-summary.ts', '!./react-types.ts', '!./load-react-lesson.ts', '!./*.test.*'], { query: '?raw', import: 'default' });
export async function loadReactLesson(id: string) {
    const catalog = id.startsWith('redux-')
        ? (await import('./redux-catalog')).reduxCatalog
        : Number(id.slice(6)) >= 74
            ? (await import('./advanced-catalog')).advancedCatalog
            : (await import('./react-catalog')).reactCatalog;
    const lesson = catalog.find(item => item.id === id);
    const module = modules[`./${id}.tsx`];
    const source = sources[`./${id}.tsx`];
    if (!lesson || !module || !source)
        throw new Error('Unknown React lesson.');
    const [demos, content] = await Promise.all([module(), source()]);
    const files = [{ name: `${id}.tsx`, content }];
    const seen = new Set([`./${id}.tsx`]);
    async function dependencies(text: string) {
        for (const match of text.matchAll(/(?:from\s+|import\(\s*)['"](\.\/[^'"]+)['"]/g)) {
            const path = [match[1] + '.tsx', match[1] + '.ts'].find(path => sources[path]);
            if (!path || seen.has(path))
                continue;
            seen.add(path);
            const content = await sources[path]!();
            files.push({ name: path.slice(2), content });
            await dependencies(content);
        }
    }
    await dependencies(content);
    // Network helper is an actual imported implementation outside this directory.
    if (files.some(file => file.content.includes("'../helpers'"))) {
            files.push({ name: '../helpers.ts', content: helpersSource });
    }
    if (/useLabQuery|useOwnedRequests|itemsResponse|EffectRace/.test(content)) files.push({ name: 'server/routes/lab.ts', content: labRouteSource });
    if (id.startsWith('redux-') && /UsersLab|ApiLab/.test(content)) files.push({ name: 'server/routes/redux-lab.ts', content: reduxRouteSource });
    return { lesson, demos, sources: files };
}
