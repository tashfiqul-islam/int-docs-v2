"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

/** SVG viewBox dimensions for coordinate calculations */
const VIEWBOX = { width: 750, height: 100 } as const;

/** Spotlight radius for cursor hover effect */
const SPOTLIGHT_RADIUS = 200;

interface FooterWatermarkProps {
  /** Text to display as the watermark. Defaults to "FIELD NATION" */
  text?: string;
}

/**
 * A decorative watermark component that displays large text with a
 * cursor-following spotlight effect on hover.
 */
export function FooterWatermark({
  text = "FIELD NATION",
}: FooterWatermarkProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? resolvedTheme === "dark" : true; // Default to dark aesthetic before mount

  useEffect(() => {
    setMounted(true);
  }, []);

  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [cursorPos, setCursorPos] = useState({
    x: VIEWBOX.width / 2,
    y: VIEWBOX.height / 2,
  });
  const [glowOpacity, setGlowOpacity] = useState(0);

  /** Check if cursor is over the text element and update position */
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const textEl = textRef.current;
    if (!(svg && textEl)) {
      return;
    }

    const svgRect = svg.getBoundingClientRect();
    const textBBox = textEl.getBBox();

    // Convert to SVG coordinates
    const svgX = ((e.clientX - svgRect.left) / svgRect.width) * VIEWBOX.width;
    const svgY = ((e.clientY - svgRect.top) / svgRect.height) * VIEWBOX.height;

    // Check if cursor is within text bounding box
    const isOverText =
      svgX >= textBBox.x &&
      svgX <= textBBox.x + textBBox.width &&
      svgY >= textBBox.y &&
      svgY <= textBBox.y + textBBox.height;

    setGlowOpacity(isOverText ? 1 : 0);
    setCursorPos({ x: svgX, y: svgY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowOpacity(0);
  }, []);

  return (
    <div className="relative block overflow-hidden bg-slate-50 dark:bg-neutral-900/40">
      <div
        className="mx-auto w-full px-4 md:px-6 lg:px-8"
        style={{ maxWidth: "var(--fd-layout-width)" }}
      >
        <div
          className="overflow-hidden"
          style={{ height: "clamp(40px, 8vw, 110px)" }}
        >
          <svg
            aria-hidden="true"
            className="w-full cursor-default select-none"
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            preserveAspectRatio="xMidYMin meet"
            ref={svgRef}
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          >
            <defs>
              {/* Glassy fill gradient */}
              <linearGradient id="watermark-glass" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={
                    isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.04)"
                  }
                />
                <stop
                  offset="100%"
                  stopColor={
                    isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.04)"
                  }
                />
              </linearGradient>

              {/* Spotlight gradient */}
              <radialGradient
                cx={cursorPos.x}
                cy={cursorPos.y}
                gradientUnits="userSpaceOnUse"
                id="watermark-spotlight"
                r={SPOTLIGHT_RADIUS}
              >
                <stop
                  offset="0%"
                  stopColor={
                    isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"
                  }
                />
                <stop
                  offset="60%"
                  stopColor={
                    isDark
                      ? "rgba(120, 120, 120, 0.08)"
                      : "rgba(120, 120, 120, 0.05)"
                  }
                />
                <stop
                  offset="100%"
                  stopColor={
                    isDark
                      ? "rgba(128, 128, 128, 0.03)"
                      : "rgba(128, 128, 128, 0.01)"
                  }
                />
              </radialGradient>

              {/* Inner glow/glass filter */}
              <filter
                height="140%"
                id="glass-filter"
                width="140%"
                x="-20%"
                y="-20%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  result="blur"
                  stdDeviation="0.5"
                />
                <feOffset dx="0.5" dy="0.5" in="blur" result="offset" />
                <feComposite
                  in="SourceAlpha"
                  in2="offset"
                  operator="out"
                  result="inner-glow"
                />
                <feFlood
                  floodColor={
                    isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                  }
                  result="color"
                />
                <feComposite in="color" in2="inner-glow" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base "Glass" Layer */}
            <text
              className="pointer-events-none transition-all duration-500"
              dominantBaseline="alphabetic"
              style={{
                fontSize: "105px",
                fontWeight: 900,
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                letterSpacing: "-0.04em",
                fill: "url(#watermark-glass)",
                stroke: isDark
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.04)",
                strokeWidth: "0.2px",
                filter: "url(#glass-filter)",
              }}
              textAnchor="middle"
              x={VIEWBOX.width / 2}
              y="80"
            >
              {text}
            </text>

            {/* Interaction Layer (Spotlight) */}
            <text
              className="pointer-events-none transition-opacity duration-500 ease-out"
              dominantBaseline="alphabetic"
              ref={textRef}
              style={{
                fontSize: "105px",
                fontWeight: 900,
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                letterSpacing: "-0.04em",
                fill: "url(#watermark-spotlight)",
                opacity: glowOpacity * 0.6,
                filter: "blur(0.8px)", // Soften the interaction spotlight even more
              }}
              textAnchor="middle"
              x={VIEWBOX.width / 2}
              y="80"
            >
              {text}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
