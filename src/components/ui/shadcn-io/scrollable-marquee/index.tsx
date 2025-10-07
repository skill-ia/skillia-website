'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-is-mobile';

export type ScrollableMarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
};

export const ScrollableMarquee = ({
  children,
  className,
  speed = 40,
  pauseOnHover = true,
  ...props
}: ScrollableMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const scrollPositionRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const isMobile = useIsMobile();

  // Drag state management (desktop)
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Touch tracking refs (mobile)
  const touchStartXRef = useRef(0);
  const touchStartScrollRef = useRef(0);
  const touchDistanceRef = useRef(0);
  const touchTimeoutRef = useRef<number | undefined>(undefined);

  // Measure content width for infinite scroll
  useEffect(() => {
    if (contentRef.current) {
      const width = contentRef.current.scrollWidth / 2; // Divide by 2 because we duplicate content
      setContentWidth(width);
    }
  }, [children]);

  // Auto-scroll animation
  const animate = useCallback(
    (currentTime: number) => {
      if (!containerRef.current || !contentWidth) return;

      const isPaused = (pauseOnHover && (isHovered || isDragging)) || isTouching;

      if (!isPaused) {
        if (lastTimeRef.current === 0) {
          lastTimeRef.current = currentTime;
        }

        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        // Calculate scroll distance based on speed and delta time
        const distance = (speed * deltaTime) / 1000;
        scrollPositionRef.current += distance;

        // Reset position for infinite loop
        if (scrollPositionRef.current >= contentWidth) {
          scrollPositionRef.current -= contentWidth;
        }

        containerRef.current.scrollLeft = scrollPositionRef.current;
      } else {
        // Reset time tracking when paused to avoid jumps
        lastTimeRef.current = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [speed, contentWidth, isHovered, isDragging, isTouching, pauseOnHover]
  );

  // Start/stop animation
  useEffect(() => {
    const startAnimation = (time: number) => {
      animate(time);
    };

    animationRef.current = requestAnimationFrame(startAnimation);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Window-level touch event listeners (mobile)
  useEffect(() => {
    if (!isMobile) return;

    const handleGlobalTouchEnd = () => {
      // Reset touching state if it's stuck
      if (isTouching) {
        if (touchTimeoutRef.current) {
          clearTimeout(touchTimeoutRef.current);
        }
        setIsTouching(false);
      }
    };

    // Use passive listeners for performance
    window.addEventListener('touchend', handleGlobalTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleGlobalTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      window.removeEventListener('touchcancel', handleGlobalTouchEnd);
    };
  }, [isMobile, isTouching]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  // Mouse drag handlers (desktop)
  const DRAG_THRESHOLD = 5; // Minimum pixels to distinguish drag from click

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile && containerRef.current) {
      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      dragStartScrollRef.current = scrollPositionRef.current;
      dragDistanceRef.current = 0;
      e.preventDefault(); // Prevent text selection
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const deltaX = dragStartXRef.current - e.clientX;
    dragDistanceRef.current = Math.abs(deltaX);

    // Only drag if moved beyond threshold
    if (dragDistanceRef.current < DRAG_THRESHOLD) return;

    e.preventDefault();

    let newScrollPosition = dragStartScrollRef.current + deltaX;

    // Handle infinite loop boundaries
    if (newScrollPosition >= contentWidth) {
      newScrollPosition -= contentWidth;
      dragStartScrollRef.current -= contentWidth;
    } else if (newScrollPosition < 0) {
      newScrollPosition += contentWidth;
      dragStartScrollRef.current += contentWidth;
    }

    scrollPositionRef.current = newScrollPosition;
    containerRef.current.scrollLeft = newScrollPosition;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);

    // Don't reset dragDistance immediately - keep it for click handler
    // It will be reset on next mouseDown
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    // Prevent click if user dragged beyond threshold
    if (dragDistanceRef.current >= DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent click if user dragged/swiped beyond threshold
    // This works for both desktop drag and mobile swipe
    const distance = isMobile ? touchDistanceRef.current : dragDistanceRef.current;

    if (distance >= DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Reset distances after click is processed
    dragDistanceRef.current = 0;
    touchDistanceRef.current = 0;
  };

  // Mouse hover handlers
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
      // Sync scroll position ref with actual scroll
      if (containerRef.current) {
        scrollPositionRef.current = containerRef.current.scrollLeft;
      }
    }
  };

  const handleMouseLeave = () => {
    // End drag if active
    if (isDraggingRef.current) {
      handleMouseUp();
    }

    if (pauseOnHover) {
      setIsHovered(false);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;

    setIsTouching(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartScrollRef.current = containerRef.current?.scrollLeft || 0;
    touchDistanceRef.current = 0; // Reset distance

    // Safety timeout: auto-reset after 3 seconds if touchend never fires
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = window.setTimeout(() => {
      setIsTouching(false);
    }, 3000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !containerRef.current) return;

    const touchX = e.touches[0].clientX;
    const deltaX = touchStartXRef.current - touchX;

    // Track total distance moved
    touchDistanceRef.current = Math.abs(deltaX);

    let newScrollPosition = touchStartScrollRef.current + deltaX;

    // Handle infinite loop boundaries
    if (newScrollPosition >= contentWidth) {
      newScrollPosition -= contentWidth;
      touchStartScrollRef.current -= contentWidth;
    } else if (newScrollPosition < 0) {
      newScrollPosition += contentWidth;
      touchStartScrollRef.current += contentWidth;
    }

    scrollPositionRef.current = newScrollPosition;
    containerRef.current.scrollLeft = newScrollPosition;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;

    // Clear safety timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }

    setIsTouching(false);
    // Don't reset touchDistance here - let it be checked by click handler
  };

  return (
    <div className={cn('relative w-full overflow-hidden', className)} {...props}>
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-x-auto scrollbar-hide",
          // Show grab cursor on both desktop and mobile
          isDragging || isTouching ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClickCapture={handleClickCapture}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          scrollBehavior: isHovered || isTouching ? 'auto' : 'auto',
          WebkitOverflowScrolling: 'touch',
          userSelect: isDragging || isTouching ? 'none' : 'auto',
        }}>
        <div ref={contentRef} className="flex flex-nowrap">
          {/* Original content */}
          <div className="flex flex-nowrap shrink-0">{children}</div>
          {/* Duplicate for infinite scroll */}
          <div className="flex flex-nowrap shrink-0" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export type ScrollableMarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

export const ScrollableMarqueeFade = ({
  className,
  side,
  ...props
}: ScrollableMarqueeFadeProps) => (
  <div
    className={cn(
      'pointer-events-none absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent',
      side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l',
      className
    )}
    {...props}
  />
);

export type ScrollableMarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const ScrollableMarqueeItem = ({
  className,
  ...props
}: ScrollableMarqueeItemProps) => (
  <div
    className={cn('mx-2 flex-shrink-0 object-contain', className)}
    {...props}
  />
);
