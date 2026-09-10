export type Dictionary = {
  nav: {
    about: string;
    services: string;
    blog: string;
    contact: string;
    toggleMenu: string;
    toggleServices: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    copyright: string;
    portfolio: string;
    privacy: string;
    terms: string;
  };
  hero: {
    cta: string;
    tagline: string;
    headlines: string[];
  };
  brand: {
    titleTop: string;
    titleMain: string;
    titleBottom: string;
    copy: string;
    cta: string;
  };
  whoWeAre: {
    words: [string, string, string];
    copy: string;
    about: string;
  };
  howWeWork: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; description: string }[];
  };
  faq: {
    heading: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    intro: string;
    empty: string;
    explore: string;
    exploreArticles: string;
    prev: string;
    next: string;
    related: string;
  };
  services: {
    listingEyebrow: string;
    listingTitle: string;
    listingIntro: string;
    listingCta: string;
    otherTitle: string;
  };
  contact: {
    map: string;
    formPrivacy: string;
  };
  form: {
    name: string;
    email: string;
    phone: string;
    mobile: string;
    company: string;
    service: string;
    chooseService: string;
    otherService: string;
    budget: string;
    requirement: string;
    project: string;
    countryCode: string;
    send: string;
    sendRequest: string;
    sending: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    genericError: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    requirementPlaceholder: string;
    projectPlaceholder: string;
  };
  thankYou: {
    kicker: string;
    title: string;
    copy: string;
    home: string;
    another: string;
  };
  legal: {
    lastUpdated: string;
  };
  language: {
    switchTo: string;
  };
};

