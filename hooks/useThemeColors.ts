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
    dark:   "#1c1208",
    dark2:  "#231608",
    mid:    "#5c3d1a",
    green:  "#8b5e2a",
    light:  "#b07d44",

    // ── always rose-gold ──────────────────────────────────────────────────
    gold:   "#c8956c",
    goldHi: "#e8b48a",

    // ── text on always-dark sections (hero, CTA) — never flips ────────────
    onDark: "#faf6ef",

    // ── flips ─────────────────────────────────────────────────────────────
    cream:  dark ? "#1c1208" : "#faf6ef",                     // page bg
    cream2: dark ? "#231608" : "#f0e8d8",                     // secondary section bg
    cream3: dark ? "rgba(200,149,108,0.13)" : "#e0d0b8",      // borders / dividers
    text:   dark ? "#f0e8d8" : "#1c1208",                     // primary body text
    muted:  dark ? "#a89070" : "#7a6045",                     // secondary / muted text
    white:  dark ? "#281a0a" : "#ffffff",                     // card / article bg
    ink:    dark ? "#f0e8d8" : "#1c1208",                     // headings on light bg
  } as const;
}
