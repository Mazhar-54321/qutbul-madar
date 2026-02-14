"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl"; // ← to read current locale
import { usePathname, useRouter } from "next/navigation"; // ← key imports
import { languages } from "@/lib/languages";

export default function LanguageSwitcher() {
  const currentLocale = useLocale(); // real current locale from next-intl
  const pathname = usePathname(); // e.g. "/about-us" or "/en/contact"
  const router = useRouter();

  // Optional: show current language in button (falls back nicely)
  const activeLang =
    languages.find((l) => l.code === currentLocale)?.label ?? "Language";

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Remove old locale prefix from pathname if present
    // pathname might be: "/en/about" or just "/about" (depending on middleware)
    let newPath = pathname;
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      // Old locale was in path → remove it
      newPath = "/" + segments.slice(1).join("/");
    }

    // Add new locale prefix
    newPath = `/${newLocale}${newPath === "/" ? "" : newPath}`;

    // Navigate (replace to avoid adding to history)
    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {activeLang}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="cursor-pointer"
            disabled={lang.code === currentLocale} // optional: disable current
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
