import type { Locale } from "@/lib/i18n";

type BilingualText = Record<Locale, string>;
const bilingual = (en: string, ur: string): BilingualText => ({ en, ur });

export type InstitutionTopic = {
  title: BilingualText;
  paragraphs?: BilingualText[];
  comingSoon?: boolean;
};

export type InstitutionSection = InstitutionTopic & {
  id: string;
  topics?: InstitutionTopic[];
  rules?: { number: number; text: BilingualText }[];
  link?: { path: string; label: BilingualText };
};

// Public copy supplied by the institution in “web-app text.txt”, 25 October 2026.
export const aboutSections: InstitutionSection[] = [
  {
    id: "history",
    title: bilingual("Foundation & introduction", "سنگِ بنیاد اور تعارف"),
    paragraphs: [
      bilingual("The foundation stone of Jamia Madnia Arabia, Badorta, was laid on 12 September 2016 by Haji Ishaq Sahib, Ameer of the Gujranwala Markaz.", "جامعہ مدنیہ عربیہ بدورتہ کا سنگِ بنیاد گوجرانوالہ مرکز کے امیر حاجی اسحاق صاحب نے ۱۲ ستمبر ۲۰۱۶ء کو رکھا۔"),
      bilingual("The Jamia grew out of the work of Da‘wah and Tabligh and has been providing educational services for ten years.", "جامعہ کے وجود میں آنے کی وجہ دعوت و تبلیغ کی محنت ہے۔ جامعہ مدنیہ عربیہ عرصہ دس سال سے تعلیمی خدمات سرانجام دے رہا ہے۔"),
      bilingual("Many students currently study the Holy Qur’an in the Jamia’s Hifz and Nazira departments. Many female students also study Qur’an reading and memorisation at Jamia Aisha Siddiqah lil-Banat.", "جامعہ میں فی الوقت شعبہ حفظ اور شعبہ ناظرہ میں کافی تعداد میں طلبہ قرآن مجید کی تعلیم حاصل کر رہے ہیں اور جامعہ عائشہ صدیقہ للبنات میں شعبہ ناظرہ اور شعبہ حفظ القرآن میں کافی طالبات قرآن مجید کی تعلیم حاصل کر رہی ہیں۔"),
    ],
  },
  {
    id: "founder",
    title: bilingual("Our founder", "بانی"),
    paragraphs: [bilingual("Jamia Madnia Arabia was founded by Haji Rana Abdul Hameed Sahib, who endowed land for the madrasa in 1999. Formal teaching began on 12 September 2016.", "مدرسہ جامعہ مدنیہ عربیہ کے بانی حاجی رانا عبدالحمید صاحب ہیں، جنہوں نے مدرسہ کے لیے ۱۹۹۹ء میں زمین وقف کی۔ ۱۲ ستمبر ۲۰۱۶ء کو مدرسہ میں باقاعدہ تدریسی سرگرمیاں شروع ہوئیں۔")],
  },
  {
    id: "objectives",
    title: bilingual("Aims & objectives", "مقاصد"),
    paragraphs: [
      bilingual("The institution aims to promote religious education, help maintain a religious environment in the area, and inspire a desire to learn the faith, especially among young people.", "ادارے کا مقصد دینی تعلیم کو فروغ دینا، علاقے میں دینی فضا قائم کرنے کی کوشش کرنا اور خصوصاً نوجوانوں میں دین سیکھنے کے شوق اور جذبے کو بیدار کرنا ہے۔"),
      bilingual("The Jamia also seeks to prepare scholars, graduates, and callers to Islam who combine sound knowledge with piety and sincerity, and whose purpose is to guide the Ummah towards the straight path.", "جامعہ کے مقاصد میں یہ بھی ہے کہ ایسے علما، فضلا اور اسلام کے داعی تیار کیے جائیں جو کمالِ علم کے ساتھ تقویٰ اور اخلاص کے زیور سے آراستہ ہوں اور جن کا مقصد امت کو صراطِ مستقیم کی طرف رہنمائی فراہم کرنا ہو۔"),
      bilingual("It strives to bring the next generation closer to religion and acquaint them with religious values, Islamic manners, and culture.", "نئی نسل کو مذہب کے قریب کرنا اور دینی اقدار، اسلامی آداب اور ثقافت سے روشناس کرانا بھی جامعہ کے مقاصد میں شامل ہے۔"),
    ],
  },
  {
    id: "administration",
    title: bilingual("Administration", "انتظامیہ"),
    topics: [
      { title: bilingual("Consultative council", "مجلسِ شوریٰ"), paragraphs: [bilingual("The consultative council consists of selected members of the Jamia. It advises on the institution’s key administrative matters.", "مجلسِ شوریٰ میں جامعہ کے چند منتخب اصحاب موجود ہیں۔ اس مجلس میں جامعہ کے خاص انتظامی امور میں مشورہ ہوتا ہے۔")] },
      { title: bilingual("Academic council", "مجلسِ تعلیمی"), paragraphs: [bilingual("The academic council consists of designated teachers who consult on the Jamia’s educational affairs.", "مجلسِ تعلیمی میں جامعہ کے مخصوص اساتذہ موجود ہیں جو جامعہ کے تعلیمی امور میں مشورہ کرتے ہیں۔")] },
    ],
  },
  {
    id: "branches",
    title: bilingual("Our branch", "جامعہ کی شاخیں"),
    paragraphs: [bilingual("The Jamia currently has one branch: Jamia Aisha Siddiqah lil-Banat, for female students.", "جامعہ کی فی الحال ایک شاخ ہے، جس کا نام جامعہ عائشہ صدیقہ للبنات ہے۔")],
    link: { path: "education#girls-education", label: bilingual("Explore education for girls and women", "طالبات اور خواتین کی تعلیم کے بارے میں جانیے") },
  },
];

