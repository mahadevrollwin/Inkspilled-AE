"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ShowreelModal({
  open,
  onClose,
  src,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: EASE }}
        >
          <button
            type="button"
            aria-label="Close showreel"
            className="absolute inset-0 bg-black/80 backdrop-blur-[6px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Inkspilled showreel"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.38, ease: EASE }}
            className="relative z-[1] w-full max-w-[960px]"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close showreel"
              onClick={onClose}
              className="absolute -right-2 -top-2 z-10 grid h-10 w-10 place-items-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white bg-[#141414] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-opacity hover:opacity-85 md:-right-3 md:-top-3"
            >
              <X size={18} strokeWidth={2.25} />
            </button>

            <div className="overflow-hidden rounded-tl-[18px] rounded-tr-none rounded-br-[18px] rounded-bl-[18px] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <video
                ref={videoRef}
                src={src}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
