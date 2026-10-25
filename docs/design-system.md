# Shared design foundation

## Tokens and composition

The shared tokens live in `src/app/globals.css` and are mapped into Tailwind v4 with `@theme inline`. Use warm ivory surfaces, an emerald ribbon and primary actions, teal feature panels, and gold/blue accents. Body copy and navigation should be comfortably readable; the top ribbon stays at least 15px on phones and 17px on desktop. Shared primitives belong in `src/components/ui`; global composition belongs in named site components.

English uses Calibri when installed, then system UI fallbacks; editorial headings use Georgia. Urdu uses a self-hosted Noto Nastaliq Urdu regular font, licensed under SIL OFL in its npm package. Generous Urdu line height is intentional. Never apply Latin tracking to Urdu or squeeze Nastaliq into a fixed-height text container.

The public layout has a maximum content width of 1200px, with 20px side gutters on phones. Cards carry modest borders and small radii. Later portal/admin layouts should reuse colors, spacing, button states, and typography while prioritizing readable tables and forms.

The homepage follows the user's annotated 18 October PDF: the Arabic quotation strip sits directly below navigation, followed by an edge-to-edge image-only slideshow hero. The welcome heading, introduction, and actions form a separate section below the hero, with a two-column editorial layout on desktop and a stacked layout on mobile. Both English and Urdu use this section order; Urdu mirrors the columns and logical borders. These styles live in `src/app/homepage.css`. The cards, announcements, family panel, and other pages retain their existing content and behavior.

## Language and accessibility

- HTML `lang` and `dir` reflect the selected route. Switch language while preserving the page.
- Use logical properties (`margin-inline`, `inset-inline-start`) and flip directional arrows in RTL.
- Arabic quotations have their own `lang="ar"` and `dir="rtl"`.
- Maintain semantic headings, named landmarks, labeled inputs, keyboard-operable Radix tabs, visible focus, and a skip link.
- Mobile navigation is a normal disclosure: `aria-expanded`, labeled control, Escape closes and restores focus. It is not a modal dialog and does not trap focus.
- Links navigate; buttons act. Empty content should have an honest empty state. Never simulate a successful submission.
- Respect reduced motion. Add Motion only for a useful transition. Do not auto-animate decorative elements.

## Later images, forms, and reports

The user explicitly requested dummy institute images for the initial slideshow. It uses three locally stored generated campus illustrations, with a visible placeholder disclosure in both languages. Replace them with institution-approved photos when available. Embla supplies looping, swipe, and RTL support; the component adds 5-second advance, smooth transitions, arrows/dots, keyboard controls, pause, hover/focus/visibility handling, responsive Next.js images, and reduced-motion support. See `docs/slideshow.md` for the future admin configuration boundary.

Use React Hook Form and Zod when a real validated form is introduced. Include pending, field-error, server-error, and success states. Do not collect student data in a public form without the approved onboarding design and secure backend.

Use Recharts with real approved data, numeric labels, grayscale-readable charts, and a table/text alternative. Choose a PDF renderer only after testing Arabic/Urdu shaping, pagination, tables, and chart fidelity. A private PDF download must pass server-side authorization.

## Review

Check desktop English and phone Urdu layouts, keyboard navigation, long headings, mixed-script strings, offline/error states for any new fetch, and 200% zoom. Playwright captures review screenshots and runs axe; manually review screenshots before a public release. Automated tools cannot approve translations or institutional content.
