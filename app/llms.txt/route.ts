import { getLlmsTxt } from '@/lib/markdown-pages';

export const dynamic = 'force-static';

export function GET() {
  return new Response(getLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
