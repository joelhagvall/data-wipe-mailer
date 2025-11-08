'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { PageFooter } from '@/components/page-footer';
import { ProviderList } from '@/components/provider-list';
import { SendButton } from '@/components/send-button';
import { useProviderSelection } from '@/hooks/use-provider-selection';
import { translations, emailTemplates, type Language } from '@/lib/i18n';
import { MailtoHelper } from '@/lib/mailto';
import { ConfirmSend } from '@/components/confirm-send';

export default function HomeClient() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dw_lang') as Language | null;
        if (saved === 'sv' || saved === 'en') return saved;
      } catch {}
    }
    // Default to Swedish for all new users
    return 'sv';
  });

  useEffect(() => {
    try {
      localStorage.setItem('dw_lang', language);
    } catch {}
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'sv' ? 'en' : 'sv'));
  }, []);

  const {
    selectedProviderIds,
    handleToggle,
    handleSelectAll,
    allProvidersSelected,
    selectedCount,
    selectedProviders,
  } = useProviderSelection();

  const t = useMemo(() => translations[language], [language]);
  const template = useMemo(() => emailTemplates[language], [language]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dontShowConfirm, setDontShowConfirm] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('dw_skip_confirm') === '1';
    } catch {
      return false;
    }
  });

  const handleOpenInMail = useCallback(() => {
    const emails = selectedProviders.map((p) => p.email);
    if (emails.length === 0) return;
    MailtoHelper.openInMailApp(emails, template.subject, template.body);
  }, [selectedProviders, template.subject, template.body]);

  const handleClickSend = useCallback(() => {
    if (dontShowConfirm) {
      handleOpenInMail();
    } else {
      setConfirmOpen(true);
    }
  }, [dontShowConfirm, handleOpenInMail]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      <ProviderList
        selectedProviderIds={selectedProviderIds}
        allProvidersSelected={allProvidersSelected}
        onToggle={handleToggle}
        onSelectAll={handleSelectAll}
        selectedCount={selectedCount}
        t={t}
      />

      <SendButton
        onClick={handleClickSend}
        disabled={selectedCount === 0}
        selectedCount={selectedCount}
        label={t.openInMail}
      />

      <PageFooter
        footerGDPR={t.footerGDPR}
        footerLearnMore={t.footerLearnMore}
        footerIMY={t.footerIMY}
        footerPrivacy={t.footerPrivacy}
        sourceCode={t.sourceCode}
      />

      <ConfirmSend
        open={confirmOpen}
        title={t.reminderTitle}
        bodyLine1={t.reminderBodyLine1}
        bodyLine2={t.reminderBodyLine2}
        dontShowLabel={t.reminderDontShow}
        cancelLabel={t.reminderCancel}
        continueLabel={t.reminderContinue}
        dontShow={dontShowConfirm}
        onToggleDontShow={(val) => {
          setDontShowConfirm(val);
          try {
            localStorage.setItem('dw_skip_confirm', val ? '1' : '0');
          } catch {}
        }}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleOpenInMail();
        }}
      />
    </div>
  );
}
