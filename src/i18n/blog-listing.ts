import type { BlogPost } from "@/data/blogs";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

const LISTING_COPY_AR: Record<
  string,
  { title: string; excerpt: string; date: string }
> = {
  "building-brands-that-feel-human": {
    title: "بناء علامات تبدو إنسانية في عالم رقمي أولاً",
    excerpt:
      "العلامات العظيمة تتجاوز المظهر المصقول. تخلق تعرّفاً وثقة وشعوراً قبل أن تُقرأ كلمة واحدة.",
    date: "12 مارس 2026",
  },
  "why-creative-strategy-comes-before-campaigns": {
    title: "لماذا يجب أن تسبق الاستراتيجية الإبداعية الحملات دائماً",
    excerpt:
      "عمل جميل بلا اتجاه ضوضاء مكلفة. الاستراتيجية تحوّل الأفكار إلى نتائج يشعر بها الجمهور.",
    date: "5 مارس 2026",
  },
  "designing-websites-that-convert-without-shouting": {
    title: "تصميم مواقع تحوّل دون صراخ",
    excerpt:
      "التحويل ليس أزراراً أعلى صوتاً. هو وضوح وإيقاع وثقة مبنية في كل تمريرة.",
    date: "26 فبراير 2026",
  },
  "social-content-that-earns-attention": {
    title: "محتوى اجتماعي يكسب الانتباه بدل أن يقاطعه",
    excerpt:
      "الخلاصات تكافئ الصلة. العلامات التي تفوز تصنع ثقافة، لا مجرد رزنامة منشورات.",
    date: "18 فبراير 2026",
  },
  "the-case-for-cinematic-brand-films": {
    title: "حجّة الأفلام السينمائية للعلامة في التسويق الحديث",
    excerpt:
      "يبقى الفيلم من أسرع الطرق لجعل الناس يشعرون بشيء يدوم تجاه علامتك.",
    date: "10 فبراير 2026",
  },
  "ai-and-cg-without-losing-the-craft": {
    title: "استخدام الذكاء الاصطناعي والرسوم الحاسوبية دون فقدان الحرفة",
    excerpt:
      "الأدوات الجديدة توسّع الممكن. الذوق والاتجاه ما زالا يقرّران ما يستحق الصنع.",
    date: "3 فبراير 2026",
  },
  "digital-marketing-that-respects-the-brand": {
    title: "تسويق رقمي يحترم العلامة والأرقام معاً",
    excerpt:
      "الأداء والعلامة ليسا خصمين. أفضل الحملات تجعلهما يعزّزان بعضهما.",
    date: "27 يناير 2026",
  },
  "packaging-as-a-silent-salesperson": {
    title: "تصميم التغليف كمندوب مبيعات صامت",
    excerpt:
      "على الرف وعلى الشاشة، للتغليف ثوانٍ ليوصل القيمة والشخصية والثقة.",
    date: "20 يناير 2026",
  },
  "motion-graphics-that-carry-meaning": {
    title: "موشن غرافيكس يحمل معنى لا مجرد حركة",
    excerpt:
      "الحركة يجب أن توضّح الأفكار. إن زينت فقط فهي ضوضاء بصرية بثوب عصري.",
    date: "13 يناير 2026",
  },
  "dubai-creative-agency-lessons": {
    title: "دروس من بناء عمل إبداعي لعلامات طموحة في دبي",
    excerpt:
      "سوق دبي سريع. الوضوح والحرفة والوعي الثقافي يبقيان العمل الإبداعي ذا صلة.",
    date: "6 يناير 2026",
  },
  "content-systems-beat-one-off-ideas": {
    title: "لماذا تهزم أنظمة المحتوى الأفكار الإبداعية المنفردة",
    excerpt:
      "منشور لامع واحد يتلاشى. النظام يُبقي علامتك حاضرة ومتماسكة وجاهزة للتوسّع.",
    date: "18 ديسمبر 2025",
  },
  "ux-details-that-shape-brand-trust": {
    title: "تفاصيل تجربة المستخدم التي تشكّل الثقة بهدوء",
    excerpt:
      "تُبنى الثقة في لحظات صغيرة: سرعة التحميل، الحالات الفارغة، تسميات النماذج، وطريقة معالجة الأخطاء.",
    date: "9 ديسمبر 2025",
  },
};

function hasArabic(value: string) {
  return ARABIC_SCRIPT.test(value);
}

function localizeReadTime(readTime: string, locale: Locale) {
  if (locale !== "ar" || hasArabic(readTime)) return readTime;
  const match = readTime.match(/(\d+)\s*min/i);
  if (!match) return readTime;
  return getDictionary(locale).blog.minRead.replace("{count}", match[1]);
}

export function localizeBlogListingPost(
  post: BlogPost,
  locale: Locale,
): BlogPost {
  if (locale !== "ar") return post;

  const t = getDictionary(locale);
  const listing = LISTING_COPY_AR[post.slug];
  const category = t.blog.categoryLabels[post.category] || post.category;

  return {
    ...post,
    title: hasArabic(post.title) ? post.title : listing?.title || post.title,
    excerpt: hasArabic(post.excerpt)
      ? post.excerpt
      : listing?.excerpt || post.excerpt,
    date: hasArabic(post.date) ? post.date : listing?.date || post.date,
    category: hasArabic(post.category) ? post.category : category,
    readTime: localizeReadTime(post.readTime, locale),
    author:
      hasArabic(post.author) || post.author !== "Inkspilled Studio"
        ? post.author
        : t.blog.authorStudio,
  };
}

export function localizeBlogListingPosts(posts: BlogPost[], locale: Locale) {
  return posts.map((post) => localizeBlogListingPost(post, locale));
}
