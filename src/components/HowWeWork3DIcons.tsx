"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type IconSceneProps = {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  rotateZ: MotionValue<number>;
  y: MotionValue<number>;
  x?: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
};

function IconScene({
  rotateX,
  rotateY,
  rotateZ,
  y,
  x,
  opacity,
  scale,
  children,
}: IconSceneProps & { children: React.ReactNode }) {
  return (
    <div className="how-we-work-icon-viewport">
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          y,
          x,
          opacity,
          scale,
          transformPerspective: 900,
        }}
        className="how-we-work-icon-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

function LayersIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--layers">
      <div className="how-we-work-layer how-we-work-layer--3" />
      <div className="how-we-work-layer how-we-work-layer--2" />
      <div className="how-we-work-layer how-we-work-layer--1" />
    </div>
  );
}

function MagnifierIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--magnifier">
      <div className="how-we-work-magnifier-lens">
        <div className="how-we-work-magnifier-lens-top" />
        <div className="how-we-work-magnifier-lens-side" />
      </div>
      <div className="how-we-work-magnifier-handle">
        <div className="how-we-work-magnifier-handle-top" />
        <div className="how-we-work-magnifier-handle-side" />
      </div>
    </div>
  );
}

function PenIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--pen">
      <div className="how-we-work-pen-body">
        <div className="how-we-work-pen-body-top" />
        <div className="how-we-work-pen-body-front" />
        <div className="how-we-work-pen-body-right" />
      </div>
      <div className="how-we-work-pen-nib" />
    </div>
  );
}

function RocketIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--rocket">
      <div className="how-we-work-rocket-nose" />
      <div className="how-we-work-rocket-body">
        <div className="how-we-work-rocket-body-top" />
        <div className="how-we-work-rocket-body-front" />
        <div className="how-we-work-rocket-body-right" />
      </div>
      <div className="how-we-work-rocket-fin how-we-work-rocket-fin--left" />
      <div className="how-we-work-rocket-fin how-we-work-rocket-fin--right" />
      <div className="how-we-work-rocket-flame" />
    </div>
  );
}

function CubeIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--cube">
      <div className="how-we-work-cube-face how-we-work-cube-face--top" />
      <div className="how-we-work-cube-face how-we-work-cube-face--front" />
      <div className="how-we-work-cube-face how-we-work-cube-face--right" />
    </div>
  );
}

function BulbIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--bulb">
      <div className="how-we-work-bulb-glass" />
      <div className="how-we-work-bulb-filament" />
      <div className="how-we-work-bulb-base" />
    </div>
  );
}

function ChartIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--chart">
      <div className="how-we-work-chart-bar how-we-work-chart-bar--1" />
      <div className="how-we-work-chart-bar how-we-work-chart-bar--2" />
      <div className="how-we-work-chart-bar how-we-work-chart-bar--3" />
      <div className="how-we-work-chart-base" />
    </div>
  );
}

function TargetIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--target">
      <div className="how-we-work-target-ring how-we-work-target-ring--outer" />
      <div className="how-we-work-target-ring how-we-work-target-ring--mid" />
      <div className="how-we-work-target-ring how-we-work-target-ring--inner" />
      <div className="how-we-work-target-core" />
    </div>
  );
}

function GearIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--gear">
      <div className="how-we-work-gear-body" />
      <div className="how-we-work-gear-tooth how-we-work-gear-tooth--1" />
      <div className="how-we-work-gear-tooth how-we-work-gear-tooth--2" />
      <div className="how-we-work-gear-tooth how-we-work-gear-tooth--3" />
      <div className="how-we-work-gear-tooth how-we-work-gear-tooth--4" />
      <div className="how-we-work-gear-hole" />
    </div>
  );
}

function SphereIcon({ tone = "blue" }: { tone?: "blue" | "red" | "green" }) {
  return (
    <div className={`how-we-work-icon how-we-work-icon--sphere how-we-work-sphere--${tone}`}>
      <div className="how-we-work-sphere-highlight" />
    </div>
  );
}

function ArrowIcon() {
  return (
    <div className="how-we-work-icon how-we-work-icon--arrow">
      <div className="how-we-work-arrow-shaft" />
      <div className="how-we-work-arrow-head" />
    </div>
  );
}

function RingIcon() {
  return <div className="how-we-work-icon how-we-work-icon--ring" />;
}

