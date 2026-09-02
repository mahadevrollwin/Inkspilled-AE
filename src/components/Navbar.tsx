"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBullhorn,
  faChartLine,
  faEnvelope,
  faFilm,
  faLaptopCode,
  faLayerGroup,
  faNewspaper,
  faPalette,
  faShareNodes,
  faUserGroup,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDown, Menu, X } from "lucide-react";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const NAV_LINKS = [
  { label: "About Us", href: "/about", icon: faUserGroup },
  { label: "Blog", href: "/blog", icon: faNewspaper },
  { label: "Contact", href: "/contact", icon: faEnvelope },
] as const;

const SERVICES_MENU_COLUMNS = [
  [
    {
      title: "Branding & Design",
      href: "/services/branding-design",
      icon: faPalette,
      items: [
        "Logo Design Services",
        "Event Branding Services",
        "Brochure & Catalogue Design",
        "Packaging Design Services",
      ],
    },
    {
      title: "Films & Production",
      href: "/services/films-production",
      icon: faFilm,
      items: [
        "Corporate & Brand Films",
        "Ad Films & TVCs",
        "Product & E-Commerce Videos",
      ],
    },
    {
      title: "AI & CGI",
      href: "/services/ai-cg",
      icon: faWandMagicSparkles,
      items: [
        "2D & 3D Animation Services",
        "Motion Graphics Services",
        "CG Production",
        "AI-Content & Visuals",
        "3D Product Visualization",
      ],
    },
  ],
  [
    {
      title: "Strategy & Planning",
      href: "/services/strategy-planning",
      icon: faChartLine,
      items: [
        "Brand Strategy & Identity",
        "Creative Campaign Strategy",
        "Content Strategy",
      ],
    },
    {
      title: "Social Media Marketing",
      href: "/services/social-media-marketing",
      icon: faShareNodes,
      items: [
        "Instagram Marketing",
        "Facebook Marketing",
        "LinkedIn Marketing",
        "YouTube Marketing",
        "Influencer Marketing",
      ],
    },
    {
      title: "Digital Marketing",
      href: "/services/digital-marketing",
      icon: faBullhorn,
      items: [
        "SEO Services",
        "Google Ads & PPC Services",
        "Meta Ads Services",
        "Packaging Design Services",
      ],
    },
  ],
  [
    {
      title: "UI, UX Design & Development",
      href: "/services/website-design-development",
      icon: faLaptopCode,
      items: [
        "UI/UX Design & Development",
        "Website Redesign Services",
      ],
    },
  ],
] as const;

const SERVICES_MENU_SECTIONS = SERVICES_MENU_COLUMNS.flat();

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isServicesActive(pathname: string): boolean {
  return isPathActive(pathname, "/services");
}

function navLinkClass(active: boolean): string {
  return [
    "group inline-flex items-center gap-2 font-body text-[15px] transition-colors",
    active
      ? "font-semibold text-white"
      : "font-medium text-white/90 hover:text-white",
  ].join(" ");
}

function navActiveIndicator(active: boolean): string {
  return [
    "absolute -bottom-[22px] left-0 h-[2px] rounded-full transition-all duration-200",
    active ? "w-full bg-ink-red opacity-100" : "w-0 bg-transparent opacity-0",
  ].join(" ");
}

function NavLink({
  href,
  label,
  icon,
  active,
  onMouseEnter,
  onClick,
  className = "",
  ariaExpanded,
  ariaHasPopup,
}: {
  href: string;
  label: string;
  icon: IconDefinition;
  active: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
  className?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean | "menu";
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      className={`relative ${navLinkClass(active)} ${className}`.trim()}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`h-[13px] w-[13px] shrink-0 transition-colors ${
          active ? "text-ink-red" : "text-white/55 group-hover:text-white/80"
        }`}
        fixedWidth
      />
      {label}
      <span aria-hidden className={navActiveIndicator(active)} />
    </Link>
  );
}

