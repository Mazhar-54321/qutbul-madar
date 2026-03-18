"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { languages } from "@/lib/languages";
import { useTheme } from "@/context/ThemeProvider";

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);
  const [flipLeft, setFlipLeft] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Theme 3 Desert Sand colors (mirrors Appbar C)
  const popBg   = dark ? "#231608" : "#f5edd8";
  const text     = dark ? "rgba(250,246,239,0.55)" : "#7a6045";
  const textHi   = dark ? "#f0e8d8" : "#1c1208";
  const gold     = "#c8956c";
  const border   = "rgba(200,149,108,0.2)";

  const activeLang = languages.find((l) => l.code === currentLocale)?.label ?? "Language";

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    let newPath = pathname;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      newPath = "/" + segments.slice(1).join("/");
    }
    newPath = `/${newLocale}${newPath === "/" ? "" : newPath}`;
    router.replace(newPath);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            // right:0 extends dropdown leftward → overflows left when rect.right - 176 < 0
            // left:0 extends dropdown rightward → overflows right when rect.left + 176 > innerWidth
            const overflowsLeft = rect.right - 176 < 0;
            const overflowsRight = rect.left + 176 > window.innerWidth;
            setFlipLeft(overflowsLeft && !overflowsRight);
          }
          setOpen((v) => !v);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200"
        style={{
          background: dark ? "rgba(200,149,108,0.08)" : "rgba(28,18,8,0.05)",
          border: `1px solid ${border}`,
          color: dark ? "rgba(250,246,239,0.7)" : "#7a6045",
        }}
      >
        <Globe className="w-3.5 h-3.5" style={{ color: gold }} />
        {activeLang}
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: gold }}
        />
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 w-44 rounded-2xl overflow-hidden z-50"
          style={{
            background: popBg,
            border: `1px solid ${border}`,
            boxShadow: "0 12px 40px rgba(28,18,8,0.18)",
            ...(flipLeft ? { left: 0 } : { right: 0 }),
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: `1px solid rgba(200,149,108,0.12)` }}>
            <span className="w-3 h-px" style={{ background: gold }} />
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: gold }}>Language</p>
          </div>

          {/* Options */}
          <div className="p-1.5 flex flex-col gap-0.5">
            {languages.map((lang) => {
              const isActive = lang.code === currentLocale;
              return (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  disabled={isActive}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-[13px] transition-all duration-150"
                  style={{ color: isActive ? gold : text }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "rgba(200,149,108,0.08)";
                      (e.currentTarget as HTMLElement).style.color = textHi;
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = isActive ? gold : text;
                  }}
                >
                  {lang.label}
                  {isActive && <Check className="w-3.5 h-3.5" style={{ color: gold }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
