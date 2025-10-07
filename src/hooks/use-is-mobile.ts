'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the device is a mobile phone
 * Uses window.matchMedia to check screen width and user agent
 * Returns true for mobile devices (max-width: 768px)
 * 
 * @returns {boolean} true if device is mobile, false otherwise
 */
export function useIsMobile(): boolean {
  // Initialize state with false to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query for mobile screen size
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Handler for media query changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Add event listener for media query changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function to remove event listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
}

