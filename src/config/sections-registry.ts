/**
 * Section Registry (DEPRECATED)
 *
 * This file is kept for documentation purposes.
 * The actual section imports are now handled in SectionRenderer.tsx
 *
 * To add a new section:
 * 1. Import it in SectionRenderer.tsx (either EAGER_COMPONENTS or LAZY_COMPONENTS)
 * 2. Add it to the appropriate route config file
 *
 * EAGER_COMPONENTS (in SectionRenderer.tsx):
 * - HeroSection - Main hero, loads immediately
 *
 * LAZY_COMPONENTS (in SectionRenderer.tsx):
 * - CaseStudiesSection
 * - AboutMe
 * - ProductSection
 * - RiskWarningSection
 */

export interface SectionProps {
  isVisible?: boolean;
  hasBeenInView?: boolean;
}
