import { createContext, useContext, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const location = useLocation();
  const [showHero, setShowHero] = useState(true);
  const scrollPositions = useRef({});
  const prevPathname = useRef('/');

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle scroll restoration and showing/hiding hero
  useEffect(() => {
    // Save scroll position before navigating away from home
    if (prevPathname.current === '/' && location.pathname !== '/') {
      scrollPositions.current['/'] = window.scrollY;
    }

    // Handle navigation to new path
    if (location.pathname === '/') {
      // Navigating to home page
      if (prevPathname.current !== '/' && scrollPositions.current['/']) {
        // Coming from project page - hide hero and restore scroll
        setShowHero(false);
        setTimeout(() => {
          window.scrollTo(0, scrollPositions.current['/']);
        }, 50);
      } else if (prevPathname.current === '/') {
        // Already on home, just continue
      } else {
        // First time on home or fresh load - show hero
        setShowHero(true);
        window.scrollTo(0, 0);
      }
    } else {
      // Navigating to project page - scroll to top
      setShowHero(true);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }

    prevPathname.current = location.pathname;
  }, [location.pathname]);

  return (
    <ScrollContext.Provider value={{ showHero }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    return { showHero: true };
  }
  return context;
};


