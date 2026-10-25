import { notFound } from "next/navigation";

export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];

export function getLocale(value: string): Locale {
  if (value === "en" || value === "ur") return value;
  notFound();
}

export function localize<T>(locale: Locale, en: T, ur: T): T {
  return locale === "ur" ? ur : en;
}

export const copy = {
  en: {
    institution: "Jamia Madnia Arabia",
    brandSubtitle: "Faith · Knowledge · Character",
    home: "Home", about: "About the Jamia", education: "Education", library: "Knowledge library", contact: "Contact",
    portal: "Parent portal", admin: "Super Admin", menu: "Open navigation", closeMenu: "Close navigation",
    skip: "Skip to content", language: "اردو", languageLabel: "Switch to Urdu",
    eyebrow: "In the name of Allah, the Most Merciful",
    heroLabel: "WELCOME TO THE JAMIA",
    heroTitle: "Rooted in faith.", heroAccent: "Dedicated to learning.",
    heroText: "Jamia Madnia Arabia, Badorta, nurtures Qur’an learning through Nazira and Hifz, alongside religious education and character development.",
    explore: "Discover the Jamia", educationLink: "Explore education",
    verse: "رَبِّ زِدْنِي عِلْمًا", verseMeaning: "My Lord, increase me in knowledge.", verseReference: "QUR’AN · TA-HA 20:114",
    welcomeLabel: "KNOWLEDGE WITH PURPOSE", welcomeTitle: "A place to learn. A foundation for life.",
    welcomeText: "Discover the Jamia, explore educational information, and find your way to our growing collection of resources.",
    aboutDesc: "Discover the Jamia’s founding, aims, administration, and branch.",
    educationDesc: "Explore Qur’an studies, education for girls and adults, and student guidance.",
    libraryDesc: "A dedicated space for books, fatawa, duas, and Islamic names.",
    exploreSection: "Explore this section", announcements: "From the Jamia", announcementsLabel: "NOTICE BOARD",
    noAnnouncements: "New announcements will appear here.", noAnnouncementsText: "Check back for approved notices and institutional updates.",
    familyLabel: "FOR OUR FAMILIES", familyTitle: "Stay connected to your child’s learning.",
    familyText: "A dedicated parent portal is planned for published progress reports, attendance, and school notifications.",
    familyAction: "About the parent portal", availableLater: "Opening in a future release",
    footerText: "A home for faith, knowledge, and character.", navigate: "Explore", getInTouch: "Get in touch",
    contactNote: "Verified contact and visiting details will be published here.",
    copyright: "Jamia Madnia Arabia", footerNote: "Public website · Initial release",
    pageBack: "Back to home", planned: "Information coming soon",
  },
  ur: {
    institution: "جامعہ مدنیہ عربیہ",
    brandSubtitle: "ایمان · علم · کردار",
    home: "صفحۂ اول", about: "تعارفِ جامعہ", education: "نظامِ تعلیم", library: "علمی کتب خانہ", contact: "رابطہ",
    portal: "والدین پورٹل", admin: "منتظمِ اعلیٰ", menu: "فہرست کھولیں", closeMenu: "فہرست بند کریں",
    skip: "اصل مواد پر جائیں", language: "English", languageLabel: "Switch to English",
    eyebrow: "اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے",
    heroLabel: "جامعہ میں خوش آمدید",
    heroTitle: "ایمان کی بنیاد۔", heroAccent: "علم کی جستجو۔",
    heroText: "جامعہ مدنیہ عربیہ بدورتہ میں ناظرہ اور حفظِ قرآن کے ساتھ دینی تعلیم اور اخلاقی تربیت کا اہتمام کیا جاتا ہے۔",
    explore: "جامعہ کا تعارف", educationLink: "نظامِ تعلیم جانیے",
    verse: "رَبِّ زِدْنِي عِلْمًا", verseMeaning: "اے میرے رب! میرے علم میں اضافہ فرما۔", verseReference: "القرآن · طٰہٰ ۲۰:۱۱۴",
    welcomeLabel: "بامقصد علم", welcomeTitle: "علم کا مرکز، زندگی کی بنیاد۔",
    welcomeText: "جامعہ کے بارے میں جانیے، تعلیمی معلومات دیکھیے اور علمی وسائل کے لیے مختص حصے تک رسائی حاصل کیجیے۔",
    aboutDesc: "جامعہ کی تاسیس، مقاصد، انتظامیہ اور شاخ سے تعارف حاصل کیجیے۔",
    educationDesc: "قرآنی تعلیم، طالبات و بالغان کی تعلیم اور طلبہ کی ہدایات دیکھیے۔",
    libraryDesc: "کتب، فتاویٰ، دعاؤں اور اسلامی ناموں کے لیے مختص جگہ۔",
    exploreSection: "مزید دیکھیے", announcements: "جامعہ کی خبریں", announcementsLabel: "اطلاعات",
    noAnnouncements: "نئی اطلاعات یہاں شائع ہوں گی۔", noAnnouncementsText: "منظور شدہ اعلانات اور ادارے کی تازہ معلومات کے لیے دوبارہ تشریف لائیے۔",
    familyLabel: "والدین کے لیے", familyTitle: "اپنے بچے کے تعلیمی سفر سے جڑے رہیے۔",
    familyText: "والدین کے پورٹل میں تعلیمی پیش رفت کی شائع شدہ رپورٹس، حاضری اور ادارے کی اطلاعات فراہم کرنے کی منصوبہ بندی ہے۔",
    familyAction: "والدین پورٹل کے بارے میں", availableLater: "آئندہ مرحلے میں دستیاب ہوگا",
    footerText: "ایمان، علم اور کردار کا مرکز۔", navigate: "اہم روابط", getInTouch: "ہم سے رابطہ",
    contactNote: "تصدیق شدہ رابطے اور ملاقات کی معلومات یہاں شائع کی جائیں گی۔",
    copyright: "جامعہ مدنیہ عربیہ", footerNote: "عوامی ویب سائٹ · ابتدائی مرحلہ",
    pageBack: "صفحۂ اول پر واپس", planned: "معلومات جلد دستیاب ہوں گی",
  },
} as const;
