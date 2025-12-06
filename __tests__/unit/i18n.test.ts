import { translations, emailTemplates, type Language } from '@/lib/i18n';

describe('i18n', () => {
  const languages: Language[] = ['sv', 'en'];

  describe('translations', () => {
    it('should have translations for all supported languages', () => {
      languages.forEach((lang) => {
        expect(translations[lang]).toBeDefined();
      });
    });

    it('should have the same keys in all language translations', () => {
      const svKeys = Object.keys(translations.sv).sort();
      const enKeys = Object.keys(translations.en).sort();
      expect(svKeys).toEqual(enKeys);
    });

    it('should have non-empty title in all languages', () => {
      languages.forEach((lang) => {
        expect(translations[lang].title).toBeDefined();
        expect(translations[lang].title.trim()).not.toBe('');
      });
    });

    it('should have non-empty subtitle in all languages', () => {
      languages.forEach((lang) => {
        expect(translations[lang].subtitle).toBeDefined();
        expect(translations[lang].subtitle.trim()).not.toBe('');
      });
    });

    it('should have all UI strings defined', () => {
      const requiredKeys = [
        'selectRecipients',
        'selectAll',
        'deselectAll',
        'openInMail',
        'footerGDPR',
        'reminderTitle',
        'reminderCancel',
        'reminderContinue',
      ];

      languages.forEach((lang) => {
        requiredKeys.forEach((key) => {
          expect(translations[lang][key as keyof typeof translations.sv]).toBeDefined();
        });
      });
    });

    it('should have provider descriptions for all providers', () => {
      const providerIds = ['mrkoll', 'ratsit', 'birthday', 'hitta', 'eniro', 'biluppgifter', 'merinfo', 'upplysning'];

      languages.forEach((lang) => {
        providerIds.forEach((id) => {
          expect(translations[lang].providerDescriptions[id as keyof typeof translations.sv.providerDescriptions]).toBeDefined();
        });
      });
    });
  });

  describe('emailTemplates', () => {
    it('should have email templates for all supported languages', () => {
      languages.forEach((lang) => {
        expect(emailTemplates[lang]).toBeDefined();
      });
    });

    it('should have subject and body in all templates', () => {
      languages.forEach((lang) => {
        expect(emailTemplates[lang].subject).toBeDefined();
        expect(emailTemplates[lang].body).toBeDefined();
      });
    });

    it('should have non-empty subjects', () => {
      languages.forEach((lang) => {
        expect(emailTemplates[lang].subject.trim()).not.toBe('');
      });
    });

    it('should have GDPR reference in email body', () => {
      languages.forEach((lang) => {
        expect(emailTemplates[lang].body.toLowerCase()).toMatch(/gdpr|personuppgift|personal data/);
      });
    });

    it('should mention IMY website in email body', () => {
      languages.forEach((lang) => {
        expect(emailTemplates[lang].body).toContain('imy.se');
      });
    });

    it('should have placeholder for personal identification number', () => {
      // Swedish template
      expect(emailTemplates.sv.body).toContain('personnummer');
      // English template
      expect(emailTemplates.en.body).toContain('personal identification number');
    });
  });
});
