/**
 * Navbar Types
 */

import type { LogoVariant } from '@/config/logos.config';

export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoVariant?: LogoVariant;
  logoHref?: string;
  navigationLinks?: Navbar01NavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
  selectorVisible?: boolean;
  linksVisible?: boolean;
}

/**
 * Section Configuration Types
 */

export interface SectionConfig {
  /** Unique identifier for the section (used as HTML id) */
  id: string;

  /** Component name from sections */
  component: string;

  /** Whether to lazy load this section (false = eager load) */
  lazyLoad: boolean;

  /** IntersectionObserver threshold (0-1) */
  threshold: number;

  /** IntersectionObserver rootMargin (e.g., '0px', '-10vh') */
  rootMargin: string;

  /** Whether to repeat animations on scroll in/out */
  repeatOnScroll: boolean;

  /** Animation type (currently all set to 'none' as sections handle their own animations) */
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
}
