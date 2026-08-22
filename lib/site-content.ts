import type { Language } from '@/lib/i18n';
import { GITHUB_ISSUES_URL, GITHUB_URL, IMY_URL, SECURITY_CONTACT_URL } from '@/lib/site';

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PageContent {
  title: string;
  description: string;
  intro: string;
  sections: ContentSection[];
}

export type InfoPageKey = 'about' | 'contact' | 'privacy';

export const infoPages: Record<InfoPageKey, Record<Language, PageContent>> = {
  about: {
    sv: {
      title: 'Om Data Wipe Mailer',
      description:
        'Vad Data Wipe Mailer är, varför tjänsten finns och hur den hjälper dig att radera personuppgifter från svenska söktjänster.',
      intro:
        'Data Wipe Mailer är en gratis, öppen webbapp som hjälper privatpersoner i Sverige att utöva sin rätt till radering enligt GDPR artikel 17. Med några klick får du färdigskrivna raderingsbegäranden till svenska söktjänster och datamäklare som MrKoll, Ratsit, Hitta.se, Eniro, Birthday.se, Biluppgifter.se, Merinfo.se och Upplysning.se.',
      sections: [
        {
          heading: 'Varför finns tjänsten?',
          paragraphs: [
            'Svenska söktjänster samlar in och publicerar uppgifter om privatpersoner: namn, adress, ålder, telefonnummer, fordon och ibland ekonomi. Det är ofta lagligt, men uppgifterna kan missbrukas för bedrägerier, trakasserier eller kartläggning. Många vet att de har rätt att bli borttagna men ger upp eftersom varje tjänst har egna formulär, adresser och krav.',
            'Data Wipe Mailer samlar kontaktuppgifter och en juridiskt grundad mall på ett ställe så att det tar minuter i stället för timmar.',
          ],
        },
        {
          heading: 'Så fungerar det',
          bullets: [
            'Välj vilka tjänster du vill kontakta (eller välj alla).',
            'Klicka på "Öppna i mail-app". Ditt e-postprogram öppnas med mottagare, ämne och färdig text ifyllt.',
            'Fyll i ditt namn, din adress och eventuell länk till profilsidan. Ange personnummer bara om det behövs för säker identifiering.',
            'Granska och skicka. Svar kommer direkt till din egen e-post.',
          ],
        },
        {
          heading: 'Vem står bakom?',
          paragraphs: [
            `Data Wipe Mailer är ett ideellt projekt med öppen källkod, utvecklat av Joel Hägvall. Koden finns på GitHub (${GITHUB_URL}) och alla är välkomna att granska den, rapportera fel eller föreslå fler tjänster. Projektet är inte kopplat till någon myndighet eller till de företag som listas.`,
          ],
        },
      ],
    },
    en: {
      title: 'About Data Wipe Mailer',
      description:
        'What Data Wipe Mailer is, why it exists and how it helps you delete personal data from Swedish people-search services.',
      intro:
        'Data Wipe Mailer is a free, open-source web app that helps people in Sweden exercise their right to erasure under GDPR Article 17. In a few clicks you get pre-written deletion requests addressed to Swedish people-search services and data brokers such as MrKoll, Ratsit, Hitta.se, Eniro, Birthday.se, Biluppgifter.se, Merinfo.se and Upplysning.se.',
      sections: [
        {
          heading: 'Why does it exist?',
          paragraphs: [
            'Swedish people-search services collect and publish information about private individuals: names, addresses, age, phone numbers, vehicles and sometimes finances. This is often legal, but the data can be abused for fraud, harassment or profiling. Many people know they have the right to be removed but give up because every service has its own forms, addresses and requirements.',
            'Data Wipe Mailer gathers contact details and a legally grounded template in one place so the process takes minutes instead of hours.',
          ],
        },
        {
          heading: 'How it works',
          bullets: [
            'Pick the services you want to contact (or select all).',
            'Click "Open in mail app". Your email client opens with recipients, subject and body pre-filled.',
            'Add your name, address and, if available, a link to the profile page. Only include your personal identity number if it is needed for secure identification.',
            'Review and send. Replies arrive directly in your own inbox.',
          ],
        },
        {
          heading: 'Who is behind it?',
          paragraphs: [
            `Data Wipe Mailer is a non-commercial open-source project built by Joel Hägvall. The code lives on GitHub (${GITHUB_URL}) and anyone is welcome to review it, report bugs or suggest more services. The project is not affiliated with any authority or with the companies listed.`,
          ],
        },
      ],
    },
  },
  contact: {
    sv: {
      title: 'Kontakt',
      description: 'Så når du utvecklaren bakom Data Wipe Mailer: felrapporter, förslag på nya tjänster och säkerhetsrapporter.',
      intro:
        'Data Wipe Mailer drivs ideellt och all kommunikation sker öppet via GitHub. Det finns ingen kundtjänst och ingen telefon, men ärenden besvaras löpande.',
      sections: [
        {
          heading: 'Felrapporter och förslag',
          paragraphs: [
            `Har du hittat en felaktig e-postadress eller en söktjänst som saknas? Öppna ett ärende på GitHub: ${GITHUB_ISSUES_URL}. Beskriv gärna vilken tjänst det gäller och när du upptäckte problemet så kan uppgifterna verifieras och uppdateras snabbt.`,
          ],
        },
        {
          heading: 'Säkerhetsrapporter',
          paragraphs: [
            `Sårbarheter rapporteras privat via GitHub Security Advisories: ${SECURITY_CONTACT_URL}. Kontaktuppgifterna finns också i /.well-known/security.txt.`,
          ],
        },
        {
          heading: 'Frågor om dina personuppgifter hos söktjänsterna',
          paragraphs: [
            `Data Wipe Mailer lagrar inga personuppgifter och kan inte radera något åt dig. Frågor om en specifik radering ställs direkt till söktjänsten. Om en tjänst inte svarar inom en månad eller nekar din begäran kan du klaga hos Integritetsskyddsmyndigheten (IMY): ${IMY_URL}.`,
          ],
        },
      ],
    },
    en: {
      title: 'Contact',
      description: 'How to reach the developer behind Data Wipe Mailer: bug reports, suggestions for new services and security reports.',
      intro:
        'Data Wipe Mailer is a volunteer project and all communication happens in the open on GitHub. There is no customer service desk and no phone line, but issues are answered on a rolling basis.',
      sections: [
        {
          heading: 'Bug reports and suggestions',
          paragraphs: [
            `Found an incorrect email address or a people-search service that is missing? Open an issue on GitHub: ${GITHUB_ISSUES_URL}. Please mention which service it concerns and when you noticed the problem so the details can be verified and updated quickly.`,
          ],
        },
        {
          heading: 'Security reports',
          paragraphs: [
            `Vulnerabilities are reported privately via GitHub Security Advisories: ${SECURITY_CONTACT_URL}. The same contact is published in /.well-known/security.txt.`,
          ],
        },
        {
          heading: 'Questions about your data at the search services',
          paragraphs: [
            `Data Wipe Mailer stores no personal data and cannot delete anything on your behalf. Questions about a specific deletion go directly to the service in question. If a service does not reply within a month or rejects your request, you can file a complaint with the Swedish Authority for Privacy Protection (IMY): ${IMY_URL}.`,
          ],
        },
      ],
    },
  },
  privacy: {
    sv: {
      title: 'Integritetspolicy',
      description: 'Hur Data Wipe Mailer hanterar (och inte hanterar) dina uppgifter. Allt sker lokalt i din webbläsare.',
      intro:
        'Data Wipe Mailer är byggd för att skydda din integritet, inte samla in den. Appen har ingen backend, inga konton och ingen databas. Det du skriver i ditt e-postprogram lämnar aldrig din dator via den här sajten.',
      sections: [
        {
          heading: 'Vilka uppgifter samlas in?',
          paragraphs: [
            'Inga personuppgifter skickas till eller lagras av Data Wipe Mailer. När du klickar på "Öppna i mail-app" skapas en vanlig mailto-länk som öppnar ditt eget e-postprogram. Mottagare, ämne och text fylls i lokalt. Namn, adress och personnummer skriver du själv i e-postprogrammet och de passerar aldrig den här webbplatsen.',
          ],
        },
        {
          heading: 'Lokal lagring i webbläsaren',
          paragraphs: [
            'Dina val av språk, tema och om påminnelsen före utskick ska visas sparas i webbläsarens localStorage (nycklarna dw_lang, dw_theme och dw_skip_confirm). Uppgifterna lämnar aldrig din enhet och kan rensas när som helst via webbläsarens inställningar.',
          ],
        },
        {
          heading: 'Tredjepartstjänster',
          bullets: [
            'Hosting: webbplatsen körs på Vercel, som behandlar tekniska loggar (t.ex. IP-adress) för att leverera sidan.',
            'Statistik: Vercel Analytics samlar anonymiserad, aggregerad besöksstatistik utan cookies och utan att identifiera enskilda besökare.',
            'Logotyper: företagens ikoner hämtas från Googles favicon-tjänst (www.google.com/s2/favicons). Din webbläsare gör då en begäran till Google med företagets domännamn, aldrig med dina uppgifter.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: ['Data Wipe Mailer sätter inga cookies.'],
        },
        {
          heading: 'Dina rättigheter',
          paragraphs: [
            `Eftersom inga uppgifter lagras finns inget att begära ut, rätta eller radera hos Data Wipe Mailer. För uppgifter som söktjänsterna publicerar gäller dina rättigheter enligt GDPR, bland annat rätten till radering (artikel 17). Läs mer hos Integritetsskyddsmyndigheten: ${IMY_URL}.`,
          ],
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      description: 'How Data Wipe Mailer handles (and does not handle) your data. Everything happens locally in your browser.',
      intro:
        'Data Wipe Mailer is built to protect your privacy, not collect it. The app has no backend, no accounts and no database. What you type into your email client never leaves your computer through this site.',
      sections: [
        {
          heading: 'What data is collected?',
          paragraphs: [
            'No personal data is sent to or stored by Data Wipe Mailer. When you click "Open in mail app" a regular mailto link is created that opens your own email client. Recipients, subject and body are filled in locally. Your name, address and personal identity number are typed by you in the email client and never pass through this website.',
          ],
        },
        {
          heading: 'Local storage in the browser',
          paragraphs: [
            'Your choice of language, theme and whether the pre-send reminder should be shown are saved in the browser\'s localStorage (keys dw_lang, dw_theme and dw_skip_confirm). This data never leaves your device and can be cleared at any time through your browser settings.',
          ],
        },
        {
          heading: 'Third-party services',
          bullets: [
            'Hosting: the site runs on Vercel, which processes technical logs (e.g. IP address) in order to serve the page.',
            'Analytics: Vercel Analytics collects anonymised, aggregated visit statistics without cookies and without identifying individual visitors.',
            'Logos: company icons are fetched from Google\'s favicon service (www.google.com/s2/favicons). Your browser then makes a request to Google containing the company\'s domain name, never your data.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: ['Data Wipe Mailer sets no cookies.'],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            `Since no data is stored there is nothing to access, rectify or delete at Data Wipe Mailer. For data published by the search services, your GDPR rights apply, including the right to erasure (Article 17). Read more at the Swedish Authority for Privacy Protection: ${IMY_URL}.`,
          ],
        },
      ],
    },
  },
};

/** Short "how it works" block shown on the homepage (SSR'd, both languages). */
export const howItWorks: Record<Language, { heading: string; steps: string[]; whenToUse: string }> = {
  sv: {
    heading: 'Så funkar det',
    steps: [
      'Välj de söktjänster du vill kontakta, eller välj alla.',
      'Klicka på "Öppna i mail-app". Ditt e-postprogram öppnas med mottagare, ämne och en färdig raderingsbegäran enligt GDPR artikel 17.',
      'Fyll i namn och adress, granska och skicka. Ingenting sparas eller skickas via den här sajten.',
    ],
    whenToUse:
      'Använd Data Wipe Mailer när du vill bli borttagen från MrKoll, Ratsit, Hitta.se, Eniro, Birthday.se, Biluppgifter.se, Merinfo.se och Upplysning.se utan att leta upp varje tjänst för sig.',
  },
  en: {
    heading: 'How it works',
    steps: [
      'Pick the people-search services you want to contact, or select all.',
      'Click "Open in mail app". Your email client opens with recipients, subject and a ready-made erasure request under GDPR Article 17.',
      'Add your name and address, review and send. Nothing is stored or sent through this site.',
    ],
    whenToUse:
      'Use Data Wipe Mailer when you want to be removed from MrKoll, Ratsit, Hitta.se, Eniro, Birthday.se, Biluppgifter.se, Merinfo.se and Upplysning.se without tracking down each service yourself.',
  },
};
