/**
 * SectionRenderer Component
 *
 * Dynamically renders sections based on configuration.
 * Handles both eager and lazy loading based on config.
 */

import { Suspense, lazy } from 'react';
import { LazySection } from '@/components/ui/lazy-section';
import type { SectionConfig } from '@/components/ui/shadcn-io/navbar-01/types';
import { useViewportMargin } from '@/hooks/useViewportMargin';

// EAGER IMPORTS - Components that should load immediately
import { HeroSection } from '@/components/sections/HeroSection';

// LAZY IMPORTS - Components loaded on-demand
// Commented out - sections will be redesigned from scratch
// const CaseStudiesSection = lazy(() => import('@/components/sections/CaseStudiesSection').then(m => ({ default: m.CaseStudiesSection })));
// const AboutMe = lazy(() => import('@/components/sections/AboutMe').then(m => ({ default: m.AboutMe })));
// const ProductSection = lazy(() => import('@/components/sections/ProductSection').then(m => ({ default: m.ProductSection })));
// const RiskWarningSection = lazy(() => import('@/components/sections/RiskWarningSection').then(m => ({ default: m.RiskWarningSection })));

// Map of eager-loaded components
const EAGER_COMPONENTS = {
  HeroSection,
} as const;

// Map of lazy-loaded components
// Commented out - sections will be redesigned from scratch
const LAZY_COMPONENTS = {
  // CaseStudiesSection,
  // AboutMe,
  // ProductSection,
  // RiskWarningSection,
} as const;

interface SectionRendererProps {
  sections: SectionConfig[];
  variant?: 'personal' | 'entities';
}

/**
 * Renders a list of sections based on configuration
 */
export function SectionRenderer({ sections, variant = 'personal' }: SectionRendererProps) {
  // Convert vh-based rootMargins to pixels for better mobile support
  const rootMargin10vh = useViewportMargin(-10);
  const rootMargin5vh = useViewportMargin(-5);

  return (
    <>
      {sections.map((sectionConfig) => {
        const {
          id,
          component,
          lazyLoad,
          threshold,
          rootMargin,
          repeatOnScroll,
          animationType = 'none',
        } = sectionConfig;

        // Convert vh values to calculated pixel values
        let calculatedRootMargin = rootMargin;
        if (rootMargin === '-10vh') {
          calculatedRootMargin = rootMargin10vh;
        } else if (rootMargin === '-5vh') {
          calculatedRootMargin = rootMargin5vh;
        }

        // Get the component based on lazyLoad flag
        const isEagerComponent = component in EAGER_COMPONENTS;
        const isLazyComponent = component in LAZY_COMPONENTS;

        if (!isEagerComponent && !isLazyComponent) {
          console.error(`Section component "${component}" not found in EAGER_COMPONENTS or LAZY_COMPONENTS`);
          return null;
        }

        // EAGER LOADING: Import at top, render directly
        if (!lazyLoad && isEagerComponent) {
          const SectionComponent = EAGER_COMPONENTS[component as keyof typeof EAGER_COMPONENTS];

          return (
            <LazySection
              key={id}
              id={id}
              animationType={animationType}
              threshold={threshold}
              rootMargin={calculatedRootMargin}
              repeatOnScroll={repeatOnScroll}
            >
              {({ isVisible, hasBeenInView }) => (
                <SectionComponent
                  isVisible={isVisible}
                  hasBeenInView={hasBeenInView}
                  {...(component === 'HeroSection' && { variant })}
                />
              )}
            </LazySection>
          );
        }

        // LAZY LOADING: Wrap in Suspense
        if (lazyLoad && isLazyComponent) {
          const SectionComponent = LAZY_COMPONENTS[component as keyof typeof LAZY_COMPONENTS];

          return (
            <LazySection
              key={id}
              id={id}
              animationType={animationType}
              threshold={threshold}
              rootMargin={calculatedRootMargin}
              repeatOnScroll={repeatOnScroll}
            >
              {({ isVisible, hasBeenInView }) => (
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[var(--button-color)] border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <SectionComponent
                    isVisible={isVisible}
                    hasBeenInView={hasBeenInView}
                    {...(component === 'HeroSection' && { variant })}
                  />
                </Suspense>
              )}
            </LazySection>
          );
        }

        // Fallback: If lazyLoad flag doesn't match component type, log warning
        console.warn(`Section "${component}" lazyLoad setting (${lazyLoad}) doesn't match its import type`);
        return null;
      })}
    </>
  );
}
