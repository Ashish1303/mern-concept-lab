import type { Lesson } from './lesson-types';
import runtimeSource from './runtime.ts?raw';
import helpersSource from './helpers.ts?raw';
import algorithmsSource from './algorithms.ts?raw';
import labRouteSource from '../../../server/src/routes/lab.ts?raw';
import compilerSource from '../../../scripts/check-type-examples.ts?raw';
import fixtureConfig from '../../tsconfig.fixtures.json?raw';
import baseConfig from '../../../tsconfig.base.json?raw';

const modules = import.meta.glob<{ lesson: Lesson }>('./{javascript,typescript}/*-*.ts');
const sources = import.meta.glob<string>('./{javascript,typescript}/*-*.ts', { query: '?raw', import: 'default' });
const fixtures = import.meta.glob<string>('./typescript/fixtures/*.{ts,tsx}', { query: '?raw', import: 'default' });

export interface LoadedLesson {
  lesson: Lesson;
  sources: { name: string; content: string }[];
  fixtures: Record<string, string>;
}

export async function loadLesson(id: string): Promise<LoadedLesson> {
  const category = id.split('-')[0];
  const key = `./${category}/${id}.ts`;
  const load = modules[key]; const source = sources[key];
  if (!load || !source) throw new Error('This lesson is not registered.');
  const [module, content] = await Promise.all([load(), source()]);
  const files = [{ name: `modules/${category}/${id}.ts`, content }];
  if (module.lesson.examples.some(example => example.runtime === 'browser')) files.push({ name: 'modules/runtime.ts', content: runtimeSource });
  if (content.includes("from '../helpers'")) files.push({ name: 'modules/helpers.ts', content: helpersSource });
  if (content.includes("from '../algorithms'")) files.push({ name: 'modules/algorithms.ts', content: algorithmsSource });
  if (module.lesson.examples.some(example => example.runtime === 'browser' && example.network)) files.push({ name: 'server/routes/lab.ts', content: labRouteSource });
  const fixtureSources: Record<string, string> = {};
  for (const example of module.lesson.examples) {
    if (example.runtime !== 'typecheck') continue;
    const loadFixture = fixtures[`./${example.fixture}`];
    if (!loadFixture) throw new Error('The registered type fixture is missing.');
    fixtureSources[example.fixture] = await loadFixture();
  }
  if (Object.keys(fixtureSources).length) {
    files.push({ name: 'tsconfig.fixtures.json', content: fixtureConfig }, { name: 'tsconfig.base.json', content: baseConfig }, { name: 'scripts/check-type-examples.ts', content: compilerSource });
  }
  return { lesson: module.lesson, sources: files, fixtures: fixtureSources };
}
