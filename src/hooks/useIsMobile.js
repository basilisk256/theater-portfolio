import { useState, useEffect } from 'react';

// Check for ?mobile=true URL parameter
function getForceMobile() {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('mobile') === 'true';
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (getForceMobile()) return true;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (getForceMobile()) {
      setIsMobile(true);
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Set initial value
    setIsMobile(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
}
