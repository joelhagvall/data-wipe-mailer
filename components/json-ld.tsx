import { GITHUB_ISSUES_URL, GITHUB_URL, SECURITY_CONTACT_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * Site-wide JSON-LD (schema.org) so crawlers and AI agents can resolve who we are
 * and what the tool does without parsing the UI.
 */
export function buildJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/image.png`,
        description: SITE_DESCRIPTION,
        foundingLocation: { '@type': 'Country', name: 'Sweden' },
        address: { '@type': 'PostalAddress', addressCountry: 'SE' },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: GITHUB_ISSUES_URL,
            availableLanguage: ['sv', 'en'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'security',
            url: SECURITY_CONTACT_URL,
            availableLanguage: ['sv', 'en'],
          },
        ],
        sameAs: [GITHUB_URL],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: ['sv', 'en'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript and an email client',
        inLanguage: ['sv', 'en'],
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'SEK' },
        author: { '@type': 'Person', name: 'Joel Hägvall', url: 'https://github.com/joelhagvall' },
        publisher: { '@id': organizationId },
        featureList: [
          'Pre-written GDPR Article 17 deletion request in Swedish and English',
          'Deletion email addresses for Swedish people-search services',
          'Runs entirely in the browser - no data is stored or sent',
        ],
        codeRepository: GITHUB_URL,
      },
    ],
  };
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; escape "<" to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c') }}
    />
  );
}
