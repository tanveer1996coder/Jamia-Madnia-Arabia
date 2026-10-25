"use client";

import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { localize, type Locale } from "@/lib/i18n";
import { publishedResources, resourceCategories } from "@/content/resources";

export function KnowledgeLibrary({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  return <div className="library-panel">
    <label htmlFor="resource-search" className="field-label">{localize(locale, "Search the library", "کتب خانے میں تلاش کریں")}</label>
    <div className="search-field"><Search size={19} aria-hidden="true" /><input id="resource-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={localize(locale, "Search by title or topic…", "عنوان یا موضوع کے ذریعے تلاش کریں…")} autoComplete="off" /></div>
    <Tabs defaultValue="books" dir={locale === "ur" ? "rtl" : "ltr"}>
      <TabsList aria-label={localize(locale, "Resource categories", "علمی وسائل کی اقسام")}>
        {resourceCategories.map(category => <TabsTrigger key={category.id} value={category.id}>{category.title[locale]}</TabsTrigger>)}
      </TabsList>
      {resourceCategories.map(category => {
        const resources = publishedResources.filter(resource => resource.locale === locale && resource.category === category.id && `${resource.title} ${resource.description}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
        return <TabsContent key={category.id} value={category.id}>
          <div role="status" aria-live="polite">
            {resources.length ? <ul className="resource-list">{resources.map(resource => <li key={resource.id}><h2>{resource.title}</h2><p>{resource.description}</p></li>)}</ul> : <div className="empty-state">
              <span className="empty-icon"><BookOpen size={27} strokeWidth={1.4} aria-hidden="true" /></span>
              <h2>{query.trim() ? localize(locale, "No matching resources", "کوئی متعلقہ مواد موجود نہیں") : localize(locale, `${category.title.en} will be added here`, `${category.title.ur} یہاں شائع کیے جائیں گے`)}</h2>
              <p>{query.trim() ? localize(locale, "Try another title or topic. Approved resources will appear as the library grows.", "دوسرے عنوان یا موضوع سے تلاش کیجیے۔ منظور شدہ مواد دستیاب ہونے پر یہاں نظر آئے گا۔") : localize(locale, "This collection is awaiting approved content. Please check back soon.", "یہ مجموعہ منظور شدہ مواد کا منتظر ہے۔ براہ کرم دوبارہ تشریف لائیے۔")}</p>
              {query && <button type="button" className="text-link mt-5" onClick={() => setQuery("")}>{localize(locale, "Clear search", "تلاش صاف کریں")}</button>}
            </div>}
          </div>
        </TabsContent>;
      })}
    </Tabs>
  </div>;
}
