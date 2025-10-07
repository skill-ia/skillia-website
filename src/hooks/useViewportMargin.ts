import { useEffect, useState } from 'react';

/**
 * Custom hook to calculate viewport-relative rootMargin for IntersectionObserver
 *
 * @param vh - Viewport height percentage (e.g., -10 for -10vh)
 * @returns Calculated rootMargin in pixels (e.g., "-70px" for -10vh on 700px viewport)
 *
 * @example
 * const rootMargin = useViewportMargin(-10); // -10vh
 * <LazySection rootMargin={rootMargin} />
 */
export function useViewportMargin(vh: number): string {
  const [rootMargin, setRootMargin] = useState('0px');

  useEffect(() => {
    // Calculate rootMargin based on viewport height
    const calculateMargin = () => {
      if (typeof window === 'undefined') return;

      const viewportHeight = window.innerHeight;
      const pixels = Math.round(viewportHeight * (vh / 100));
      setRootMargin(`${pixels}px`);
    };

    // Calculate on mount
    calculateMargin();

    // Recalculate on window resize (handles orientation changes, address bar collapse)
    const handleResize = () => {
      calculateMargin();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [vh]);

  return rootMargin;
}
