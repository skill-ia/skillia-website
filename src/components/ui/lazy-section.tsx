"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface LazySectionProps {
  children: React.ReactNode | ((props: { isVisible: boolean; hasBeenInView: boolean }) => React.ReactNode);
  className?: string;
  id?: string;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  repeatOnScroll?: boolean;
  staggerChildren?: number;
  variants?: Variants;
}

// Default animation variants
const defaultVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

export function LazySection({
  children,
  className = '',
  id,
  animationType = 'slideUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  repeatOnScroll = false,
  staggerChildren = 0.1,
  variants,
}: LazySectionProps) {
  const { isInView, ref, hasBeenInView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: repeatOnScroll ? false : triggerOnce,
  });

  const [animationState, setAnimationState] = useState<"hidden" | "visible" | "reset">("hidden");
  const prevIsInView = useRef(isInView);

  // Use custom variants if provided, otherwise use default
  const animationVariants = variants || defaultVariants[animationType];

  // Enhanced variants for repeat animations
  const enhancedVariants = repeatOnScroll ? {
    ...animationVariants,
    reset: animationVariants.hidden
  } : animationVariants;

  // Handle animation state changes for repeat animations
  useEffect(() => {
    if (repeatOnScroll) {
      if (isInView && !prevIsInView.current) {
        // Element came into view - first set to reset, then to visible
        setAnimationState("reset");
        // Reduced delay for smoother mobile scrolling
        const timer = setTimeout(() => setAnimationState("visible"), 50);
        return () => clearTimeout(timer);
      } else if (!isInView && prevIsInView.current) {
        // Element went out of view
        setAnimationState("hidden");
      }
    } else {
      // Normal behavior for non-repeating animations
      const shouldAnimate = triggerOnce ? hasBeenInView : isInView;
      setAnimationState(shouldAnimate ? "visible" : "hidden");
    }
    prevIsInView.current = isInView;
  }, [isInView, hasBeenInView, repeatOnScroll, triggerOnce]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={animationState}
      variants={enhancedVariants}
      transition={{
        duration,
        delay: animationState === "visible" ? delay : 0,
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: animationState === "visible" ? staggerChildren : 0,
        when: "beforeChildren", // Ensure parent animates before children
      }}
    >
      {typeof children === 'function' 
        ? children({ isVisible: isInView, hasBeenInView })
        : children
      }
    </motion.section>
  );
}

// Helper component for staggered children animations
interface LazyItemProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  variants?: Variants;
}

export function LazyItem({
  children,
  className = '',
  animationType = 'slideUp',
  variants,
}: LazyItemProps) {
  const itemVariants = variants || defaultVariants[animationType];

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}