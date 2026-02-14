// src/i18n/routing.ts

export const routing = {
  locales: ["en", "ur", "ur-Latn", "hi"] as const,
  defaultLocale: "en" as const,
} satisfies { locales: readonly string[]; defaultLocale: string };
