"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { STATIC_LAYOUT_MEDIA_QUERY, PHONE_LAYOUT_MEDIA_QUERY } from "@/lib/breakpoints";

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

export function usePhoneLayout() {
  const prefersReducedMotion = useReducedMotion();
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(PHONE_LAYOUT_MEDIA_QUERY);
    const update = () => setIsPhone(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isPhone || prefersReducedMotion;
}
