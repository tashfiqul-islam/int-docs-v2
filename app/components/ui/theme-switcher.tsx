"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import monitorIcon from "~/assets/icons/monitor.svg";
import moonIcon from "~/assets/icons/moon.svg";
import sunIcon from "~/assets/icons/sun.svg";
import { cn } from "~/lib/utils";

const themes = [
  {
    key: "system",
    icon: monitorIcon,
    label: "System theme",
  },
  {
    key: "light",
    icon: sunIcon,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: moonIcon,
    label: "Dark theme",
  },
] as const;

type ThemeValue = "light" | "dark" | "system";

export type ThemeSwitcherProps = {
  value?: ThemeValue;
  onChange?: (theme: ThemeValue) => void;
  defaultValue?: ThemeValue;
  className?: string;
};

export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = "system",
  className,
}: ThemeSwitcherProps) => {
  // Internal state for uncontrolled mode
  const [internalTheme, setInternalTheme] = useState<ThemeValue>(defaultValue);
  const [mounted, setMounted] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Determine if component is controlled (value prop provided)
  const isControlled = value !== undefined;
  const theme = isControlled ? value : internalTheme;

  const handleThemeClick = useCallback(
    (themeKey: ThemeValue) => {
      // In controlled mode, just call onChange
      // In uncontrolled mode, update internal state and call onChange
      if (!isControlled) {
        setInternalTheme(themeKey);
      }
      setIsFirstMount(false);
      onChange?.(themeKey);
    },
    [isControlled, onChange]
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-8 items-center justify-center rounded-full border border-fd-border/50 bg-fd-secondary/50 p-[3px]",
        className
      )}
    >
      {themes.map(({ key, icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative flex h-6 w-6 items-center justify-center rounded-full"
            key={key}
            onClick={() => handleThemeClick(key)}
            type="button"
          >
            {isActive ? (
              <motion.div
                className="absolute inset-0 rounded-full bg-fd-primary/20"
                layoutId="activeTheme"
                transition={
                  isFirstMount
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.5 }
                }
              />
            ) : null}
            <Image
              alt={label}
              className={cn(
                "relative z-10 h-4 w-4",
                isActive ? "" : "opacity-50 dark:invert"
              )}
              height={16}
              src={icon}
              style={{
                filter: isActive
                  ? "invert(47%) sepia(98%) saturate(1653%) hue-rotate(360deg) brightness(103%) contrast(101%)"
                  : undefined,
              }}
              width={16}
            />
          </button>
        );
      })}
    </div>
  );
};