export const fundingSection: InstitutionSection = {
  id: "support",
  title: bilingual("Expenses & support", "مصارف اور معاونت"),
  paragraphs: [
    bilingual("The Jamia is a non-governmental educational institution. It has no fixed regular source of income and receives no financial assistance from the government.", "جامعہ ایک غیر سرکاری علمی ادارہ ہے۔ اس کی کوئی خاص مستقل آمدنی نہیں اور نہ ہی حکومت سے کوئی مالی امداد وصول کی جاتی ہے۔"),
    bilingual("Alhamdulillah, by the grace and kindness of Allah Almighty, all of the Jamia’s expenses are met through the generosity of benefactors.", "الحمد للہ! جامعہ کے جملہ مصارف محض اللہ تعالیٰ کے فضل و کرم سے اہلِ خیر حضرات کے ذریعے پورے کیے جاتے ہیں۔"),
    bilingual("Since its inception, the Jamia has ensured that money received for a particular purpose is spent only on that purpose. A permanent accounts department, with an accountant and several assistants, maintains regular records of every receipt and expenditure.", "جامعہ میں شروع دن سے ہی یہ انتظام کیا جاتا ہے کہ ہر مد کی رقم صرف اسی کے مصرف میں خرچ کی جائے۔ جامعہ میں حسابات کا مستقل شعبہ ہے جس میں محاسب (اکاؤنٹنٹ) اور ان کے کئی معاون موجود ہیں، جو ہر آمدن اور خرچ کا باقاعدہ اندراج کرتے ہیں۔"),
    bilingual("With the growing number of students and the expanding scope of its work, construction and extension work takes place at the Jamia from time to time.", "طلبہ کی کثرت اور کام کی وسعت کے پیشِ نظر جامعہ میں وقتاً فوقتاً تعمیر و توسیع کا کام جاری رہتا ہے۔"),
    bilingual("Serving the Jamia is a privilege, a source of blessing, and an ongoing charity (sadaqah jariyah) for us all. May Allah Almighty accept all our good deeds. Ameen.", "جامعہ کی خدمت ہم سب کے لیے سعادت، باعثِ برکت اور صدقۂ جاریہ ہے۔ اللہ تعالیٰ ہم سب کے نیک اعمال کو قبول فرمائے۔ آمین۔"),
  ],
};

export const campusLibrary: InstitutionTopic = {
  title: bilingual("The campus library", "جامعہ کا کتب خانہ"),
  paragraphs: [
    bilingual("The Jamia has a library containing many rare books.", "جامعہ میں ایک کتب خانہ موجود ہے جس میں کافی نادر کتب موجود ہیں۔"),
    bilingual("Students and teachers can access the library at all times and benefit from its collection.", "اس کتب خانے میں طلبہ اور اساتذہ کی ہر وقت رسائی ممکن ہے، جس سے وہ علمی استفادہ حاصل کرتے ہیں۔"),
  ],
};

