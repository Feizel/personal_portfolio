import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ThemeToggle from './components/ThemeToggle';
import CursorTrail from './components/CursorTrail';
import BottomNav from './components/BottomNav';

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/experience') return 'experience';
    if (path === '/skills') return 'skills';
    if (path === '/projects') return 'projects';
    if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
    return 'home';
  };

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



  return (
    <div className="min-h-screen bg-white dark:bg-true-black transition-colors duration-500">
      <Header 
        onContactClick={() => setIsContactOpen(true)} 
        onBlogClick={() => navigate('/blog')}
        onHomeClick={() => navigate('/')}
      />
      <main className="pb-12 sm:pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Hero onProjectsClick={() => navigate('/projects')} />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <About onContactClick={() => setIsContactOpen(true)} onBlogClick={() => navigate('/blog')} />
              </motion.div>
            } />
            <Route path="/experience" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Experience />
              </motion.div>
            } />
            <Route path="/skills" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Skills />
              </motion.div>
            } />
            <Route path="/projects" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Projects />
              </motion.div>
            } />
            <Route path="/blog" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Blog />
              </motion.div>
            } />
            <Route path="/blog/:slug" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <BlogPost />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer onViewChange={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />
      <BottomNav 
        currentView={getCurrentView()} 
        onViewChange={(view) => navigate(view === 'home' ? '/' : `/${view}`)} 
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <CursorTrail />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;