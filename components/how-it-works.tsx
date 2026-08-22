import type { Language } from '@/lib/i18n';
import { howItWorks } from '@/lib/site-content';

const LINKS: Record<Language, { about: string; contact: string; privacy: string }> = {
  sv: { about: 'Om tjänsten', contact: 'Kontakt', privacy: 'Integritetspolicy' },
  en: { about: 'About', contact: 'Contact', privacy: 'Privacy policy' },
};

export function HowItWorks({ language }: { language: Language }) {
  const block = howItWorks[language];
  const links = LINKS[language];
  return (
    <section aria-labelledby="how-it-works" className="mt-12 space-y-4 text-sm text-muted-foreground">
      <h2 id="how-it-works" className="text-lg font-semibold text-foreground">
        {block.heading}
      </h2>
      <ol className="list-decimal space-y-2 pl-6">
        {block.steps.map((step) => (
          <li key={step} className="leading-relaxed">
            {step}
          </li>
        ))}
      </ol>
      <p className="leading-relaxed">{block.whenToUse}</p>
      <p className="flex flex-wrap gap-x-4 gap-y-1">
        <a href="/about" className="underline hover:text-foreground transition-colors">{links.about}</a>
        <a href="/contact" className="underline hover:text-foreground transition-colors">{links.contact}</a>
        <a href="/privacy" className="underline hover:text-foreground transition-colors">{links.privacy}</a>
      </p>
    </section>
  );
}
