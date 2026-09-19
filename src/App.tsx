import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ThemeToggle from './components/ThemeToggle';
import BottomNav from './components/BottomNav';
import SkyEgg from './components/SkyEgg';
import { SketchProvider } from './components/sketch';
import 'drawably/style.css';

/** One transition for every route, so pages feel like one surface. */
const page = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeInOut' },
} as const;

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSkyOpen, setIsSkyOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Default to dark mode instead of system preference
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const go = (view: string) => navigate(view === 'home' ? '/' : `/${view}`);

  // Route transitions key on the top-level section, not the full path, so that
  // /work and /work/:slug stay mounted together — the shared-element morph
  // between a work row and its case needs both to live under one tree.
  const section = location.pathname.split('/')[1] || 'home';

  // The dock highlights blog posts as Writing, and cases as Work.
  const currentView = section === '' ? 'home' : section;

  /*
   * A second way in to the sky, for anyone not using a pointer: type "sky".
   * The orbital-field hold is the intended discovery, but it cannot be the
   * only one, since it needs a mouse and a steady hand.
   */
  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (el?.isContentEditable) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-3);
      if (buffer === 'sky') setIsSkyOpen(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-true-black transition-colors duration-500">
      <Header
        currentPath={location.pathname}
        onContactClick={() => setIsContactOpen(true)}
        onNavigate={go}
      />
      <main className="pb-12 sm:pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={section}>
            <Route path="/" element={
              <motion.div {...page}>
                <Hero
                  onWorkClick={() => navigate('/work')}
                  onContactClick={() => setIsContactOpen(true)}
                  onDiscoverSky={() => setIsSkyOpen(true)}
                />
              </motion.div>
            } />
            <Route path="/work" element={
              <motion.div {...page}>
                <Work />
              </motion.div>
            } />
            <Route path="/work/:slug" element={
              <motion.div {...page}>
                <Work />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div {...page}>
                <About onContactClick={() => setIsContactOpen(true)} onBlogClick={() => navigate('/blog')} />
              </motion.div>
            } />
            <Route path="/blog" element={
              <motion.div {...page}>
                <Blog />
              </motion.div>
            } />
            <Route path="/blog/:slug" element={
              <motion.div {...page}>
                <BlogPost />
              </motion.div>
            } />

            {/* Retired sections. Their content lives on About and Work now, so
                old links and bookmarks land somewhere real instead of 404ing. */}
            <Route path="/projects" element={<Navigate to="/work" replace />} />
            <Route path="/skills" element={<Navigate to="/about" replace />} />
            <Route path="/experience" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer onViewChange={go} />
      <BottomNav currentView={currentView} onViewChange={go} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <SkyEgg open={isSkyOpen} onClose={() => setIsSkyOpen(false)} />
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <SketchProvider>
        <AppContent />
      </SketchProvider>
    </Router>
  );
}

export default App;
