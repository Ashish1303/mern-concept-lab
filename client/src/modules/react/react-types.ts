import type { ComponentType } from 'react';
import type { Question } from '../../components/examples/InterviewQuestions';
import type { Mistake } from '../../components/examples/CommonMistakes';
export interface ReactExperiment {
    id: string;
    aliases: string[];
    title: string;
    component: string;
    expected: string;
    steps: string[];
    prerequisites?: string;
    test: {
        action: 'click' | 'type' | 'clear' | 'select' | 'wait';
        label: string;
        value?: string;
        expect?: string;
        trace?: string;
    }[];
}
export interface ReactLesson {
    id: string;
    description: string;
    when: string;
    avoid: string;
    tradeoff: string;
    examples: ReactExperiment[];
    questions: Question[];
    mistakes: Mistake[];
    reference: string;
}
export type ReactDemoModule = Record<string, ComponentType>;
