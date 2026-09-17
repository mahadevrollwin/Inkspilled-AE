"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  ArrowUp,
  BarChart3,
  Fingerprint,
  Lightbulb,
  Phone,
  Smartphone,
  Target,
  Triangle,
} from "lucide-react";

const ICON_CLASS =
  "absolute -translate-x-1/2 -translate-y-1/2 text-ink-dark/[0.13]";

const ICONS = [
  { Icon: Lightbulb, top: "8%", left: "76%", size: 24 },
  { Icon: Smartphone, top: "17%", left: "94%", size: 28 },
  { Icon: Phone, top: "26%", left: "84%", size: 22 },
  { Icon: ArrowUp, top: "40%", left: "82%", size: 30 },
  { Icon: Activity, top: "51%", left: "70%", size: 26 },
  { Icon: Target, top: "55%", left: "86%", size: 22 },
  { Icon: BarChart3, top: "77%", left: "61%", size: 24 },
  { Icon: Triangle, top: "83%", left: "90%", size: 22 },
  { Icon: Fingerprint, top: "88%", left: "77%", size: 28 },
] as const;

const LARGE_FEATURE_ICONS = [
  { Icon: Lightbulb, top: "20%", left: "60%", size: 72 },
  { Icon: Smartphone, top: "36%", left: "90%", size: 84 },
  { Icon: Phone, top: "56%", left: "74%", size: 66 },
  { Icon: ArrowUp, top: "70%", left: "86%", size: 90 },
  { Icon: Activity, top: "84%", left: "56%", size: 78 },
] as const;

const LINES: Array<[number, number, number, number]> = [
  [520, 90, 760, 90],
  [760, 90, 760, 410],
  [760, 410, 620, 410],
  [760, 410, 920, 190],
  [760, 410, 900, 620],
  [620, 410, 620, 560],
  [620, 560, 720, 560],
  [620, 560, 520, 780],
  [720, 560, 860, 560],
  [860, 560, 860, 860],
  [520, 780, 680, 780],
  [680, 780, 680, 900],
  [900, 620, 960, 620],
  [840, 190, 960, 190],
  [700, 90, 700, 250],
  [580, 250, 700, 250],
  [580, 250, 580, 360],
  [880, 90, 960, 90],
  [920, 190, 920, 280],
  [920, 280, 980, 280],
  [860, 410, 960, 410],
  [960, 410, 960, 520],
  [900, 620, 900, 720],
  [900, 720, 980, 720],
  [680, 560, 680, 680],
  [680, 680, 780, 680],
  [780, 680, 780, 820],
  [520, 780, 520, 900],
  [560, 140, 700, 140],
  [560, 140, 560, 220],
  [640, 320, 760, 320],
  [640, 320, 640, 410],
  [820, 560, 820, 640],
  [820, 640, 940, 640],
  [740, 860, 860, 860],
  [740, 860, 740, 940],
  [600, 480, 720, 480],
  [600, 480, 600, 560],
  [880, 280, 880, 360],
  [800, 140, 880, 140],
];

const DOTTED_LINES: Array<[number, number, number, number]> = [
  [540, 180, 620, 180],
  [620, 180, 620, 250],
  [840, 480, 920, 480],
  [920, 480, 920, 540],
  [560, 620, 640, 620],
  [640, 620, 640, 700],
  [780, 240, 860, 240],
  [860, 240, 860, 300],
  [720, 720, 820, 720],
  [940, 760, 980, 760],
];

const NODES: Array<[number, number, number]> = [
  [520, 90, 3],
  [760, 90, 3],
  [760, 410, 4],
  [620, 410, 3],
  [920, 190, 3],
  [900, 620, 3],
  [620, 560, 3],
  [720, 560, 3],
  [520, 780, 3],
  [860, 560, 3],
  [860, 860, 3],
  [700, 250, 3],
  [580, 360, 3],
  [960, 190, 2.5],
  [960, 620, 2.5],
  [880, 90, 2.5],
  [980, 280, 2],
  [960, 520, 2],
  [980, 720, 2],
  [680, 680, 2.5],
  [780, 820, 2],
  [560, 140, 2],
  [640, 320, 2.5],
  [820, 640, 2],
  [740, 940, 2],
  [600, 480, 2],
  [540, 180, 1.5],
  [840, 480, 1.5],
  [720, 720, 1.5],
];

const SMALL_DOTS: Array<[number, number]> = [
  [550, 120],
  [590, 200],
  [670, 170],
  [810, 120],
  [930, 140],
  [950, 350],
  [830, 500],
  [770, 620],
  [640, 650],
  [580, 820],
  [710, 800],
  [910, 800],
  [970, 650],
  [880, 720],
  [610, 540],
  [690, 380],
];

const FRAMED_CIRCLES: Array<[number, number, number]> = [
  [760, 90, 28],
  [820, 410, 34],
  [700, 560, 22],
  [880, 280, 18],
];

