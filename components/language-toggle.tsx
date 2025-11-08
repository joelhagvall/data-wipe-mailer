'use client';

import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import type { Language } from '@/lib/i18n';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'sv' ? 'English' : 'Svenska'}
    </Button>
  );
}
