import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ThemeToggle from './components/ThemeToggle';
import CursorTrail from './components/CursorTrail';

function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

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

  if (currentView === 'blog') {
    return (
      <div className="min-h-screen bg-white dark:bg-true-black transition-colors duration-500">
        <Blog onBackToHome={() => setCurrentView('home')} />
        <Footer />
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        <CursorTrail />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-true-black transition-colors duration-500">
      <Header 
        onContactClick={() => setIsContactOpen(true)} 
        onBlogClick={() => setCurrentView('blog')}
      />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <CursorTrail />
    </div>
  );
}

export default App;