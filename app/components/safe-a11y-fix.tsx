"use client";

import { useEffect } from "react";

/**
 * A client-side wrapper that performs legacy accessibility fixes after hydration.
 * This avoids hydration mismatches by waiting for React to finish mounting
 * before manipulating the DOM structure for third-party elements.
 */
export function SafeA11yFix() {
  useEffect(() => {
    const fixA11y = () => {
      // 1. Fix header: Fumadocs uses a UL with invalid aria-orientation
      const navUl = document.querySelector(
        "header#nd-nav nav > ul[aria-orientation]"
      );
      if (navUl) {
        navUl.removeAttribute("aria-orientation");
      }
    };

    // Initial fix
    fixA11y();

    // Observe for structure changes (e.g. route changes or theme toggles)
    const observer = new MutationObserver(fixA11y);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
