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
    addressLine1: string;
    addressLine2: string;
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
  about: {
    watchShowreel: string;
    wordField: string;
    eyebrow: string;
    title: string;
    intro: string;
    storyEyebrow: string;
    storyTitle: string;
    storyParagraphs: string[];
    valuesEyebrow: string;
    valuesTitle: string;
    values: { title: string; copy: string }[];
    statsEyebrow: string;
    statsTitle: string;
    stats: { value: string; label: string }[];
    ctaTitle: string;
    ctaCopy: string;
    ctaButtonLabel: string;
    infinity: string;
  };
  howWeWork: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; description: string }[];
  };
  faq: {
    heading: string;
    questionPrefix: string;
    items: { question: string; answer: string }[];
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
    homeKicker: string;
    homeName: string;
    homeCopyLine1: string;
    homeCopyLine2: string;
    prevPage: string;
    nextPage: string;
    minRead: string;
    authorStudio: string;
    categoryLabels: Record<string, string>;
  };
  services: {
    listingEyebrow: string;
    listingTitle: string;
    listingIntro: string;
    listingCta: string;
    listingExplore: string;
    otherEyebrow: string;
    otherTitle: string;
    otherExplore: string;
    otherPrev: string;
    otherNext: string;
    otherAria: string;
    platformsTitle: string;
    platformsCopy: string;
    platformsAria: string;
    introKicker: string;
    introTitleWords: string[];
    introSubline: string;
    introSublineWords: string[];
    introLeadBefore: string;
    introLeadEmphasis: string;
    introLeadAfter: string;
    introCopy: string;
    introEyebrow: string;
    menu: string[];
  };
  contact: {
    map: string;
    formPrivacy: string;
    preferTitle: string;
    preferCopy: string;
    callUs: string;
    emailUs: string;
    whatsapp: string;
    whatsappHint: string;
    officeHoursLabel: string;
    newBusiness: string;
    infinity: string;
    eyebrow: string;
    title: string;
    intro: string;
    metaPills: string[];
    formTitle: string;
    formIntro: string;
    statsEyebrow: string;
    statsTitle: string;
    stats: { value: string; label: string }[];
    locationTitle: string;
    locationIntro: string;
    officeHours: string;
    careersTitle: string;
    careersCopy: string;
    careersButtonLabel: string;
    budgetLabels: Record<string, string>;
    seoTitle: string;
    seoDescription: string;
    offices: {
      label: string;
      company: string;
      lines: string[];
      phone?: string;
      mapHref?: string;
    }[];
  };
  letsTalk: {
    titleTop: string;
    titleMain: string;
    copy: string;
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
  chat: {
    title: string;
    subtitle: string;
    welcome: string;
    placeholder: string;
    placeholderSpeech: string;
    placeholderIos: string;
    send: string;
    close: string;
    open: string;
    thinking: string;
    listening: string;
    liveTranscript: string;
    speechReady: string;
    speechUnavailable: string;
    iosHint: string;
    mobileTtsHint: string;
    listen: string;
    mic: string;
    stopMic: string;
    error: string;
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
    addressLine1: "B-803, Prime Business Center, JVC,",
    addressLine2: "Dubai, United Arab Emirates",
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
  about: {
    watchShowreel: "Watch The Showreel",
    wordField:
      "BRAND STRATEGY MOTION IDENTITY PRINT PACKAGING SOCIAL MEDIA CONTENT INFLUENCER UX UI DESIGN ECOMMERCE FILM DIGITAL GROWTH CREATIVE DUBAI ",
    eyebrow: "Creative Branding Agency · Dubai",
    title: "About Inkspilled",
    intro:
      "We are a full service creative studio helping ambitious brands stand out in crowded markets. Strategy leads, design shapes, and digital scales. That is how we build work people remember.",
    storyEyebrow: "Our Story",
    storyTitle: "Built For Brands That Refuse To Blend In",
    storyParagraphs: [
      "Inkspilled started with a simple belief: great brands are not assembled from templates. They are shaped through sharp thinking, distinctive design, and storytelling that earns attention.",
      "From our studio in Dubai, we partner with startups finding their voice and category leaders entering new markets. Our teams span branding, film, digital, and web, working as one unit so every channel feels connected.",
      "This page uses placeholder copy for now. Replace it with your founding story, milestones, and the principles that define how your team works.",
    ],
    valuesEyebrow: "What We Stand For",
    valuesTitle: "Values That Guide The Work",
    values: [
      {
        title: "Strategy First",
        copy:
          "Every visual decision starts with a clear point of view. We define the story before we design the surface.",
      },
      {
        title: "Craft With Conviction",
        copy:
          "From identity systems to film and digital, we build work that feels intentional, not interchangeable.",
      },
      {
        title: "Partners, Not Vendors",
        copy:
          "We embed with your team, challenge assumptions, and stay accountable from kickoff through launch.",
      },
    ],
    statsEyebrow: "Why brands choose us",
    statsTitle: "We build brands people remember",
    stats: [
      { value: "100+", label: "Projects Delivered" },
      { value: "∞", label: "Ink in the Well" },
      { value: "7", label: "Shades Of One Ink" },
      { value: "2023", label: "Since the First Spill" },
    ],
    ctaTitle: "Ready To Build Something People Remember?",
    ctaCopy:
      "Tell us what you are building and we will show you what is possible, from brand identity to campaigns, film, and digital.",
    ctaButtonLabel: "Start A Conversation",
    infinity: "Infinity",
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
    questionPrefix: "Q",
    items: [
      {
        question: "What Services Does Inkspilled Offer?",
        answer:
          "Inkspilled Is A Dubai Based Creative Design Agency That Offers Brand Strategy, Logo And Identity Design, Creative Design And Motion, And Video Production. We Also Handle Content, Social Media, And Digital Growth. Every Service Is Built On A Creative First Foundation, With Digital Marketing As The Performance Layer.",
      },
      {
        question: "How Is Inkspilled Different From A Creative Marketing Agency?",
        answer:
          "Unlike A Creative Marketing Agency, Inkspilled Leads With Creative Strategy And Brand Building, Then Uses Digital To Amplify The Results. Most Agencies Start With Ads, We Start With The Brand. This Creative First Approach Is Why Clients Rank Us Among The Best Creative Agencies In Dubai For Work That Performs.",
      },
      {
        question: "How Much Does A Creative Agency Cost In Dubai?",
        answer:
          "Project Costs Depend On Scope, Timeline, And Deliverables. Brand Identity Projects, Campaign Creative, And Retainer Partnerships Are Scoped Individually After A Discovery Call. We Provide Transparent Proposals So You Know Exactly What You Are Investing In Before Work Begins.",
      },
      {
        question: "Do You Work With Startups And Small Businesses In Dubai?",
        answer:
          "Yes. We Partner With Startups, Scale Ups, And Established Brands Across Dubai And The Wider GCC. Whether You Need A First Identity Or A Full Rebrand Before Entering A New Market, We Build Creative Systems That Grow With Your Business.",
      },
      {
        question: "Can You Handle Both Branding And Digital Marketing?",
        answer:
          "Absolutely. Inkspilled Is Built As A Full Service Creative Studio. We Shape Your Brand Strategy And Visual Identity First, Then Extend That Foundation Into Content, Social, And Performance Marketing So Every Channel Feels Cohesive.",
      },
      {
        question: "Do You Create Arabic Language Creative Content?",
        answer:
          "Yes. We Develop Bilingual And Arabic First Creative For Campaigns, Social Content, Brand Films, And Identity Systems, Ensuring Messaging Resonates Culturally While Staying True To Your Brand Voice.",
      },
      {
        question: "How Do I Start A Project With Inkspilled?",
        answer:
          "Reach Out Through Our Contact Page Or Email. We Schedule A Discovery Call To Understand Your Goals, Audience, And Timeline, Then Share A Tailored Proposal With Scope, Deliverables, And Next Steps To Kick Off Your Project.",
      },
    ],
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
    homeKicker: "More From",
    homeName: "Inkspilled",
    homeCopyLine1: "Ideas, Insight, And Creative",
    homeCopyLine2: "Thinking, Built For Your Screen",
    prevPage: "Previous page",
    nextPage: "Next page",
    minRead: "{count} min read",
    authorStudio: "Inkspilled Studio",
    categoryLabels: {
      Branding: "Branding",
      Strategy: "Strategy",
      "Web Design": "Web Design",
      "Social Media": "Social Media",
      Film: "Film",
      "AI & CGI": "AI & CGI",
      "Digital Marketing": "Digital Marketing",
      Motion: "Motion",
      "Studio Notes": "Studio Notes",
    },
  },
  services: {
    listingEyebrow: "Inkspills. It doesn't sit in the bottle",
    listingTitle: "Services",
    listingIntro:
      "We're a creative and technology studio with one obsession: making brands move. Seven disciplines under one roof, brand, film, AI, strategy, marketing, and the builds that hold it together, run by a single team from first idea to final frame. No handoffs. One standard. Everything, done well.",
    listingCta: "Start A Project",
    listingExplore: "Explore More →",
    otherEyebrow: "Keep Exploring",
    otherTitle: "Other Services",
    otherExplore: "Explore",
    otherPrev: "Previous service",
    otherNext: "Next service",
    otherAria: "Other services",
    platformsTitle: "Where the Ink Flows",
    platformsCopy: "Every platform, tool, and surface we work across.",
    platformsAria: "Platforms and tools we work with",
    introKicker: "Your",
    introTitleWords: ["Creative", "Digital", "Agency"],
    introSubline: "From Scalability & Growth",
    introSublineWords: ["From", "Scalability", "&", "Growth"],
    introLeadBefore: "Seven disciplines. One obsession: your ",
    introLeadEmphasis: "growth",
    introLeadAfter: ".",
    introCopy:
      "Everything your brand needs to launch, grow, and lead, built by one team, under one roof.",
    introEyebrow: "Our Services",
    menu: [
      "Brand & Design",
      "Film & Production",
      "AI & CGI",
      "Strategy & Planning",
      "Social Media Marketing",
      "Digital Marketing",
      "Product Design & Development",
    ],
  },
  contact: {
    map: "View on map",
    formPrivacy:
      "We respect your privacy. Your details are only used to respond to your enquiry.",
    preferTitle: "Prefer to talk?",
    preferCopy:
      "For anything urgent or if you would rather skip the form, reach us directly. We usually respond within one business day.",
    callUs: "Call us",
    emailUs: "Email us",
    whatsapp: "Message on WhatsApp",
    whatsappHint: "Quick reply during office hours",
    officeHoursLabel: "Office hours",
    newBusiness: "New business & partnerships",
    infinity: "Infinity",
    eyebrow: "START HERE",
    title: "It's time to\nSpill Something Great.",
    intro:
      "Tell us a little about your brand and where you would like to take it. We will get back to you, usually within one business day.",
    metaPills: [
      "Headquartered, India · UAE · USA",
      "Idea To Launch",
      "Mon to Fri, 9:00 to 18:00 (GST + 4)",
    ],
    formTitle: "Leave us a brief",
    formIntro: "Share your requirements and the services you're interested in.",
    statsEyebrow: "Why brands choose us",
    statsTitle: "We build brands people remember",
    stats: [
      { value: "100+", label: "Projects Delivered" },
      { value: "∞", label: "Ink in the Well" },
      { value: "7", label: "Shades Of One Ink" },
      { value: "2023", label: "Since the First Spill" },
    ],
    locationTitle: "WHERE TO FIND US",
    locationIntro:
      "Dubai and India today, the US on the way. Wherever your project lands, it's the same team and the same standard behind it.",
    officeHours: "Monday to Friday, 9:00 AM to 6:00 PM (GST +4)",
    careersTitle: "Great work starts with great people.",
    careersCopy:
      "We are always on the lookout for talented creatives and strategists. Send us a portfolio. We respond well to beautifully crafted work.",
    careersButtonLabel: "Get in touch about careers →",
    budgetLabels: {},
    seoTitle: "Contact Inkspilled | Creative Agency in Dubai",
    seoDescription:
      "Contact Inkspilled, a creative agency in Dubai. Share your brief, book a free consultation, or reach us by phone, email, or WhatsApp. Reply within one business day.",
    offices: [
      {
        label: "DUBAI",
        company: "Inkspilled Technologies LLC",
        lines: [
          "B-803, Prime Business Center",
          "JVC, Dubai, United Arab Emirates",
        ],
        phone: "+971 58 579 9959",
        mapHref: "https://maps.google.com/?q=Prime+Business+Center+JVC+Dubai",
      },
      {
        label: "INDIA",
        company: "Inkspilled Media Pvt. Ltd.",
        lines: ["18, 3rd Floor, Hauz Khas Village", "New Delhi, India"],
        phone: "+91 9990044819",
        mapHref:
          "https://maps.google.com/?q=18+3rd+Floor+Hauz+Khas+Village+New+Delhi",
      },
      {
        label: "USA · COMING SOON",
        company: "Expanding to the United States.",
        lines: ["Same studio, new coast."],
      },
    ],
  },
  letsTalk: {
    titleTop: "Let's",
    titleMain: "Talk",
    copy: "Looking to hire a creative studio in Dubai? You just found it. Tell us what you're building, and we'll show you what's possible.",
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
  chat: {
    title: "Inkspilled Assistant",
    subtitle: "Speak or type — I’ll reply out loud",
    welcome:
      "Hi! I’m the Inkspilled assistant. Tap the mic and start talking, or type about our services, Dubai office, pricing, or how to start a project.",
    placeholder: "Ask about services, pricing, process...",
    placeholderSpeech: "Type a message or use the mic…",
    placeholderIos: "Type your message here…",
    send: "Send message",
    close: "Close chat",
    open: "Open chat assistant",
    thinking: "Thinking...",
    listening: "Listening…",
    liveTranscript: "Live transcript",
    speechReady: "Speech ready",
    speechUnavailable: "Speech off",
    iosHint:
      "Voice input isn’t available on iPad in this browser. Type below, or try Chrome on a computer.",
    mobileTtsHint: "Tap the speaker to hear replies.",
    listen: "Listen to message",
    mic: "Start voice input",
    stopMic: "Stop voice input",
    error: "Something went wrong. Please try again.",
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
    addressLine1: "ب-803، مركز برايم للأعمال، قرية جميرا الدائرية،",
    addressLine2: "دبي، الإمارات العربية المتحدة",
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
  about: {
    watchShowreel: "شاهد العرض",
    wordField:
      "استراتيجية علامة حركة هوية طباعة تغليف تواصل محتوى تأثير تصميم تجارة أفلام رقمي نمو إبداعي دبي ",
    eyebrow: "وكالة إبداعية للهوية البصرية · دبي",
    title: "عن إنكسبيلد",
    intro:
      "نحن استوديو إبداعي متكامل نساعد العلامات الطموحة على التميّز في الأسواق المزدحمة. الاستراتيجية تقود، والتصميم يشكّل، والرقمي يوسّع الأثر. هكذا نبني عملاً يتذكّره الناس.",
    storyEyebrow: "قصتنا",
    storyTitle: "بُني لعلامات ترفض أن تذوب في الزحام",
    storyParagraphs: [
      "بدأت إنكسبيلد من قناعة بسيطة: العلامات العظيمة لا تُركَّب من قوالب جاهزة. تُصنع بتفكير حاد، وتصميم مميز، وسرد يكسب الانتباه.",
      "من استوديونا في دبي نشارك الشركات الناشئة التي تبحث عن صوتها، وروّاد فئاتهم الذين يدخلون أسواقاً جديدة. فرقنا تغطي الهوية والأفلام والرقمي والويب، وتعمل كوحدة واحدة حتى يبقى كل قناة متصلاً.",
      "يبني هذا النص التأسيسي القصة والمبادئ التي تقود طريقة عملنا، من أول فكرة حتى الإطلاق.",
    ],
    valuesEyebrow: "ما نؤمن به",
    valuesTitle: "قيم تقود العمل",
    values: [
      {
        title: "الاستراتيجية أولاً",
        copy:
          "كل قرار بصري يبدأ من وجهة نظر واضحة. نحدد القصة قبل أن نصمّم السطح.",
      },
      {
        title: "حرفة عن قناعة",
        copy:
          "من أنظمة الهوية إلى الأفلام والعمل الرقمي، نبني عملاً يبدو مقصوداً لا قابلاً للاستبدال.",
      },
      {
        title: "شركاء لا منفّذون",
        copy:
          "نندمج مع فريقكم، ونختبر الافتراضات، ونبقى مسؤولين من الانطلاقة حتى الإطلاق.",
      },
    ],
    statsEyebrow: "لماذا تختارنا العلامات",
    statsTitle: "نبني علامات يتذكّرها الناس",
    stats: [
      { value: "100+", label: "مشاريع منجزة" },
      { value: "∞", label: "حبر في البئر" },
      { value: "7", label: "درجات من حبر واحد" },
      { value: "2023", label: "منذ أول سكبة" },
    ],
    ctaTitle: "مستعد لبناء شيء يتذكّره الناس؟",
    ctaCopy:
      "أخبرنا بما تبنيه وسنريك ما هو ممكن، من هوية العلامة إلى الحملات والأفلام والعمل الرقمي.",
    ctaButtonLabel: "ابدأ حواراً",
    infinity: "ما لا نهاية",
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
    questionPrefix: "س",
    items: [
      {
        question: "ما الخدمات التي تقدّمها إنكسبيلد؟",
        answer:
          "إنكسبيلد استوديو إبداعي في دبي يقدّم استراتيجية العلامة، وتصميم الشعار والهوية، والتصميم الإبداعي والحركة، وإنتاج الفيديو. كما نتولّى المحتوى والتواصل الاجتماعي والنمو الرقمي. كل خدمة تُبنى على أساس إبداعي أولاً، والتسويق الرقمي هو طبقة الأداء.",
      },
      {
        question: "كيف تختلف إنكسبيلد عن وكالة تسويق إبداعية؟",
        answer:
          "بخلاف وكالات التسويق الإبداعي، تقود إنكسبيلد بالاستراتيجية وبناء العلامة، ثم تستخدم الرقمي لتضخيم النتائج. معظم الوكالات تبدأ بالإعلانات، نحن نبدأ بالعلامة. هذا النهج الإبداعي أولاً هو ما يجعل العملاء يصنّفوننا بين أفضل الاستوديوهات الإبداعية في دبي لعمل يحقّق أداءً.",
      },
      {
        question: "كم تبلغ تكلفة الاستوديو الإبداعي في دبي؟",
        answer:
          "تعتمد تكلفة المشروع على النطاق والجدول الزمني والمخرجات. مشاريع الهوية والحملات واتفاقيات الاحتفاظ تُحدَّد بعد مكالمة استكشاف. نقدّم عروضاً واضحة لتعرف استثمارك قبل أن يبدأ العمل.",
      },
      {
        question: "هل تعملون مع الشركات الناشئة والصغيرة في دبي؟",
        answer:
          "نعم. نتعاون مع الشركات الناشئة والمتوسّطة والعلامات الراسخة في دبي ومنطقة الخليج. سواء احتجت هوية أولى أو إعادة بناء كاملة قبل دخول سوق جديد، نبني أنظمة إبداعية تنمو مع عملك.",
      },
      {
        question: "هل تغطّون الهوية والتسويق الرقمي معاً؟",
        answer:
          "بالتأكيد. إنكسبيلد استوديو إبداعي متكامل. نبدأ باستراتيجية العلامة والهوية البصرية، ثم نوسّع هذا الأساس إلى المحتوى والتواصل الاجتماعي والتسويق الأدائي ليبدو كل قناة متماسكاً.",
      },
      {
        question: "هل تنتجون محتوى إبداعياً باللغة العربية؟",
        answer:
          "نعم. نطوّر أعمالاً ثنائية اللغة وعربية أولاً للحملات والمحتوى الاجتماعي وأفلام العلامة وأنظمة الهوية، ليصل الخطاب ثقافياً ويبقى أميناً لصوت علامتك.",
      },
      {
        question: "كيف أبدأ مشروعاً مع إنكسبيلد؟",
        answer:
          "تواصل معنا عبر صفحة الاتصال أو البريد. نحدّد مكالمة استكشاف لفهم أهدافك وجمهورك وجدولك، ثم نشارك عرضاً مخصّصاً بالنطاق والمخرجات والخطوات التالية.",
      },
    ],
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
    homeKicker: "المزيد من",
    homeName: "إنكسبيلد",
    homeCopyLine1: "أفكار ورؤى وتفكير إبداعي",
    homeCopyLine2: "مصمّم لشاشتك",
    prevPage: "الصفحة السابقة",
    nextPage: "الصفحة التالية",
    minRead: "{count} دقائق للقراءة",
    authorStudio: "استوديو إنكسبيلد",
    categoryLabels: {
      Branding: "الهوية البصرية",
      Strategy: "الاستراتيجية",
      "Web Design": "تصميم المواقع",
      "Social Media": "التواصل الاجتماعي",
      Film: "الأفلام",
      "AI & CGI": "الذكاء الاصطناعي والرسوم الحاسوبية",
      "Digital Marketing": "التسويق الرقمي",
      Motion: "الموشن",
      "Studio Notes": "ملاحظات الاستوديو",
    },
  },
  services: {
    listingEyebrow: "الحبر ينسكب. لا يبقى في الزجاجة",
    listingTitle: "خدماتنا",
    listingIntro:
      "نحن استوديو إبداع وتقنية بهوس واحد: جعل العلامات تتحرّك. سبعة تخصّصات تحت سقف واحد: العلامة، الفيلم، الذكاء الاصطناعي، الاستراتيجية، التسويق، والبناء الذي يمسك الكل، يديرها فريق واحد من الفكرة الأولى إلى الإطار الأخير. بلا تسليمات. معيار واحد. كل شيء، يُنجَز بإتقان.",
    listingCta: "ابدأ مشروعك",
    listingExplore: "استكشف المزيد →",
    otherEyebrow: "واصل الاستكشاف",
    otherTitle: "خدمات أخرى",
    otherExplore: "استكشف",
    otherPrev: "الخدمة السابقة",
    otherNext: "الخدمة التالية",
    otherAria: "خدمات أخرى",
    platformsTitle: "حيث يتدفّق الحبر",
    platformsCopy: "كل منصة وأداة وسطح نعمل عبره.",
    platformsAria: "المنصات والأدوات التي نعمل بها",
    introKicker: "وكالتك",
    introTitleWords: ["الإبداعية", "الرقمية", "المتكاملة"],
    introSubline: "من التوسّع والنمو",
    introSublineWords: ["من", "التوسّع", "و", "النمو"],
    introLeadBefore: "سبعة تخصّصات. شغف واحد: ",
    introLeadEmphasis: "نموّك",
    introLeadAfter: ".",
    introCopy:
      "كل ما تحتاجه علامتك للإطلاق والنمو والريادة، يبنيه فريق واحد تحت سقف واحد.",
    introEyebrow: "خدماتنا",
    menu: [
      "العلامة والتصميم",
      "الأفلام والإنتاج",
      "الذكاء الاصطناعي والرسوم الحاسوبية",
      "الاستراتيجية والتخطيط",
      "التسويق عبر التواصل الاجتماعي",
      "التسويق الرقمي",
      "تصميم وتطوير المنتجات",
    ],
  },
  contact: {
    map: "عرض على الخريطة",
    formPrivacy:
      "نحترم خصوصيتك. تُستخدم بياناتك فقط للرد على استفسارك.",
    preferTitle: "تفضّل الحديث؟",
    preferCopy:
      "لأي أمر عاجل أو إن فضّلت تجاوز النموذج، تواصل معنا مباشرة. نرد عادة خلال يوم عمل واحد.",
    callUs: "اتصل بنا",
    emailUs: "راسلنا بالبريد",
    whatsapp: "راسلنا على واتساب",
    whatsappHint: "رد سريع خلال ساعات العمل",
    officeHoursLabel: "ساعات العمل",
    newBusiness: "الأعمال الجديدة والشراكات",
    infinity: "ما لا نهاية",
    eyebrow: "ابدأ من هنا",
    title: "حان الوقت\nلنسكب شيئاً عظيماً.",
    intro:
      "أخبرنا قليلاً عن علامتك وإلى أين تريد أن تأخذها. سنعود إليك، عادة خلال يوم عمل واحد.",
    metaPills: [
      "المقر: الهند · الإمارات · الولايات المتحدة",
      "من الفكرة إلى الإطلاق",
      "الاثنين إلى الجمعة، 9:00 إلى 18:00 (توقيت الخليج +4)",
    ],
    formTitle: "اترك لنا موجزاً",
    formIntro: "شارك متطلباتك والخدمات التي تهمّك.",
    statsEyebrow: "لماذا تختارنا العلامات",
    statsTitle: "نبني علامات يتذكّرها الناس",
    stats: [
      { value: "100+", label: "مشاريع منجزة" },
      { value: "∞", label: "حبر في البئر" },
      { value: "7", label: "درجات من حبر واحد" },
      { value: "2023", label: "منذ أول سكبة" },
    ],
    locationTitle: "أين تجدنا",
    locationIntro:
      "دبي والهند اليوم، والولايات المتحدة في الطريق. أينما يقع مشروعك، الفريق نفسه والمعيار نفسه خلفه.",
    officeHours: "من الاثنين إلى الجمعة، 9:00 صباحاً إلى 6:00 مساءً (توقيت الخليج +4)",
    careersTitle: "العمل العظيم يبدأ بأناس عظماء.",
    careersCopy:
      "نبحث دائماً عن مبدعين واستراتيجيين موهوبين. أرسل لنا معرض أعمالك. نتجاوب جيداً مع العمل المصنوع بإتقان.",
    careersButtonLabel: "تواصل معنا بخصوص الوظائف ←",
    budgetLabels: {
      "AED 10K to AED 50K": "10 آلاف إلى 50 ألف درهم",
      "AED 50K to AED 100K": "50 ألفاً إلى 100 ألف درهم",
      "AED 100K to AED 250K": "100 ألف إلى 250 ألف درهم",
      "AED 250K to AED 500K": "250 ألفاً إلى 500 ألف درهم",
      "AED 500K & Above": "500 ألف درهم فأكثر",
    },
    seoTitle: "تواصل معنا | إنكسبيلد",
    seoDescription:
      "تواصل مع إنكسبيلد، وكالة إبداعية في دبي. شارك موجزك، أو احجز استشارة مجانية، أو راسلنا عبر الهاتف أو البريد أو واتساب. نرد خلال يوم عمل واحد.",
    offices: [
      {
        label: "دبي",
        company: "Inkspilled Technologies LLC",
        lines: [
          "B-803, Prime Business Center",
          "قرية جميرا الدائرية، دبي، الإمارات العربية المتحدة",
        ],
        phone: "+971 58 579 9959",
        mapHref: "https://maps.google.com/?q=Prime+Business+Center+JVC+Dubai",
      },
      {
        label: "الهند",
        company: "Inkspilled Media Pvt. Ltd.",
        lines: ["18, 3rd Floor, Hauz Khas Village", "نيودلهي، الهند"],
        phone: "+91 9990044819",
        mapHref:
          "https://maps.google.com/?q=18+3rd+Floor+Hauz+Khas+Village+New+Delhi",
      },
      {
        label: "الولايات المتحدة · قريباً",
        company: "نتوسّع إلى الولايات المتحدة.",
        lines: ["الاستوديو نفسه، ساحل جديد."],
      },
    ],
  },
  letsTalk: {
    titleTop: "هيا",
    titleMain: "نتحدث",
    copy: "تبحث عن استوديو إبداعي في دبي؟ لقد وجدته. أخبرنا بما تبنيه، وسنريك ما هو ممكن.",
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
  chat: {
    title: "مساعد إنكسبيلد",
    subtitle: "تحدّث أو اكتب — وأردّ بصوت مسموع",
    welcome:
      "مرحباً، أنا مساعد إنكسبيلد. اضغط على الميكروفون وابدأ الحديث، أو اكتب عن خدماتنا ومكتب دبي والأسعار وكيفية بدء مشروع.",
    placeholder: "اسأل عن الخدمات أو الأسعار أو آلية العمل...",
    placeholderSpeech: "اكتب رسالة أو استخدم الميكروفون…",
    placeholderIos: "اكتب رسالتك هنا…",
    send: "إرسال الرسالة",
    close: "إغلاق المحادثة",
    open: "فتح المساعد",
    thinking: "جارٍ التفكير...",
    listening: "يستمع…",
    liveTranscript: "النص المباشر",
    speechReady: "الصوت جاهز",
    speechUnavailable: "الصوت غير متاح",
    iosHint:
      "الإدخال الصوتي غير متاح على الآيباد في هذا المتصفح. اكتب بالأسفل، أو جرّب كروم على جهاز كمبيوتر.",
    mobileTtsHint: "اضغط أيقونة السماعة لسماع الردود.",
    listen: "استمع إلى الرسالة",
    mic: "بدء الإدخال الصوتي",
    stopMic: "إيقاف الإدخال الصوتي",
    error: "حدث خطأ. حاول مرة أخرى.",
  },
};

export const dictionaries: Record<"en" | "ar", Dictionary> = { en, ar };

export function getDictionary(locale: "en" | "ar"): Dictionary {
  return dictionaries[locale];
}
