// src/i18n/routing.ts

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "ur-Latn", "hi"],
  defaultLocale: "en",
});
