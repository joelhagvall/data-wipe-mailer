import { NextResponse, type NextRequest } from 'next/server';
import { negotiate } from '@/lib/content-negotiation';
import { getMarkdownPage, getNotFoundMarkdown } from '@/lib/markdown-pages';
import { isContentPath } from '@/lib/site';

/**
 * Content negotiation for AI agents (https://acceptmarkdown.com):
 *
 * - `Accept: text/markdown` (preferred over text/html) → Markdown body, `Vary: Accept`
 * - `/index.md`, `/about.md`, … → Markdown regardless of Accept
 * - unknown path + Markdown requested → 404 with a short Markdown body
 * - Accept that allows neither HTML nor Markdown on a content page → 406
 * - everything else → normal HTML, but with `Vary: Accept` and an alternate link
 */

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
  'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
};

function markdownResponse(body: string, status = 200): NextResponse {
  return new NextResponse(body, { status, headers: MARKDOWN_HEADERS });
}

/** Map `/index.md` → `/`, `/about.md` → `/about`; returns null when not a .md URL. */
function stripMarkdownSuffix(pathname: string): string | null {
  if (!pathname.endsWith('.md')) return null;
  const base = pathname.slice(0, -3);
  if (base === '/index' || base === '') return '/';
  return base;
}

function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function proxy(request: NextRequest): NextResponse {
  const pathname = normalize(request.nextUrl.pathname);

  // Note: Next strips its own RSC/prefetch headers before the proxy runs, and those
  // client fetches send `Accept: */*`, so they always fall through to the HTML branch.
  const markdownPath = stripMarkdownSuffix(pathname);
  if (markdownPath !== null) {
    return isContentPath(markdownPath)
      ? markdownResponse(getMarkdownPage(markdownPath))
      : markdownResponse(getNotFoundMarkdown(pathname), 404);
  }

  // Requests for files (/image.png, /favicon.ico, …) are left untouched.
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  const wants = negotiate(request.headers.get('accept'));

  if (wants === 'markdown') {
    return isContentPath(pathname)
      ? markdownResponse(getMarkdownPage(pathname))
      : markdownResponse(getNotFoundMarkdown(pathname), 404);
  }

  if (wants === 'none' && isContentPath(pathname)) {
    return new NextResponse('406 Not Acceptable: this resource is available as text/html or text/markdown.\n', {
      status: 406,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', Vary: 'Accept' },
    });
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');
  if (isContentPath(pathname)) {
    const alternate = pathname === '/' ? '/index.md' : `${pathname}.md`;
    response.headers.set('Link', `<${alternate}>; rel="alternate"; type="text/markdown"`);
  }
  return response;
}

export const config = {
  matcher: [
    // Skip Next internals, static assets, metadata routes and well-known files.
    '/((?!_next/|api/|\\.well-known/|llms\\.txt|robots\\.txt|sitemap\\.xml|icon|image\\.png|favicon).*)',
  ],
};
