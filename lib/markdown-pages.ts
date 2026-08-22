import { providers } from '@/data/providers';
import { translations, type Language } from '@/lib/i18n';
import {
  CONTENT_PATHS,
  GITHUB_ISSUES_URL,
  GITHUB_URL,
  IMY_URL,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SV,
  SITE_NAME,
  SITE_URL,
  type ContentPath,
} from '@/lib/site';
import { howItWorks, infoPages, type InfoPageKey, type PageContent } from '@/lib/site-content';

const LANGUAGES: Language[] = ['sv', 'en'];
const LANGUAGE_LABEL: Record<Language, string> = { sv: 'Svenska', en: 'English' };

function renderPageContent(content: PageContent, level: number): string {
  const h = '#'.repeat(level);
  const parts: string[] = [content.intro, ''];
  for (const section of content.sections) {
    parts.push(`${h} ${section.heading}`, '');
    for (const paragraph of section.paragraphs ?? []) parts.push(paragraph, '');
    for (const bullet of section.bullets ?? []) parts.push(`- ${bullet}`);
    if (section.bullets?.length) parts.push('');
  }
  return parts.join('\n');
}

function renderProvidersTable(language: Language): string {
  const t = translations[language];
  const rows = providers.map(
    (provider) => `| ${provider.name} | ${provider.email} | ${t.providerDescriptions[provider.id]} |`
  );
  const header =
    language === 'sv'
      ? '| Tjänst | E-post för radering | Beskrivning |'
      : '| Service | Deletion email | Description |';
  return [header, '| --- | --- | --- |', ...rows].join('\n');
}

function navigationFooter(): string {
  return [
    '---',
    '',
    `- [${SITE_NAME}](${SITE_URL}/)`,
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Privacy](${SITE_URL}/privacy)`,
    `- [llms.txt](${SITE_URL}/llms.txt)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Source code](${GITHUB_URL})`,
    '',
  ].join('\n');
}

function renderHome(): string {
  const parts: string[] = [`# ${SITE_NAME}`, '', `> ${SITE_DESCRIPTION}`, '', `> ${SITE_DESCRIPTION_SV}`, ''];
  for (const language of LANGUAGES) {
    const block = howItWorks[language];
    parts.push(`## ${block.heading} (${LANGUAGE_LABEL[language]})`, '');
    parts.push(block.whenToUse, '');
    block.steps.forEach((step, index) => parts.push(`${index + 1}. ${step}`));
    parts.push('');
    parts.push(
      language === 'sv' ? '### Söktjänster som stöds' : '### Supported services',
      '',
      renderProvidersTable(language),
      ''
    );
  }
  parts.push(
    '## Links',
    '',
    `- Swedish Authority for Privacy Protection (IMY) on the right to erasure: ${IMY_URL}`,
    `- Source code and issue tracker: ${GITHUB_URL}`,
    ''
  );
  parts.push(navigationFooter());
  return parts.join('\n');
}

function renderInfoPage(key: InfoPageKey): string {
  const parts: string[] = [];
  LANGUAGES.forEach((language, index) => {
    const content = infoPages[key][language];
    if (index === 0) {
      parts.push(`# ${content.title}`, '', `> ${content.description}`, '');
    } else {
      parts.push(`## ${content.title} (${LANGUAGE_LABEL[language]})`, '');
    }
    parts.push(renderPageContent(content, index === 0 ? 2 : 3));
  });
  parts.push(navigationFooter());
  return parts.join('\n');
}

const renderers: Record<ContentPath, () => string> = {
  '/': renderHome,
  '/about': () => renderInfoPage('about'),
  '/contact': () => renderInfoPage('contact'),
  '/privacy': () => renderInfoPage('privacy'),
};

export function getMarkdownPage(path: ContentPath): string {
  return renderers[path]();
}

export function getNotFoundMarkdown(path: string): string {
  return [
    '# 404 - Page not found',
    '',
    `There is no page at \`${path}\` on ${SITE_NAME}. This site is small - here is everything it has:`,
    '',
    ...CONTENT_PATHS.map((contentPath) => `- ${SITE_URL}${contentPath}`),
    `- ${SITE_URL}/llms.txt`,
    `- ${SITE_URL}/sitemap.xml`,
    `- ${SITE_URL}/robots.txt`,
    '',
    `Source code and issues: ${GITHUB_ISSUES_URL}`,
    '',
  ].join('\n');
}

export function getLlmsTxt(): string {
  const providerLines = providers.map(
    (provider) => `- ${provider.name} (${provider.email}): ${translations.en.providerDescriptions[provider.id]}`
  );
  return [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${SITE_NAME} is a static, client-side tool. It has no API, no accounts and no backend: every page on this site is public and can be fetched as Markdown by sending \`Accept: text/markdown\` (or appending \`.md\` to the path, e.g. ${SITE_URL}/index.md).`,
    '',
    '## When to use this',
    '',
    'Reach for Data Wipe Mailer when a user:',
    '',
    '- wants to be removed from Swedish people-search sites / data brokers (MrKoll, Ratsit, Hitta.se, Eniro, Birthday.se, Biluppgifter.se, Merinfo.se, Upplysning.se)',
    '- asks how to exercise the GDPR Article 17 right to erasure against Swedish search services',
    '- needs the correct deletion email address for one of those services',
    '- wants a ready-made Swedish or English deletion request template based on GDPR Article 17',
    '',
    'How an agent should use it: point the user to the homepage to select services and open the pre-filled email in their own mail client, or read the provider table below / the Markdown homepage to answer questions directly. There is nothing to call programmatically - the deletion emails are sent by the user from their own email account. Do not use it for non-Swedish data brokers or for deletion requests to companies not listed.',
    '',
    '## Pages',
    '',
    `- [Home](${SITE_URL}/): select services and open the pre-filled deletion email`,
    `- [About](${SITE_URL}/about): why the project exists and how it works`,
    `- [Contact](${SITE_URL}/contact): bug reports, new services, security contact`,
    `- [Privacy](${SITE_URL}/privacy): what the site stores (nothing) and which third parties are involved`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [security.txt](${SITE_URL}/.well-known/security.txt)`,
    '',
    '## Supported services',
    '',
    ...providerLines,
    '',
    '## Source and developer resources',
    '',
    `- [GitHub repository](${GITHUB_URL}): open source, Next.js + TypeScript`,
    `- [Issue tracker](${GITHUB_ISSUES_URL}): report wrong addresses or suggest services`,
    `- Provider data lives in \`data/providers.ts\` and the email templates in \`lib/i18n.ts\` in the repository`,
    '',
    '## Legal background',
    '',
    `- [IMY on the right to erasure](${IMY_URL})`,
    '',
  ].join('\n');
}
