"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Globe2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { copy, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const otherLocale = locale === "en" ? "ur" : "en";
  const alternatePath = pathname.replace(/^\/(en|ur)(?=\/|$)/, `/${otherLocale}`);
  const links = [["", t.home], ["/about", t.about], ["/education", t.education], ["/library", t.library], ["/contact", t.contact]];

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className="site-header">
    <div className="topline"><div className="container flex items-center justify-between gap-4">
      <span>{t.brandSubtitle}</span>
      <Link href={alternatePath} lang={otherLocale} hrefLang={otherLocale} aria-label={t.languageLabel} className="language-link"><Globe2 size={13} aria-hidden="true" />{t.language}</Link>
    </div></div>
    <div className="container header-main">
      <Link href={`/${locale}`} className="brand" aria-label={t.institution} onClick={() => setOpen(false)}>
        <span className="brand-mark"><BookOpen size={25} strokeWidth={1.5} aria-hidden="true" /></span>
        <span><span className="brand-name">{t.institution}</span><span className="brand-caption">{locale === "en" ? "AN ISLAMIC INSTITUTION" : "ایک اسلامی تعلیمی ادارہ"}</span></span>
      </Link>
      <nav aria-label={locale === "en" ? "Main navigation" : "مرکزی فہرست"} className="desktop-nav">
        {links.map(([path, label]) => <Link key={path} href={`/${locale}${path}`} aria-current={pathname === `/${locale}${path}` ? "page" : undefined} className={cn("nav-link", pathname === `/${locale}${path}` && "active")}>{label}</Link>)}
      </nav>
      <Button asChild variant="outline" size="sm" className="header-portal"><Link href={`/${locale}/portal`}>{t.portal}<ArrowUpRight aria-hidden="true" className="directional" /></Link></Button>
      <Button ref={toggleRef} variant="ghost" size="icon" className="mobile-toggle" aria-label={open ? t.closeMenu : t.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav container" aria-label={locale === "en" ? "Mobile navigation" : "موبائل فہرست"}>
      {links.map(([path, label]) => <Link key={path} href={`/${locale}${path}`} aria-current={pathname === `/${locale}${path}` ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link href={`/${locale}/portal`} onClick={() => setOpen(false)}>{t.portal}<ArrowUpRight size={16} aria-hidden="true" /></Link>
    </nav>}
  </header>;
}
