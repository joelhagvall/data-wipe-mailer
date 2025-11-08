import Image from 'next/image';
import { LanguageToggle } from '@/components/language-toggle';
import type { Language } from '@/lib/i18n';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  language: Language;
  onLanguageToggle: () => void;
}

export function PageHeader({ title, subtitle, language, onLanguageToggle }: PageHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="flex justify-end mb-4">
        <LanguageToggle language={language} onToggle={onLanguageToggle} />
      </div>
      <div className="flex flex-col items-center gap-4 mb-2">
        <Image
          src="/image.png"
          alt="Data Wipe Mailer logo"
          width={120}
          height={120}
          className="rounded-lg"
        />
        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>
      </div>
      <p className="text-lg text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