const ICON_MAP = {
  magnifier: MagnifierIcon,
  layers: LayersIcon,
  pen: PenIcon,
  rocket: RocketIcon,
  cube: CubeIcon,
  bulb: BulbIcon,
  chart: ChartIcon,
  target: TargetIcon,
  gear: GearIcon,
  sphereBlue: () => <SphereIcon tone="blue" />,
  sphereRed: () => <SphereIcon tone="red" />,
  sphereGreen: () => <SphereIcon tone="green" />,
  arrow: ArrowIcon,
  ring: RingIcon,
} as const;

type IconName = keyof typeof ICON_MAP;

type FloatingIconConfig = {
  className: string;
  scrollRange: [number, number];
  baseRotateX: number;
  baseRotateY: number;
  baseRotateZ: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  yRange: [number, number];
  xRange?: [number, number];
  scaleRange: [number, number];
  maxOpacity?: number;
  icon: IconName;
};

function getScrollT(progress: number, range: [number, number]) {
  const [start, end] = range;
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function Floating3DIcon({
  scrollYProgress,
  config,
}: {
  scrollYProgress: MotionValue<number>;
  config: FloatingIconConfig;
}) {
  const {
    className,
    scrollRange,
    baseRotateX,
    baseRotateY,
    baseRotateZ,
    spinX,
    spinY,
    spinZ,
    yRange,
    xRange,
    scaleRange,
    maxOpacity = 0.38,
    icon,
  } = config;

  const [start, end] = scrollRange;

  const rotateX = useTransform(scrollYProgress, (progress) => {
    const t = getScrollT(progress, scrollRange);
    return baseRotateX + spinX * t;
  });
  const rotateY = useTransform(scrollYProgress, (progress) => {
    const t = getScrollT(progress, scrollRange);
    return baseRotateY + spinY * t;
  });
  const rotateZ = useTransform(scrollYProgress, (progress) => {
    const t = getScrollT(progress, scrollRange);
    return baseRotateZ + spinZ * t;
  });
  const y = useTransform(scrollYProgress, [start, end], yRange);
  const x = useTransform(
    scrollYProgress,
    [start, end],
    xRange ?? [0, 0],
  );
  const scale = useTransform(scrollYProgress, [start, end], scaleRange);
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.08, end],
    [0, maxOpacity, maxOpacity, maxOpacity * 0.35],
  );

  const IconComponent = ICON_MAP[icon];

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <IconScene
        rotateX={rotateX}
        rotateY={rotateY}
        rotateZ={rotateZ}
        y={y}
        x={xRange ? x : undefined}
        opacity={opacity}
        scale={scale}
      >
        <IconComponent />
      </IconScene>
    </div>
  );
}

