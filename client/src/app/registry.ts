import { catalog } from './catalog';
import type { Category, CategoryId, Difficulty, Group, PlannedExample, PlannedTopic } from './types';
import { phase2Catalog } from '../modules/phase2-catalog';
import { reactSummary } from '../modules/react/react-summary';

import { advancedSummary } from '../modules/react/advanced-summary';

import { reduxSummary } from '../modules/react/redux-summary';

import { nodeCatalog } from '../modules/node/node-catalog';

import { expressCatalog } from '../modules/express/express-catalog';

import { mongoCatalog } from '../modules/mongodb/mongo-catalog';

import { mernCatalog } from '../modules/mern/mern-catalog';

export const phase2Status = 'APPROVED_COMPLETE' as const;
export const phase3Status = 'APPROVED_COMPLETE' as const;

export const phase4Status = 'APPROVED_COMPLETE' as const;

export const phase5Status = 'APPROVED_COMPLETE' as const;

export const phase6Status = 'APPROVED_COMPLETE' as const;

export const phase7Status = 'APPROVED_COMPLETE' as const;

export const phase8Status = 'APPROVED_COMPLETE' as const;

export const phase9Status = 'APPROVED_COMPLETE' as const;

export function statusLabel(status: string): string {
  return status.toLowerCase().replaceAll('_', ' ').replace(/^./, value => value.toUpperCase());
}

export const categories: Category[] = [
  { id: 'javascript', title: 'JavaScript Fundamentals', short: 'JS' },
  { id: 'typescript', title: 'TypeScript Fundamentals', short: 'TS' },
  { id: 'react', title: 'React.js', short: 'RE' },
  { id: 'redux', title: 'Redux Toolkit', short: 'RX' },
  { id: 'node', title: 'Node.js', short: 'ND' },
  { id: 'express', title: 'Express.js', short: 'EX' },
  { id: 'mongodb', title: 'MongoDB + Mongoose', short: 'DB' },
  { id: 'mern', title: 'End-to-End MERN', short: 'ME' }
];

// Titles identify the owning concept; IDs are resolved from the original catalog.
const owners: Record<string, string[]> = {
  redux: ['Redux data flow', 'createSlice', 'createSelector', 'createSlice', 'createAsyncThunk', 'Pending/fulfilled/rejected', 'createApi', 'Cache invalidation', 'Undo and rollback', 'Redux vs Context API'],
  express: ['Express setup', 'Express Router', 'Request parameters', 'Query parameters', 'Input validation', 'Custom middleware', 'Authentication middleware', 'Authorization', 'Centralized error handling', 'REST API architecture', 'Pagination', 'Rate limiting', 'API testing'],
  mongodb: ['insertOne', 'find', 'updateOne', 'deleteOne', 'Query operators', 'Sorting', 'Pagination', 'Field validation', 'Unique indexes', 'References', 'populate()', 'Aggregation pipeline', '$lookup', 'explain()', 'Transactions']
};

