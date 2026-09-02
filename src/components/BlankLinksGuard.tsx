"use client";

import { useEffect } from "react";

/**
 * Keeps placeholder links from changing scroll position.
 * All site links are blank (#) for now.
 */
export default function BlankLinksGuard() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href == null || href === "" || href === "#" || href.startsWith("#")) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