export const educationSections: InstitutionSection[] = [
  {
    id: "quran-studies",
    title: bilingual("Qur’an studies & departments", "قرآنی تعلیم اور شعبہ جات"),
    topics: [
      {
        title: bilingual("Nazira: reading the Holy Qur’an", "ناظرہ قرآن کریم"),
        paragraphs: [
          bilingual("Children begin with the Qaida, a primer for learning to read, and then progress to reading the Holy Qur’an.", "جامعہ کے اس شعبے میں آنے والے بچوں کو پہلے قاعدہ اور پھر ناظرہ قرآن کریم پڑھایا جاتا ہے۔"),
          bilingual("Alongside this, teachers teach the basic beliefs and essential rulings of Islam, particularly those concerning ablution, purification, and prayer.", "اس کے ساتھ ساتھ اساتذہ کرام بچوں کو اسلام کے بنیادی عقائد اور ضروری احکامات، بالخصوص وضو، طہارت اور نماز کے متعلق مسائل سکھاتے ہیں۔"),
          bilingual("School-going children can attend religious lessons in the morning before going to school.", "اس شعبے میں سکول جانے والے بچوں کے لیے یہ سہولت موجود ہے کہ صبح سکول جانے سے پہلے جامعہ میں دینی تعلیم حاصل کر سکیں۔"),
        ],
      },
      {
        title: bilingual("Hifz: memorising the Holy Qur’an", "تحفیظ قرآن کریم"),
        paragraphs: [
          bilingual("Memorisation of the Holy Qur’an is one of the Jamia’s main departments. After completing Nazira, children are taught to memorise the Qur’an. Many children have already been blessed to complete their memorisation at the Jamia.", "جامعہ کا ایک اہم شعبہ تحفیظ القرآن الکریم ہے، جس میں ناظرہ کے بعد بچوں کو قرآن کریم حفظ کرایا جاتا ہے۔ اب تک جامعہ میں کافی تعداد میں بچے حفظ کرنے کی سعادت حاصل کر چکے ہیں۔"),
        ],
      },
      { title: bilingual("Dars-e-Nizami", "درسِ نظامی"), comingSoon: true },
    ],
  },
  {
    id: "girls-education",
    title: bilingual("Education for girls & women", "طالبات اور خواتین کی تعلیم"),
    topics: [
      {
        title: bilingual("Girls’ education", "تعلیمِ بنات"),
        paragraphs: [
          bilingual("Like male students, female students are taught Qur’an reading, translation of the Qur’an, and essential religious rulings.", "جامعہ میں طلبہ کی طرح طالبات کے لیے بھی ناظرہ، ترجمۃ القرآن اور ضروری مسائل پڑھائے جاتے ہیں۔"),
          bilingual("A separate, dedicated building is provided for female students. They study for approximately six hours before returning home.", "جامعہ میں طالبات کے لیے ایک الگ مستقل عمارت قائم ہے جہاں وہ تقریباً چھ گھنٹے تعلیم حاصل کرتی ہیں اور پھر اپنے گھروں کو واپس چلی جاتی ہیں۔"),
        ],
      },
      {
        title: bilingual("Dirasat Diniyyah: understanding the faith", "دراساتِ دینیہ"),
        paragraphs: [
          bilingual("Acquiring a basic knowledge of the faith is an obligation upon every Muslim man and woman.", "دین کا بنیادی علم حاصل کرنا ہر مسلمان مرد و عورت کے ذمے فرض ہے۔"),
          bilingual("Recognising this need, Jamia Aisha Siddiqah lil-Banat introduced the Fahm-e-Deen course, which has been running for four years. Women of all ages, particularly older women, may enrol.", "جامعہ عائشہ صدیقہ للبنات میں اس اہم ضرورت کو سمجھتے ہوئے فہمِ دین کورس کا آغاز کیا گیا، جو عرصہ چار سال سے جاری ہے۔ اس میں ہر عمر اور بالخصوص بڑی عمر کی مستورات داخلہ لے سکتی ہیں۔"),
        ],
      },
    ],
  },
  {
    id: "adult-education",
    title: bilingual("Adult education", "تعلیمِ بالغان"),
    paragraphs: [bilingual("The Jamia has an organised programme for adults, especially those living nearby, to learn to read the Holy Qur’an with tajwid and study basic religious knowledge and rulings. Classes take place after Maghrib prayer.", "جامعہ میں بڑی عمر کے افراد، خصوصاً قرب و جوار میں رہنے والوں کے لیے قرآن کریم تجوید کے ساتھ پڑھانے اور بنیادی دینی معلومات و احکامات سکھانے کا اہتمام کیا جاتا ہے۔ اس کے لیے ایک نظام ترتیب دیا گیا ہے۔ اس کی کلاسیں مغرب کے بعد ہوتی ہیں۔")],
  },
  {
    id: "summer-course",
    title: bilingual("Summer education & character training", "تعلیم و تربیت"),
    paragraphs: [
      bilingual("During the summer holidays, the Jamia organises a forty-day course in religious education and moral development for school and college students.", "جامعہ میں سکول اور کالج کے طلبہ کے لیے گرمیوں کی چھٹیوں میں چالیس روزہ دینی و اخلاقی تربیتی کورس کا اہتمام کیا جاتا ہے۔"),
      bilingual("A dedicated curriculum has been prepared for them under the supervision and guidance of the Jamia’s teachers.", "جامعہ کے اساتذہ کی نگرانی اور رہنمائی میں ان کے لیے مخصوص نصاب مرتب کیا گیا ہے۔"),
    ],
  },
  {
    id: "calligraphy",
    title: bilingual("Calligraphy", "خوش نویسی"),
    paragraphs: [bilingual("Students are also taught handwriting and calligraphy outside lesson hours, particularly between Asr and Maghrib. A dedicated calligraphy teacher has been appointed for this purpose.", "غیر درسی اوقات، خصوصاً عصر تا مغرب، جامعہ میں طلبہ کو خوش خطی سکھانے کا بھی انتظام ہے، جس کے لیے باقاعدہ خوش نویسی کے استاد مقرر ہیں۔")],
  },
  { id: "dar-al-ifta", title: bilingual("Dar al-Ifta", "دارالافتاء"), comingSoon: true },
  {
    id: "library",
    title: bilingual("Library", "کتب خانہ (لائبریری)"),
    paragraphs: campusLibrary.paragraphs,
    link: { path: "library", label: bilingual("Visit the knowledge library", "علمی کتب خانہ دیکھیے") },
  },
  {
    id: "student-guidance",
    title: bilingual("Essential rules for students & guardians", "طلبہ اور ان کے سرپرستوں کے لیے ضروری ہدایات و قواعد و ضوابط"),
    // The supplied document skips rule 10. Preserve its numbering without inventing a rule.
    rules: [
      { number: 1, text: bilingual("Every student must be fully familiar with the beliefs and teachings of Ahl al-Sunnah wa’l-Jama‘ah, the school of truth.", "ہر طالب علم کی اہلِ سنت والجماعت، مسلکِ حق سے مکمل واقفیت ضروری ہے۔") },
      { number: 2, text: bilingual("Regular attendance at congregational prayer is essential for every student. No excuse for missing the congregation will be accepted unless it is recognised by Shariah.", "نماز باجماعت کی پابندی ہر طالب علم کے لیے انتہائی ضروری ہے۔ ترکِ جماعت کے لیے کوئی غیر شرعی عذر مسموع نہ ہوگا۔") },
      { number: 3, text: bilingual("Every student must show the utmost respect for all teachers and develop a sincere bond with them, even if they do not teach the student directly.", "ہر طالب علم کا فرض ہے کہ وہ تمام اساتذہ کا انتہائی احترام کرے اور ان سے قلبی وابستگی پیدا کرے، اگرچہ وہ براہِ راست اس کے استاد نہ ہوں۔") },
      { number: 4, text: bilingual("Every student must follow the example of the righteous members of the Ummah in conduct, actions, appearance, character, grooming, and dress. Smoking, Western-style haircuts, shaving the beard, or trimming it contrary to Shariah are strictly forbidden. Students must avoid fighting, arguing, abusive language, or misconduct towards fellow students or Jamia employees, as well as tale-bearing, fault-finding, backbiting, ridicule, and indecent joking.", "ہر طالب علم کے لیے اخلاق و اعمال، صورت و سیرت، وضع قطع اور لباس میں صلحائے امت کی مکمل اتباع ضروری ہے۔ سگریٹ پینا، انگریزی بال رکھنا، داڑھی منڈانا یا خلافِ شرع کاٹنا قطعاً ممنوع ہے۔ اپنے ساتھیوں یا ملازمینِ جامعہ سے لڑنے، جھگڑنے، بدکلامی کرنے، بد اخلاقی سے پیش آنے، ایک دوسرے کی چغلی، عیب جوئی، غیبت، مذاق اڑانے اور بیہودہ مذاق سے مکمل اجتناب کرنا ہر طالب علم پر فرض ہے۔") },
      { number: 5, text: bilingual("Students should present their needs and complaints to the administrators and teachers.", "ہر طالب علم کو اپنی ضروریات اور شکایات منتظمین اور اساتذہ کے سامنے پیش کرنی چاہئیں۔") },
      { number: 6, text: bilingual("Absence from lessons is an offence and causes irreparable loss. In cases of urgent need, students must personally apply for leave.", "سبق سے غیر حاضری جرم ہے اور ناقابلِ تلافی نقصان کا باعث ہے۔ شدید ضرورت میں خود چھٹی کی درخواست دینا ضروری ہے۔") },
      { number: 7, text: bilingual("A student who neglects study and revision and continues to do so after a warning will face disciplinary action.", "جو طالب علم مطالعہ اور تکرار میں کوتاہی کرے گا اور تنبیہ کے بعد بھی باز نہ آئے گا، اسے سزا دی جائے گی۔") },
      { number: 8, text: bilingual("Students are forbidden from taking part in politics, rallies, processions, and similar activities. Any student found involved with a political party or in non-educational activities will be expelled from the Jamia.", "طلبہ کے لیے سیاست، جلسوں، جلوسوں وغیرہ میں شرکت کرنا ممنوع ہے۔ جو طالب علم کسی سیاسی جماعت یا غیر تعلیمی سرگرمی میں ملوث پایا گیا، اسے جامعہ سے خارج کر دیا جائے گا۔") },
      { number: 9, text: bilingual("As the Jamia provides for all students’ needs, students must devote their full time and attention to learning. Those who take up another occupation or pursuit alongside their studies will not be eligible for the Jamia’s assistance or residence in its boarding accommodation.", "چونکہ جامعہ طلبہ کی تمام ضروریات کی کفالت کرتا ہے، اس لیے طلبہ کا فرض ہے کہ وہ اپنا تمام تر وقت یک سوئی کے ساتھ تحصیلِ علم میں صرف کریں۔ جو طلبہ تعلیم کے ساتھ ساتھ کوئی اور مشغلہ اختیار کریں گے، وہ جامعہ کی امداد اور دارالاقامہ میں سکونت کے مستحق نہیں ہوں گے۔") },
      { number: 11, text: bilingual("Every student must take great care over cleanliness and demonstrate courtesy, good manners, good character, and religious devotion.", "ہر طالب علم صفائی و ستھرائی کا بھرپور اہتمام کرے اور شائستگی، تہذیب و اخلاق اور دینداری کا مظاہرہ کرے۔") },
      { number: 12, text: bilingual("The principal, teachers, and administrators have the right to hold every student fully accountable. Every student must obey their instructions, and they have the full right to take disciplinary action for any breach.", "جامعہ کے مہتمم، اساتذہ اور منتظمین کو ہر طالب علم سے مکمل بازپرس کا حق ہے۔ ان کے حکم کی تعمیل کرنا ہر طالب علم کا فرض ہے۔ انہیں کسی بھی قسم کی خلاف ورزی پر مواخذے کا پورا حق حاصل ہے۔") },
      { number: 13, text: bilingual("Every student must fully comply with the Jamia’s rules and regulations and all instructions given by the teachers.", "ہر طالب علم پر لازم ہے کہ وہ جامعہ کے قواعد و ضوابط اور اساتذہ کی طرف سے دی جانے والی تمام ہدایات کی مکمل پابندی کرے۔") },
    ],
  },
];

export const contactSections: InstitutionSection[] = [
  {
    id: "visit",
    title: bilingual("Visit the Jamia", "جامعہ تشریف لائیے"),
    paragraphs: [bilingual("A verified address and visiting hours will appear here.", "تصدیق شدہ پتہ اور ملاقات کے اوقات یہاں شائع ہوں گے۔")],
  },
  {
    id: "official-contact",
    title: bilingual("Official contact", "سرکاری رابطہ"),
    paragraphs: [bilingual("Approved telephone and email details will appear here.", "منظور شدہ فون نمبر اور ای میل کی تفصیلات یہاں شائع ہوں گی۔")],
  },
  fundingSection,
];
