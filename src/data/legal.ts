export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPageData = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const PRIVACY_POLICY: LegalPageData = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  updated: "4 September 2026",
  intro:
    "Inkspilled respects your privacy. This policy explains what information we collect, why we collect it, and how we use it when you visit inkspilled.ae or contact us about our work.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Inkspilled is a creative branding and digital marketing agency based at B-803, Prime Business Center, JVC, Dubai, United Arab Emirates. For privacy questions, email hello@inkspilled.ae or call +971 58 579 9959.",
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "When you submit a form on our website, we collect the details you provide, such as your name, email address, phone number, company name, project requirements, and any other information you choose to share.",
        "We may also collect basic technical data such as browser type, device type, and pages visited, to keep the site working reliably and to understand how people use it.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "We use your information to respond to enquiries, prepare proposals, deliver services you have asked for, improve our website, and meet legal or contractual obligations.",
        "We do not sell your personal information. We only share it with trusted providers who help us operate the website or send email, and only as needed to provide those services.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "Our website may use cookies or similar tools to remember preferences and understand site performance. You can control cookies through your browser settings. Blocking some cookies may affect how the site works.",
      ],
    },
    {
      heading: "How long we keep data",
      paragraphs: [
        "We keep enquiry and project records for as long as needed to handle your request, deliver work, and meet accounting or legal requirements. We then delete or anonymise the information when it is no longer required.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You may ask us to access, update, or delete personal information we hold about you, subject to any legal retention duties. Contact hello@inkspilled.ae and we will respond as promptly as we can.",
      ],
    },
    {
      heading: "Updates",
      paragraphs: [
        "We may update this policy from time to time. The revised version will be posted on this page with an updated date. Continued use of the website after changes means you accept the updated policy.",
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalPageData = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  updated: "4 September 2026",
  intro:
    "These terms govern your use of the Inkspilled website and, where relevant, the services we provide. By using this site, you agree to these terms.",
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        "The website inkspilled.ae is operated by Inkspilled, a creative agency in Dubai, United Arab Emirates. If you do not agree with these terms, please do not use the site.",
      ],
    },
    {
      heading: "Using the website",
      paragraphs: [
        "You may browse the site for information about our work and services. You agree not to misuse the site, attempt to disrupt it, or use its content in a way that infringes our rights or anyone else’s.",
        "Content on this website, including text, images, video, and design, belongs to Inkspilled or our licensors. You may not copy, reproduce, or republish it without our written permission, except for personal, non-commercial viewing.",
      ],
    },
    {
      heading: "Enquiries and proposals",
      paragraphs: [
        "Submitting a contact form or showreel request does not create a contract. Any project work is confirmed in a separate proposal, estimate, or agreement that sets out scope, fees, timelines, and deliverables.",
      ],
    },
    {
      heading: "Services",
      paragraphs: [
        "When you engage Inkspilled, the signed proposal or statement of work controls the engagement. Unless that document says otherwise, fees are due as invoiced, and we retain intellectual property in unused concepts until invoices are paid in full.",
        "Client-supplied materials must be accurate, lawful, and licensed for the intended use. You are responsible for obtaining any third-party permissions we need to complete the work.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "The website is provided as is. We take care to keep information accurate, but we do not warrant that the site will always be complete, error-free, or uninterrupted.",
        "To the fullest extent permitted by applicable law, Inkspilled is not liable for indirect or consequential loss arising from use of the website. Nothing in these terms limits liability that cannot be limited under UAE law.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the United Arab Emirates, as applied in the Emirate of Dubai. Courts in Dubai have exclusive jurisdiction over disputes arising from the website or these terms, unless a project agreement specifies otherwise.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about these terms can be sent to hello@inkspilled.ae, or to B-803, Prime Business Center, JVC, Dubai, United Arab Emirates.",
      ],
    },
  ],
};
