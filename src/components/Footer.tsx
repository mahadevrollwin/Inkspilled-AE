import Link from "next/link";
import Image from "next/image";
import { SERVICE_MENU_ITEMS } from "@/data/services";

const QUICK_LINKS_LEFT = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "#" },
] as const;

const QUICK_LINKS_RIGHT = [
  { label: "Portfolio", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Terms Of Use", href: "#" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 448 512" aria-hidden className="h-4 w-4 fill-current">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.97 0 111.3 61.9 111.3 142.3V448z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 448 512" aria-hidden className="h-4 w-4 fill-current">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 512 512" aria-hidden className="h-4 w-4 fill-current">
        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120 82.7 220.8 194.2 248.5V334.2h-56.6v-78.2h56.6v-61.3c0-56.4 33.5-87.3 84.5-87.3 24.5 0 50.1 4.4 50.1 4.4v55.4h-28.2c-27.8 0-36.5 17.3-36.5 35v42h62.3l-10 78.2h-52.4v170.3C429.3 476.8 512 376 512 256z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 576 512" aria-hidden className="h-4 w-4 fill-current">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
  },
] as const;

function FooterLogo() {
  return (
    <a
      href="#"
      aria-label="Back to top"
      className="inline-block transition-opacity hover:opacity-85"
    >
      <Image
        src="/footer-logo.png"
        alt="Inkspilled"
        width={130}
        height={160}
        className="h-auto w-[130px] shrink-0 object-contain"
      />
    </a>
  );
}

function FooterLinkList({
  items,
}: {
  items: readonly { label: string; href: string }[];
}) {
  return (
    <ul className="min-w-0 space-y-2">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`}>
          <Link
            href={item.href}
            className="font-body text-[13px] leading-snug text-white transition-opacity hover:opacity-75"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const SERVICE_COLUMNS = [0, 1, 2].map((column) =>
  SERVICE_MENU_ITEMS.filter((_, index) => index % 3 === column).map((item) => ({
    label: item.title,
    href: item.href,
  })),
);

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[130px_minmax(220px,260px)_minmax(220px,280px)_1fr] xl:gap-x-14 xl:gap-y-0">
          <div>
            <FooterLogo />
          </div>

          <div>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-white text-white transition-opacity hover:opacity-75"
                >
                  {icon}
                </a>
              ))}
            </div>

            <address className="mt-5 space-y-1 not-italic">
              <p className="font-body text-[13px] leading-relaxed text-white">
                B-803, Prime Business Center, JVC,
                <br />
                Dubai, United Arab Emirates
              </p>
              <p className="font-body text-[13px] leading-relaxed text-white">
                +971 58 579 9959
              </p>
              <p className="font-body text-[13px] leading-relaxed text-white">
                04 578 4920
              </p>
            </address>
          </div>

          <div>
            <h3 className="font-display text-[15px] font-bold text-white">
              Quick Links
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8">
              <FooterLinkList items={QUICK_LINKS_LEFT} />
              <FooterLinkList items={QUICK_LINKS_RIGHT} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-[15px] font-bold text-white">
              Services:
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-x-8 min-[480px]:hidden">
              <FooterLinkList
                items={SERVICE_MENU_ITEMS.map((item) => ({
                  label: item.title,
                  href: item.href,
                }))}
              />
            </div>
            <div className="mt-4 hidden grid-cols-3 items-start gap-x-8 min-[480px]:grid">
              {SERVICE_COLUMNS.map((column) => (
                <FooterLinkList key={column[0]?.href} items={column} />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center font-body text-[13px] leading-relaxed text-white md:mt-12">
          © 2026 Inkspilled. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
