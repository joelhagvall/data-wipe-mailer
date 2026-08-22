# data-wipe-mailer

Next.js 16 (App Router, React 19, Tailwind 4, shadcn/ui) app that opens pre-filled GDPR Art. 17 deletion emails to Swedish people-search services. 100 % client-side, no backend. Deployed on Vercel at https://data-wipe-mailer.vercel.app (auto-deploys from `main`).

## Commands
- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm test` (jest, `__tests__/unit` + `__tests__/integration`), `pnpm lint`, `npx tsc --noEmit`
- Run all three before committing.

## Git rules
- **NEVER add `Co-Authored-By`, `Claude-Session` or any other trailer to commit messages. Ever.**
- Never commit or push unless explicitly asked.
- Check `git status` first. Commit only the current session's work; if pre-existing uncommitted changes are entangled, ask — don't sweep them up.

## Layout
- `data/providers.ts` – the providers (id, name, email, category). `types/provider.ts` – types.
- `lib/i18n.ts` – sv/en UI strings + email templates. `lib/mailto.ts` – mailto builder.
- `lib/site.ts`, `lib/site-content.ts` – site constants and the sv/en content for `/about`, `/contact`, `/privacy` and the homepage "how it works" block.
- `lib/markdown-pages.ts` – Markdown renderings of every page, the Markdown 404 and `/llms.txt`.
- `proxy.ts` – `Accept: text/markdown` content negotiation (acceptmarkdown.com), `.md` URLs, 406, Markdown 404. Next strips RSC headers before the proxy runs; don't rely on them there.
- `components/json-ld.tsx` – schema.org graph injected in `app/layout.tsx`.
- Agent-readiness is measured with `npx is-agentic data-wipe-mailer.vercel.app` (CLI only reads the cached report; a fresh scan must be started at https://is-agentic.com).

## Conventions
- Language is client-side state (`dw_lang` in localStorage); server-rendered pages show Swedish first, then English.
- Keep headings semantic (`h1` → `h2` → `h3`; use `<CardTitle asChild><h2>…`).
- Don't invent contact details (emails, addresses) for the project; use GitHub issues / security advisories.
