"use client";

import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./theme-switcher";

type ThemeValue = "light" | "dark" | "system";

/**
 * Connected theme switcher that syncs with next-themes.
 * Use this in nav bar and sidebar footer.
 */
export function ConnectedThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcher
      className={className}
      onChange={(newTheme: ThemeValue) => setTheme(newTheme)}
      value={theme as ThemeValue}
    />
  );
}
