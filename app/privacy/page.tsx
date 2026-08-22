import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { infoPages } from '@/lib/site-content';

const page = infoPages.privacy;

export const metadata: Metadata = {
  title: page.sv.title,
  description: page.sv.description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: page.sv.title,
    description: page.sv.description,
    url: '/privacy',
    type: 'article',
  },
};

export default function PrivacyPage() {
  return <InfoPage page="privacy" />;
}
