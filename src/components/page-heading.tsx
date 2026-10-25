import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";

export function PageHeading({ locale, eyebrow, title, description }: { locale: Locale; eyebrow: string; title: string; description: string }) {
  return <section className="page-heading"><div className="container">
    <nav aria-label={locale === "en" ? "Breadcrumb" : "صفحے کا راستہ"} className="breadcrumb"><Link href={`/${locale}`}>{copy[locale].home}</Link><ChevronRight size={13} className="directional" aria-hidden="true" /><span aria-current="page">{title}</span></nav>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p>
  </div></section>;
}
