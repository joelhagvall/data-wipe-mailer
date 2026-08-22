/**
 * Minimal RFC 9110 Accept-header negotiation between HTML and Markdown.
 * Used by proxy.ts to serve `text/markdown` to agents that ask for it
 * (see https://acceptmarkdown.com).
 */

export const MARKDOWN_TYPE = 'text/markdown';
export const HTML_TYPE = 'text/html';

export type NegotiatedType = 'html' | 'markdown' | 'none';

interface AcceptEntry {
  type: string;
  subtype: string;
  q: number;
  specificity: number;
}

export function parseAccept(header: string | null | undefined): AcceptEntry[] {
  if (!header) return [];
  return header
    .split(',')
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const [mediaRange, ...params] = raw.split(';').map((part) => part.trim());
      const [type = '*', subtype = '*'] = mediaRange.toLowerCase().split('/');
      let q = 1;
      for (const param of params) {
        const [key, value] = param.split('=').map((part) => part.trim());
        if (key === 'q') {
          const parsed = Number.parseFloat(value);
          q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0;
        }
      }
      const specificity = type === '*' ? 0 : subtype === '*' ? 1 : 2;
      return { type, subtype, q, specificity };
    });
}

function quality(entries: AcceptEntry[], fullType: string): number {
  const [type, subtype] = fullType.split('/');
  let best: AcceptEntry | undefined;
  for (const entry of entries) {
    const typeMatches = entry.type === '*' || entry.type === type;
    const subtypeMatches = entry.subtype === '*' || entry.subtype === subtype;
    if (!typeMatches || !subtypeMatches) continue;
    if (!best || entry.specificity > best.specificity) best = entry;
  }
  return best ? best.q : 0;
}

/**
 * Decide which representation to serve.
 *
 * - No Accept header (or only wildcards) → HTML, like a browser.
 * - Markdown explicitly preferred over HTML → Markdown.
 * - Neither HTML, Markdown nor a matching wildcard acceptable → 'none' (406).
 */
export function negotiate(header: string | null | undefined): NegotiatedType {
  const entries = parseAccept(header);
  if (entries.length === 0) return 'html';

  const markdownQ = quality(entries, MARKDOWN_TYPE);
  const htmlQ = quality(entries, HTML_TYPE);

  if (markdownQ === 0 && htmlQ === 0) return 'none';
  if (markdownQ > htmlQ) return 'markdown';
  if (markdownQ === htmlQ && markdownQ > 0) {
    // Tie: prefer the more specific entry (explicit text/markdown beats */*).
    const markdownExplicit = entries.some((entry) => entry.type === 'text' && entry.subtype === 'markdown');
    const htmlExplicit = entries.some((entry) => entry.type === 'text' && entry.subtype === 'html');
    if (markdownExplicit && !htmlExplicit) return 'markdown';
  }
  return 'html';
}
