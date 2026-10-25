import type { Locale } from "@/lib/i18n";

export const resourceCategories = [
  { id: "books", title: { en: "Books", ur: "کتب" } },
  { id: "fatawa", title: { en: "Fatawa", ur: "فتاویٰ" } },
  { id: "duas", title: { en: "Duas", ur: "دعائیں" } },
  { id: "names", title: { en: "Islamic names", ur: "اسلامی نام" } },
] as const;

export type PublishedResource = {
  id: string;
  locale: Locale;
  category: (typeof resourceCategories)[number]["id"];
  title: string;
  description: string;
};

// Only institution-approved, public content belongs here. Never put student data here.
export const publishedResources: readonly PublishedResource[] = [];
