import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to top whenever the user opens a new page (category, product, etc.) */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
