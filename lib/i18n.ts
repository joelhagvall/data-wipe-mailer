export type Language = 'sv' | 'en';
import type { ProviderId } from '@/types/provider';

export const translations = {
  sv: {
    title: 'Data Wipe Mailer',
    subtitle: 'Din digitala integritet är värdefull - utöva din rätt att radera personuppgifter innan de hamnar i fel händer',
    selectRecipients: 'Välj mottagare',
    selectRecipientsDesc: 'Klicka i de företag du vill skicka till',
    selectAll: 'Välj alla',
    deselectAll: 'Avmarkera alla',
    searchPlaceholder: 'Sök företag eller e-post...',
    openInMail: 'Öppna i mail-app',
    footerGDPR: 'Utöva dina rättigheter enligt GDPR Artikel 17 - Rätten till radering.',
    footerLearnMore: 'Läs mer på',
    footerIMY: 'Integritetsskyddsmyndigheten',
    footerPrivacy: 'Allt sker lokalt i din webbläsare. Inga uppgifter skickas till någon server.',
    sourceCode: 'Källkod tillgänglig på GitHub',
    reminderTitle: 'Innan du skickar',
    reminderBodyLine1: 'Kom ihåg att fylla i ditt personnummer i mailet innan du skickar.',
    reminderBodyLine2: 'Avsluta gärna med en hälsning, t.ex. "Med vänliga hälsningar" följt av ditt namn.',
    reminderDontShow: 'Visa inte igen',
    reminderCancel: 'Avbryt',
    reminderContinue: 'Fortsätt',
    providerDescriptions: {
      mrkoll: 'Personuppgiftssöktjänst med information om privatpersoner',
      ratsit: 'Sök- och informationstjänst för företag och privatpersoner',
      birthday: 'Födelsedagspåminnelser och personinformation',
      hitta: 'Sök- och karttjänst med personinformation',
      eniro: 'Sök- och telefonnummertjänst',
      biluppgifter: 'Söktjänst för fordons- och ägarinformation (inkl. personuppgifter om ägare)',
      merinfo: 'Sök- och informationstjänst för privatpersoner',
      upplysning: 'Sök- och upplysningstjänst för personer och företag',
      idmadress: 'Säljer dina personuppgifter utan att behöva uppge källa',
    } as Record<ProviderId, string>,
  },
  en: {
    title: 'Data Wipe Mailer',
    subtitle: 'Your digital privacy is valuable - exercise your right to delete personal data before it falls into the wrong hands',
    selectRecipients: 'Select recipients',
    selectRecipientsDesc: 'Click on the companies you want to send to',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    searchPlaceholder: 'Search company or email...',
    openInMail: 'Open in mail app',
    footerGDPR: 'Exercise your rights under GDPR Article 17 - Right to erasure.',
    footerLearnMore: 'Learn more at',
    footerIMY: 'Swedish Authority for Privacy Protection',
    footerPrivacy: 'Everything happens locally in your browser. No data is sent to any server.',
    sourceCode: 'Source code available on GitHub',
    reminderTitle: 'Before you send',
    reminderBodyLine1: 'Remember to add your personal identification number in the email before sending.',
    reminderBodyLine2: 'Also add a closing, e.g. "Best regards" followed by your name.',
    reminderDontShow: "Don't show again",
    reminderCancel: 'Cancel',
    reminderContinue: 'Continue',
    providerDescriptions: {
      mrkoll: 'Personal data search service with information about individuals',
      ratsit: 'Search and information service for companies and individuals',
      birthday: 'Birthday reminders and personal information',
      hitta: 'Search and map service with personal information',
      eniro: 'Search and phone number service',
      biluppgifter: 'Search service for vehicle and owner information (incl. personal data about owners)',
      merinfo: 'Search and information service for individuals',
      upplysning: 'Search and directory service for individuals and companies',
      idmadress: 'Sells your personal information without having to say where they got them from',
    } as Record<ProviderId, string>,
  },
};

export const emailTemplates = {
  sv: {
    subject: 'Begäran om radering av personuppgifter enligt GDPR',
    body: `Hej!


Mitt personnummer är:

Jag vill härmed radera mina uppgifter om mig.

Jag begär att alla personuppgifter som är kopplade till mig tas bort från era databaser och webbplatser. Detta innebär att ingen person ska kunna se information om mig, inklusive rättsliga dokument och andra uppgifter kopplade till mitt namn och personnummer, i er tjänst. Jag vill även att ni, så långt det är möjligt, uppgiftsminimerar och raderar de uppgifter ni håller om mig internt.

Ni kan hitta information om era skyldigheter på Integritetsskyddsmyndighetens webbplats (https://www.imy.se).

Jag ser fram emot bekräftelse på min begäran om radering snarast möjligt. Ni får gärna kontakta mig om ni har några frågor.


Med vänliga hälsningar,`,
  },
  en: {
    subject: 'Request for deletion of personal data under GDPR',
    body: `Hello!


My personal identification number is:

I hereby request the deletion of my personal data.

I request that all personal data associated with me be removed from your databases and websites. This means that no person should be able to see information about me, including legal documents and other data linked to my name and personal identification number, in your service. I also want you to minimize and delete the data you hold about me internally, as far as possible.

You can find information about your obligations on the Swedish Authority for Privacy Protection's website (https://www.imy.se).

I look forward to confirmation of my deletion request as soon as possible. Please feel free to contact me if you have any questions.


Best regards,`,
  },
};
