# Next development phases

## Completed: runnable public foundation

The bilingual shell, public routes, library interaction, honest empty states, shared components, safe availability pages, production build scripts, and acceptance checks establish the base. There are no connected production services.

## 1. Approve launch content and hosting

Confirm the institution name, Urdu translations, introduction/history, leadership, department details, contact information, donation instructions, logo, photographs, and initial resources. Select hosting/domain. Publish the basic public site once approved content is ready. Add content-matching public PDFs later when the approved content and renderer exist.

## 2. Finalize private workflows

Choose guardian onboarding (admin invitation is the plan's recommendation, not a settled requirement). Confirm student/report fields, department templates, scoring, retention, and email trigger rules. Write acceptance cases before the private data implementation.

## 3. Implement backend foundation

Choose PostgreSQL, managed authentication, and private object storage. Add migrations, server-only service modules, verified guardian-student links, the single Super Admin with MFA, audit records, and tested access policies. Establish backups and test restoration. Parent access requires a verified relationship and published data for every query/download. Never provide public Super Admin signup or teacher accounts.

## 4. Super Admin and parent portal

Build real public-content management and academic record drafting/review/publishing, then parent attendance/reports/history. Corrections create new report versions with immutable published snapshots. Add React Hook Form/Zod and Recharts as these features require them. Test direct URL/API access across students and unpublished records.

## 5. Reports and delivery

Evaluate PDF rendering using real Urdu/Arabic/table/chart samples. Add authenticated downloads. Integrate Resend notifications and official WhatsApp Business PDF delivery only after credentials, recipient verification/consent, templates, and policies are confirmed. Track attempts/status, prevent duplicate deliveries, and preserve audit history.

## 6. Private-service launch

Complete accessibility, mobile/RTL, security, report accuracy, authorization, delivery/retry, backup/restore, and provider integration checks. Review production secrets, HTTPS, recovery, retention, and content. Public website deployment and private academic-service launch are separate milestones.
