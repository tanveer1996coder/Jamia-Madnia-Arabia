"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Camera, Pause, Play } from "lucide-react";
import type { CampusSlide } from "@/content/slideshow";
import { localize, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function CampusSlideshow({ locale, slides, loop, intervalMs, variant = "card" }: {
  locale: Locale;
  slides: CampusSlide[];
  loop: boolean;
  intervalMs: number;
  variant?: "card" | "hero";
}) {
  // Start conservatively until the browser's motion preference is known.
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [selected, setSelected] = useState(0);
  const [viewportRef, api] = useEmblaCarousel({
    loop: loop && slides.length > 1,
    direction: locale === "ur" ? "rtl" : "ltr",
    duration: reducedMotion ? 0 : 30,
    align: "start",
  });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update).on("reInit", update);
    return () => { api.off("select", update).off("reInit", update); };
  }, [api]);

  const autoPlaying = !paused && !reducedMotion && !hovered && !focused && !hidden && slides.length > 1;

  useEffect(() => {
    if (!api || !autoPlaying || (!loop && !api.canScrollNext())) return;
    const timer = window.setTimeout(() => api.scrollNext(), Math.max(1_000, intervalMs));
    return () => window.clearTimeout(timer);
  }, [api, autoPlaying, intervalMs, loop, selected]);

  if (!slides.length) return null;
  const current = slides[selected] ?? slides[0];
  const previous = () => api?.scrollPrev(reducedMotion);
  const next = () => api?.scrollNext(reducedMotion);

  return <section
    className={cn("campus-slideshow", variant === "hero" && "campus-slideshow-hero")}
    aria-label={localize(locale, "Campus slideshow", "ادارے کی تصاویر")}
    aria-roledescription={localize(locale, "carousel", "سلائیڈ شو")}
    tabIndex={0}
    data-ready={api ? "true" : "false"}
    data-autoplay={autoPlaying ? "playing" : "paused"}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const forward = locale === "ur" ? event.key === "ArrowLeft" : event.key === "ArrowRight";
      if (forward) next(); else previous();
    }}
  >
    <div className="campus-viewport" ref={viewportRef}>
      <div className="campus-track">
        {slides.map((slide, index) => <div
          className="campus-slide"
          key={slide.id}
          role="group"
          aria-roledescription={localize(locale, "slide", "سلائیڈ")}
          aria-label={`${index + 1} / ${slides.length}`}
          aria-hidden={index !== selected}
        ><Image src={slide.src} alt={slide.alt[locale]} fill sizes={variant === "hero" ? "100vw" : "(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) 50vw, 600px"} priority={index === 0} draggable={false} /></div>)}
      </div>
    </div>
    {current.placeholder && <span className="campus-placeholder"><Camera size={15} aria-hidden="true" />{localize(locale, "Illustrative image · Not the actual Jamia", "تمثیلی تصویر · اصل جامعہ کی تصویر نہیں")}</span>}
    <div className="campus-caption" aria-live={autoPlaying ? "off" : "polite"} aria-atomic="true"><p>{current.caption[locale]}</p><span dir="ltr">{String(selected + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span></div>
    {slides.length > 1 && <div className="campus-controls">
      <div className="campus-arrows"><button type="button" onClick={previous} disabled={!loop && selected === 0} aria-label={localize(locale, "Previous slide", "پچھلی تصویر")}><ArrowLeft className="directional" size={19} aria-hidden="true" /></button><button type="button" onClick={next} disabled={!loop && selected === slides.length - 1} aria-label={localize(locale, "Next slide", "اگلی تصویر")}><ArrowRight className="directional" size={19} aria-hidden="true" /></button></div>
      <div className="campus-dots" role="group" aria-label={localize(locale, "Choose a slide", "تصویر منتخب کریں")}>{slides.map((slide, index) => <button type="button" key={slide.id} onClick={() => api?.scrollTo(index, reducedMotion)} aria-label={localize(locale, `Go to slide ${index + 1}`, `تصویر ${index + 1} دیکھیے`)} aria-current={selected === index ? "true" : undefined}><span /></button>)}</div>
      <button type="button" className="campus-play" onClick={() => setPaused(!paused)} disabled={reducedMotion} aria-label={reducedMotion ? localize(locale, "Automatic slideshow disabled for reduced motion", "کم حرکت کی ترجیح کے باعث خودکار سلائیڈ شو بند ہے") : paused ? localize(locale, "Play slideshow", "سلائیڈ شو چلائیں") : localize(locale, "Pause slideshow", "سلائیڈ شو روکیں")}>
        {paused || reducedMotion ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}<span>{localize(locale, paused || reducedMotion ? "Play" : "Pause", paused || reducedMotion ? "چلائیں" : "روکیں")}</span>
      </button>
    </div>}
  </section>;
}
