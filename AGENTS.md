# Project guidance

## Scope and architecture

This is the initial public foundation of Jamia Madnia Arabia, based on the supplied V3 English design. Keep changes small and runnable. Use Next.js App Router, strict TypeScript, Tailwind CSS, shadcn-style local components backed by Radix, and Lucide. Add Motion, Embla, React Hook Form/Zod, Recharts, Vitest, and provider SDKs when an implemented feature needs them, rather than installing unused services.

- `src/app/[locale]`: English/Urdu routes and server-rendered pages. Await App Router params.
- `src/components/ui`: shared shadcn/Radix primitives. Keep these independent of business data.
- `src/components`: site composition and the smallest necessary client interactions.
- `src/lib`: shared helpers and translation types.
- `src/content`: approved public content only. Never store student records or secrets here.
- `src/app/api`: server endpoints. Health is the only initial endpoint.
- `docs`: design rules, architecture decisions, and the next implementation phase.

Use PascalCase for React exports, kebab-case for filenames, and descriptive types. Default to server components; opt into client components only for interactions. Do not change the framework to a hosting-specific substitute without the user's approval.

## Content and language

Do not invent institutional history, dates, founder names, contact details, financial claims, photographs, religious answers, or admissions dates. Await approved information. Preserve equivalent English and Urdu pages when extending navigation. Keep `lang` and `dir` on the actual HTML element. Use logical spacing/alignment and test mixed Arabic/English text. The bundled Noto Nastaliq Urdu font is OFL licensed; retain its package license. See `docs/design-system.md`.

## Access boundaries

Portal/admin pages are information placeholders, not working authenticated areas. Do not add demo logins, client-side role checks, public signup for Super Admin, or student fixtures to public bundles. Before accessing private data, implement managed authentication, MFA for Super Admin, and server-enforced authorization. Every student query and download must check a verified guardian-student relationship and published status. There is exactly one Super Admin role; teachers do not get accounts.

Keep database credentials and provider tokens server-side. `.env.example` contains names only. Private report files must never go in `public/`. Preserve all published report versions; corrections create new versions. Email is for notifications only; student PDFs are delivered via authorized WhatsApp and private portal downloads.

## Quality and verification

Run `npm run build`, `npm run typecheck`, and relevant Playwright checks. Browser tests use the production build. Check English desktop, Urdu RTL, mobile menu, library keyboard navigation, visible focus, reduced motion, and horizontal overflow. Use axe-core and screenshots for major screens; do not treat automated checks as a substitute for review. Never claim browser checks passed if the browser could not run. See `docs/roadmap.md` before adding backend features.
