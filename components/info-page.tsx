'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCallback } from 'react';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Language } from '@/lib/i18n';
import { infoPages, type InfoPageKey } from '@/lib/site-content';

const isValidLanguage = (value: unknown): value is Language => value === 'sv' || value === 'en';

const NAV: Record<Language, { href: string; label: string }[]> = {
  sv: [
    { href: '/about', label: 'Om tjänsten' },
    { href: '/contact', label: 'Kontakt' },
    { href: '/privacy', label: 'Integritetspolicy' },
  ],
  en: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy policy' },
  ],
};

const BACK_LABEL: Record<Language, string> = { sv: 'Till startsidan', en: 'Back to start' };

export function InfoPage({ page }: { page: InfoPageKey }) {
  const [language, setLanguage] = useLocalStorage<Language>('dw_lang', 'sv', isValidLanguage);
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'sv' ? 'en' : 'sv'));
  }, [setLanguage]);

  const content = infoPages[page][language];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-1 text-sm underline hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {BACK_LABEL[language]}
          </Link>
          <div className="flex gap-2">
            <ThemeToggle />
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </div>
        </div>

        <nav aria-label="Navigation" className="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {NAV[language].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === `/${page}` ? 'page' : undefined}
              className="text-muted-foreground underline hover:text-foreground transition-colors aria-[current=page]:text-foreground aria-[current=page]:no-underline aria-[current=page]:font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <article lang={language} className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </header>

          <p className="text-base leading-relaxed">{content.intro}</p>

          {content.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
