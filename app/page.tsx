import type { Metadata } from 'next';
import HomeClient from '@/components/home-client';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-700">
      <HomeClient />
    </main>
  );
}
