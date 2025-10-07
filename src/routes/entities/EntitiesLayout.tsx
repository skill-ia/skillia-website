/**
 * EntitiesLayout Component
 *
 * Layout for the /entities/ route (B2B audience).
 * This is a complete one-page landing with sections configured in entities-sections.config.ts
 *
 * This route can have completely different sections than the personal route.
 * Add/remove/reorder sections by modifying entities-sections.config.ts
 */

import { SectionRenderer } from '@/components/SectionRenderer';
import { entitiesSections } from '@/config/entities-sections.config';
import { useHashScroll } from '@/hooks/useHashScroll';

export function EntitiesLayout() {
  // Handle hash-based scrolling
  useHashScroll();

  return (
    <main className="relative">
      <SectionRenderer sections={entitiesSections} variant="entities" />
    </main>
  );
}
