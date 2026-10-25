import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Landmark, Bell, ShieldCheck, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampusSlideshow } from "@/components/campus-slideshow";
import { getHomepageSlides, homepageSlideshow } from "@/content/slideshow";
import { copy, getLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  const sections = [
    { icon: Landmark, number: "01", title: t.about, text: t.aboutDesc, path: "about" },
    { icon: GraduationCap, number: "02", title: t.education, text: t.educationDesc, path: "education" },
    { icon: BookOpen, number: "03", title: t.library, text: t.libraryDesc, path: "library" },
  ];

  return <>
    <div className="hero-quote homepage-invocation">
      <div className="container quote-grid">
        <div className="quote-opening"><p className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><p>{t.eyebrow}</p></div>
        <div className="quote-verse"><p className="hero-verse" lang="ar" dir="rtl">{t.verse}</p><div><p className="verse-meaning">{t.verseMeaning}</p><p className="verse-reference">{t.verseReference}</p></div></div>
      </div>
    </div>
    <CampusSlideshow locale={locale} slides={getHomepageSlides()} loop={homepageSlideshow.loop} intervalMs={homepageSlideshow.intervalMs} variant="hero" />
    <section className="home-welcome" aria-labelledby="home-welcome-heading">
      <div className="container welcome-layout">
        <div className="welcome-heading">
          <p className="welcome-eyebrow"><span aria-hidden="true" />{t.heroLabel}</p>
          <h1 id="home-welcome-heading">{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
        </div>
        <div className="welcome-details">
          <p className="welcome-description">{t.heroText}</p>
          <div className="welcome-actions">
            <Button asChild><Link href={`/${locale}/about`}>{t.explore}<ArrowUpRight className="directional" aria-hidden="true" /></Link></Button>
            <Link href={`/${locale}/education`} className="text-link">{t.educationLink}<ArrowRight size={16} className="directional" aria-hidden="true" /></Link>
          </div>
          <p className="welcome-signature"><span aria-hidden="true" />{t.brandSubtitle}</p>
        </div>
      </div>
    </section>
    <section className="section-padding"><div className="container">
      <div className="section-intro"><div><p className="eyebrow">{t.welcomeLabel}</p><h2>{t.welcomeTitle}</h2></div><p>{t.welcomeText}</p></div>
      <div className="explore-grid">{sections.map(({ icon: Icon, ...section }) => <Link href={`/${locale}/${section.path}`} key={section.path} className="explore-card"><div className="card-top"><Icon size={27} strokeWidth={1.3} aria-hidden="true" /><span>{section.number}</span></div><h3>{section.title}</h3><p>{section.text}</p><span className="card-link">{t.exploreSection}<ArrowUpRight size={17} className="directional" aria-hidden="true" /></span></Link>)}</div>
    </div></section>
    <section className="community-section"><div className="container community-grid">
      <div className="notice-board"><p className="eyebrow">{t.announcementsLabel}</p><h2>{t.announcements}</h2><div className="notice-empty"><Bell size={23} strokeWidth={1.3} aria-hidden="true" /><div><h3>{t.noAnnouncements}</h3><p>{t.noAnnouncementsText}</p></div></div></div>
      <div className="family-panel"><Sprout className="family-decoration" size={128} strokeWidth={0.6} aria-hidden="true" /><p className="eyebrow">{t.familyLabel}</p><h2>{t.familyTitle}</h2><p>{t.familyText}</p><Link href={`/${locale}/portal`} className="text-link">{t.familyAction}<ArrowUpRight size={16} className="directional" aria-hidden="true" /></Link><span className="availability"><ShieldCheck size={14} aria-hidden="true" />{t.availableLater}</span></div>
    </div></section>
  </>;
}
