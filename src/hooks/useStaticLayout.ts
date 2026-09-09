"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { STATIC_LAYOUT_MEDIA_QUERY } from "@/lib/breakpoints";

export function useStaticLayout() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(STATIC_LAYOUT_MEDIA_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile || prefersReducedMotion;
}
