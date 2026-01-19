'use client';

import dynamic from 'next/dynamic';

// Load analytics after hydration to reduce initial bundle size
const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((m) => m.Analytics),
  { ssr: false }
);

export function AnalyticsWrapper() {
  return <Analytics />;
}
