"use client";

import Link from "next/link";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
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
import { useTheme } from "@/context/ThemeProvider";
import { DonateModal } from "@/components/shared/DonateModal";

const WHATSAPP_URL = "https://wa.me/919838360930";
const INSTAGRAM_URL = "https://www.instagram.com/dargah_zinda_shah_madar_makanp?igsh=aXkwZ3NqdXZ1ZW1t";

function WhatsAppIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

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
  { label: "Gallery", href: "/image-gallery" },
  { label: "Contact", href: "/contact" },
];

export default function AppBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const { dark, toggle } = useTheme();

  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);

  // Derived colours — kept inside component so they react to theme
  const navBg    = dark ? (scrolled ? "rgba(28,18,8,0.97)" : "#1c1208") : (scrolled ? "rgba(250,246,239,0.97)" : "#faf6ef");
  const navText  = dark ? "rgba(250,246,239,0.55)" : "#7a6045";
  const navHover = dark ? "#f0e8d8" : "#1c1208";
  const popBg    = dark ? "#231608" : "#f5edd8";
  const mobileBg = dark ? "#1c1208" : "#f5edd8";

  const C = {
    dark:    "#231608",
    gold:    "#c8956c",
    cream:   "#faf6ef",
  };

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
            ? `1px solid rgba(200,149,108,0.15)`
            : `1px solid rgba(200,149,108,0.08)`,
        }}
      >
        {/* ── Logo panel ──────────────────────────────────────────────── */}
        <Link
          href={loc("/")}
          className="flex items-center gap-3.5 flex-shrink-0 px-6 transition-all duration-300 group relative"
          style={{ background: C.dark, minWidth: isRtl ? "auto" : 224 }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-lg text-[11px] font-black
                       transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(200,149,108,0.3)]"
            style={{
              width: 34, height: 34,
              background: "rgba(200,149,108,0.08)",
              border: `1px solid rgba(200,149,108,0.35)`,
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
               style={{ color: "rgba(200,149,108,0.55)" }}>
              Makanpur Shareef
            </p>
          </div>
          <div
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0
                       group-hover:scale-x-100 transition-transform duration-300"
            style={{ background: C.gold }}
          />
        </Link>

        {/* ── Nav panel ───────────────────────────────────────────────── */}
        <div
          className="flex flex-1 items-center justify-between px-6 transition-all duration-300"
          style={{
            background: navBg,
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
                    style={{ color: navText }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = navHover; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = navText; }}
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
                      style={{ color: navText }}
                    >
                      {t(item.label)}
                      <ChevronDown
                        className="w-3 h-3 mt-0.5 transition-transform duration-200"
                        style={{
                          transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0deg)",
                          color: openMenu === item.label ? C.gold : navText,
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
                      background: popBg,
                      border: `1px solid rgba(200,149,108,0.2)`,
                      boxShadow: "0 12px 40px rgba(28,18,8,0.18)",
                    }}
                  >
                    <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
                      <span className="w-3 h-px" style={{ background: C.gold }} />
                      <p className="text-[10px] font-bold tracking-[0.14em] uppercase"
                         style={{ color: C.gold }}>
                        {t(item.label)}
                      </p>
                    </div>
                    <div style={{ height: 1, background: "rgba(200,149,108,0.12)", marginBottom: 6 }} />
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={loc(child.href)}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px]
                                   transition-all duration-150 group"
                        style={{ color: navText }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "rgba(200,149,108,0.08)";
                          el.style.color = navHover;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "transparent";
                          el.style.color = navText;
                        }}
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150"
                              style={{ background: "#5c3d1a" }} />
                        {t(child.label)}
                      </Link>
                    ))}
                  </PopoverContent>
                </Popover>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200"
                  style={{
                    background: dark ? "rgba(200,149,108,0.08)" : "rgba(28,18,8,0.05)",
                    border: `1px solid rgba(200,149,108,0.2)`,
                    color: dark ? "rgba(250,246,239,0.7)" : "#7a6045",
                  }}
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" style={{ color: C.gold } as React.CSSProperties} />
                  Follow Us
                  <ChevronDown className="w-3 h-3" style={{ color: C.gold }} />
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="end"
                sideOffset={10}
                className="w-48 p-2 rounded-2xl"
                style={{
                  background: popBg,
                  border: `1px solid rgba(200,149,108,0.2)`,
                  boxShadow: "0 12px 40px rgba(28,18,8,0.18)",
                }}
              >
                <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
                  <span className="w-3 h-px" style={{ background: C.gold }} />
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: C.gold }}>
                    Social Media
                  </p>
                </div>
                <div style={{ height: 1, background: "rgba(200,149,108,0.12)", marginBottom: 6 }} />
                <a
                  href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150 group"
                  style={{ color: navText }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "rgba(37,211,102,0.1)"; el.style.color = "#25d166"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = navText; }}
                >
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                  WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150"
                  style={{ color: navText }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "rgba(225,48,108,0.1)"; el.style.color = "#e1306c"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = navText; }}
                >
                  <InstagramIcon className="w-4 h-4 flex-shrink-0" />
                  Instagram
                </a>
              </PopoverContent>
            </Popover>

            <LanguageSwitcher />

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: dark ? "rgba(200,149,108,0.1)" : "rgba(28,18,8,0.06)",
                border: `1px solid ${dark ? "rgba(200,149,108,0.25)" : "rgba(28,18,8,0.1)"}`,
                color: dark ? C.gold : "#1c1208",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(200,149,108,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = dark
                  ? "rgba(200,149,108,0.1)"
                  : "rgba(28,18,8,0.06)";
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {dark ? (
                  <motion.div key="sun"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Sun className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Moon className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setDonateOpen(true)}
              className="text-[13px] font-bold px-5 py-2 rounded-lg transition-all duration-200
                         active:scale-[0.97] relative overflow-hidden group"
              style={{ background: C.dark, color: C.cream }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#5c3d1a"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.dark; }}
            >
              <span className="relative z-10">{t("Donate")}</span>
              <span
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }}
              />
            </button>
          </div>

          {/* Mobile right — toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
               aria-label="WhatsApp"
               className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
               style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", color: "#25d166" }}>
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
               aria-label="Instagram"
               className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
               style={{ background: "rgba(225,48,108,0.1)", border: "1px solid rgba(225,48,108,0.25)", color: "#e1306c" }}>
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: dark ? "rgba(200,149,108,0.1)" : "rgba(28,18,8,0.06)",
                border: `1px solid ${dark ? "rgba(200,149,108,0.25)" : "rgba(28,18,8,0.1)"}`,
                color: dark ? C.gold : "#1c1208",
              }}
            >
              {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: dark ? C.cream : "#1c1208" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
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
              background: mobileBg,
              borderBottom: `1px solid rgba(200,149,108,0.15)`,
              boxShadow: "0 20px 48px rgba(28,18,8,0.18)",
            }}
          >
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
                    style={{ color: navHover }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "rgba(200,149,108,0.08)")
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
                        style={{ color: navHover }}
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
                              style={{ color: navText }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(200,149,108,0.08)";
                                (e.currentTarget as HTMLElement).style.color = navHover;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = navText;
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
              style={{ borderTop: `1px solid rgba(200,149,108,0.12)` }}
            >
              <LanguageSwitcher />
              <button
                onClick={() => { setMobileOpen(false); setDonateOpen(true); }}
                className="text-[13px] font-bold px-6 py-2.5 rounded-xl transition-all active:scale-[0.97]"
                style={{ background: C.dark, color: C.cream }}
              >
                {t("Donate")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </header>
  );
}
