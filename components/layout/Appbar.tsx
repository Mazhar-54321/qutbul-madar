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
  dark: "#1a3d2b",
  mid: "#2d7a4f",
  light: "#4aa06a",
  cream: "#f7f4ee",
  cream2: "#ede9e0",
  cream3: "#e0d8c8",
  muted: "#6b7c6e",
};

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Qutbul Madar", href: "/qutbul-madar" },
      { label: "Our Services", href: "/our-services" },
    ],
  },
  {
    label: "Books",
    children: [
      { label: "Urdu Books", href: "/urdu-books" },
      { label: "Farsi Books", href: "/farsi-books" },
      { label: "Hindi Books", href: "/hindi-books" },
    ],
  },
  {
    label: "Articles",
    children: [
      { label: "Urdu Articles", href: "/urdu-articles" },
      { label: "English Articles", href: "/english-articles" },
    ],
  },
  {
    label: "Gallery",
    children: [
      { label: "Image Gallery", href: "/image-gallery" },
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
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const loc = (href: string) => `/${locale}${href}`;

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
                  ${scrolled ? "shadow-md shadow-[#1a3d2b]/10" : ""}`}
      style={{ height: scrolled ? "56px" : "68px" }}
    >
      {/* ── Split panel wrapper ─────────────────────────────────────── */}
      <div
        className="flex h-full"
        style={{ borderBottom: `1px solid ${C.cream3}` }}
      >
        {/* LEFT — dark green logo panel */}
        <Link
          href={loc("/")}
          className="flex items-center gap-3 flex-shrink-0 px-6 transition-colors duration-200"
          style={{ background: C.dark, minWidth: isRtl ? "auto" : 220 }}
        >
          {/* Monogram mark */}
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-lg text-xs font-black"
            style={{
              width: 32,
              height: 32,
              background: "rgba(247,244,238,0.12)",
              border: "1px solid rgba(247,244,238,0.2)",
              color: C.cream,
              letterSpacing: "0.05em",
            }}
          >
            QM
          </div>
          <div>
            <p
              className="text-sm font-bold leading-tight"
              style={{ color: C.cream }}
            >
              Qutbul Madar
            </p>
            <p
              className="text-[10px] leading-tight"
              style={{ color: "rgba(247,244,238,0.45)" }}
            >
              Makanpur Shareef
            </p>
          </div>
        </Link>

        {/* RIGHT — cream nav panel */}
        <div
          className="flex flex-1 items-center justify-between px-5 transition-all duration-300"
          style={{
            background: scrolled ? "rgba(247,244,238,0.97)" : C.cream,
            backdropFilter: scrolled ? "blur(12px)" : "none",
          }}
        >
          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={loc(item.href!)}
                    className="px-3 py-2 text-sm rounded-lg transition-all duration-150 font-medium"
                    style={{ color: C.muted }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = C.dark;
                      (e.target as HTMLElement).style.background = C.cream2;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = C.muted;
                      (e.target as HTMLElement).style.background =
                        "transparent";
                    }}
                  >
                    {t(item.label)}
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
                      className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg
                                 transition-all duration-150 font-medium"
                      style={{ color: C.muted }}
                    >
                      {t(item.label)}
                      <ChevronDown
                        className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200"
                        style={{
                          transform:
                            openMenu === item.label
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          color: C.muted,
                        }}
                      />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    side="bottom"
                    align={isRtl ? "end" : "start"}
                    sideOffset={8}
                    className="w-52 p-2 rounded-2xl"
                    style={{
                      background: C.cream,
                      border: `1px solid ${C.cream3}`,
                      boxShadow: "0 8px 32px rgba(26,61,43,0.12)",
                    }}
                  >
                    {/* Dropdown header */}
                    <p
                      className="text-[10px] font-bold tracking-[0.12em] uppercase px-3 pb-2 pt-1"
                      style={{ color: C.mid }}
                    >
                      {t(item.label)}
                    </p>
                    <div
                      style={{
                        height: 1,
                        background: C.cream3,
                        marginBottom: 6,
                      }}
                    />
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={loc(child.href)}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                                   transition-colors duration-150 group"
                        style={{ color: C.muted }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = C.cream2;
                          el.style.color = C.dark;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "transparent";
                          el.style.color = C.muted;
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
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

          {/* Desktop right — language + donate */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={loc("/donate")}
              className="text-sm font-bold px-5 py-2 rounded-lg transition-all duration-200
                         active:scale-[0.98]"
              style={{ background: C.dark, color: C.cream }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.mid)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.dark)}
            >
              {t("Donate")}
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
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6" />
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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full inset-x-0 px-4 py-4 z-50"
            style={{
              background: C.cream,
              borderBottom: `1px solid ${C.cream3}`,
              boxShadow: "0 16px 40px rgba(26,61,43,0.12)",
            }}
          >
            {/* Green top accent strip */}
            <div
              className="h-0.5 rounded-full mb-4"
              style={{ background: C.mid }}
            />

            <div className="flex flex-col gap-1 mb-4">
              {navItems.map((item) =>
                !item.children ? (
                  <Link
                    key={item.label}
                    href={loc(item.href!)}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: C.dark }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = C.cream2)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {t(item.label)}
                  </Link>
                ) : (
                  <Accordion key={item.label} type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger
                        className="px-4 py-3 rounded-xl text-sm font-medium hover:no-underline
                                   transition-colors"
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
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl
                                         text-sm transition-colors"
                              style={{ color: C.muted }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = C.cream2;
                                e.currentTarget.style.color = C.dark;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.color = C.muted;
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: C.mid }}
                              />
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

            {/* Mobile footer row */}
            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: `1px solid ${C.cream3}` }}
            >
              <LanguageSwitcher />
              <Link
                href={loc("/donate")}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold px-6 py-2.5 rounded-xl transition-all active:scale-[0.98]"
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
