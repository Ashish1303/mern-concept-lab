export interface SourceFile { name: string; content: string }

export function SourceViewer({ files }: { files: SourceFile[] }) {
  return <section className="panel-section" aria-label="Implementation source">
    <h3>TypeScript source</h3>
    <p className="muted">Read-only source loaded from the files used by this build.</p>
    {files.map((file) => <details className="source-file" key={file.name}>
      <summary>{file.name}</summary>
      <pre><code>{file.content}</code></pre>
    </details>)}
  </section>;
}
