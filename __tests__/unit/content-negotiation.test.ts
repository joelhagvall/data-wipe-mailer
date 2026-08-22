import { negotiate, parseAccept } from '@/lib/content-negotiation';

describe('content negotiation', () => {
  describe('parseAccept', () => {
    it('returns an empty list for a missing header', () => {
      expect(parseAccept(null)).toEqual([]);
      expect(parseAccept('')).toEqual([]);
    });

    it('parses media ranges with q-values', () => {
      expect(parseAccept('text/html, text/markdown;q=0.8, */*;q=0.1')).toEqual([
        { type: 'text', subtype: 'html', q: 1, specificity: 2 },
        { type: 'text', subtype: 'markdown', q: 0.8, specificity: 2 },
        { type: '*', subtype: '*', q: 0.1, specificity: 0 },
      ]);
    });
  });

  describe('negotiate', () => {
    it('serves HTML to browsers and when no Accept header is sent', () => {
      expect(negotiate(null)).toBe('html');
      expect(negotiate('*/*')).toBe('html');
      expect(
        negotiate('text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8')
      ).toBe('html');
    });

    it('serves Markdown when it is explicitly requested', () => {
      expect(negotiate('text/markdown')).toBe('markdown');
      expect(negotiate('text/markdown, */*;q=0.5')).toBe('markdown');
      expect(negotiate('text/markdown;q=0.9, text/html;q=0.8')).toBe('markdown');
    });

    it('honours q-values when HTML is preferred over Markdown', () => {
      expect(negotiate('text/html, text/markdown;q=0.5')).toBe('html');
      expect(negotiate('text/markdown;q=0, text/html')).toBe('html');
    });

    it('prefers explicit text/markdown over an equal wildcard', () => {
      expect(negotiate('text/markdown, */*')).toBe('markdown');
      expect(negotiate('text/*')).toBe('html');
    });

    it('returns none when neither HTML nor Markdown is acceptable', () => {
      expect(negotiate('application/json')).toBe('none');
      expect(negotiate('image/png, text/html;q=0')).toBe('none');
    });
  });
});
