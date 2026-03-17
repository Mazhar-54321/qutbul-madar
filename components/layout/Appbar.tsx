"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── theme ────────────────────────────────────────────────────────────────────
const C = {
  dark:    "#0f2419",
  mid:     "#2d7a4f",
  light:   "#4aa06a",
  gold:    "#c9a84c",
  goldDim: "rgba(201,168,76,0.15)",
  cream:   "#f7f4ee",
  cream2:  "#ede9e0",
  cream3:  "#e0d8c8",
  muted:   "#6b7c6e",
};

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us",     href: "/about-us" },
      { label: "Qutbul Madar", href: "/qutbul-madar" },
      { label: "Our Services", href: "/our-services" },
    ],
  },
  {
    label: "Books",
    children: [
      { label: "Urdu Books",  href: "/urdu-books" },
      { label: "Farsi Books", href: "/farsi-books" },
      { label: "Hindi Books", href: "/hindi-books" },
    ],
  },
  {
    label: "Articles",
    children: [
      { label: "Urdu Articles",    href: "/urdu-articles" },
      { label: "English Articles", href: "/english-articles" },
    ],
  },
  {
    label: "Gallery",
    children: [
      { label: "Image Gallery",  href: "/image-gallery" },
      { label: "Dargah Gallery", href: "/dargah-gallery" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function AppBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const loc = (href: string) => `/${locale}${href}`;

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
                  ${scrolled ? "shadow-lg shadow-black/10" : ""}`}
      style={{ height: scrolled ? "56px" : "68px" }}
    >
      <div
        className="flex h-full"
        style={{
          borderBottom: scrolled
            ? `1px solid rgba(201,168,76,0.15)`
            : `1px solid rgba(201,168,76,0.08)`,
        }}
      >
        {/* ── Logo panel ──────────────────────────────────────────────── */}
        <Link
          href={loc("/")}
          className="flex items-center gap-3.5 flex-shrink-0 px-6 transition-all duration-300 group"
          style={{ background: C.dark, minWidth: isRtl ? "auto" : 224 }}
        >
          {/* Gold-rimmed monogram */}
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-lg text-[11px] font-black
                       transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.3)]"
            style={{
              width: 34, height: 34,
              background: "rgba(201,168,76,0.08)",
              border: `1px solid rgba(201,168,76,0.35)`,
              color: C.gold,
              letterSpacing: "0.06em",
            }}
          >
            QM
          </div>
          <div>
            <p className="text-[13px] font-bold leading-tight tracking-wide" style={{ color: C.cream }}>
              Qutbul Madar
            </p>
            <p className="text-[9px] leading-tight tracking-[0.12em] uppercase"
               style={{ color: "rgba(201,168,76,0.55)" }}>
              Makanpur Shareef
            </p>
          </div>
          {/* Gold bottom accent line on hover */}
          <div
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0
                       group-hover:scale-x-100 transition-transform duration-300"
            style={{ background: C.gold }}
          />
        </Link>

        {/* ── Nav panel ───────────────────────────────────────────────── */}
        <div
          className="flex flex-1 items-center justify-between px-6 transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(247,244,238,0.96)"
              : C.cream,
            backdropFilter: scrolled ? "blur(16px)" : "none",
          }}
        >
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={loc(item.href!)}
                    className="relative px-3.5 py-2 text-[13px] rounded-lg transition-all duration-200
                               font-medium group overflow-hidden"
                    style={{ color: C.muted }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = C.dark;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = C.muted;
                    }}
                  >
                    {t(item.label)}
                    <span
                      className="absolute bottom-1 left-3.5 right-3.5 h-px origin-left scale-x-0
                                 group-hover:scale-x-100 transition-transform duration-300"
                      style={{ background: C.gold }}
                    />
                  </Link>
                );
              }

              return (
                <Popover
                  key={item.label}
                  open={openMenu === item.label}
                  onOpenChange={(open) => setOpenMenu(open ? item.label : null)}
                >
                  <PopoverTrigger asChild>
                    <button
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onMouseLeave={() => setOpenMenu(null)}
                      className="relative flex items-center gap-1 px-3.5 py-2 text-[13px] rounded-lg
                                 transition-all duration-200 font-medium group"
                      style={{ color: C.muted }}
                    >
                      {t(item.label)}
                      <ChevronDown
                        className="w-3 h-3 mt-0.5 transition-transform duration-200"
                        style={{
                          transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0deg)",
                          color: openMenu === item.label ? C.gold : C.muted,
                        }}
                      />
                      <span
                        className="absolute bottom-1 left-3.5 right-3.5 h-px origin-left
                                   transition-transform duration-300"
                        style={{
                          background: C.gold,
                          transform: openMenu === item.label ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    side="bottom"
                    align={isRtl ? "end" : "start"}
                    sideOffset={10}
                    className="w-52 p-2 rounded-2xl"
                    style={{
                      background: "#faf8f4",
                      border: `1px solid rgba(201,168,76,0.2)`,
                      boxShadow: "0 12px 40px rgba(15,36,25,0.14)",
                    }}
                  >
                    <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
                      <span
                        className="w-3 h-px"
                        style={{ background: C.gold }}
                      />
                      <p className="text-[10px] font-bold tracking-[0.14em] uppercase"
                         style={{ color: C.gold }}>
                        {t(item.label)}
                      </p>
                    </div>
                    <div style={{ height: 1, background: "rgba(201,168,76,0.12)", marginBottom: 6 }} />
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={loc(child.href)}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px]
                                   transition-all duration-150 group"
                        style={{ color: C.muted }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "rgba(201,168,76,0.08)";
                          el.style.color = C.dark;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "transparent";
                          el.style.color = C.muted;
                        }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150"
                          style={{ background: C.mid }}
                        />
                        {t(child.label)}
                      </Link>
                    ))}
                  </PopoverContent>
                </Popover>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={loc("/donate")}
              className="text-[13px] font-bold px-5 py-2 rounded-lg transition-all duration-200
                         active:scale-[0.97] relative overflow-hidden group"
              style={{ background: C.dark, color: C.cream }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.mid;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.dark;
              }}
            >
              <span className="relative z-10">{t("Donate")}</span>
              {/* Gold shimmer line */}
              <span
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }}
              />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: C.dark }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full inset-x-0 px-4 py-4 z-50"
            style={{
              background: "#faf8f4",
              borderBottom: `1px solid rgba(201,168,76,0.15)`,
              boxShadow: "0 20px 48px rgba(15,36,25,0.15)",
            }}
          >
            {/* Gold accent strip */}
            <div
              className="h-px rounded-full mb-4"
              style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }}
            />

            <div className="flex flex-col gap-0.5 mb-4">
              {navItems.map((item) =>
                !item.children ? (
                  <Link
                    key={item.label}
                    href={loc(item.href!)}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-[13px] font-medium transition-colors"
                    style={{ color: C.dark }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    {t(item.label)}
                  </Link>
                ) : (
                  <Accordion key={item.label} type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger
                        className="px-4 py-3 rounded-xl text-[13px] font-medium hover:no-underline transition-colors"
                        style={{ color: C.dark }}
                      >
                        {t(item.label)}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1">
                        <div className="flex flex-col gap-0.5 ps-4 pt-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={loc(child.href)}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-colors"
                              style={{ color: C.muted }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
                                (e.currentTarget as HTMLElement).style.color = C.dark;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = C.muted;
                              }}
                            >
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.gold }} />
                              {t(child.label)}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ),
              )}
            </div>

            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: `1px solid rgba(201,168,76,0.12)` }}
            >
              <LanguageSwitcher />
              <Link
                href={loc("/donate")}
                onClick={() => setMobileOpen(false)}
                className="text-[13px] font-bold px-6 py-2.5 rounded-xl transition-all active:scale-[0.97]"
                style={{ background: C.dark, color: C.cream }}
              >
                {t("Donate")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