export const en: Dictionary = {
  nav: {
    about: "About Us",
    services: "Services",
    blog: "Blog",
    contact: "Contact",
    toggleMenu: "Toggle menu",
    toggleServices: "Toggle services menu",
  },
  footer: {
    tagline:
      "A creative and technology studio building brands that move from identity and film to marketing and the digital products behind them. One team, one standard, for brands that refuse to blend in.",
    quickLinks: "Quick Links",
    services: "Services",
    copyright: "© 2026 Inkspilled. All Rights Reserved.",
    portfolio: "Portfolio",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  },
  hero: {
    cta: "Start A Project",
    tagline:
      "Strategy that thinks, design that moves, storytelling that sticks. For brands that refuse to blend in.",
    headlines: ["Ink it", "Move it", "Make it stick"],
  },
  brand: {
    titleTop: "We Build",
    titleMain: "Brands",
    titleBottom: "That Lead.",
    copy: "Anyone can make you look good. We make you impossible to ignore, with strategy that earns attention, design that holds it, and stories people actually pass on. One studio, start to finish.",
    cta: "Start A Project",
  },
  whoWeAre: {
    words: ["Who", " we", " are?"],
    copy: "Inkspilled is a creative studio in Dubai for businesses that refuse to blend in. We lead with strategy, shape identity through design, and bring ideas alive as a full service creative and technology studio. From startups finding a voice to category leaders entering new markets, we build brands people remember and choose. Creative leads. Digital scales. That's the Inkspilled edge.",
    about: "About Us",
  },
  howWeWork: {
    title: "How We Work",
    subtitle: "From Idea To Impact.",
    steps: [
      {
        number: "01",
        title: "Dip",
        description:
          "We listen first: your goals, your market, your audience, and what truly sets you apart.",
      },
      {
        number: "02",
        title: "Sketch",
        description:
          "Insight becomes direction. A clear strategy guides every decision ahead.",
      },
      {
        number: "03",
        title: "Spill",
        description:
          "Ideas take shape: design, content, and production crafted to land with impact.",
      },
      {
        number: "04",
        title: "Set",
        description:
          "We take it to market and keep it moving. Launch, measure, refine, grow.",
      },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
  },
  blog: {
    eyebrow: "Straight From The Studio",
    title: "Blog",
    intro:
      "Ideas, insight, and creative thinking built for ambitious brands. Browse {count} articles from the Inkspilled studio.",
    empty:
      "New articles are on the way. Check back soon for fresh ideas from the Inkspilled studio.",
    explore: "Explore More",
    exploreArticles: "Explore More Articles",
    prev: "Prev",
    next: "Next",
    related: "More From The Studio",
  },
  services: {
    listingEyebrow: "What We Do",
    listingTitle: "Services",
    listingIntro:
      "Strategy, design, film, and digital — built as one system for brands that refuse to blend in.",
    listingCta: "Start A Project",
    otherTitle: "Other Services",
  },
  contact: {
    map: "View on map",
    formPrivacy:
      "We respect your privacy. Your details are only used to respond to your enquiry.",
  },
  form: {
    name: "Your Name",
    email: "Your Email",
    phone: "Phone",
    mobile: "Your Mobile Number",
    company: "Company Name",
    service: "Service",
    chooseService: "Choose Service",
    otherService: "Other",
    budget: "Estimated Budget",
    requirement: "Your Requirement",
    project: "Tell us about your project",
    countryCode: "Country code",
    send: "Send Message →",
    sendRequest: "Send Request",
    sending: "Sending…",
    required: "Please fill in all required fields before sending.",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Please enter a valid phone number.",
    genericError: "Something went wrong. Please try again in a moment.",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "Your company or brand",
    requirementPlaceholder:
      "Tell us about your brand, goals, timeline, and what success looks like.",
    projectPlaceholder: "Share your goals, timeline, and anything else we should know.",
  },
  thankYou: {
    kicker: "Message",
    title: "Received",
    copy: "Thank you for getting in touch with Inkspilled. Your inquiry is on its way to our team. We will review the details and reply shortly with next steps.",
    home: "Back To Home",
    another: "Send Another Message",
  },
  legal: {
    lastUpdated: "Last updated {date}",
  },
  language: {
    switchTo: "Switch language",
  },
};

export const ar: Dictionary = {
  nav: {
    about: "من نحن",
    services: "خدماتنا",
    blog: "المدونة",
    contact: "تواصل معنا",
    toggleMenu: "فتح القائمة",
    toggleServices: "فتح قائمة الخدمات",
  },
  footer: {
    tagline:
      "استوديو إبداعي وتقني يبني علامات تجارية تمتد من الهوية والأفلام إلى التسويق والمنتجات الرقمية. فريق واحد ومعيار واحد للعلامات التي ترفض أن تذوب في الزحام.",
    quickLinks: "روابط سريعة",
    services: "خدماتنا",
    copyright: "© 2026 إنكسبيلد. جميع الحقوق محفوظة.",
    portfolio: "أعمالنا",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
  },
  hero: {
    cta: "ابدأ مشروعك",
    tagline:
      "استراتيجية تفكّر، وتصميم يتحرّك، وسرد يعلق في الذاكرة. للعلامات التي ترفض أن تذوب في الزحام.",
    headlines: ["احبرها", "حرّكها", "ثبّتها"],
  },
  brand: {
    titleTop: "نبني",
    titleMain: "علامات",
    titleBottom: "تقود.",
    copy: "أي أحد يمكنه أن يجعلك تبدو جيداً. نحن نجعلك مستحيلاً تجاهله، باستراتيجية تكسب الانتباه، وتصميم يحتفظ به، وقصص يمرّرها الناس فعلاً. استوديو واحد من البداية حتى النهاية.",
    cta: "ابدأ مشروعك",
  },
  whoWeAre: {
    words: ["من", " نحن", "؟"],
    copy: "إنكسبيلد استوديو إبداعي في دبي للشركات التي ترفض أن تذوب في الزحام. نقود بالاستراتيجية، ونشكّل الهوية عبر التصميم، ونحوّل الأفكار إلى عمل كاستوديو إبداعي وتقني متكامل. من الشركات الناشئة التي تبحث عن صوتها إلى روّاد الفئة الذين يدخلون أسواقاً جديدة، نبني علامات يتذكّرها الناس ويختارونها.",
    about: "من نحن",
  },
  howWeWork: {
    title: "كيف نعمل",
    subtitle: "من الفكرة إلى الأثر.",
    steps: [
      {
        number: "01",
        title: "نستمع",
        description:
          "نبدأ بالاستماع: أهدافك، وسوقك، وجمهورك، وما الذي يميّزك حقاً.",
      },
      {
        number: "02",
        title: "نرسم",
        description:
          "تتحوّل الرؤية إلى اتجاه. استراتيجية واضحة تقود كل قرار بعد ذلك.",
      },
      {
        number: "03",
        title: "نسكب",
        description:
          "تأخذ الأفكار شكلها: تصميم ومحتوى وإنتاج يُصنع ليصل بأثر واضح.",
      },
      {
        number: "04",
        title: "نثبّت",
        description:
          "نأخذ العمل إلى السوق ونُبقيه متحرّكاً. إطلاق، قياس، تحسين، نمو.",
      },
    ],
  },
  faq: {
    heading: "الأسئلة الشائعة",
  },
  blog: {
    eyebrow: "مباشرة من الاستوديو",
    title: "المدونة",
    intro:
      "أفكار ورؤى وتفكير إبداعي للعلامات الطموحة. تصفّح {count} مقالاً من استوديو إنكسبيلد.",
    empty:
      "مقالات جديدة في الطريق. عد قريباً لأفكار جديدة من استوديو إنكسبيلد.",
    explore: "اكتشف المزيد",
    exploreArticles: "المزيد من المقالات",
    prev: "السابق",
    next: "التالي",
    related: "المزيد من الاستوديو",
  },
  services: {
    listingEyebrow: "ماذا نقدم",
    listingTitle: "خدماتنا",
    listingIntro:
      "استراتيجية وتصميم وأفلام وحضور رقمي — كنظام واحد للعلامات التي ترفض أن تذوب في الزحام.",
    listingCta: "ابدأ مشروعك",
    otherTitle: "خدمات أخرى",
  },
  contact: {
    map: "عرض على الخريطة",
    formPrivacy:
      "نحترم خصوصيتك. تُستخدم بياناتك فقط للرد على استفسارك.",
  },
  form: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    mobile: "رقم الجوال",
    company: "اسم الشركة",
    service: "الخدمة",
    chooseService: "اختر الخدمة",
    otherService: "أخرى",
    budget: "الميزانية التقديرية",
    requirement: "متطلباتك",
    project: "حدّثنا عن مشروعك",
    countryCode: "رمز الدولة",
    send: "إرسال الرسالة ←",
    sendRequest: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
    required: "يرجى تعبئة جميع الحقول المطلوبة قبل الإرسال.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
    invalidPhone: "يرجى إدخال رقم هاتف صالح.",
    genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى بعد لحظات.",
    namePlaceholder: "أدخل اسمك الكامل",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "شركتك أو علامتك",
    requirementPlaceholder:
      "حدّثنا عن علامتك وأهدافك والجدول الزمني وكيف يبدو النجاح بالنسبة لك.",
    projectPlaceholder: "ماذا تريد أن تبني؟",
  },
  thankYou: {
    kicker: "وصلت",
    title: "رسالتك",
    copy: "شكراً لتواصلك مع إنكسبيلد. استفسارك في طريقه إلى فريقنا. سنراجع التفاصيل ونرد عليك قريباً بالخطوات التالية.",
    home: "العودة للرئيسية",
    another: "إرسال رسالة أخرى",
  },
  legal: {
    lastUpdated: "آخر تحديث {date}",
  },
  language: {
    switchTo: "تغيير اللغة",
  },
};

export const dictionaries: Record<"en" | "ar", Dictionary> = { en, ar };

export function getDictionary(locale: "en" | "ar"): Dictionary {
  return dictionaries[locale];
}
