import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { infoPages } from '@/lib/site-content';

const page = infoPages.contact;

export const metadata: Metadata = {
  title: page.sv.title,
  description: page.sv.description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: page.sv.title,
    description: page.sv.description,
    url: '/contact',
    type: 'article',
  },
};

export default function ContactPage() {
  return <InfoPage page="contact" />;
}
