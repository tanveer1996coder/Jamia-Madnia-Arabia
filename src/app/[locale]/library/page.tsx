import type { Metadata } from "next";
import { KnowledgeLibrary } from "@/components/knowledge-library";
import { PageHeading } from "@/components/page-heading";
import { campusLibrary } from "@/content/institution";
import { copy, getLocale, localize } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: copy[getLocale((await params).locale)].library };
}

export default async function LibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocale((await params).locale);
  return <>
    <PageHeading locale={locale} eyebrow={localize(locale, "EXPLORE & LEARN", "مطالعہ اور علم")} title={copy[locale].library} description={localize(locale, "Learn about the Jamia’s campus library and explore our online resource collection as it grows.", "جامعہ کے کتب خانے کا تعارف حاصل کیجیے اور آن لائن علمی وسائل کے مجموعے کو دیکھیے۔")} />
    <section className="section-padding"><div className="container">
      <section className="campus-library-intro" aria-labelledby="campus-library-title">
        <h2 id="campus-library-title">{campusLibrary.title[locale]}</h2>
        {campusLibrary.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
      </section>
      <div className="library-panel online-library-heading"><h2>{localize(locale, "Online resources", "آن لائن علمی وسائل")}</h2><p>{localize(locale, "Books, fatawa, duas, and Islamic names will be published here after review.", "کتب، فتاویٰ، دعائیں اور اسلامی نام جائزے کے بعد یہاں شائع کیے جائیں گے۔")}</p></div>
      <KnowledgeLibrary locale={locale} />
    </div></section>
  </>;
}
