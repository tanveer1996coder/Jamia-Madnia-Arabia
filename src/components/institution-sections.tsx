import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InstitutionSection } from "@/content/institution";
import { localize, type Locale } from "@/lib/i18n";

export function InstitutionSections({ locale, sections }: { locale: Locale; sections: InstitutionSection[] }) {
  return <div className="container institution-layout">
    <nav className="section-navigation" aria-label={localize(locale, "On this page", "اس صفحے پر")}>
      <h2>{localize(locale, "On this page", "اس صفحے پر")}</h2>
      <ul>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title[locale]}</a></li>)}</ul>
    </nav>
    <div className="institution-content">
      {sections.map(section => <section className="institution-section" id={section.id} aria-labelledby={`${section.id}-title`} key={section.id}>
        <h2 id={`${section.id}-title`}>{section.title[locale]}</h2>
        {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
        {section.comingSoon && <p><span className="status-pill">{localize(locale, "Coming soon", "جلد آرہا ہے")}</span></p>}
        {section.topics?.map((topic, index) => <div className="institution-topic" key={index}>
          <h3>{topic.title[locale]}</h3>
          {topic.paragraphs?.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph[locale]}</p>)}
          {topic.comingSoon && <p><span className="status-pill">{localize(locale, "Coming soon", "جلد آرہا ہے")}</span></p>}
        </div>)}
        {section.rules && <ol className="student-rules">{section.rules.map(rule => <li value={rule.number} key={rule.number}><p>{rule.text[locale]}</p></li>)}</ol>}
        {section.link && <Link className="text-link institution-link" href={`/${locale}/${section.link.path}`}>{section.link.label[locale]}<ArrowUpRight size={19} className="directional" aria-hidden="true" /></Link>}
      </section>)}
    </div>
  </div>;
}
