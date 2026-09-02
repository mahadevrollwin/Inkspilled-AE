"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function useStaticLayout() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile || prefersReducedMotion;
}