const FLOATING_ICONS: FloatingIconConfig[] = [
  {
    className: "left-[2%] top-[6%]",
    scrollRange: [0.06, 0.9],
    baseRotateX: 18,
    baseRotateY: -32,
    baseRotateZ: -6,
    spinX: -55,
    spinY: 420,
    spinZ: 28,
    yRange: [70, -50],
    xRange: [-12, 18],
    scaleRange: [0.82, 1.08],
    icon: "magnifier",
  },
  {
    className: "right-[2%] top-[5%]",
    scrollRange: [0.08, 0.92],
    baseRotateX: -12,
    baseRotateY: 40,
    baseRotateZ: 4,
    spinX: 48,
    spinY: -360,
    spinZ: -22,
    yRange: [55, -65],
    xRange: [14, -20],
    scaleRange: [0.78, 1.05],
    icon: "layers",
  },
  {
    className: "bottom-[14%] left-[3%]",
    scrollRange: [0.1, 0.94],
    baseRotateX: 10,
    baseRotateY: 28,
    baseRotateZ: -12,
    spinX: -42,
    spinY: 300,
    spinZ: 36,
    yRange: [45, -55],
    xRange: [-8, 22],
    scaleRange: [0.8, 1.1],
    icon: "pen",
  },
  {
    className: "bottom-[10%] right-[2%]",
    scrollRange: [0.12, 0.96],
    baseRotateX: -16,
    baseRotateY: -38,
    baseRotateZ: 8,
    spinX: 52,
    spinY: -480,
    spinZ: -30,
    yRange: [60, -40],
    xRange: [10, -16],
    scaleRange: [0.84, 1.12],
    icon: "rocket",
  },
  {
    className: "left-[18%] top-[22%]",
    scrollRange: [0.14, 0.88],
    baseRotateX: -20,
    baseRotateY: 22,
    baseRotateZ: 12,
    spinX: 38,
    spinY: 240,
    spinZ: -45,
    yRange: [30, -35],
    xRange: [-20, 10],
    scaleRange: [0.55, 0.78],
    maxOpacity: 0.3,
    icon: "bulb",
  },
  {
    className: "right-[16%] top-[20%]",
    scrollRange: [0.16, 0.9],
    baseRotateX: 14,
    baseRotateY: -26,
    baseRotateZ: -8,
    spinX: -36,
    spinY: -280,
    spinZ: 32,
    yRange: [25, -30],
    xRange: [16, -12],
    scaleRange: [0.52, 0.74],
    maxOpacity: 0.28,
    icon: "chart",
  },
  {
    className: "left-[22%] bottom-[22%]",
    scrollRange: [0.18, 0.92],
    baseRotateX: -10,
    baseRotateY: 34,
    baseRotateZ: 6,
    spinX: 44,
    spinY: 320,
    spinZ: -40,
    yRange: [35, -28],
    xRange: [-14, 8],
    scaleRange: [0.5, 0.72],
    maxOpacity: 0.3,
    icon: "target",
  },
  {
    className: "right-[20%] bottom-[20%]",
    scrollRange: [0.2, 0.94],
    baseRotateX: 22,
    baseRotateY: -30,
    baseRotateZ: -10,
    spinX: -50,
    spinY: 540,
    spinZ: 48,
    yRange: [28, -32],
    xRange: [12, -18],
    scaleRange: [0.48, 0.7],
    maxOpacity: 0.28,
    icon: "gear",
  },
  {
    className: "left-[42%] top-[8%]",
    scrollRange: [0.1, 0.86],
    baseRotateX: -8,
    baseRotateY: 18,
    baseRotateZ: 20,
    spinX: 30,
    spinY: -200,
    spinZ: -55,
    yRange: [18, -22],
    xRange: [-10, 10],
    scaleRange: [0.42, 0.58],
    maxOpacity: 0.26,
    icon: "cube",
  },
  {
    className: "right-[38%] top-[12%]",
    scrollRange: [0.12, 0.88],
    baseRotateX: 12,
    baseRotateY: -20,
    baseRotateZ: -14,
    spinX: -28,
    spinY: 180,
    spinZ: 24,
    yRange: [20, -18],
    scaleRange: [0.4, 0.55],
    maxOpacity: 0.24,
    icon: "sphereBlue",
  },
  {
    className: "left-[8%] top-[48%]",
    scrollRange: [0.15, 0.9],
    baseRotateX: -6,
    baseRotateY: 14,
    baseRotateZ: 8,
    spinX: 22,
    spinY: -160,
    spinZ: -18,
    yRange: [22, -26],
    xRange: [-16, 12],
    scaleRange: [0.38, 0.52],
    maxOpacity: 0.22,
    icon: "sphereRed",
  },
  {
    className: "right-[10%] top-[46%]",
    scrollRange: [0.17, 0.92],
    baseRotateX: 8,
    baseRotateY: -16,
    baseRotateZ: -10,
    spinX: -24,
    spinY: 220,
    spinZ: 20,
    yRange: [24, -20],
    scaleRange: [0.36, 0.5],
    maxOpacity: 0.22,
    icon: "sphereGreen",
  },
  {
    className: "left-[32%] bottom-[8%]",
    scrollRange: [0.22, 0.96],
    baseRotateX: -18,
    baseRotateY: 30,
    baseRotateZ: -22,
    spinX: 40,
    spinY: -260,
    spinZ: 42,
    yRange: [16, -24],
    xRange: [-8, 14],
    scaleRange: [0.44, 0.62],
    maxOpacity: 0.26,
    icon: "arrow",
  },
  {
    className: "right-[30%] bottom-[6%]",
    scrollRange: [0.24, 0.98],
    baseRotateX: 16,
    baseRotateY: -28,
    baseRotateZ: 18,
    spinX: -34,
    spinY: 400,
    spinZ: -50,
    yRange: [14, -22],
    scaleRange: [0.42, 0.6],
    maxOpacity: 0.24,
    icon: "ring",
  },
  {
    className: "left-[48%] bottom-[28%]",
    scrollRange: [0.2, 0.9],
    baseRotateX: -14,
    baseRotateY: -18,
    baseRotateZ: 24,
    spinX: 26,
    spinY: -180,
    spinZ: -38,
    yRange: [12, -18],
    scaleRange: [0.34, 0.48],
    maxOpacity: 0.2,
    icon: "ring",
  },
  {
    className: "right-[46%] top-[38%]",
    scrollRange: [0.18, 0.88],
    baseRotateX: 10,
    baseRotateY: 20,
    baseRotateZ: -16,
    spinX: -32,
    spinY: 300,
    spinZ: 34,
    yRange: [10, -16],
    scaleRange: [0.36, 0.5],
    maxOpacity: 0.2,
    icon: "cube",
  },
];

