import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { infoPages } from '@/lib/site-content';

const page = infoPages.about;

export const metadata: Metadata = {
  title: page.sv.title,
  description: page.sv.description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: page.sv.title,
    description: page.sv.description,
    url: '/about',
    type: 'article',
  },
};

export default function AboutPage() {
  return <InfoPage page="about" />;
}
