import {
  Activity,
  Lightbulb,
  Phone,
  Smartphone,
  Triangle,
  Target,
  TrendingUp,
  Fingerprint,
  MousePointer2,
  BarChart3,
} from "lucide-react";

const ICONS = [
  { Icon: Lightbulb, top: "6%", left: "58%", size: 26 },
  { Icon: Smartphone, top: "20%", left: "93%", size: 30 },
  { Icon: Target, top: "42%", left: "82%", size: 56 },
  { Icon: TrendingUp, top: "70%", left: "60%", size: 24 },
  { Icon: Triangle, top: "62%", left: "90%", size: 22 },
  { Icon: Fingerprint, top: "88%", left: "77%", size: 32 },
  { Icon: MousePointer2, top: "34%", left: "68%", size: 20 },
  { Icon: BarChart3, top: "8%", left: "76%", size: 22 },
];

/** Mobile-only accents for empty top / left / bottom margins. */
const MOBILE_ICONS = [
  // Lightbulb (4)
  { Icon: Lightbulb, top: "9%", left: "10%", size: 40 },
  { Icon: Lightbulb, top: "6%", left: "34%", size: 34 },
  { Icon: Lightbulb, top: "44%", left: "6%", size: 36 },
  { Icon: Lightbulb, top: "88%", left: "58%", size: 38 },
  // Smartphone (4)
  { Icon: Smartphone, top: "20%", left: "6%", size: 38 },
  { Icon: Smartphone, top: "11%", left: "72%", size: 34 },
  { Icon: Smartphone, top: "78%", left: "12%", size: 36 },
  { Icon: Smartphone, top: "91%", left: "40%", size: 40 },
  // Phone / telephone (5)
  { Icon: Phone, top: "34%", left: "11%", size: 34 },
  { Icon: Phone, top: "14%", left: "90%", size: 32 },
  { Icon: Phone, top: "62%", left: "7%", size: 36 },
  { Icon: Phone, top: "93%", left: "78%", size: 34 },
  { Icon: Phone, top: "48%", left: "18%", size: 32 },
  // Activity / heartbeat (4)
  { Icon: Activity, top: "52%", left: "8%", size: 38 },
  { Icon: Activity, top: "8%", left: "50%", size: 34 },
  { Icon: Activity, top: "85%", left: "22%", size: 36 },
  { Icon: Activity, top: "72%", left: "88%", size: 34 },
  // Triangle (5)
  { Icon: Triangle, top: "68%", left: "15%", size: 32 },
  { Icon: Triangle, top: "16%", left: "48%", size: 30 },
  { Icon: Triangle, top: "84%", left: "68%", size: 34 },
  { Icon: Triangle, top: "28%", left: "16%", size: 30 },
  { Icon: Triangle, top: "96%", left: "55%", size: 32 },
] as const;

export default function DecorativeIcons() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-ink-dark"
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.11]">
        <line x1="55%" y1="10%" x2="80%" y2="45%" stroke="currentColor" strokeWidth="1" />
        <line x1="80%" y1="45%" x2="65%" y2="70%" stroke="currentColor" strokeWidth="1" />
        <line x1="80%" y1="45%" x2="95%" y2="22%" stroke="currentColor" strokeWidth="1" />
        <line x1="80%" y1="45%" x2="92%" y2="64%" stroke="currentColor" strokeWidth="1" />
        <line x1="65%" y1="70%" x2="79%" y2="90%" stroke="currentColor" strokeWidth="1" />
        <circle cx="55%" cy="10%" r="3" fill="currentColor" />
        <circle cx="80%" cy="45%" r="3" fill="currentColor" />
        <circle cx="65%" cy="70%" r="3" fill="currentColor" />
        <circle cx="95%" cy="22%" r="3" fill="currentColor" />
      </svg>
      {ICONS.map(({ Icon, top, left, size }, i) => (
        <Icon
          key={i}
          size={size}
          strokeWidth={1.25}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-ink-dark/[0.13]"
          style={{ top, left }}
        />
      ))}

      <div className="absolute inset-0 md:hidden">
        <svg className="absolute inset-0 h-full w-full opacity-[0.11]">
          <line x1="10%" y1="9%" x2="34%" y2="6%" stroke="currentColor" strokeWidth="1" />
          <line x1="10%" y1="9%" x2="6%" y2="20%" stroke="currentColor" strokeWidth="1" />
          <line x1="6%" y1="20%" x2="16%" y2="28%" stroke="currentColor" strokeWidth="1" />
          <line x1="16%" y1="28%" x2="11%" y2="34%" stroke="currentColor" strokeWidth="1" />
          <line x1="11%" y1="34%" x2="6%" y2="44%" stroke="currentColor" strokeWidth="1" />
          <line x1="6%" y1="44%" x2="18%" y2="48%" stroke="currentColor" strokeWidth="1" />
          <line x1="18%" y1="48%" x2="8%" y2="52%" stroke="currentColor" strokeWidth="1" />
          <line x1="8%" y1="52%" x2="7%" y2="62%" stroke="currentColor" strokeWidth="1" />
          <line x1="7%" y1="62%" x2="15%" y2="68%" stroke="currentColor" strokeWidth="1" />
          <line x1="15%" y1="68%" x2="12%" y2="78%" stroke="currentColor" strokeWidth="1" />
          <line x1="12%" y1="78%" x2="22%" y2="85%" stroke="currentColor" strokeWidth="1" />
          <line x1="22%" y1="85%" x2="40%" y2="91%" stroke="currentColor" strokeWidth="1" />
          <line x1="40%" y1="91%" x2="55%" y2="96%" stroke="currentColor" strokeWidth="1" />
          <line x1="55%" y1="96%" x2="68%" y2="84%" stroke="currentColor" strokeWidth="1" />
          <line x1="68%" y1="84%" x2="78%" y2="93%" stroke="currentColor" strokeWidth="1" />
          <line x1="68%" y1="84%" x2="88%" y2="72%" stroke="currentColor" strokeWidth="1" />
          <line x1="34%" y1="6%" x2="50%" y2="8%" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="8%" x2="48%" y2="16%" stroke="currentColor" strokeWidth="1" />
          <line x1="48%" y1="16%" x2="72%" y2="11%" stroke="currentColor" strokeWidth="1" />
          <line x1="72%" y1="11%" x2="90%" y2="14%" stroke="currentColor" strokeWidth="1" />
          <circle cx="10%" cy="9%" r="3" fill="currentColor" />
          <circle cx="6%" cy="20%" r="2.5" fill="currentColor" />
          <circle cx="11%" cy="34%" r="2.5" fill="currentColor" />
          <circle cx="8%" cy="52%" r="2.5" fill="currentColor" />
          <circle cx="15%" cy="68%" r="2.5" fill="currentColor" />
          <circle cx="22%" cy="85%" r="3" fill="currentColor" />
          <circle cx="40%" cy="91%" r="2.5" fill="currentColor" />
          <circle cx="68%" cy="84%" r="2.5" fill="currentColor" />
          <circle cx="34%" cy="6%" r="2.5" fill="currentColor" />
          <circle cx="50%" cy="8%" r="2.5" fill="currentColor" />
          <circle cx="72%" cy="11%" r="2.5" fill="currentColor" />
          <circle cx="58%" cy="88%" r="2.5" fill="currentColor" />
        </svg>
        {MOBILE_ICONS.map(({ Icon, top, left, size }, i) => (
          <Icon
            key={`mobile-${i}`}
            size={size}
            strokeWidth={1.25}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-ink-dark/[0.13]"
            style={{ top, left }}
          />
        ))}
      </div>
    </div>
  );
}
