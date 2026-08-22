import { providers } from '@/data/providers';
import { getLlmsTxt, getMarkdownPage, getNotFoundMarkdown } from '@/lib/markdown-pages';
import { CONTENT_PATHS, SITE_URL } from '@/lib/site';
import { infoPages } from '@/lib/site-content';
import { buildJsonLd } from '@/components/json-ld';

describe('markdown pages', () => {
  it('renders a Markdown document with an H1 for every content path', () => {
    CONTENT_PATHS.forEach((path) => {
      const markdown = getMarkdownPage(path);
      expect(markdown.startsWith('# ')).toBe(true);
      expect(markdown).toContain(`${SITE_URL}/llms.txt`);
    });
  });

  it('lists every provider with its deletion email on the homepage', () => {
    const markdown = getMarkdownPage('/');
    providers.forEach((provider) => {
      expect(markdown).toContain(provider.name);
      expect(markdown).toContain(provider.email);
    });
  });

  it('includes both languages on info pages', () => {
    expect(getMarkdownPage('/about')).toContain(infoPages.about.sv.title);
    expect(getMarkdownPage('/about')).toContain(infoPages.about.en.title);
    expect(getMarkdownPage('/privacy')).toContain('localStorage');
  });

  it('renders a helpful 404 body that points at the sitemap', () => {
    const markdown = getNotFoundMarkdown('/nope');
    expect(markdown).toContain('404');
    expect(markdown).toContain('/nope');
    expect(markdown).toContain(`${SITE_URL}/sitemap.xml`);
  });

  it('renders an llms.txt with a when-to-use section and all providers', () => {
    const llms = getLlmsTxt();
    expect(llms.startsWith('# Data Wipe Mailer')).toBe(true);
    expect(llms).toMatch(/## When to use this/);
    providers.forEach((provider) => expect(llms).toContain(provider.email));
  });
});

describe('info page content', () => {
  it('has at least 500 characters of text per page and language', () => {
    (['about', 'contact', 'privacy'] as const).forEach((key) => {
      (['sv', 'en'] as const).forEach((language) => {
        const page = infoPages[key][language];
        const text = [
          page.intro,
          ...page.sections.flatMap((section) => [...(section.paragraphs ?? []), ...(section.bullets ?? [])]),
        ].join(' ');
        expect(text.length).toBeGreaterThanOrEqual(500);
      });
    });
  });
});

describe('JSON-LD', () => {
  it('contains an Organization with contactPoint and address plus a WebApplication', () => {
    const graph = buildJsonLd()['@graph'] as Array<Record<string, unknown>>;
    const types = graph.map((node) => node['@type']);
    expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite', 'WebApplication']));

    const organization = graph.find((node) => node['@type'] === 'Organization')!;
    expect(organization.contactPoint).toBeDefined();
    expect(organization.address).toMatchObject({ '@type': 'PostalAddress', addressCountry: 'SE' });
  });
});
