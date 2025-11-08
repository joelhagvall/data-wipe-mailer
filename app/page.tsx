'use client';

import { useEffect, useState } from 'react';
import { MailtoHelper } from '@/lib/mailto';
import { PageHeader } from '@/components/page-header';
import { PageFooter } from '@/components/page-footer';
import { ProviderList } from '@/components/provider-list';
import { SendButton } from '@/components/send-button';
import { useProviderSelection } from '@/hooks/use-provider-selection';
import { translations, emailTemplates, type Language } from '@/lib/i18n';
import { ConfirmSend } from '@/components/confirm-send';

export default function Home() {
  const [language, setLanguage] = useState<Language>('sv');
  const {
    selectedProviderIds,
    handleToggle,
    handleSelectAll,
    allProvidersSelected,
    selectedCount,
    selectedProviders,
  } = useProviderSelection();

  const t = translations[language];
  const template = emailTemplates[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'sv' ? 'en' : 'sv'));
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dontShowConfirm, setDontShowConfirm] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem('dw_skip_confirm');
      if (v) setDontShowConfirm(v === '1');
    } catch {}
  }, []);

  const handleClickSend = () => {
    if (dontShowConfirm) {
      handleOpenInMail();
    } else {
      setConfirmOpen(true);
    }
  };

  const handleOpenInMail = () => {
    const emails = selectedProviders.map((p) => p.email);
    if (emails.length === 0) return;

    MailtoHelper.openInMailApp(
      emails,
      template.subject,
      template.body
    );
  };

  return (
    <div className="min-h-screen bg-background">
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
      </div>
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
          try { localStorage.setItem('dw_skip_confirm', val ? '1' : '0'); } catch {}
        }}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); handleOpenInMail(); }}
      />
    </div>
  );
}
