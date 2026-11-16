export interface Mistake { problem: string; fix: string }

export function CommonMistakes({ mistakes }: { mistakes: Mistake[] }) {
  return <section className="panel-section">
    <h3>Common mistakes & fixes</h3>
    {mistakes.map((mistake) => <div className="mistake" key={mistake.problem}>
      <p><strong>Problem:</strong> {mistake.problem}</p>
      <p><strong>Fix:</strong> {mistake.fix}</p>
    </div>)}
  </section>;
}