const groupId = (category: CategoryId, group: string) => `${category}-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
const difficulty = (group: string): Difficulty => /Advanced|Asynchronous|RTK Query|Core Modules/.test(group) ? 'advanced' : /Fundamentals|Variables/.test(group) ? 'basic' : 'intermediate';
export const groups: Group[] = [];
export const topics: PlannedTopic[] = [];
export const examples: PlannedExample[] = [];
const requiredOffsets: Record<string, number> = {};

for (const [id, categoryId, originalGroup, title, phase, kind, plannedCount] of catalog) {
  const isScenario = categoryId === 'mern';
  if (kind !== 'concept' && !isScenario) continue;
  const group = isScenario ? 'Full-stack Scenarios' : originalGroup;
  const gid = groupId(categoryId, group);
  if (!groups.some((entry) => entry.id === gid)) groups.push({ id: gid, categoryId, title: group });
  const plannedIds = Array.from({ length: plannedCount }, (_, index) => `${id}.e${String(index + 1).padStart(2, '0')}`);
  topics.push({
    id, categoryId, groupId: gid, title, phase,
    description: null,
    aliases: title.startsWith('use') ? [title.replace(/^use/, 'use ')] : [],
    difficulty: isScenario ? 'senior' : difficulty(group),
    exampleIds: plannedIds, requirementIds: [id], interviewQuestionIds: [], status: 'NOT_STARTED'
  });
  examples.push(...plannedIds.map((exampleId) => ({ id: exampleId, topicId: id, title: null, requirementIds: [id], status: 'NOT_STARTED' as const })));
}

for (const [id, category, group, title, , kind] of catalog) {
  if (kind !== 'required-example' || category === 'mern') continue;
  let ownerTitle: string | undefined;
  if (group === 'Mandatory useEffect Examples') ownerTitle = 'useEffect';
  else if (group === 'Mandatory useState Examples') ownerTitle = 'useState';
  else {
    const offset = requiredOffsets[category] ?? 0;
    ownerTitle = owners[category]?.[offset];
    requiredOffsets[category] = offset + 1;
  }
  const owner = topics.find((topic) => topic.categoryId === category && topic.title === ownerTitle);
  if (!owner) throw new Error(`Requirement ${id} has no owning topic.`);
  owner.requirementIds.push(id);
  const exampleId = `${id}.e01`;
  owner.exampleIds.push(exampleId);
  examples.push({ id: exampleId, topicId: owner.id, title, requirementIds: [id], status: 'NOT_STARTED' });
}

for (const summary of phase2Catalog) {
  const topic = topics.find(entry => entry.id === summary.id);
  if (!topic) throw new Error(`Unknown implemented topic ${summary.id}.`);
  topic.status = phase2Status;
  topic.description = summary.description;
  topic.interviewQuestionIds = Array.from({ length: 6 }, (_, index) => `${topic.id}.q${String(index + 1).padStart(2, '0')}`);
  for (const item of summary.examples) {
    const example = examples.find(entry => entry.id === item.id && entry.topicId === topic.id);
    if (!example) throw new Error(`Untracked example ${item.id}.`);
    example.title = item.title;
    example.status = phase2Status;
  }
}

for (const lesson of [...reactSummary, ...advancedSummary, ...reduxSummary]) {
  const topic = topics.find(entry => entry.id === lesson.id);
  if (!topic) throw new Error(`Unknown React topic ${lesson.id}.`);
  const status = topic.phase === 3 ? phase3Status : topic.phase === 4 ? phase4Status : phase5Status;
  topic.status = status;
  topic.description = lesson.description;
  topic.interviewQuestionIds = lesson.questions.map(question => question.id);
  for (const item of lesson.examples) for (const id of [item.id, ...item.aliases]) {
    const example = examples.find(entry => entry.id === id && entry.topicId === topic.id);
    if (!example) throw new Error(`Untracked React example ${id}.`);
    example.title = item.title;
    example.status = status;
  }
}

for (const lesson of [...nodeCatalog, ...expressCatalog, ...mongoCatalog, ...mernCatalog]) {
  const topic = topics.find(entry => entry.id === lesson.id);
  if (!topic) throw new Error('Unknown backend topic ' + lesson.id);
  const status = topic.phase === 6 ? phase6Status : topic.phase === 7 ? phase7Status : topic.phase === 8 ? phase8Status : phase9Status;
  topic.status = status;
  topic.description = lesson.description;
  topic.interviewQuestionIds = Array.from({ length: 6 }, (_, index) => lesson.id + '.q0' + (index + 1));
  for (const item of lesson.examples) {
    const example = examples.find(entry => entry.id === item.id && entry.topicId === lesson.id);
    if (!example) throw new Error('Untracked backend demo ' + item.id);
    example.title = item.title;
    example.status = status;
  }
}

export function findTopic(category: string | undefined, id: string | undefined) {
  return topics.find((topic) => topic.categoryId === category && topic.id === id);
}

export function topicPath(topic: PlannedTopic) {
  return `/learn/${topic.categoryId}/${topic.id}`;
}

export function matchesTopic(topic: PlannedTopic, query: string) {
  const category = categories.find((entry) => entry.id === topic.categoryId);
  const group = groups.find((entry) => entry.id === topic.groupId);
  return [topic.title, category?.title, group?.title, ...topic.aliases]
    .join(' ').toLowerCase().includes(query.trim().toLowerCase());
}
