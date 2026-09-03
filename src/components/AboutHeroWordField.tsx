"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const WORDS =
  "BRAND STRATEGY MOTION IDENTITY PRINT PACKAGING SOCIAL MEDIA CONTENT INFLUENCER UX UI DESIGN ECOMMERCE FILM DIGITAL GROWTH CREATIVE DUBAI ";

const SPX = 19;
const SPY = 26;
const FONT_SIZE = 12;
const CURSOR_RADIUS = 150;
// Warm cream reads clearly on the dark hero; brightens further near the cursor.
const COLOR = "255, 232, 196";

type Dot = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  a: number;
  ch: string;
};

type Ripple = {
  x: number;
  y: number;
  r: number;
  l: number;
};

export default function AboutHeroWordField() {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let mx = -9999;
    let my = -9999;
    let ripples: Ripple[] = [];
    let raf: number | null = null;
    let visible = false;
    let t = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const build = () => {
      const bounds = host.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (width < 10 || height < 10) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / SPX) + 1;
      const rows = Math.ceil(height / SPY) + 1;

      for (let j = 0; j < rows; j += 1) {
        const idx = (j * 13) % WORDS.length;
        for (let i = 0; i < cols; i += 1) {
          const ch = WORDS.charAt((idx + i) % WORDS.length);
          if (ch === " ") continue;

          const x = i * SPX + SPX / 2;
          const y = j * SPY + SPY / 2;
          // Soft left fade so letters stay visible sooner across the field.
          const fx = Math.min(1, Math.max(0, (x / width - 0.01) / 0.22));
          const fy = Math.min(1, y / 50, (height - y) / 50);
          const a = 0.35 + fx * 0.65 * Math.max(0, Math.min(1, fy));
          if (a <= 0.08) continue;

          dots.push({ x, y, ox: x, oy: y, a, ch });
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.016;

      for (let k = 0; k < ripples.length; k += 1) {
        ripples[k].r += 4.6;
        ripples[k].l -= 0.016;
      }
      ripples = ripples.filter((rp) => rp.l > 0);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];
        const w =
          Math.sin(d.ox * 0.016 + d.oy * 0.008 + t * 1.15) * 0.5 +
          Math.sin(d.oy * 0.02 - t * 0.8) * 0.5;
        const lift = (w + 1) / 2;
        let tx = d.ox;
        let ty = d.oy + w * 3.2;
        let glow = 0;

        if (!reduceMotion) {
          const dx = d.ox - mx;
          const dy = d.oy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CURSOR_RADIUS && dist > 0.001) {
            let f = 1 - dist / CURSOR_RADIUS;
            f *= f;
            tx += (dx / dist) * f * 26;
            ty += (dy / dist) * f * 26;
            glow = f;
          }

          for (let k = 0; k < ripples.length; k += 1) {
            const rp = ripples[k];
            const rx = d.ox - rp.x;
            const ry = d.oy - rp.y;
            const rd = Math.sqrt(rx * rx + ry * ry);
            const band = Math.max(0, 1 - Math.abs(rd - rp.r) / 46) * rp.l;
            if (band > 0 && rd > 0.001) {
              tx += (rx / rd) * band * 14;
              ty += (ry / rd) * band * 14;
              glow = Math.max(glow, band);
            }
          }
        }

        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;

        const fs =
          Math.round(FONT_SIZE * (0.9 + lift * 0.22 + glow * 0.7) * 2) / 2;
        // Resting opacity ~0.28–0.45; cursor glow can reach ~0.9.
        const al = Math.min(0.92, d.a * (0.32 + lift * 0.14 + glow * 0.55));

        ctx.font = `700 ${fs}px Montserrat, sans-serif`;
        ctx.fillStyle = `rgba(${COLOR},${al.toFixed(3)})`;
        ctx.fillText(d.ch, d.x, d.y);
      }

      if (visible && !reduceMotion) {
        raf = requestAnimationFrame(drawFrame);
      } else {
        raf = null;
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(drawFrame);
    };

    const inField = (clientX: number, clientY: number, r: DOMRect) =>
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom;

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      if (inField(e.clientX, e.clientY, r)) {
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      } else {
        mx = -9999;
        my = -9999;
      }
    };

    const onClick = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      if (!inField(e.clientX, e.clientY, r)) return;
      ripples.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        r: 0,
        l: 1,
      });
      if (reduceMotion) drawFrame();
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduceMotion) drawFrame();
      }, 150);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) start();
        });
      },
      { threshold: 0.05 },
    );

    build();
    io.observe(host);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      drawFrame();
    } else {
      start();
    }

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="relative h-full w-full overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
