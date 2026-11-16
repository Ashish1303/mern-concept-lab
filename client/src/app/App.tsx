import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import { Sidebar } from '../components/layout/Sidebar';
import { FoundationPage } from '../routes/FoundationPage';
import { TopicPage } from '../routes/TopicPage';
import { RecoveryPage } from '../routes/RecoveryPage';
import { findTopic } from './registry';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const [, , category, id] = location.pathname.split('/');
    const topic = findTopic(category, id);
    document.title = `${topic?.title ?? 'Application foundation'} · MERN Concept Lab`;
  }, [location.pathname]);
  return <div className={`app-shell${menuOpen ? ' menu-open' : ''}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Sidebar onNavigate={() => setMenuOpen(false)} />
    <div className="workspace">
      <header className="workspace-header"><button className="menu-toggle secondary" aria-expanded={menuOpen} aria-controls="topic-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? 'Close topics' : 'Browse topics'}</button><span className="header-path">The concept lab <span aria-hidden="true">/</span> <strong>Learning workspace</strong></span><span className="header-note">Learn it. Run it. Explain it.</span></header>
      <main id="main-content" tabIndex={-1}><Outlet /></main>
      <footer className="workspace-footer">MERN Concept Lab <span>Built for understanding, one concept at a time.</span></footer>
    </div>
  </div>;
}

export function App() {
  return <Routes><Route element={<Layout />}>
    <Route index element={<Navigate to="/foundation" replace />} />
    <Route path="foundation" element={<FoundationPage />} />
    <Route path="learn/:category/:topicId" element={<TopicPage />} />
    <Route path="*" element={<RecoveryPage />} />
  </Route></Routes>;
}
