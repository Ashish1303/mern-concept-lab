export type CategoryId = 'javascript' | 'typescript' | 'react' | 'redux' | 'node' | 'express' | 'mongodb' | 'mern';
export type Status = 'NOT_STARTED' | 'IN_PROGRESS' | 'READY_FOR_REVIEW' | 'APPROVED_COMPLETE' | 'BLOCKED';
export type Difficulty = 'basic' | 'intermediate' | 'advanced' | 'senior';
export type RequirementSeed = readonly [id: string, category: CategoryId, group: string, title: string, phase: number, kind: 'concept' | 'required-example', plannedExampleCount: number];
export interface Category { id: CategoryId; title: string; short: string }
export interface Group { id: string; categoryId: CategoryId; title: string }
export interface PlannedExample {
  id: string;
  topicId: string;
  title: string | null;
  requirementIds: string[];
  status: Status;
}
export interface PlannedTopic {
  id: string;
  categoryId: CategoryId;
  groupId: string;
  title: string;
  description: string | null;
  aliases: string[];
  difficulty: Difficulty;
  phase: number;
  exampleIds: string[];
  requirementIds: string[];
  interviewQuestionIds: string[];
  status: Status;
}
