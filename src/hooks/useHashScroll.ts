/**
 * useHashScroll Hook
 *
 * Handles smooth scrolling to sections based on URL hash.
 * Works with React Router navigation and hash changes.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAVBAR_HEIGHT = 64; // Fixed navbar height in pixels
const SCROLL_DURATION = 500; // Duration in milliseconds

/**
 * Easing function for smooth scroll animation
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

/**
 * Smoothly scrolls to a target position
 */
function smoothScrollTo(targetPosition: number, duration: number): void {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Scrolls to the element with the given ID
 */
function scrollToElement(elementId: string): void {
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    const targetPosition = targetElement.offsetTop - NAVBAR_HEIGHT;
    smoothScrollTo(targetPosition, SCROLL_DURATION);
  }
}

/**
 * Hook that handles hash-based scrolling on route changes
 */
export function useHashScroll(): void {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the '#' from the hash
      const elementId = location.hash.replace('#', '');

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToElement(elementId);
      }, 100);
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
}