type HowWeWork3DIconsProps = {
  scrollYProgress: MotionValue<number>;
};

export default function HowWeWork3DIcons({ scrollYProgress }: HowWeWork3DIconsProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
    >
      {FLOATING_ICONS.map((config) => (
        <Floating3DIcon
          key={`${config.icon}-${config.className}`}
          scrollYProgress={scrollYProgress}
          config={config}
        />
      ))}
    </div>
  );
}

type StaticIconPlacement = {
  className: string;
  transform: string;
  opacity: number;
  icon: IconName;
};

const STATIC_ICONS: StaticIconPlacement[] = [
  { className: "left-[2%] top-[6%]", transform: "rotateX(-12deg) rotateY(28deg) rotateZ(-4deg)", opacity: 0.26, icon: "magnifier" },
  { className: "right-[2%] top-[5%]", transform: "rotateX(16deg) rotateY(-32deg) rotateZ(6deg)", opacity: 0.24, icon: "layers" },
  { className: "bottom-[14%] left-[3%]", transform: "rotateX(8deg) rotateY(36deg) rotateZ(-8deg)", opacity: 0.26, icon: "pen" },
  { className: "bottom-[10%] right-[2%]", transform: "rotateX(-14deg) rotateY(-26deg) rotateZ(5deg)", opacity: 0.24, icon: "rocket" },
  { className: "left-[18%] top-[22%]", transform: "rotateX(-10deg) rotateY(18deg) rotateZ(10deg)", opacity: 0.2, icon: "bulb" },
  { className: "right-[16%] top-[20%]", transform: "rotateX(12deg) rotateY(-22deg) rotateZ(-8deg)", opacity: 0.18, icon: "chart" },
  { className: "left-[22%] bottom-[22%]", transform: "rotateX(-8deg) rotateY(30deg) rotateZ(6deg)", opacity: 0.2, icon: "target" },
  { className: "right-[20%] bottom-[20%]", transform: "rotateX(14deg) rotateY(-28deg) rotateZ(-10deg)", opacity: 0.18, icon: "gear" },
  { className: "left-[42%] top-[8%]", transform: "rotateX(-6deg) rotateY(20deg) rotateZ(16deg)", opacity: 0.16, icon: "cube" },
  { className: "right-[38%] top-[12%]", transform: "rotateX(8deg) rotateY(-16deg)", opacity: 0.16, icon: "sphereBlue" },
  { className: "left-[8%] top-[48%]", transform: "rotateX(-4deg) rotateY(14deg)", opacity: 0.14, icon: "sphereRed" },
  { className: "right-[10%] top-[46%]", transform: "rotateX(6deg) rotateY(-12deg)", opacity: 0.14, icon: "sphereGreen" },
  { className: "left-[32%] bottom-[8%]", transform: "rotateX(-16deg) rotateY(24deg) rotateZ(-18deg)", opacity: 0.16, icon: "arrow" },
  { className: "right-[30%] bottom-[6%]", transform: "rotateX(12deg) rotateY(-20deg) rotateZ(14deg)", opacity: 0.14, icon: "ring" },
  { className: "left-[48%] bottom-[28%]", transform: "rotateX(-8deg) rotateY(-14deg) rotateZ(20deg)", opacity: 0.12, icon: "ring" },
  { className: "right-[46%] top-[38%]", transform: "rotateX(10deg) rotateY(18deg) rotateZ(-12deg)", opacity: 0.12, icon: "cube" },
];

export function HowWeWork3DIconsStatic() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
      {STATIC_ICONS.map((placement) => {
        const IconComponent = ICON_MAP[placement.icon];
        return (
          <div
            key={`${placement.icon}-${placement.className}`}
            className={`absolute ${placement.className}`}
            style={{ opacity: placement.opacity }}
          >
            <div className="how-we-work-icon-viewport">
              <div className="how-we-work-icon-transform" style={{ transform: placement.transform }}>
                <IconComponent />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
