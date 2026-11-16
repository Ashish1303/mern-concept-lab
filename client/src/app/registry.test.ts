import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { catalog } from './catalog';
import { categories, examples, findTopic, groups, matchesTopic, phase2Status, phase3Status, phase4Status, phase5Status, phase6Status, phase7Status, phase8Status, phase9Status, topics } from './registry';

describe('syllabus integrity', () => {
  it('reconciles every requirement against both planning documents', () => {
    const checklist = readFileSync(resolve('../docs/TOPIC_CHECKLIST.md'), 'utf8');
    const specification = readFileSync(resolve('../docs/TOPIC_REGISTRY_SPEC.md'), 'utf8');
    const ids = [...checklist.matchAll(/^\| ((?:javascript|typescript|react|redux|node|express|mongodb|mern)-\d{3}) \| .*? \| \d+ \| \[[ x]\]/gm)].map((match) => match[1]);
    expect(ids).toHaveLength(494);
    expect(catalog.map((entry) => entry[0])).toEqual(ids);
    expect(new Set(catalog.map((entry) => entry[0])).size).toBe(494);
    for (const [id] of catalog) {
      expect(specification).toContain(`| ${id} |`);
      expect(topics.filter((topic) => topic.requirementIds.includes(id))).toHaveLength(1);
    }
    const reserved = [...checklist.matchAll(/\b(?:javascript|typescript|react|redux|node|express|mongodb|mern)-\d{3}\.e\d{2}\b/g)].map((match) => match[0]);
    expect(new Set(examples.map((example) => example.id))).toEqual(new Set(reserved));
  });

  it('has eight categories, valid parent links and no invented completion', () => {
    expect(categories).toHaveLength(8);
    expect(new Set(groups.map((group) => group.id)).size).toBe(groups.length);
    for (const topic of topics) {
      expect(groups.some((group) => group.id === topic.groupId && group.categoryId === topic.categoryId)).toBe(true);
      expect(topic.status).toBe(topic.phase === 2 ? phase2Status : topic.phase === 3 ? phase3Status : topic.phase === 4 ? phase4Status : topic.phase === 5 ? phase5Status : topic.phase === 6 ? phase6Status : topic.phase === 7 ? phase7Status : topic.phase === 8 ? phase8Status : topic.phase === 9 ? phase9Status : 'NOT_STARTED');
      if (topic.phase <= 9) {
        expect(topic.description).toBeTruthy(); expect(topic.interviewQuestionIds).toHaveLength(6);
      } else {
        expect(topic.description).toBeNull(); expect(topic.interviewQuestionIds).toEqual([]);
      }
    }
    for (const example of examples) {
      expect(topics.find((topic) => topic.id === example.topicId)?.exampleIds).toContain(example.id);
      const phase = topics.find(topic => topic.id === example.topicId)?.phase;
      expect(example.status).toBe(phase === 2 ? phase2Status : phase === 3 ? phase3Status : phase === 4 ? phase4Status : phase === 5 ? phase5Status : phase === 6 ? phase6Status : phase === 7 ? phase7Status : phase === 8 ? phase8Status : phase === 9 ? phase9Status : 'NOT_STARTED');
    }
  });

  it('attaches all 17 effect and 10 state requirements to their hooks', () => {
    expect(examples.filter((example) => example.id.startsWith('react-028.'))).toHaveLength(17);
    expect(examples.filter((example) => example.id.startsWith('react-027.'))).toHaveLength(10);
    expect(examples.filter(example => example.topicId === 'react-028')).toHaveLength(34);
    expect(examples.filter(example => example.topicId === 'react-027')).toHaveLength(20);
  });

  it('searches aliases, groups and categories and rejects mismatched routes', () => {
    const effect = findTopic('react', 'react-028');
    expect(effect).toBeDefined();
    expect(matchesTopic(effect!, ' use effect ')).toBe(true);
    expect(matchesTopic(effect!, 'React Hooks')).toBe(true);
    expect(findTopic('javascript', 'react-028')).toBeUndefined();
  });
});

