import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("institutional copy, programme status, and complete numbered rules are available in both languages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "ur"]) {
    await page.goto(`/${locale}/about`);
    await expect(page.locator("#history")).toContainText(locale === "en" ? "12 September 2016" : "۱۲ ستمبر ۲۰۱۶ء");
    await expect(page.locator("#founder")).toContainText(locale === "en" ? "Haji Rana Abdul Hameed" : "حاجی رانا عبدالحمید");
    await expect(page.locator("#founder")).toContainText(locale === "en" ? "1999" : "۱۹۹۹ء");
    await expect(page.locator("#administration h3")).toHaveCount(2);
    await page.locator('a[href$="/education#girls-education"]').click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/education#girls-education$`));
    await expect(page.locator("#girls-education")).toContainText(locale === "en" ? "six hours" : "چھ گھنٹے");
    await expect(page.locator("#girls-education")).toContainText(locale === "en" ? "four years" : "چار سال");
    await expect(page.locator("#adult-education")).toContainText(locale === "en" ? "Maghrib" : "مغرب");
    await expect(page.locator("#summer-course")).toContainText(locale === "en" ? "forty-day" : "چالیس روزہ");
    await expect(page.locator("main .status-pill")).toHaveCount(2);
    await expect(page.locator("#dar-al-ifta .status-pill")).toHaveText(locale === "en" ? "Coming soon" : "جلد آرہا ہے");
    const guidance = page.locator('.section-navigation a[href="#student-guidance"]');
    await page.keyboard.press("Tab");
    await guidance.focus();
    await expect(guidance).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#student-guidance$/);
    await expect(page.locator("#student-guidance h2")).toBeInViewport();
    const rules = page.locator(".student-rules > li");
    await expect(page.locator(".student-rules")).toHaveCSS("list-style-type", locale === "en" ? "decimal" : "persian");
    await expect(rules).toHaveCount(12);
    expect(await rules.evaluateAll(items => items.map(item => (item as HTMLLIElement).value))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]);
    await expect(rules.nth(8)).toContainText(locale === "en" ? "boarding accommodation" : "دارالاقامہ");
    await expect(rules.last()).toContainText(locale === "en" ? "all instructions" : "تمام ہدایات");

    await page.goto(`/${locale}/contact#support`);
    await expect(page.locator("#support")).toContainText(locale === "en" ? "accounts department" : "حسابات کا مستقل شعبہ");
    await expect(page.locator("#support")).toContainText(locale === "en" ? "sadaqah jariyah" : "صدقۂ جاریہ");
    await page.goto(`/${locale}/library`);
    await expect(page.locator(".campus-library-intro")).toContainText(locale === "en" ? "rare books" : "نادر کتب");
    await expect(page.locator(".online-library-heading h2")).toHaveText(locale === "en" ? "Online resources" : "آن لائن علمی وسائل");
    await expect(page.getByRole("searchbox")).toBeVisible();
  }
});

test("content pages remain readable and accessible on desktop and mobile in both languages", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const sample of [
    { locale: "en", width: 1440, height: 1000, suffix: "desktop" },
    { locale: "ur", width: 390, height: 844, suffix: "mobile" },
  ]) {
    await page.setViewportSize({ width: sample.width, height: sample.height });
    for (const route of ["about", "education", "contact", "library"]) {
      await page.goto(`/${sample.locale}/${route}`);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${route}-${sample.locale}-${sample.suffix}.png`), fullPage: true });
      if (route === "education") {
        await page.locator('.section-navigation a[href="#student-guidance"]').click();
        await page.screenshot({ path: testInfo.outputPath(`rules-${sample.locale}-${sample.suffix}.png`) });
      }
    }
  }
  for (const sample of [{ locale: "ur", width: 1440 }, { locale: "en", width: 390 }]) {
    await page.setViewportSize({ width: sample.width, height: 1000 });
    await page.goto(`/${sample.locale}/education`);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`education-${sample.locale}-${sample.width}.png`) });
  }
});
