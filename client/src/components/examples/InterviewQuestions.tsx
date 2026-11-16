export interface Question { id: string; level: string; question: string; answer: string }

export function InterviewQuestions({ questions }: { questions: Question[] }) {
  return <section className="panel-section">
    <h3>Interview questions</h3>
    {questions.map((question) => <details className="question" key={question.id}>
      <summary><span className="question-level">{question.level}</span>{question.question}</summary>
      <p>{question.answer}</p>
    </details>)}
  </section>;
}
