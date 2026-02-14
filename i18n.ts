export const locales = ["en", "hi", "ur", "ur-Latn"] as const;

export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
export function isRtlLocale(locale: string): boolean {
  return locales.includes(locale.toLowerCase() as any);
}
