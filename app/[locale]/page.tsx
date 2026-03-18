"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronRight, ArrowDown, X, Phone, Star, ArrowUpRight } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";

const t1: Transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };
const fade = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };


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
        initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
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

const TICKER = [
  "Makanpur Shareef", "Est. 12th Century", "596 Years of Life",
  "800+ Years of Legacy", "Sacred Sufi Shrine", "Dargah of Qutbul Madar",
  "Uttar Pradesh, India", "Spiritual Heritage", "Madariya Silsila",
];
function Ticker() {
  return (
    <div className="w-full overflow-hidden py-3.5 relative z-10"
         style={{ background: "#0d2317", borderTop: `1px solid rgba(201,168,76,0.12)`, borderBottom: `1px solid rgba(201,168,76,0.12)` }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <Star className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "#c9a84c" }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase"
                  style={{ color: "rgba(201,168,76,0.65)" }}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const C = useC();
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const services = t.raw("services")  as Array<{ title: string }>;
  const articles = t.raw("articles")  as Array<{ title: string; description: string }>;
  const loc = (href: string) => `/${locale}${href}`;

  const servicesLinks = [
    "mazar-shareef-chadar-poshi", "langar-bhandara", "dargah-mannat",
    "special-dua", "full-ghilaf", "big-deg", "live-ziyarat",
  ];
  const serviceImages = [
    "/images/chadar-poshi.webp", "/images/image7.webp", "/images/image5.webp",
    "/images/image3.webp",       "/images/image4.webp", "/images/image6.webp",
    "/images/image8.webp",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.dark, color: C.text }}>

      {/* ══════════════════════════════ HERO — FULL SCREEN ═══════════════════ */}
      <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden">

        {/* Parallax BG */}
        <motion.div style={{ y: imgY }} className="absolute inset-[-15%] will-change-transform">
          <Image src="/images/qutbul-madar-main.webp" alt="" fill priority
                 className="object-cover object-center" sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(170deg, ${C.dark}e0 0%, ${C.dark}cc 40%, rgba(10,31,18,0.75) 100%)` }} />
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.25 }} />

        {/* Giant Arabic watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="text-[55vw] leading-none font-black"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(201,168,76,0.055)",
                  fontFamily: "var(--font-urdu-display, serif)",
                  lineHeight: 1,
                }}>
            قطب
          </span>
        </div>

        {/* Hero content — bottom-left anchored */}
        <div className="relative z-10 flex flex-col justify-end flex-1 max-w-7xl mx-auto w-full px-8 lg:px-16 pb-0">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">

            {/* Badge */}
            <motion.div variants={fade}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full"
              style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: C.gold }}>
                Makanpur Shareef · Est. 12th Century
              </span>
            </motion.div>

            {/* Arabic subtitle */}
            <motion.div variants={fade}
              className="text-4xl mb-4 leading-relaxed"
              style={{ color: "rgba(201,168,76,0.25)", fontFamily: "var(--font-urdu-display, serif)" }}>
              قطب المدار
            </motion.div>

            {/* Title — very large */}
            <motion.h1 variants={fade}
              className={`text-6xl sm:text-7xl lg:text-8xl xl:text-[96px] font-black leading-[0.92] tracking-tighter mb-8
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.onDark }}>
              {t("heroTitle")}
            </motion.h1>

            {/* Thin divider */}
            <motion.div variants={fade} className="w-24 h-px mb-8"
              style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

            <motion.p variants={fade} className="text-[15px] leading-relaxed mb-10 max-w-lg"
              style={{ color: "rgba(247,244,238,0.45)" }}>
              {t("introduction").slice(0, 140)}…
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap gap-4 mb-20">
              <Link href={loc("/history")}
                    className="inline-flex items-center gap-2.5 text-sm font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    style={{ background: C.gold, color: C.dark }}>
                {t("learnMore")} <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
              <Link href={loc("/image-gallery")}
                    className="inline-flex items-center gap-2.5 text-sm font-medium px-8 py-4 rounded-full border transition-all duration-300 hover:border-opacity-40"
                    style={{ borderColor: "rgba(247,244,238,0.2)", color: "rgba(247,244,238,0.6)" }}>
                View Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom glass stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          className="relative z-10 border-t"
          style={{ background: "rgba(10,31,18,0.6)", backdropFilter: "blur(16px)", borderColor: "rgba(201,168,76,0.12)" }}>
          <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-3 lg:grid-cols-6 divide-x"
               style={{ borderColor: "rgba(201,168,76,0.1)" }}>
            {[
              { num: "800+", label: "Years of Legacy" },
              { num: "596",  label: "Years of Life" },
              { num: "7",    label: "Services" },
              { num: "Daily",label: "Langar" },
              { num: "365",  label: "Days Open" },
              { num: "∞",    label: "Spiritual Reach" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center py-5 px-4 text-center"
                   style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                <span className="text-xl lg:text-2xl font-black animate-shimmer">{num}</span>
                <span className="text-[10px] mt-0.5 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-24 right-10 z-10 hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase rotate-90 mb-4" style={{ color: "rgba(201,168,76,0.35)" }}>Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" style={{ color: "rgba(201,168,76,0.35)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════ TICKER ════════════════════════════════════ */}
      <Ticker />

      {/* ══════════════════════════ EDITORIAL ABOUT ═══════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: C.cream }}>

        {/* BIG display number — bleeds off right edge */}
        <div className="absolute top-0 right-0 leading-none font-black select-none pointer-events-none"
             style={{
               fontSize: "clamp(200px, 35vw, 480px)",
               color: "transparent",
               WebkitTextStroke: "1px rgba(10,31,18,0.05)",
               lineHeight: 0.85,
               transform: "translateY(-10%)",
             }}>
          596
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-32 lg:py-44 relative z-10">
          <div className="grid lg:grid-cols-[1fr_500px] gap-20 items-start">

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {/* Small label */}
              <motion.div variants={fade} className="flex items-center gap-3 mb-10">
                <span className="w-10 h-px" style={{ background: C.gold }} />
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: C.gold }}>
                  Sacred Legacy
                </span>
              </motion.div>

              <motion.h2 variants={fade}
                className={`text-6xl sm:text-7xl font-black leading-[0.93] tracking-tight mb-10
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.ink }}>
                {t("heroTitle")}
              </motion.h2>

              <motion.p variants={fade} className="text-[16px] leading-[1.95] mb-8 max-w-lg"
                style={{ color: C.muted }}>
                {t("introduction")}
              </motion.p>

              {/* Pull quote */}
              <motion.div variants={fade}
                className="relative ps-8 py-6 mb-10"
                style={{ borderInlineStart: `2px solid ${C.gold}` }}>
                <div className="absolute top-0 start-5 text-6xl font-serif leading-none select-none"
                     style={{ color: "rgba(201,168,76,0.15)" }}>&quot;</div>
                <p className="text-[16px] font-semibold leading-[1.7] italic" style={{ color: C.ink }}>
                  It is extremely difficult to encompass the traits of a saintly life that spanned five hundred and ninety-six years.
                </p>
              </motion.div>

              <motion.div variants={fade}>
                <Link href={loc("/history")}
                      className="inline-flex items-center gap-2 text-sm font-bold group"
                      style={{ color: C.green }}>
                  <span className="group-hover:underline underline-offset-4">Read the full history</span>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — stacked images */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85 }}
              className="flex flex-col gap-3">

              <div className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-xl"
                   style={{ height: "400px" }}
                   onClick={() => setLightbox({ src: "/images/image3.webp", label: "Sajjada Nashin" })}>
                <Image src="/images/image3.webp" alt="Sajjada Nashin" fill
                       className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,18,0.8) 0%, transparent 55%)" }} />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase block mb-1" style={{ color: C.gold }}>Makanpur Shareef</span>
                    <span className="text-lg font-bold" style={{ color: C.onDark }}>Sajjada Nashin</span>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                       style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                    <ArrowUpRight className="w-4 h-4" style={{ color: C.gold }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: "/images/image8.webp", label: "Shrine Illuminated" },
                  { src: "/images/image1.webp", label: "Annual Urs Night" },
                ].map(({ src, label }) => (
                  <div key={src} className="relative overflow-hidden rounded-xl cursor-pointer group shadow-md"
                       style={{ height: "180px" }}
                       onClick={() => setLightbox({ src, label })}>
                    <Image src={src} alt={label} fill
                           className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,18,0.7) 0%, transparent 55%)" }} />
                    <span className="absolute bottom-3 left-3 text-xs font-semibold" style={{ color: C.onDark }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-bleed bottom image strip — touches both edges */}
        <div className="grid grid-cols-3" style={{ height: "220px" }}>
          {[
            { src: "/images/image2.webp", label: "Dargah Shareef" },
            { src: "/images/image5.webp", label: "Community Gathering" },
            { src: "/images/image6.webp", label: "Langar Preparation" },
          ].map(({ src, label }, i) => (
            <motion.div key={src}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => setLightbox({ src, label })}>
              <Image src={src} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: `linear-gradient(to top, ${C.dark}dd, transparent 50%)` }}>
                <span className="text-xs font-semibold" style={{ color: C.onDark }}>{label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ SERVICES — EDITORIAL LIST ═════════════════ */}
      <section className="relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.2 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(45,122,79,0.12), transparent 55%)" }} />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-0 relative z-10">
          <div className="flex items-end justify-between mb-20 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px" style={{ background: C.gold }} />
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: C.gold }}>
                  Dargah Services
                </span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight"
                  style={{ color: C.onDark }}>
                {t("qutbul-madar-services")}
              </h2>
            </div>
            <p className="text-[13px] max-w-xs" style={{ color: "rgba(247,244,238,0.3)" }}>
              Spiritual &amp; community services at Makanpur Shareef, available to all devotees year-round.
            </p>
          </div>
        </div>

        {/* Full-width service rows */}
        <div className="relative z-10">
          {services.map((el, idx) => (
            <motion.div key={el.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}>
              <Link
                href={loc(`/services/${servicesLinks[idx] || ""}`)}
                className="group relative flex items-center justify-between px-8 lg:px-16 py-7 overflow-hidden transition-all duration-300"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(201,168,76,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Hover bg image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-8 transition-opacity duration-500">
                  <Image src={serviceImages[idx] || "/images/image2.webp"} alt="" fill
                         className="object-cover" sizes="100vw" />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: "rgba(10,31,18,0.85)" }} />

                <div className="relative z-10 flex items-center gap-8 lg:gap-16 min-w-0">
                  <span className="text-[12px] font-black tabular-nums flex-shrink-0 w-8 text-center"
                        style={{ color: "rgba(201,168,76,0.35)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-xl lg:text-2xl xl:text-3xl font-bold transition-colors duration-300
                                    group-hover:text-cream truncate ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                        style={{ color: "rgba(247,244,238,0.55)" }}>
                    {el.title}
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-4 flex-shrink-0">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: C.gold }}>Explore</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                                   group-hover:scale-110"
                       style={{ borderColor: "rgba(201,168,76,0.2)", background: "transparent" }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.background = C.gold;
                         (e.currentTarget as HTMLElement).style.borderColor = C.gold;
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.background = "transparent";
                         (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
                       }}>
                    <ArrowUpRight className="w-4 h-4" style={{ color: C.gold }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
        </div>

        {/* Featured service image */}
        <div className="relative mt-20 overflow-hidden" style={{ height: "360px" }}>
          <Image src="/images/chadar-poshi.webp" alt="Chadar Poshi" fill
                 className="object-cover" sizes="100vw" />
          <div className="absolute inset-0"
               style={{ background: `linear-gradient(to right, ${C.dark}f0 0%, transparent 60%)` }} />
          <div className="absolute inset-0 flex items-center px-8 lg:px-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3" style={{ color: C.gold }}>
                — Featured: Sacred Tradition
              </span>
              <h3 className={`text-4xl lg:text-5xl font-black mb-5 leading-tight ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                  style={{ color: C.onDark }}>
                {t("madarTitle")}
              </h3>
              <Link href={loc("/services/mazar-shareef-chadar-poshi")}
                    className="inline-flex items-center gap-2.5 text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.97]"
                    style={{ background: C.gold, color: C.dark }}>
                {t("offerChadar")} <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ GALLERY — FULL BLEED ══════════════════════ */}
      <section style={{ background: C.dark }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-14">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fade} className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px" style={{ background: C.gold }} />
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: C.gold }}>Visual Archive</span>
              </motion.div>
              <motion.h2 variants={fade} className="text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight"
                         style={{ color: C.onDark }}>
                {t("image-gallery")}
              </motion.h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link href={loc("/image-gallery")}
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full border transition-all duration-200"
                    style={{ borderColor: "rgba(201,168,76,0.25)", color: C.gold }}>
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Gallery mosaic — full bleed, no horizontal padding */}
        <div className="flex gap-1" style={{ height: "520px" }}>

          {/* Left tall panel */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative flex-[2] overflow-hidden cursor-pointer group"
            onClick={() => setLightbox({ src: "/images/image1.webp", label: "Annual Urs Night" })}>
            <Image src="/images/image1.webp" alt="Annual Urs Night" fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="40vw" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8"
                 style={{ background: `linear-gradient(to top, ${C.dark}ee, transparent 50%)` }}>
              <div>
                <p className="text-base font-bold" style={{ color: C.onDark }}>Annual Urs Night</p>
                <p className="text-[11px] mt-1" style={{ color: C.gold }}>Click to enlarge ↗</p>
              </div>
            </div>
          </motion.div>

          {/* Middle column — 2 stacked */}
          <div className="flex flex-col gap-1 flex-[1.2]">
            {[
              { src: "/images/image2.webp", label: "Dargah Shareef" },
              { src: "/images/image8.webp", label: "Shrine Illuminated" },
            ].map(({ src, label }, i) => (
              <motion.div key={src}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
                className="relative flex-1 overflow-hidden cursor-pointer group"
                onClick={() => setLightbox({ src, label })}>
                <Image src={src} alt={label} fill
                       className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                     style={{ background: `linear-gradient(to top, ${C.dark}ee, transparent 50%)` }}>
                  <p className="text-xs font-bold" style={{ color: C.onDark }}>{label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right tall panel */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex-[1.5] overflow-hidden cursor-pointer group"
            onClick={() => setLightbox({ src: "/images/image5.webp", label: "Community Gathering" })}>
            <Image src="/images/image5.webp" alt="Community Gathering" fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="30vw" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8"
                 style={{ background: `linear-gradient(to top, ${C.dark}ee, transparent 50%)` }}>
              <div>
                <p className="text-base font-bold" style={{ color: C.onDark }}>Community Gathering</p>
                <p className="text-[11px] mt-1" style={{ color: C.gold }}>Click to enlarge ↗</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════ ARTICLES — MAGAZINE ═══════════════════════ */}
      <section className="py-32 lg:py-44" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">

          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fade} className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px" style={{ background: C.gold }} />
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: C.gold }}>
                  {t("qutbul-madar-articles")}
                </span>
              </motion.div>
              <motion.h2 variants={fade} className="text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight"
                         style={{ color: C.ink }}>
                Latest articles
              </motion.h2>
            </motion.div>
          </div>

          {/* Magazine layout */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-5 items-stretch">

            {/* Featured large */}
            {articles[0] && (
              <motion.div
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: C.white, border: `1px solid ${C.cream3}` }}>
                <div className="h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                     style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                <div className="relative overflow-hidden" style={{ height: "280px" }}>
                  <Image src="/images/image5.webp" alt="" fill
                         className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="60vw" />
                  <div className="absolute inset-0"
                       style={{ background: `linear-gradient(to top, ${C.white}ee, transparent 60%)` }} />
                </div>
                <div className="p-8 lg:p-10">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase mb-4"
                        style={{ color: C.gold }}>
                    <span className="w-3 h-px" style={{ background: C.gold }} />
                    Article 01 · Featured
                  </span>
                  <h3 className={`text-2xl lg:text-3xl font-bold leading-snug mb-4 ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                      style={{ color: C.ink }}>
                    {articles[0].title}
                  </h3>
                  <p className="text-[14px] leading-relaxed mb-6" style={{ color: C.muted }}>
                    {articles[0].description}
                  </p>
                  <Link href={loc("/articles")}
                        className="inline-flex items-center gap-2 text-sm font-bold group/link"
                        style={{ color: C.green }}>
                    <span className="group-hover/link:underline underline-offset-4">Read full article</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 ${isRtl ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Sidebar articles */}
            <div className="flex flex-col gap-4">
              {articles.slice(1, 3).map((article, idx) => (
                <motion.div key={article.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group flex-1 flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: C.white, border: `1px solid ${C.cream3}` }}>
                  <div className="h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                       style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                  <div className="flex flex-col flex-1 p-6">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
                          style={{ color: C.gold }}>
                      <span className="w-3 h-px" style={{ background: C.gold }} />
                      Article {String(idx + 2).padStart(2, "0")}
                    </span>
                    <h3 className={`text-[15px] font-bold leading-snug mb-3 flex-1 ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                        style={{ color: C.ink }}>
                      {article.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: C.muted }}>
                      {article.description}
                    </p>
                    <Link href={loc("/articles")}
                          className="inline-flex items-center gap-2 text-[13px] font-bold group/link"
                          style={{ color: C.green }}>
                      <span className="group-hover/link:underline underline-offset-4">Read more</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 ${isRtl ? "rotate-180" : ""}`} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════ CTA — DRAMATIC ════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.2 }} />

        {/* Full-bleed background image with heavy overlay */}
        <div className="absolute inset-0">
          <Image src="/images/image2.webp" alt="" fill className="object-cover opacity-20" sizes="100vw" />
        </div>
        <div className="absolute inset-0"
             style={{ background: `linear-gradient(to bottom, ${C.dark}f5, ${C.dark}dd)` }} />

        {/* Giant background text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden select-none pointer-events-none leading-none"
             style={{ fontSize: "clamp(80px, 18vw, 260px)" }}>
          <span className="font-black block"
                style={{ color: "transparent", WebkitTextStroke: "1px rgba(201,168,76,0.04)", lineHeight: 0.85 }}>
            Heritage
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-44 lg:py-56">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl">
            <motion.div variants={fade} className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px" style={{ background: C.gold }} />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: C.gold }}>Support the Shrine</span>
            </motion.div>

            <motion.h2 variants={fade}
              className="font-black leading-[0.88] tracking-tighter mb-10"
              style={{ fontSize: "clamp(56px, 9vw, 120px)", color: C.onDark }}>
              Preserve<br />
              <span className="text-gradient-gold">Sacred</span><br />
              Heritage
            </motion.h2>

            <motion.p variants={fade} className="text-[16px] leading-relaxed max-w-md mb-5"
                      style={{ color: "rgba(247,244,238,0.4)" }}>
              Your support helps maintain the Dargah and serves thousands of pilgrims who visit Makanpur Shareef each year.
            </motion.p>

            <motion.div variants={fade} className="flex items-center gap-2.5 mb-12">
              <Phone className="w-3.5 h-3.5" style={{ color: "rgba(201,168,76,0.5)" }} />
              <span className="text-sm font-medium" style={{ color: "rgba(201,168,76,0.6)" }}>
                00 – 91 – 9838360930
              </span>
            </motion.div>

            <motion.div variants={fade} className="flex flex-wrap gap-4">
              <Link href={loc("/donate")}
                    className="text-sm font-bold px-10 py-4 rounded-full text-center transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
                    style={{ background: C.gold, color: C.dark }}>
                Donate Now
              </Link>
              <Link href={loc("/contact")}
                    className="text-sm font-medium px-10 py-4 rounded-full text-center border transition-all duration-300"
                    style={{ borderColor: "rgba(247,244,238,0.15)", color: "rgba(247,244,238,0.5)" }}>
                Contact us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
