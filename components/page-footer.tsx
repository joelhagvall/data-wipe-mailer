import Link from 'next/link';
import { Github } from 'lucide-react';
import type { Language } from '@/lib/i18n';

interface PageFooterProps {
  footerGDPR: string;
  footerLearnMore: string;
  footerIMY: string;
  footerPrivacy: string;
  sourceCode: string;
  language?: Language;
}

const FOOTER_LINKS: Record<Language, { href: string; label: string }[]> = {
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

export function PageFooter({
  footerGDPR,
  footerLearnMore,
  footerIMY,
  footerPrivacy,
  sourceCode,
  language = 'sv',
}: PageFooterProps) {
  return (
    <footer className="mt-12 pt-8 border-t">
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>
          {footerGDPR}{' '}
          {footerLearnMore}{' '}
          <a
            href="https://www.imy.se/privatperson/dataskydd/dina-rattigheter/radering/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            {footerIMY}
          </a>
        </p>
        <p>{footerPrivacy}</p>
        <p>
          <a
            href="https://github.com/joelhagvall/data-wipe-mailer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 underline hover:text-foreground transition-colors"
          >
            {sourceCode}
            <Github className="h-4 w-4" />
          </a>
        </p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {FOOTER_LINKS[language].map((link) => (
            <Link key={link.href} href={link.href} className="underline hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
