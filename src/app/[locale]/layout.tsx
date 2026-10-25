import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource/noto-nastaliq-urdu/arabic-400.css";
import "../globals.css";
import "../homepage.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { copy, getLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  if (!locales.includes(value as "en" | "ur")) notFound();
  const locale = getLocale(value);
  return {
    title: { default: copy[locale].institution, template: `%s | ${copy[locale].institution}` },
    description: copy[locale].heroText,
    applicationName: "Jamia Madnia Arabia",
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const locale = getLocale((await params).locale);
  return <html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"}>
    <body><a className="skip-link" href="#main-content">{copy[locale].skip}</a><SiteHeader locale={locale} /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter locale={locale} /></body>
  </html>;
}