const DECORATIVE_TRIANGLES: Array<[number, number, number]> = [
  [930, 540, 8],
  [610, 300, 6],
  [950, 860, 7],
  [570, 680, 5],
];

function easeInOutQuint(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function pointAlong(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
) {
  return {
    x: lerp(x1, x2, t),
    y: lerp(y1, y2, t),
  };
}

function BreakingLine({
  x1,
  y1,
  x2,
  y2,
  progress,
  index,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: MotionValue<number>;
  index: number;
  dashed?: boolean;
}) {
  // Slight stagger so breaks cascade instead of flipping all at once.
  const local = useTransform(progress, (raw) => {
    const delayed = raw * 1.2 - (index % 12) * 0.012;
    return easeInOutQuint(delayed);
  });

  const endA = useTransform(local, (t) => {
    const gap = t * 0.26;
    return pointAlong(x1, y1, x2, y2, Math.max(0, 0.5 - gap / 2));
  });
  const startB = useTransform(local, (t) => {
    const gap = t * 0.26;
    return pointAlong(x1, y1, x2, y2, Math.min(1, 0.5 + gap / 2));
  });

  const x2a = useTransform(endA, (p) => p.x);
  const y2a = useTransform(endA, (p) => p.y);
  const x1b = useTransform(startB, (p) => p.x);
  const y1b = useTransform(startB, (p) => p.y);

  return (
    <>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2a}
        y2={y2a}
        strokeDasharray={dashed ? "2 5" : undefined}
      />
      <motion.line
        x1={x1b}
        y1={y1b}
        x2={x2}
        y2={y2}
        strokeDasharray={dashed ? "2 5" : undefined}
      />
    </>
  );
}

function MorphingFrame({
  cx,
  cy,
  r,
  progress,
  index,
}: {
  cx: number;
  cy: number;
  r: number;
  progress: MotionValue<number>;
  index: number;
}) {
  const local = useTransform(progress, (raw) => {
    const delayed = raw * 1.05 - index * 0.04;
    return easeInOutQuint(delayed);
  });

  // Circle (rx = r) → soft rounded square, keeping the same center and size.
  const rx = useTransform(local, (t) => lerp(r, r * 0.28, t));
  const ry = useTransform(local, (t) => lerp(r, r * 0.28, t));

  return (
    <motion.rect
      x={cx - r}
      y={cy - r}
      width={r * 2}
      height={r * 2}
      rx={rx}
      ry={ry}
    />
  );
}

function StaticSchematic() {
  return (
    <>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {LINES.map(([x1, y1, x2, y2], index) => (
          <line key={`line-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 5"
        opacity="0.85"
      >
        {DOTTED_LINES.map(([x1, y1, x2, y2], index) => (
          <line key={`dot-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {FRAMED_CIRCLES.map(([cx, cy, r], index) => (
          <circle key={`frame-${index}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </>
  );
}

function AnimatedSchematic({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {LINES.map(([x1, y1, x2, y2], index) => (
          <BreakingLine
            key={`line-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            progress={progress}
            index={index}
          />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.85">
        {DOTTED_LINES.map(([x1, y1, x2, y2], index) => (
          <BreakingLine
            key={`dot-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            progress={progress}
            index={index + LINES.length}
            dashed
          />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {FRAMED_CIRCLES.map(([cx, cy, r], index) => (
          <MorphingFrame
            key={`frame-${index}`}
            cx={cx}
            cy={cy}
            r={r}
            progress={progress}
            index={index}
          />
        ))}
      </g>
    </>
  );
}

export default function HeroMagnificSchematic({
  progress,
}: {
  progress?: MotionValue<number>;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-ink-dark"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.11]"
      >
        {progress ? <AnimatedSchematic progress={progress} /> : <StaticSchematic />}

        <g fill="currentColor">
          {NODES.map(([cx, cy, r], index) => (
            <circle key={`node-${index}`} cx={cx} cy={cy} r={r} />
          ))}
          {SMALL_DOTS.map(([cx, cy], index) => (
            <circle key={`small-${index}`} cx={cx} cy={cy} r={1.5} opacity="0.7" />
          ))}
        </g>

        <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75">
          {DECORATIVE_TRIANGLES.map(([x, y, size], index) => (
            <polygon
              key={`tri-${index}`}
              points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
            />
          ))}
        </g>

        <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6">
          <rect x="948" y="430" width="10" height="10" />
          <rect x="552" y="420" width="8" height="8" />
          <rect x="902" y="150" width="7" height="7" />
        </g>
      </svg>

      {ICONS.map(({ Icon, top, left, size }, index) => (
        <Icon
          key={`icon-${index}`}
          size={size}
          strokeWidth={1.25}
          className={ICON_CLASS}
          style={{ top, left }}
        />
      ))}

      {LARGE_FEATURE_ICONS.map(({ Icon, top, left, size }, index) => (
        <Icon
          key={`large-icon-${index}`}
          size={size}
          strokeWidth={1.1}
          className={ICON_CLASS}
          style={{ top, left }}
        />
      ))}
    </div>
  );
}
