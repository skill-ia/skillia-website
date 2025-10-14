/**
 * App Component
 *
 * Root application component with routing setup.
 * Renders navbar and route-specific layouts.
 */

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01/index';
import { PersonalLayout } from '@/routes/personal/PersonalLayout';
import { EntitiesLayout } from '@/routes/entities/EntitiesLayout';
import { personalNavLinks } from '@/config/personal-sections.config';
import { entitiesNavLinks } from '@/config/entities-sections.config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const location = useLocation();

  // Determine which nav links to show based on current route
  const isPersonalRoute = location.pathname.startsWith('/personal');
  const navigationLinks = isPersonalRoute ? personalNavLinks : entitiesNavLinks;

  return (
    <>
      <Navbar01 navigationLinks={navigationLinks} />
      <Analytics />
      <SpeedInsights />
      <Routes>
        {/* Root redirect to personal */}
        <Route path="/" element={<Navigate to="/personal/" replace />} />

        {/* Personal (B2C) route */}
        <Route path="/personal/*" element={<PersonalLayout />} />

        {/* Entities (B2B) route */}
        <Route path="/entities/*" element={<EntitiesLayout />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/personal/" replace />} />
      </Routes>
    </>
  );
}

export default App;
