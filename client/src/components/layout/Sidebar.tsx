import { Link, useLocation, useSearchParams } from 'react-router';
import { categories, groups, matchesTopic, statusLabel, topics, topicPath } from '../../app/registry';

export function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const location = useLocation();
  const [, , category, topicId] = location.pathname.split('/');
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const visible = topics.filter((topic) => matchesTopic(topic, query));
  const search = query ? `?q=${encodeURIComponent(query)}` : '';

  return <aside className="sidebar" id="topic-navigation" aria-label="Topic navigation">
    <Link className="brand" to="/foundation" onClick={onNavigate}><span className="brand-mark" aria-hidden="true">m.</span><span>MERN<span className="brand-subtitle">CONCEPT LAB</span></span></Link>
    <div className="sidebar-content">
      <p className="sidebar-label">LEARNING WORKSPACE</p>
      <Link className={`foundation-link${location.pathname === '/foundation' ? ' active' : ''}`} to={`/foundation${search}`} onClick={onNavigate} aria-current={location.pathname === '/foundation' ? 'page' : undefined}><span aria-hidden="true">↗</span> Application foundation <span className="small-label">01</span></Link>
      <label className="search-label" htmlFor="topic-search">Find a concept</label>
      <div className="search-box"><span aria-hidden="true">⌕</span><input id="topic-search" type="search" placeholder="Search topics…" value={query} onChange={(event) => {
        const next = new URLSearchParams(params);
        if (event.target.value) next.set('q', event.target.value); else next.delete('q');
        setParams(next, { replace: true });
      }} /></div>
      <p className="search-count" role="status">{query ? `${visible.length} matching topics` : `${topics.length} topics · 8 categories`}</p>
      <nav aria-label="Concepts">
        {categories.map((entry) => {
          const categoryTopics = visible.filter((topic) => topic.categoryId === entry.id);
          if (!categoryTopics.length) return null;
          return <details className="category" key={entry.id} open={Boolean(query) || category === entry.id}>
            <summary><span className={`category-icon icon-${entry.id}`} aria-hidden="true">{entry.short}</span><span>{entry.title}</span><span className="chevron" aria-hidden="true">›</span></summary>
            {groups.filter((group) => group.categoryId === entry.id).map((group) => {
              const groupTopics = categoryTopics.filter((topic) => topic.groupId === group.id);
              if (!groupTopics.length) return null;
              return <details className="topic-group" key={group.id} open={Boolean(query) || groupTopics.some((topic) => topic.id === topicId)}>
                <summary>{group.title}<span aria-hidden="true">+</span></summary>
                <ul>{groupTopics.map((topic) => <li key={topic.id}><Link to={`${topicPath(topic)}${search}`} onClick={onNavigate} aria-label={`${topic.title} — ${statusLabel(topic.status)}`} aria-current={topic.id === topicId ? 'page' : undefined} className={topic.id === topicId ? 'selected' : ''}><span>{topic.title}</span><span className={`planned-dot status-${topic.status.toLowerCase()}`} title={statusLabel(topic.status)} aria-hidden="true" /></Link></li>)}</ul>
              </details>;
            })}
          </details>;
        })}
        {!visible.length && <p className="empty-search">No matching concepts. Try “effects”, “closure”, or a category name.</p>}
      </nav>
    </div>
  </aside>;
}
