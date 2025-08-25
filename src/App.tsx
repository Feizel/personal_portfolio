import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ThemeToggle from './components/ThemeToggle';
import CursorTrail from './components/CursorTrail';
import BottomNav from './components/BottomNav';

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

  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return <Blog onBackToHome={() => setCurrentView('home')} />;
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-true-black transition-colors duration-500">
      <Header 
        onContactClick={() => setIsContactOpen(true)} 
        onBlogClick={() => setCurrentView('blog')}
      />
      <main className="pb-24">
        {renderContent()}
      </main>
      <Footer onViewChange={setCurrentView} />
      {currentView !== 'blog' && (
        <BottomNav 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
      )}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <CursorTrail />
    </div>
  );
}

export default App;