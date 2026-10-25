# Jamia Madnia Arabia

A small, runnable foundation for the V3 Islamic institution website plan. The initial release is a bilingual public website; academic services are deliberately deferred.

## Run locally

Requires Node.js 20.9 or newer (Node 24 LTS recommended) and npm.

```sh
npm install
npm run dev
```

Open **http://localhost:3000**. `/` redirects to `/en`; `/ur` is the Urdu RTL version. No accounts, environment variables, database, or paid services are needed.

```sh
npm run build
npm start
```

Use these two commands for a production server. Set `PORT` through your host if it needs a port other than 3000.

## Included

- Next.js App Router, strict TypeScript, Tailwind CSS v4, shadcn-style Button and Tabs with Radix primitives, and Lucide icons.
- English/Urdu homepage, institution introduction, education, library, and contact routes.
- Responsive navigation, a same-page language switch, accessible category tabs, and library search.
- Larger typography, a prominent emerald ribbon, and colorful teal, gold, and blue accents.
- An Embla homepage slideshow with three locally stored, generated placeholder campus images, 5-second automatic advance, arrows, slide dots, swipe/keyboard navigation, and pause controls. Autoplay pauses on hover/focus and stops for reduced motion or a hidden tab.
- Clear empty states awaiting approved public content; no fabricated institution details.
- Parent portal and Super Admin entry pages that explicitly state sign-in is not available. They expose no private records or management actions.
- Self-hosted OFL-licensed Noto Nastaliq Urdu; no runtime Google Fonts request.
- `/api/health`, basic security headers, strict types, and Playwright/axe acceptance checks.

The search operates on `src/content/resources.ts`, which is intentionally empty until approved resources exist. It matches title/description in the selected language and category. Announcements and contact details likewise await approval. The slideshow images are fictional illustrations, clearly labeled as placeholders, and do not depict the real institution.

Slideshow settings live in `src/content/slideshow.ts`: replace image paths/text, enable or hide individual images, reorder the array, set `maxSlides`, and set `loop`. The future admin interface can manage this same configuration shape. Admin editing is not implemented in this update. See [slideshow assets and configuration](docs/slideshow.md).

## Verify

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

Playwright starts the production server on port 3100. The suite covers public routes, English/Urdu page switching, mobile navigation, search/category empty states, missing pages, safe portal/admin placeholders, health, accessibility, and representative screenshots. Screenshots are written to `test-results/` and are ignored by Git; they are review artifacts, not approved visual baselines.

To use an installed Chrome instead of downloading Chromium, set `PLAYWRIGHT_CHANNEL=chrome` before running the suite (PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'`).

## Publish the public foundation

This repository uses standard Next.js, with no host-specific runtime. Import it into a Next.js-compatible host (for example Vercel), or deploy a Node server using `npm ci`, `npm run build`, and `npm start`. Build the public version without secrets. The health check is `/api/health`.

Hosting/domain selection remains open in the design plan. No cloud deployment or domain is provisioned by this scaffold. Publishing the current version makes the public pages and informational portal/admin placeholders available; it does **not** launch academic services.

Before a public launch, replace pending institutional content with approved text, verify the institution name and Urdu translation, add verified contact details, and review the pages on mobile. Update page metadata when the real domain is selected.

## Next development

See [architecture](docs/architecture.md), [design system](docs/design-system.md), and [roadmap](docs/roadmap.md). `AGENTS.md` records constraints for later development.

Managed PostgreSQL/auth/private storage, admissions forms, PDF generation, student records, MFA, WhatsApp, and email integrations are not implemented. Avoid collecting personal information until those boundaries are built and tested. Motion, React Hook Form/Zod, Recharts, and Vitest remain feature-specific additions rather than unused dependencies.

Framework setup follows the official [Next.js installation documentation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
