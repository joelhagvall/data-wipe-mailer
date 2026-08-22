export const SITE_URL = 'https://data-wipe-mailer.vercel.app';
export const SITE_NAME = 'Data Wipe Mailer';
export const SITE_DESCRIPTION =
  'Free, open-source web app that helps people in Sweden exercise their GDPR Article 17 right to erasure by sending pre-written deletion requests to Swedish people-search sites and data brokers. Runs 100% in the browser.';
export const SITE_DESCRIPTION_SV =
  'Gratis, öppen webbapp som hjälper dig att utöva din rätt till radering enligt GDPR artikel 17 genom att skicka färdigskrivna raderingsbegäranden till svenska söktjänster och datamäklare. Allt sker i din webbläsare.';
export const GITHUB_URL = 'https://github.com/joelhagvall/data-wipe-mailer';
export const GITHUB_ISSUES_URL = `${GITHUB_URL}/issues`;
export const SECURITY_CONTACT_URL = `${GITHUB_URL}/security/advisories/new`;
export const IMY_URL = 'https://www.imy.se/privatperson/dataskydd/dina-rattigheter/radering/';

/** Paths that have a real HTML page and a Markdown representation. */
export const CONTENT_PATHS = ['/', '/about', '/contact', '/privacy'] as const;
export type ContentPath = (typeof CONTENT_PATHS)[number];

export function isContentPath(path: string): path is ContentPath {
  return (CONTENT_PATHS as readonly string[]).includes(path);
}
