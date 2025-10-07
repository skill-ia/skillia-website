/**
 * Personal (B2C) Route Configuration
 *
 * Defines sections and navigation for the /personal/ route.
 * This configuration is completely independent from the entities route.
 */

import type { Navbar01NavLink, SectionConfig } from '@/components/ui/shadcn-io/navbar-01/types';

/**
 * Personal Route Sections Configuration
 *
 * To add a section:
 * 1. Ensure the component is registered in sections-registry.ts
 * 2. Add a new entry to this array
 * 3. Add corresponding nav link below
 *
 * To remove a section:
 * 1. Remove the entry from this array
 * 2. Remove corresponding nav link if applicable
 *
 * To reorder sections:
 * 1. Simply reorder entries in this array
 */
export const personalSections: SectionConfig[] = [
  {
    id: 'inicio',
    component: 'HeroSection',
    lazyLoad: false, // Hero is eagerly loaded (above-the-fold)
    threshold: 0,
    rootMargin: '0px',
    repeatOnScroll: false,
    animationType: 'none',
  },
  // Removed sections - will be redesigned from scratch
  // {
  //   id: 'casos-de-exito',
  //   component: 'CaseStudiesSection',
  //   lazyLoad: true,
  //   threshold: 0.1,
  //   rootMargin: '-10vh', // Trigger earlier for video preloading
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // {
  //   id: 'about-me',
  //   component: 'AboutMe',
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // {
  //   id: 'productos',
  //   component: 'ProductSection',
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
  // {
  //   id: 'aviso-riesgo',
  //   component: 'RiskWarningSection',
  //   lazyLoad: true,
  //   threshold: 0.15,
  //   rootMargin: '-5vh',
  //   repeatOnScroll: true,
  //   animationType: 'none',
  // },
];

/**
 * Personal Route Navigation Links
 *
 * These appear in the navbar when on the /personal/ route.
 * The href should match the section id (with # prefix).
 */
export const personalNavLinks: Navbar01NavLink[] = [
  { href: '#contacto', label: 'Contacto' }, // Special: Opens Cal.com
  // Removed links - will be re-added when new sections are created
  // { href: '#inicio', label: 'Inicio', active: true },
  // { href: '#casos-de-exito', label: 'Casos de Éxito' },
  // { href: '#about-me', label: 'Mi Experiencia' },
  // { href: '#productos', label: 'Recursos Formativos' },
];
