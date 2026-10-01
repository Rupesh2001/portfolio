import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -96 });
          return;
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
