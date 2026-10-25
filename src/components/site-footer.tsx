import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><Link href={`/${locale}`} className="footer-brand"><BookOpen size={23} aria-hidden="true" /><span>{t.institution}</span></Link><p>{t.footerText}</p></div>
      <div><h2>{t.navigate}</h2><div className="footer-links"><Link href={`/${locale}/about`}>{t.about}</Link><Link href={`/${locale}/education`}>{t.education}</Link><Link href={`/${locale}/library`}>{t.library}</Link></div></div>
      <div><h2>{t.getInTouch}</h2><p>{t.contactNote}</p><Link href={`/${locale}/contact`} className="text-link">{t.contact}<ArrowUpRight size={15} aria-hidden="true" className="directional" /></Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getUTCFullYear()} {t.copyright}</span><span>{t.footerNote}</span><Link href={`/${locale}/admin`}>{t.admin}</Link></div>
  </footer>;
}
