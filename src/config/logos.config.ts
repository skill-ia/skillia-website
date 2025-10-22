/**
 * Logo Configuration
 *
 * Centralized configuration for logo variants used throughout the app.
 * Provides easy switching between different logo styles based on background or context.
 */

export type LogoVariant =
  | 'white'        // Full logo for white backgrounds (default)
  | 'black'        // Full logo for black backgrounds
  | 'blue'         // Full logo for blue backgrounds
  | 'isotip-white' // Icon only for white backgrounds
  | 'isotip-black' // Icon only for black backgrounds
  | 'isotip-blue'; // Icon only for blue backgrounds

/**
 * Logo paths mapped to variants
 */
export const LOGO_VARIANTS: Record<LogoVariant, string> = {
  white: '/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/LOGOTIP/SVG/PER FONS BLANC.svg',
  black: '/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/LOGOTIP/SVG/PER FONS NEGRE.svg',
  blue: '/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/LOGOTIP/SVG/PER FONS BLAU.svg',
  'isotip-white': '/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/ISOTIP/SVG/ISOTIP FONS BLANC.svg',
  'isotip-black': '/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/ISOTIP/SVG/ISOTIP FONS NEGRE.svg',
  'isotip-blue': '/SKILLIA_RECURSOS/LOGOTIP_ISOTIP/ISOTIP/SVG/ISOTIP FONS BLAU.svg',
};

/**
 * Get logo path for a specific variant
 * @param variant - The logo variant to retrieve
 * @returns The file path to the logo
 */
export function getLogoPath(variant: LogoVariant = 'white'): string {
  return LOGO_VARIANTS[variant];
}

/**
 * Default logo variant
 */
export const DEFAULT_LOGO_VARIANT: LogoVariant = 'white';
