/**
 * PersonalLayout Component
 *
 * Layout for the /personal/ route (B2C audience).
 * This is a complete one-page landing with sections configured in personal-sections.config.ts
 */

import { SectionRenderer } from '@/components/SectionRenderer';
import { personalSections } from '@/config/personal-sections.config';
import { useHashScroll } from '@/hooks/useHashScroll';

export function PersonalLayout() {
  // Handle hash-based scrolling
  useHashScroll();

  return (
    <main className="relative">
      <SectionRenderer sections={personalSections} variant="personal" />
    </main>
  );
}
