"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ChevronRight, ArrowDown, X, Phone, Star,
  BookOpen, Camera, Heart, Landmark, Users, Globe,
} from "lucide-react";

// ─── transitions ──────────────────────────────────────────────────────────────
const t1: Transition = { duration: 0.6, ease: "easeOut" };
const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── palette ──────────────────────────────────────────────────────────────────
const C = {
  dark:   "#0a1f12",
  dark2:  "#0f2419",
  mid:    "#1a5c38",
  green:  "#2d7a4f",
  light:  "#4aa06a",
  gold:   "#c9a84c",
  goldHi: "#e8c96b",
  cream:  "#f7f4ee",
  cream2: "#ede9e0",
  cream3: "#e0d8c8",
  text:   "#1a1a10",
  muted:  "#6b7c6e",
  white:  "#ffffff",
};

// ─── lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20
                   flex items-center justify-center text-white/70 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={label} fill className="object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <p className="text-white text-sm font-semibold">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── marquee ticker ───────────────────────────────────────────────────────────
const TICKER = [
  "Makanpur Shareef", "Est. 12th Century", "596 Years of Life",
  "800+ Years of Legacy", "Sacred Sufi Shrine", "Dargah of Qutbul Madar",
  "Uttar Pradesh, India", "Spiritual Heritage", "Madariya Silsila",
];
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      className="w-full overflow-hidden py-3.5 relative z-10"
      style={{ background: C.dark2, borderTop: `1px solid rgba(201,168,76,0.15)`, borderBottom: `1px solid rgba(201,168,76,0.15)` }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <Star className="w-2.5 h-2.5 flex-shrink-0" style={{ color: C.gold }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(201,168,76,0.7)" }}>
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── section tag ──────────────────────────────────────────────────────────────
function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-6">
      <span className="w-6 h-px" style={{ background: C.gold }} />
      <span
        className="text-[10px] font-bold tracking-[0.22em] uppercase"
        style={{ color: light ? "rgba(201,168,76,0.8)" : C.gold }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY      = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const sections  = t.raw("sections")  as Array<{ title: string; description: string }>;
  const services  = t.raw("services")  as Array<{ title: string }>;
  const articles  = t.raw("articles")  as Array<{ title: string; description: string }>;
  const loc = (href: string) => `/${locale}${href}`;

  const servicesLinks = [
    "mazar-shareef-chadar-poshi", "langar-bhandara", "dargah-mannat",
    "special-dua", "full-ghilaf", "big-deg", "live-ziyarat",
  ];

  const featureIcons = [BookOpen, Camera, Heart, Landmark, Users, Globe];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* ══════════════════════════════ HERO ══════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="relative flex flex-col justify-end p-8 lg:p-16 min-h-[65vh] lg:min-h-screen" style={{ background: C.dark }}>
          {/* Background image */}
          <motion.div style={{ y: heroY }} className="absolute inset-0 will-change-transform">
            <Image src="/images/image2.webp" alt="Dargah" fill priority className="object-cover object-center opacity-15" sizes="50vw" />
          </motion.div>

          {/* Islamic dot pattern */}
          <div className="absolute inset-0 pattern-dots opacity-60" />

          {/* Large Arabic watermark */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] lg:text-[180px]
                       select-none pointer-events-none leading-none font-bold"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(201,168,76,0.08)",
              fontFamily: "var(--font-urdu-display, serif)",
            }}
          >
            قطب
          </div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10">
            {/* Tag */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Tag light>Makanpur Shareef · Est. 12th Century</Tag>
            </motion.div>

            {/* Arabic subtitle */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-3xl mb-3 leading-loose"
              style={{ color: "rgba(201,168,76,0.3)", fontFamily: "var(--font-urdu-display, serif)" }}
            >
              قطب المدار
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight mb-6
                          ${isRtl ? "font-urdu-display" : "font-heading"}`}
              style={{ color: C.cream }}
            >
              {t("heroTitle")}
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="w-20 h-0.5 mb-6 origin-left"
              style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }}
            />

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="text-[15px] leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(247,244,238,0.5)" }}
            >
              {t("introduction").slice(0, 155)}…
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-3 mb-16"
            >
              <Link
                href={loc("/history")}
                className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-xl
                           transition-all duration-200 active:scale-[0.97] relative overflow-hidden group"
                style={{ background: C.gold, color: C.dark }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("learnMore")}
                  <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </span>
              </Link>
              <Link
                href={loc("/image-gallery")}
                className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3.5 rounded-xl
                           border transition-all duration-200 active:scale-[0.97]"
                style={{ borderColor: "rgba(247,244,238,0.15)", color: "rgba(247,244,238,0.65)" }}
              >
                View Gallery
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              className="grid grid-cols-3 gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
            >
              {[
                { num: "800+", label: "Years of legacy" },
                { num: "596", label: "Years of life" },
                { num: "4",   label: "Languages" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center lg:text-start">
                  <p className="text-3xl font-bold tabular-nums animate-shimmer">{num}</p>
                  <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.35)" }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          >
            <ArrowDown className="w-4 h-4" style={{ color: "rgba(201,168,76,0.4)" }} />
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative hidden lg:flex flex-col justify-end" style={{ background: C.mid }}>
          <motion.div style={{ y: heroY }} className="absolute inset-0 will-change-transform">
            <Image src="/images/qutbul-madar-main.webp" alt="Qutbul Madar" fill className="object-cover object-center opacity-40" sizes="50vw" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${C.mid}44, ${C.dark}ee)` }} />

          {/* Floating quote card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="relative z-10 m-12 p-8 rounded-3xl"
            style={{
              background: "rgba(10,31,18,0.7)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(201,168,76,0.2)`,
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
            }}
          >
            {/* Gold quote mark */}
            <div className="text-5xl font-serif leading-none mb-4" style={{ color: C.gold, opacity: 0.4 }}>&quot;</div>
            <blockquote className="text-[17px] font-light leading-[1.8] mb-5 italic" style={{ color: "rgba(247,244,238,0.85)" }}>
              A radiant sun in the realm of Wilayat whose divine light illuminated hearts across continents.
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: C.gold, opacity: 0.5 }} />
              <span className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(247,244,238,0.4)" }}>
                Biography of Hazrat Qutbul Madar
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ TICKER ════════════════════════════════════ */}
      <Ticker />

      {/* ══════════════════════════ INTRO ═════════════════════════════════════ */}
      <section className="py-28 lg:py-36" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_520px] gap-20 items-center">

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <motion.div variants={fade}><Tag>Sacred Legacy</Tag></motion.div>

              <motion.h2
                variants={fade}
                className={`text-5xl sm:text-6xl font-bold leading-[1.05] mb-5 tracking-tight
                            ${isRtl ? "font-urdu-display" : "font-heading"}`}
                style={{ color: C.dark }}
              >
                {t("heroTitle")}
              </motion.h2>

              <motion.div variants={fade} className="w-16 h-1 rounded-full mb-8"
                style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

              <motion.p variants={fade} className="text-[16px] leading-[1.9] mb-8" style={{ color: C.muted }}>
                {t("introduction")}
              </motion.p>

              {/* Pull quote */}
              <motion.blockquote
                variants={fade}
                className="relative ps-6 mb-10 py-2"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                     style={{ background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />
                <p className="text-[15px] font-semibold leading-relaxed" style={{ color: C.dark }}>
                  &quot;It is extremely difficult to encompass the traits of a saintly life
                  that spanned five hundred and ninety-six years.&quot;
                </p>
              </motion.blockquote>

              <motion.div variants={fade}>
                <Link
                  href={loc("/history")}
                  className="inline-flex items-center gap-2 text-sm font-bold group"
                  style={{ color: C.green }}
                >
                  <span className="group-hover:underline underline-offset-4">Read full history</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex flex-col gap-3"
            >
              <div
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
                onClick={() => setLightbox({ src: "/images/image3.webp", label: "Sajjada Nashin" })}
              >
                <Image src="/images/image3.webp" alt="Sajjada Nashin" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,18,0.7), transparent 50%)" }} />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="text-sm font-semibold" style={{ color: C.cream }}>Sajjada Nashin</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-bold"
                        style={{ background: "rgba(201,168,76,0.2)", color: C.gold, border: "1px solid rgba(201,168,76,0.3)" }}>
                    View
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: "/images/image8.webp", label: "Shrine illuminated" },
                  { src: "/images/image1.webp", label: "Chadar Poshi" },
                ].map(({ src, label }) => (
                  <div key={src}
                    className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                    onClick={() => setLightbox({ src, label })}
                  >
                    <Image src={src} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,18,0.6), transparent 50%)" }} />
                    <span className="absolute bottom-3 left-3 text-xs font-semibold" style={{ color: C.cream }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════ FEATURES ══════════════════════════════════ */}
      <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 20% 50%, rgba(45,122,79,0.15), transparent 60%)` }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <motion.div variants={fade}><Tag light>What You&apos;ll Find</Tag></motion.div>
            <motion.h2 variants={fade} className="text-5xl sm:text-6xl font-bold leading-[1.05] max-w-2xl" style={{ color: C.cream }}>
              Everything about<br />
              <span className="text-gradient-gold">Qutbul Madar</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((el, idx) => {
              const Icon = featureIcons[idx % featureIcons.length];
              return (
                <motion.div
                  key={el.title}
                  initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="group relative rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.25)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {/* Top gold accent line */}
                  <div className="absolute top-0 inset-x-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                       style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                         style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: C.gold }} />
                    </div>
                    <span className="text-[11px] font-bold tabular-nums" style={{ color: "rgba(201,168,76,0.4)" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={`text-[15px] font-bold mb-3 leading-snug ${isRtl ? "font-urdu-display" : ""}`}
                      style={{ color: C.cream }}>
                    {el.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(247,244,238,0.4)" }}>
                    {el.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SERVICES ══════════════════════════════════ */}
      <section className="py-28 lg:py-36 pattern-dots-light" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[360px_1fr] gap-20 items-start">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:sticky lg:top-28">
              <Tag>Dargah Services</Tag>
              <h2 className="text-5xl font-bold leading-[1.05] mb-5 tracking-tight" style={{ color: C.dark }}>
                {t("qutbul-madar-services")}
              </h2>
              <p className="text-[14px] leading-relaxed mb-8" style={{ color: C.muted }}>
                Spiritual and community services at Makanpur Shareef, available year-round for devotees.
              </p>

              <div
                className="relative h-56 rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
                onClick={() => setLightbox({ src: "/images/image2.webp", label: "Dargah Shareef" })}
              >
                <Image src="/images/image2.webp" alt="Dargah" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.dark}bb, transparent)` }} />
                <span className="absolute bottom-4 left-4 text-sm font-medium" style={{ color: C.cream }}>Dargah Shareef</span>
              </div>
            </motion.div>

            <div>
              {services.map((el, idx) => (
                <motion.div
                  key={el.title}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link
                    href={loc(`/services/${servicesLinks[idx] || ""}`)}
                    className="flex items-center justify-between gap-4 py-5 group transition-all duration-200"
                    style={{ borderBottom: `1px solid ${C.cream3}` }}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0
                                   transition-all duration-300"
                        style={{
                          background: "rgba(201,168,76,0.08)",
                          border: "1px solid rgba(201,168,76,0.2)",
                          color: C.gold,
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[15px] font-semibold transition-colors duration-200 group-hover:text-[#0f2419]
                                    ${isRtl ? "font-urdu-display" : ""}`}
                        style={{ color: C.muted }}
                      >
                        {el.title}
                      </span>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                                 opacity-0 group-hover:opacity-100"
                      style={{ background: C.gold }}
                    >
                      <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} style={{ color: C.dark }} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════ GALLERY ═══════════════════════════════════ */}
      <section className="py-28 lg:py-36" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fade}><Tag>Visual Archive</Tag></motion.div>
              <motion.h2 variants={fade} className="text-5xl font-bold leading-[1.05] tracking-tight" style={{ color: C.dark }}>
                {t("image-gallery")}
              </motion.h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link
                href={loc("/image-gallery")}
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
                style={{ background: C.dark, color: C.cream }}
              >
                View all <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[210px]">
            {[
              { src: "/images/image1.webp",  label: "Annual Urs Night",      cls: "row-span-2" },
              { src: "/images/image2.webp",  label: "Dargah Shareef",        cls: "" },
              { src: "/images/image8.webp",  label: "Shrine Illuminated",    cls: "" },
              { src: "/images/image5.webp",  label: "Community Gathering",   cls: "" },
              { src: "/images/image6.webp",  label: "Devotees",              cls: "" },
            ].map(({ src, label, cls }, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setLightbox({ src, label })}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-md ${cls}`}
              >
                <Image src={src} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-108" sizes="(max-width: 768px) 50vw, 33vw" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                  style={{ background: `linear-gradient(to top, ${C.dark}dd, transparent 50%)` }}
                >
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.cream }}>{label}</p>
                    <p className="text-[11px] mt-0.5 font-medium" style={{ color: C.gold }}>Click to enlarge ↗</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CHADAR POSHI ══════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-28 lg:py-36 relative z-10">
          <div
            className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl"
            style={{ boxShadow: `0 32px 80px rgba(0,0,0,0.5)` }}
          >
            {/* Image side */}
            <div
              className="relative min-h-[420px] cursor-pointer group"
              onClick={() => setLightbox({ src: "/images/chadar-poshi.webp", label: "Chadar Poshi" })}
            >
              <Image src="/images/chadar-poshi.webp" alt="Chadar Poshi" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${C.dark}66)` }} />
              {/* Gold badge */}
              <div
                className="absolute top-6 left-6 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: C.gold }}
              >
                Sacred Tradition
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-10 lg:p-14" style={{ background: C.dark2 }}>
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <motion.div variants={fade}><Tag light>Mazar-e-Shareef</Tag></motion.div>
                <motion.h2
                  variants={fade}
                  className={`text-4xl font-bold leading-[1.15] mb-2 ${isRtl ? "font-urdu-display" : ""}`}
                  style={{ color: C.cream }}
                >
                  {t("madarTitle")}
                </motion.h2>
                <motion.p variants={fade} className="text-sm font-semibold mb-6" style={{ color: C.gold }}>
                  {t("madarSubtitle")}
                </motion.p>
                <motion.div variants={fade} className="w-12 h-0.5 mb-8"
                  style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                <motion.p variants={fade} className="text-[14px] leading-[1.9] mb-8"
                  style={{ color: "rgba(247,244,238,0.5)" }}>
                  {t("madarShareefChadarPoshi").split("\n\n")[0]}
                </motion.p>
                <motion.div variants={fade} className="flex flex-wrap gap-3">
                  <Link
                    href={loc("/madar-shareef")}
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl
                               transition-all duration-200 active:scale-[0.97]"
                    style={{ background: C.gold, color: C.dark }}
                  >
                    {t("offerChadar")}
                    <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                  </Link>
                  <Link
                    href={loc("/contact")}
                    className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl border
                               transition-all duration-200 active:scale-[0.97]"
                    style={{ borderColor: "rgba(247,244,238,0.12)", color: "rgba(247,244,238,0.5)" }}
                  >
                    {t("learnMore")}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ ARTICLES ══════════════════════════════════ */}
      <section className="py-28 lg:py-36" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fade}><Tag>{t("qutbul-madar-articles")}</Tag></motion.div>
              <motion.h2 variants={fade} className="text-5xl font-bold tracking-tight" style={{ color: C.dark }}>
                Latest articles
              </motion.h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {articles.slice(0, 3).map((article, idx) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.09 }}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: C.white, border: `1px solid ${C.cream3}` }}
              >
                {/* Top gold band */}
                <div className="h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                     style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

                <div className="flex flex-col flex-1 p-7">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
                        style={{ color: C.gold }}>
                    <span className="w-3 h-px" style={{ background: C.gold }} />
                    Article {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`text-[15px] font-bold leading-snug mb-3 flex-1 ${isRtl ? "font-urdu-display" : ""}`}
                      style={{ color: C.dark }}>
                    {article.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-5 line-clamp-3" style={{ color: C.muted }}>
                    {article.description}
                  </p>
                  <Link
                    href={loc("/articles")}
                    className="inline-flex items-center gap-2 text-[13px] font-bold group/link"
                    style={{ color: C.green }}
                  >
                    <span className="group-hover/link:underline underline-offset-4">Read more</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 ${isRtl ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CTA ═══════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-grid" />
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px]"
             style={{ background: "rgba(201,168,76,0.06)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fade}><Tag light>Support the Shrine</Tag></motion.div>
              <motion.h2
                variants={fade}
                className="text-5xl sm:text-6xl font-bold leading-[1.05] mb-5 tracking-tight"
                style={{ color: C.cream }}
              >
                Preserve centuries of<br />
                <span className="text-gradient-gold">sacred heritage</span>
              </motion.h2>
              <motion.p variants={fade} className="text-[15px] leading-relaxed max-w-lg mb-6"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                Your donation helps maintain the Dargah and serves thousands of pilgrims
                who visit Makanpur Shareef each year.
              </motion.p>
              <motion.div variants={fade} className="flex items-center gap-2" style={{ color: C.gold }}>
                <Phone className="w-3.5 h-3.5" />
                <span className="text-sm font-medium" style={{ color: "rgba(201,168,76,0.7)" }}>00 – 91 – 9838360930</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 min-w-[200px]"
            >
              <Link
                href={loc("/donate")}
                className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                style={{ background: C.gold, color: C.dark }}
              >
                Donate Now
              </Link>
              <Link
                href={loc("/contact")}
                className="text-sm font-medium px-8 py-4 rounded-xl text-center border transition-all duration-200 active:scale-[0.97]"
                style={{ borderColor: "rgba(247,244,238,0.12)", color: "rgba(247,244,238,0.55)" }}
              >
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
