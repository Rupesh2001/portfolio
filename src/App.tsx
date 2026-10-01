import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PageTransition } from './components/PageTransition';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { useLenis } from './hooks/useLenis';
import CaseStudy from './pages/CaseStudy';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Work from './pages/Work';

type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem('portfolio-theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function App() {
  useLenis();
  const location = useLocation();
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [ready, setReady] = useState<boolean>(() => {
    try {
      return !!sessionStorage.getItem('portfolio-seen');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const onPreloaderDone = () => {
    try {
      sessionStorage.setItem('portfolio-seen', '1');
    } catch {
      // no-op when storage is unavailable
    }
    setReady(true);
  };

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollToTop />
      <div className="app-shell">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <AnimatePresence>{!ready && <Preloader onDone={onPreloaderDone} />}</AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home ready={ready} /></PageTransition>} />
            <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
            <Route path="/work/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}

export default App;
