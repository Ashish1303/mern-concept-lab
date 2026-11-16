import type { Question } from '../components/examples/InterviewQuestions';
import type { Mistake } from '../components/examples/CommonMistakes';

export interface RunContext {
  input: string;
  host: HTMLElement;
  signal: AbortSignal;
  delay: (milliseconds: number) => Promise<void>;
  cleanup: (callback: () => void) => void;
  request: (path: string, options?: RequestInit) => Promise<Response>;
}

export interface RuntimeExample {
  id: string;
  title: string;
  explanation: string;
  expected: unknown;
  input?: { label: string; initial: string };
  runtime: 'browser';
  network?: boolean;
  run: (context: RunContext) => unknown | Promise<unknown>;
}

export interface CompilerExample {
  id: string;
  title: string;
  explanation: string;
  expected: string;
  runtime: 'typecheck';
  fixture: string;
}

export type LearningExample = RuntimeExample | CompilerExample;
export interface Lesson {
  id: string;
  description: string;
  when: string;
  avoid: string;
  tradeoff: string;
  mistakes: Mistake[];
  questions: Question[];
  examples: LearningExample[];
  reference: string;
}
export interface LessonSummary {
  id: string;
  description: string;
  examples: { id: string; title: string; runtime: LearningExample['runtime'] }[];
}
export interface CompilerEvidence {
  compiler: string;
  checkedAt: string;
  fixtures: Record<string, {
    sha256: string;
    positive: string;
    negative: { code: number; line: number; message: string }[];
  }>;
}
