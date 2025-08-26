import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
      <main className="pb-24 md:pb-8">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About onContactClick={() => setIsContactOpen(true)} onBlogClick={() => navigate('/blog')} />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
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