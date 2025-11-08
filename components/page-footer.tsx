import { Github } from 'lucide-react';

interface PageFooterProps {
  footerGDPR: string;
  footerLearnMore: string;
  footerIMY: string;
  footerPrivacy: string;
  sourceCode: string;
}

export function PageFooter({
  footerGDPR,
  footerLearnMore,
  footerIMY,
  footerPrivacy,
  sourceCode,
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
      </div>
    </footer>
  );
}
