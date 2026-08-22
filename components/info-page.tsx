import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Language } from '@/lib/i18n';
import { infoPages, type InfoPageKey, type PageContent } from '@/lib/site-content';

const LANGUAGE_LABEL: Record<Language, string> = { sv: 'Svenska', en: 'English' };

function SectionBody({ content, level }: { content: PageContent; level: 2 | 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  const headingClass = level === 2 ? 'text-xl font-semibold' : 'text-lg font-semibold';
  return (
    <div className="space-y-6">
      <p className="text-base leading-relaxed">{content.intro}</p>
      {content.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <Heading className={headingClass}>{section.heading}</Heading>
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
    </div>
  );
}

const NAV: { href: string; sv: string; en: string }[] = [
  { href: '/about', sv: 'Om', en: 'About' },
  { href: '/contact', sv: 'Kontakt', en: 'Contact' },
  { href: '/privacy', sv: 'Integritet', en: 'Privacy' },
];

export function InfoPage({ page }: { page: InfoPageKey }) {
  const sv = infoPages[page].sv;
  const en = infoPages[page].en;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Navigation" className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/" className="inline-flex items-center gap-1 underline hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Data Wipe Mailer
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === `/${page}` ? 'page' : undefined}
              className="text-muted-foreground underline hover:text-foreground transition-colors aria-[current=page]:text-foreground aria-[current=page]:no-underline"
            >
              {item.sv} / {item.en}
            </Link>
          ))}
        </nav>

        <article lang="sv" className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{sv.title}</h1>
            <p className="text-muted-foreground">{sv.description}</p>
          </header>
          <SectionBody content={sv} level={2} />
        </article>

        <article lang="en" className="mt-12 space-y-6 border-t pt-8">
          <header className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {en.title} <span className="text-muted-foreground font-normal text-base">({LANGUAGE_LABEL.en})</span>
            </h2>
            <p className="text-muted-foreground">{en.description}</p>
          </header>
          <SectionBody content={en} level={3} />
        </article>
      </div>
    </main>
  );
}
