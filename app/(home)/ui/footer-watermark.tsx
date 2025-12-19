"use client";

import { useCallback, useRef, useState } from "react";

/** SVG viewBox dimensions for coordinate calculations */
const VIEWBOX = { width: 750, height: 100 } as const;

/** Gradient configuration for the cursor spotlight effect */
const SPOTLIGHT = {
  radius: 200,
  colors: {
    center: "rgba(180, 180, 180, 0.25)",
    mid: "rgba(150, 150, 150, 0.12)",
    edge: "rgba(128, 128, 128, 0.06)",
  },
} as const;

/** Base text color when not hovered */
const BASE_FILL = "rgba(128, 128, 128, 0.08)";

type FooterWatermarkProps = {
  /** Text to display as the watermark. Defaults to "FIELD NATION" */
  text?: string;
};

/**
 * A decorative watermark component that displays large text with a
 * cursor-following spotlight effect on hover.
 */
export function FooterWatermark({
  text = "FIELD NATION",
}: FooterWatermarkProps) {
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
              <radialGradient
                cx={cursorPos.x}
                cy={cursorPos.y}
                gradientUnits="userSpaceOnUse"
                id="watermark-spotlight"
                r={SPOTLIGHT.radius}
              >
                <stop offset="0%" stopColor={SPOTLIGHT.colors.center} />
                <stop offset="40%" stopColor={SPOTLIGHT.colors.mid} />
                <stop offset="100%" stopColor={SPOTLIGHT.colors.edge} />
              </radialGradient>
            </defs>
            {/* Base text layer - always visible */}
            <text
              className="pointer-events-none"
              dominantBaseline="alphabetic"
              style={{
                fontSize: "105px",
                fontWeight: 900,
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                letterSpacing: "-0.04em",
                fill: BASE_FILL,
              }}
              textAnchor="middle"
              x={VIEWBOX.width / 2}
              y="88"
            >
              {text}
            </text>
            {/* Glow layer - fades in/out smoothly */}
            <text
              className="pointer-events-none transition-opacity duration-300 ease-out"
              dominantBaseline="alphabetic"
              ref={textRef}
              style={{
                fontSize: "105px",
                fontWeight: 900,
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                letterSpacing: "-0.04em",
                fill: "url(#watermark-spotlight)",
                opacity: glowOpacity,
              }}
              textAnchor="middle"
              x={VIEWBOX.width / 2}
              y="88"
            >
              {text}
            </text>
          </svg>
        </div>
      </div>

      {/* Bottom edge glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(128, 128, 128, 0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
