# Initial architecture

The supplied V3 document is a requirements baseline, not an instruction to implement every phase at once. The user's current scope is the smallest useful runnable foundation.

## Current boundaries

The public site renders with Next.js server components. Small client components handle navigation and library filtering. The `[locale]` layout validates `en`/`ur`, sets HTML language/direction, and supplies the common shell. Public institution pages share one typed route template. Resource content is explicitly public and approved; there are no student fixtures or database connections.

Routes:

| Route | Purpose |
| --- | --- |
| `/` | Redirect to `/en` |
| `/{en,ur}` | Homepage |
| `/{en,ur}/about` | Institutional content foundation |
| `/{en,ur}/education` | Curriculum/admissions/examination foundation |
| `/{en,ur}/library` | Books/fatawa/duas/names, search and category empty states |
| `/{en,ur}/contact` | Verified contact/donation content slots |
| `/{en,ur}/portal` | Parent portal availability page |
| `/{en,ur}/admin` | Super Admin availability page |
| `/api/health` | Minimal public process health response |

Portal/admin URLs are public information pages. There is no authentication claim or sensitive functionality. Their metadata excludes them from indexing; this is a discoverability setting, not authorization.

## Future service boundaries

Add server-only identity, academics, publishing, storage, and delivery modules when those phases begin. Provider SDKs must stay behind these modules. Never import private models or secrets into `src/content` or a client component.

PostgreSQL is the preferred relational foundation; Supabase is a candidate, not a configured dependency. Plan users/roles, guardians, verified guardian-student links, academic entities, immutable report versions, private file metadata, notification/delivery jobs, and audit events. Finalize fields and access policies before migrations. This scaffold intentionally does not prescribe a premature schema.

Managed auth must enforce the single Super Admin role and MFA, plus verified guardian-student links. Every sensitive server action, query, and report download needs its own authorization check. Do not rely on URL visibility, layout checks alone, or client-side filtering. Test cross-student access before loading real records.

Published report corrections create new versions. Private PDFs require authorized endpoints/private storage and fidelity testing in Urdu/Arabic before choosing a renderer. Email sends notifications only. Official WhatsApp delivery requires verified, consenting recipients, approved templates, idempotent jobs, and delivery/audit records.

## Deliberate omissions

No database, login form, signup, submission form, fake dashboard, unapproved religious resources, report data, messaging, payment collection, or external analytics. No services are represented as connected. The user subsequently requested a homepage slideshow with clearly labeled generated placeholder imagery; it is configured in `src/content/slideshow.ts` and does not include admin editing. These boundaries keep the app small and avoid a misleading production interface.
