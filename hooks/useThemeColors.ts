"use client";

import { useTheme } from "@/context/ThemeProvider";

/**
 * Returns the site colour palette that automatically flips for dark mode.
 *
 * dark/dark2   – always dark (hero & CTA section backgrounds, never flips)
 * cream/cream2 – page / section background (flips in dark mode)
 * text/muted   – body text (flips in dark mode)
 * ink          – heading / emphasis text on light-background sections (flips)
 * white        – card background (flips)
 * gold/goldHi  – accent, never changes
 */
export function useC() {
  const { dark } = useTheme();

  return {
    // ── always-dark (section backgrounds that stay dark in both modes) ─────
    dark:   "#0a1f12",
    dark2:  "#0d2317",
    mid:    "#1a5c38",
    green:  "#2d7a4f",
    light:  "#4aa06a",

    // ── always gold ───────────────────────────────────────────────────────
    gold:   "#c9a84c",
    goldHi: "#e8c96b",

    // ── text on always-dark sections (hero, CTA) — never flips ────────────
    onDark: "#f7f4ee",

    // ── flips ─────────────────────────────────────────────────────────────
    cream:  dark ? "#091a0d" : "#f7f4ee",          // page / hero-content bg
    cream2: dark ? "#0a1f12" : "#ede9e0",          // secondary section bg
    cream3: dark ? "rgba(201,168,76,0.12)" : "#e0d8c8",  // borders / dividers
    text:   dark ? "#f0ede7" : "#1a1a10",          // primary body text
    muted:  dark ? "#8fa896" : "#6b7c6e",          // secondary / muted text
    white:  dark ? "#0f2419" : "#ffffff",          // card / article bg
    ink:    dark ? "#f0ede7" : "#0a1f12",          // headings on light bg
  } as const;
}