function ServicesMenuSection({
  title,
  href,
  icon,
  items,
  active,
  onLinkClick,
  className = "",
  breakLongTitle = false,
}: {
  title: string;
  href: string;
  icon: IconDefinition;
  items: readonly string[];
  active: boolean;
  onLinkClick?: () => void;
  className?: string;
  breakLongTitle?: boolean;
}) {
  const titleNode =
    breakLongTitle && title === "UI, UX Design & Development" ? (
      <>
        UI, UX Design &{" "}
        <br />
        Development
      </>
    ) : (
      title
    );

  return (
    <div className={`w-full min-w-0 text-left ${className}`.trim()}>
      <Link
        href={href}
        onClick={onLinkClick}
        aria-current={active ? "page" : undefined}
        className={[
          "group flex items-start gap-3 rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] px-3 py-2.5 text-left transition-colors",
          active
            ? "bg-white/10 text-white"
            : "text-white hover:bg-white/5 hover:text-white",
        ].join(" ")}
      >
        <span
          className={[
            "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border transition-colors",
            active
              ? "border-ink-red/40 bg-ink-red/15 text-ink-red"
              : "border-white/10 bg-white/5 text-white/60 group-hover:border-white/20 group-hover:text-white/85",
          ].join(" ")}
        >
          <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" fixedWidth />
        </span>
        <span className="font-display text-[15px] font-bold leading-snug">
          {titleNode}
        </span>
      </Link>
      <ul className="mt-3 list-none space-y-2 p-0" style={{ display: "none" }}>
        {items.map((item) => (
          <li key={item} className="text-left">
            <a
              href="#"
              onClick={onLinkClick}
              className="font-body text-[13px] text-white/85 transition-colors hover:text-white"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesActive = isServicesActive(pathname);

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-black">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <nav className="flex h-16 items-center justify-between md:h-[70px]">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/header-logo.png"
              alt="Inkspilled logo"
              width={60}
              height={60}
              className="h-9 w-9 shrink-0 object-contain"
              priority
            />
            <span className="font-display text-lg font-bold tracking-wide text-white">
              INKSPILLED
            </span>
          </Link>

          <div className="relative hidden md:flex md:h-[70px] md:items-center">
            <ul className="flex items-center gap-14">
              {NAV_LINKS.slice(0, 1).map((link) => (
                <li key={link.label}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    active={isPathActive(pathname, link.href)}
                    onMouseEnter={() => setServicesOpen(false)}
                  />
                </li>
              ))}

              <li
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
              >
                <NavLink
                  href="/services"
                  label="Services"
                  icon={faLayerGroup}
                  active={servicesActive}
                  ariaExpanded={servicesOpen}
                  ariaHasPopup="menu"
                />
              </li>

              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.label}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    active={isPathActive(pathname, link.href)}
                    onMouseEnter={() => setServicesOpen(false)}
                  />
                </li>
              ))}
            </ul>

            <div
              className={`absolute -right-[10%] top-full z-50 w-[160%] border-t border-white/10 bg-[#2b2b2b] py-8 pl-[33px] pr-[20px] shadow-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                servicesOpen
                  ? "pointer-events-auto visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-3 opacity-0"
              }`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div className="grid grid-cols-3 gap-x-16 [grid-template-columns:repeat(3,minmax(0,1fr))]">
                {SERVICES_MENU_COLUMNS.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="flex min-w-0 flex-col items-start gap-8"
                  >
                    {column.map((section) => (
                      <ServicesMenuSection
                        key={section.title}
                        title={section.title}
                        href={section.href}
                        icon={section.icon}
                        items={section.items}
                        active={isPathActive(pathname, section.href)}
                        breakLongTitle
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            aria-label="Toggle menu"
            className="text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-black md:hidden">
          <ul className="flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto px-6 pb-4">
            {NAV_LINKS.slice(0, 1).map((link) => (
              <li key={link.label}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  active={isPathActive(pathname, link.href)}
                  onClick={closeMobileMenu}
                  className="block w-full py-3"
                />
              </li>
            ))}

            <li>
              <div className="flex w-full items-center justify-between">
                <NavLink
                  href="/services"
                  label="Services"
                  icon={faLayerGroup}
                  active={servicesActive}
                  onClick={closeMobileMenu}
                  className="py-3"
                />
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((value) => !value)}
                  className="py-3 pl-4 text-white/90"
                  aria-expanded={mobileServicesOpen}
                  aria-label="Toggle services menu"
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="space-y-4 border-l border-white/10 pb-4 pl-4">
                  {SERVICES_MENU_SECTIONS.map((section) => (
                    <ServicesMenuSection
                      key={section.title}
                      title={section.title}
                      href={section.href}
                      icon={section.icon}
                      items={section.items}
                      active={isPathActive(pathname, section.href)}
                      onLinkClick={closeMobileMenu}
                    />
                  ))}
                </div>
              )}
            </li>

            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.label}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  active={isPathActive(pathname, link.href)}
                  onClick={closeMobileMenu}
                  className="block w-full py-3"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
