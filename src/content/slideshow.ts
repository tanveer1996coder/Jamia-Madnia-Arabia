import type { Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

export type CampusSlide = {
  id: string;
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  enabled: boolean;
  placeholder: boolean;
};

// The future admin interface can manage this same shape: images, order,
// visibility, display count, and looping. No admin controls are exposed yet.
export const homepageSlideshow = {
  maxSlides: 3,
  loop: true,
  intervalMs: 5_000,
  slides: [
    {
      id: "courtyard",
      src: "/images/campus/courtyard.webp",
      alt: { en: "Fictional Islamic institute courtyard with sandstone arches and flowering plants", ur: "ایک فرضی اسلامی ادارے کا صحن، پتھریلی محرابیں اور پھول دار پودے" },
      caption: { en: "A welcoming courtyard", ur: "ایک خوش نما صحن" },
      enabled: true,
      placeholder: true,
    },
    {
      id: "veranda",
      src: "/images/campus/veranda.webp",
      alt: { en: "Fictional institute veranda with shaded arches overlooking a green garden", ur: "ایک فرضی ادارے کا برآمدہ، سایہ دار محرابیں اور سرسبز باغ" },
      caption: { en: "Spaces for reflection", ur: "غور و فکر کے لیے پرسکون ماحول" },
      enabled: true,
      placeholder: true,
    },
    {
      id: "gardens",
      src: "/images/campus/gardens.webp",
      alt: { en: "Fictional Islamic campus building with a turquoise dome and landscaped gardens", ur: "ایک فرضی اسلامی ادارے کی عمارت، فیروزی گنبد اور خوب صورت باغات" },
      caption: { en: "An inspiring place to learn", ur: "سیکھنے کے لیے ایک دل کش ماحول" },
      enabled: true,
      placeholder: true,
    },
  ] satisfies CampusSlide[],
};

export function getHomepageSlides(): CampusSlide[] {
  return homepageSlideshow.slides
    .filter(slide => slide.enabled)
    .slice(0, Math.max(0, homepageSlideshow.maxSlides));
}
