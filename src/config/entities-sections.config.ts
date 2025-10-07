/**
 * Entities (B2B) Route Configuration
 *
 * Defines sections and navigation for the /entities/ route.
 * This configuration is completely independent from the personal route.
 *
 * You can add, remove, or reorder sections independently here.
 */

import type { Navbar01NavLink, SectionConfig } from '@/components/ui/shadcn-io/navbar-01/types';

/**
 * Entities Route Sections Configuration
 *
 * To add a section:
 * 1. Create the component in src/components/sections/entities/
 * 2. Register it in sections-registry.ts
 * 3. Add a new entry to this array
 * 4. Add corresponding nav link below
 *
 * To remove a section:
 * 1. Remove the entry from this array
 * 2. Remove corresponding nav link if applicable
 *
 * To reorder sections:
 * 1. Simply reorder entries in this array
 */
export const entitiesSections: SectionConfig[] = [
  {
    id: 'inicio',
    component: 'HeroSection', // Using same HeroSection as personal for now
    lazyLoad: false, // Hero is eagerly loaded (above-the-fold)
    threshold: 0,
    rootMargin: '0px',
    repeatOnScroll: false,
    animationType: 'none',
  },
  // Removed sections - will be redesigned from scratch
  // {
  //   id: 'productos',
  //   component: 'ProductSection', // Reusing ProductSection
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // {
  //   id: 'aviso-riesgo',
  //   component: 'RiskWarningSection', // Reusing RiskWarningSection
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // TODO: Add B2B-specific sections here
  // Example:
  // {
  //   id: 'servicios',
  //   component: 'ServicesSection',
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // {
  //   id: 'casos-corporativos',
  //   component: 'CorporateCasesSection',
  //   lazyLoad: true,
  //   threshold: 0.1,
  //   rootMargin: '-10vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // {
  //   id: 'equipo',
  //   component: 'TeamSection',
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
];

/**
 * Entities Route Navigation Links
 *
 * These appear in the navbar when on the /entities/ route.
 * The href should match the section id (with # prefix).
 *
 * NOTE: This can be completely different from personal route navigation.
 */
export const entitiesNavLinks: Navbar01NavLink[] = [
  { href: '#contacto', label: 'Contacto' }, // Special: Opens Cal.com
  // Removed links - will be re-added when new sections are created
  // { href: '#inicio', label: 'Inicio', active: true },
  // { href: '#productos', label: 'Recursos Formativos' },
  // TODO: Add B2B-specific nav links
  // Example:
  // { href: '#servicios', label: 'Servicios Corporativos' },
  // { href: '#casos-corporativos', label: 'Casos de Éxito' },
  // { href: '#equipo', label: 'Nuestro Equipo' },
];
