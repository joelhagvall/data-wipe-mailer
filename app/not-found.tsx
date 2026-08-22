import Link from 'next/link';
import type { Metadata } from 'next';
import { CONTENT_PATHS, GITHUB_ISSUES_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: '404 - Sidan finns inte',
  robots: { index: false, follow: true },
};

const LABELS: Record<string, string> = {
  '/': 'Startsida / Home',
  '/about': 'Om / About',
  '/contact': 'Kontakt / Contact',
  '/privacy': 'Integritet / Privacy',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-mono text-muted-foreground">404</p>
          <h1 className="text-3xl font-bold tracking-tight">Sidan finns inte</h1>
          <p className="text-muted-foreground">
            Page not found. Data Wipe Mailer är en liten sajt - här är allt som finns:
          </p>
        </header>
        <nav aria-label="Sitemap">
          <ul className="space-y-2">
            {CONTENT_PATHS.map((path) => (
              <li key={path}>
                <Link href={path} className="underline hover:text-foreground transition-colors">
                  {LABELS[path]}
                </Link>{' '}
                <span className="text-muted-foreground text-sm font-mono">{path}</span>
              </li>
            ))}
            <li>
              <a href="/llms.txt" className="underline hover:text-foreground transition-colors">
                llms.txt
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="underline hover:text-foreground transition-colors">
                sitemap.xml
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-muted-foreground">
          Saknas något? Öppna ett ärende på{' '}
          <a href={GITHUB_ISSUES_URL} className="underline hover:text-foreground transition-colors" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
