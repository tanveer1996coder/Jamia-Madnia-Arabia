import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { InstitutionSections } from "@/components/institution-sections";
import { PageHeading } from "@/components/page-heading";
import { aboutSections, contactSections, educationSections } from "@/content/institution";
import { copy, getLocale, localize } from "@/lib/i18n";

const pages = ["about", "education", "contact"] as const;
type PublicPage = (typeof pages)[number];

function getPage(value: string): PublicPage {
  if (pages.includes(value as PublicPage)) return value as PublicPage;
  notFound();
}

export function generateStaticParams() { return pages.map(page => ({ page })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; page: string }> }): Promise<Metadata> {
  const { locale: value, page: pageValue } = await params;
  const locale = getLocale(value);
  const page = getPage(pageValue);
  return { title: copy[locale][page] };
}

export default async function PublicInformationPage({ params }: { params: Promise<{ locale: string; page: string }> }) {
  const { locale: value, page: pageValue } = await params;
  const locale = getLocale(value);
  const page = getPage(pageValue);
  const t = copy[locale];
  const content = {
    about: {
      eyebrow: localize(locale, "OUR INSTITUTION", "ہمارا ادارہ"),
      description: localize(locale, "The story, purpose, administration, and branch of Jamia Madnia Arabia, Badorta.", "جامعہ مدنیہ عربیہ بدورتہ کی تاریخ، مقاصد، انتظامیہ اور شاخ کا تعارف۔"),
      sections: aboutSections,
    },
    education: {
      eyebrow: localize(locale, "LEARNING AT THE JAMIA", "جامعہ کا تعلیمی نظام"),
      description: localize(locale, "Qur’an learning, education for girls and adults, character training, and essential guidance for students and guardians.", "قرآنی تعلیم، طالبات اور بالغان کی تعلیم، تربیتی پروگرام اور طلبہ و سرپرستوں کے لیے ضروری ہدایات۔"),
      sections: educationSections,
    },
    contact: {
      eyebrow: localize(locale, "CONNECT WITH THE JAMIA", "جامعہ سے رابطہ"),
      description: localize(locale, "Contact and visiting information, and how the Jamia’s educational work is supported.", "رابطے اور ملاقات کی معلومات اور جامعہ کی تعلیمی خدمات کے مصارف و معاونت کا تعارف۔"),
      sections: contactSections,
    },
  }[page];

  return <>
    <PageHeading locale={locale} eyebrow={content.eyebrow} title={t[page]} description={content.description} />
    <div className="section-padding"><InstitutionSections locale={locale} sections={content.sections} /></div>
    {page === "about" && <div className="container institution-next-links">
      <Link className="text-link" href={`/${locale}/education`}>{t.education}<ArrowUpRight className="directional" size={19} aria-hidden="true" /></Link>
      <Link className="text-link" href={`/${locale}/contact#support`}>{localize(locale, "Expenses & support", "مصارف اور معاونت")}<ArrowUpRight className="directional" size={19} aria-hidden="true" /></Link>
    </div>}
  </>;
}
