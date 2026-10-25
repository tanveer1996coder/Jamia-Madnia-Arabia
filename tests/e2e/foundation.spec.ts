import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("root redirects and all public routes render in both languages", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  for (const locale of ["en", "ur"]) {
    for (const route of ["", "/about", "/education", "/library", "/contact", "/portal", "/admin"]) {
      const response = await page.goto(`/${locale}${route}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ur" ? "rtl" : "ltr");
    }
  }
  const health = await request.get("/api/health");
  expect(await health.json()).toEqual({ status: "ok", service: "jamia-madnia-arabia" });
  const missing = await page.goto("/en/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  const invalidLocale = await request.get("/fr/about");
  expect(invalidLocale.status()).toBe(404);
});

test("language switch preserves the current route", async ({ page }) => {
  await page.goto("/en/education");
  await page.getByRole("link", { name: "Switch to Urdu" }).click();
  await expect(page).toHaveURL(/\/ur\/education$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/education$/);
});

test("mobile menu and keyboard library tabs work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Knowledge library" }).click();
  await expect(page).toHaveURL(/\/en\/library$/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  await page.getByRole("tab", { name: "Books", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Fatawa", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("searchbox").fill("a resource not yet published");
  await expect(page.getByRole("heading", { name: "No matching resources" })).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.getByRole("searchbox")).toHaveValue("");
  await expect(page.getByRole("heading", { name: "Fatawa will be added here" })).toBeVisible();
});

test("private areas expose availability only", async ({ page }) => {
  await page.goto("/en/portal");
  await expect(page.getByText("Sign-in is not open yet.", { exact: false })).toBeVisible();
  await expect(page.locator("input, form")).toHaveCount(0);
  await page.goto("/en/admin");
  await expect(page.getByText("Administrator sign-in is not configured.", { exact: false })).toBeVisible();
  await expect(page.locator("input, form")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});

test("representative pages are accessible, responsive, and captured for review", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const sample of [
    { route: "/en", width: 1440, height: 1000, name: "home-desktop" },
    { route: "/ur", width: 1440, height: 1000, name: "home-urdu-desktop" },
    { route: "/en", width: 390, height: 844, name: "home-mobile" },
    { route: "/en/library", width: 390, height: 844, name: "library-mobile" },
    { route: "/ur", width: 390, height: 844, name: "home-urdu-mobile" },
    { route: "/en/portal", width: 1440, height: 900, name: "portal-desktop" },
  ]) {
    await page.setViewportSize({ width: sample.width, height: sample.height });
    await page.goto(sample.route);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`${sample.name}.png`), fullPage: true });
  }
});

test("homepages place the quotation under the menu, followed by a full-width slideshow and welcome section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "ur"]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      const header = await page.locator("header").boundingBox();
      const quotation = await page.locator(".homepage-invocation").boundingBox();
      const slideshow = await page.locator(".campus-slideshow-hero").boundingBox();
      const welcome = await page.getByRole("region", { name: locale === "en" ? "Rooted in faith. Dedicated to learning." : "ایمان کی بنیاد۔ علم کی جستجو۔" }).boundingBox();
      if (!header || !quotation || !slideshow || !welcome) throw new Error("A homepage section is missing");
      expect(Math.abs(quotation.y - (header.y + header.height))).toBeLessThanOrEqual(1);
      expect(Math.abs(slideshow.y - (quotation.y + quotation.height))).toBeLessThanOrEqual(1);
      expect(slideshow.x).toBe(0);
      expect(slideshow.width).toBe(width);
      expect(welcome.y).toBeGreaterThanOrEqual(slideshow.y + slideshow.height);
      await expect(page.locator(".campus-slideshow-hero h1")).toHaveCount(0);
      await expect(page.locator(".home-welcome h1")).toBeVisible();
    }
  }
});

test("slideshow navigation loops, supports swipe, and loads local images", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const carousel = page.getByRole("region", { name: "Campus slideshow" });
  await expect(carousel).toHaveAttribute("data-ready", "true");
  await expect.poll(() => carousel.locator("img").first().evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(carousel.getByText("Illustrative image · Not the actual Jamia")).toBeVisible();
  await carousel.getByRole("button", { name: "Go to slide 3", exact: true }).click();
  await expect(carousel.getByRole("button", { name: "Go to slide 3", exact: true })).toHaveAttribute("aria-current", "true");
  await carousel.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(carousel.getByRole("button", { name: "Go to slide 1", exact: true })).toHaveAttribute("aria-current", "true");
  await carousel.getByRole("button", { name: "Previous slide", exact: true }).click();
  await expect(carousel.getByRole("button", { name: "Go to slide 3", exact: true })).toHaveAttribute("aria-current", "true");
  await carousel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(carousel.getByRole("button", { name: "Go to slide 1", exact: true })).toHaveAttribute("aria-current", "true");

  const viewport = carousel.locator(".campus-viewport");
  await viewport.scrollIntoViewIfNeeded();
  const box = await viewport.boundingBox();
  if (!box) throw new Error("Slideshow viewport is not visible");
  await page.mouse.move(box.x + box.width * .85, box.y + box.height * .45);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .15, box.y + box.height * .45, { steps: 15 });
  await page.mouse.up();
  await expect(carousel.getByRole("button", { name: "Go to slide 2", exact: true })).toHaveAttribute("aria-current", "true");
});

test("slideshow respects RTL keyboard navigation and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ur");
  const carousel = page.getByRole("region", { name: "ادارے کی تصاویر" });
  await expect(carousel).toHaveAttribute("data-ready", "true");
  await expect(carousel).toHaveAttribute("data-autoplay", "paused");
  await expect(carousel.getByRole("button", { name: "کم حرکت کی ترجیح کے باعث خودکار سلائیڈ شو بند ہے" })).toBeDisabled();
  await carousel.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(carousel.getByRole("button", { name: "تصویر 2 دیکھیے", exact: true })).toHaveAttribute("aria-current", "true");
  await page.keyboard.press("ArrowRight");
  await expect(carousel.getByRole("button", { name: "تصویر 1 دیکھیے", exact: true })).toHaveAttribute("aria-current", "true");
});

test("slideshow auto-advances and pauses for manual pause, hover, and focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const carousel = page.getByRole("region", { name: "Campus slideshow" });
  await expect(carousel).toHaveAttribute("data-ready", "true");
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute("data-autoplay", "playing");
  await expect(carousel.getByRole("button", { name: "Go to slide 2", exact: true })).toHaveAttribute("aria-current", "true", { timeout: 8_000 });
  await carousel.getByRole("button", { name: "Pause slideshow", exact: true }).click();
  // Focus the header to leave the full-width hero and scroll the pointer above it.
  await page.getByRole("link", { name: "Switch to Urdu" }).focus();
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute("data-autoplay", "paused");
  await page.clock.install();
  await page.clock.fastForward(6_000);
  await expect(carousel.getByRole("button", { name: "Go to slide 2", exact: true })).toHaveAttribute("aria-current", "true");
  await carousel.getByRole("button", { name: "Play slideshow", exact: true }).click();
  await expect(carousel).toHaveAttribute("data-autoplay", "paused"); // focus pauses automatic movement
  await page.getByRole("link", { name: "Switch to Urdu" }).focus();
  await page.mouse.move(0, 0);
  await expect(carousel).toHaveAttribute("data-autoplay", "playing");
  await page.clock.fastForward(5_500);
  await page.clock.runFor(700);
  await expect(carousel.getByRole("button", { name: "Go to slide 3", exact: true })).toHaveAttribute("aria-current", "true");
  await carousel.hover();
  await expect(carousel).toHaveAttribute("data-autoplay", "paused");
  await page.clock.fastForward(6_000);
  await expect(carousel.getByRole("button", { name: "Go to slide 3", exact: true })).toHaveAttribute("aria-current", "true");
});
