"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowDown, X, Phone } from "lucide-react";

// ─── animation ────────────────────────────────────────────────────────────────
const t1: Transition = { duration: 0.55, ease: "easeOut" };

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: t1 },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// ─── theme tokens ─────────────────────────────────────────────────────────────
const C = {
  dark:  "#0f2419",
  mid:   "#2d7a4f",
  light: "#4aa06a",
  gold:  "#c9a84c",
  cream: "#f7f4ee",
  cream2:"#ede9e0",
  cream3:"#e0d8c8",
  text:  "#2a2a1e",
  muted: "#6b7c6e",
  white: "#ffffff",
};

// ─── lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  src,
  label,
  onClose,
}: {
  src: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/20
                   flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <motion.div
        initial={{ scale: 0.93 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.28 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={label} fill className="object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <p className="text-white text-sm font-medium">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── section label component ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-5 h-px" style={{ background: C.gold }} />
      <span
        className="text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: C.gold }}
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
  const [lightbox, setLightbox] = useState<{
    src: string;
    label: string;
  } | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const sections = t.raw("sections") as Array<{
    title: string;
    description: string;
  }>;
  const services = t.raw("services") as Array<{ title: string }>;
  const articles = t.raw("articles") as Array<{
    title: string;
    description: string;
  }>;
  const loc = (href: string) => `/${locale}${href}`;
  const servicesLinks = [
    "mazar-shareef-chadar-poshi",
    "langar-bhandara",
    "dargah-mannat",
    "special-dua",
    "full-ghilaf",
    "big-deg",
    "live-ziyarat",
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: C.cream, color: C.text }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden"
      >
        {/* LEFT — dark green panel */}
        <div
          className="relative flex flex-col justify-end p-8 lg:p-16 min-h-[60vh] lg:min-h-screen"
          style={{ background: C.dark }}
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/images/image2.webp"
              alt="Dargah"
              fill
              priority
              className="object-cover object-center opacity-20"
              sizes="50vw"
            />
          </motion.div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #2d7a4f 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, #2d7a4f 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px" style={{ background: C.gold }} />
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ color: C.gold }}
              >
                Makanpur Shareef · Est. 12th Century
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl mb-4 opacity-20 font-serif"
              style={{
                color: C.cream,
                fontFamily: "var(--font-urdu-display, serif)",
              }}
            >
              قطب المدار
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]
                          tracking-tight mb-6
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.cream }}
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-[15px] leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(247,244,238,0.55)" }}
            >
              {t("introduction").slice(0, 160)}…
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link
                href={loc("/history")}
                className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg
                           transition-all duration-200 active:scale-[0.98]"
                style={{ background: C.cream, color: C.dark }}
              >
                {t("learnMore")}
                <ChevronRight
                  className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                />
              </Link>
              <Link
                href={loc("/image-gallery")}
                className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3.5 rounded-lg
                           border transition-all duration-200 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(247,244,238,0.2)",
                  color: "rgba(247,244,238,0.75)",
                }}
              >
                View Gallery
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-8 pt-8"
              style={{ borderTop: "1px solid rgba(247,244,238,0.1)" }}
            >
              {[
                { num: "800+", label: "Years of legacy" },
                { num: "596", label: "Years of life" },
                { num: "4", label: "Languages" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: C.gold }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(247,244,238,0.45)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
            style={{ color: "rgba(247,244,238,0.25)" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* RIGHT — medium green panel */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-16"
          style={{ background: C.mid }}
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/images/image8.webp"
              alt="Annual Urs"
              fill
              className="object-cover object-center opacity-30"
              sizes="50vw"
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${C.mid}99, ${C.dark}dd)`,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-auto"
          >
            <div
              className="text-5xl mb-4 leading-none"
              style={{ color: "rgba(247,244,238,0.15)" }}
            >
              "
            </div>
            <blockquote
              className="text-xl font-light leading-relaxed italic mb-4"
              style={{ color: "rgba(247,244,238,0.85)" }}
            >
              A radiant sun in the realm of Wilayat whose light illuminated
              hearts across Asia and Europe.
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: C.cream3 }} />
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(247,244,238,0.45)" }}
              >
                From the biography of Hazrat Qutbul Madar
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ INTRO ══════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={fade}>
                <SectionLabel>{t("introTitle")}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fade}
                className={`text-4xl sm:text-5xl font-bold leading-[1.12] mb-6
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.dark }}
              >
                {t("heroTitle")}
              </motion.h2>
              <motion.div
                variants={fade}
                className="w-14 h-1 rounded-full mb-7"
                style={{ background: C.mid }}
              />
              <motion.p
                variants={fade}
                className="text-[15px] leading-[1.9] mb-8"
                style={{ color: C.muted }}
              >
                {t("introduction")}
              </motion.p>
              <motion.blockquote
                variants={fade}
                className="border-s-2 ps-5 mb-8 py-1"
                style={{ borderColor: C.mid }}
              >
                <p
                  className="text-base font-medium italic leading-relaxed"
                  style={{ color: C.dark }}
                >
                  "It is extremely difficult to encompass the traits of a
                  saintly life that spanned five hundred and ninety-six years."
                </p>
              </motion.blockquote>
              <motion.div variants={fade}>
                <Link
                  href={loc("/history")}
                  className="inline-flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all duration-200"
                  style={{ color: C.mid }}
                >
                  Read full history
                  <ChevronRight
                    className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                  />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-3"
            >
              <div
                className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() =>
                  setLightbox({
                    src: "/images/image3.webp",
                    label: "Sajjada Nashin",
                  })
                }
              >
                <Image
                  src="/images/image3.webp"
                  alt="Sajjada Nashin"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end p-5"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,61,43,0.75), transparent)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: C.cream }}
                  >
                    Sajjada Nashin
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: "/images/image8.webp", label: "Shrine illuminated" },
                  { src: "/images/image1.webp", label: "Chadar Poshi" },
                ].map(({ src, label }) => (
                  <div
                    key={src}
                    className="relative h-40 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setLightbox({ src, label })}
                  >
                    <Image
                      src={src}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 flex items-end p-3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(26,61,43,0.75), transparent)",
                      }}
                    >
                      <span
                        className="text-xs font-medium"
                        style={{ color: C.cream }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FEATURES ════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.dark }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
          >
            <motion.div
              variants={fade}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-5 h-px" style={{ background: C.gold }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.gold }}
              >
                {t("key-features")}
              </span>
            </motion.div>
            <motion.h2
              variants={fade}
              className="text-4xl sm:text-5xl font-bold leading-[1.1]"
              style={{ color: C.cream }}
            >
              What you&apos;ll find here
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((el, idx) => (
              <motion.div
                key={el.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="rounded-2xl p-7 border group transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "rgba(247,244,238,0.04)",
                  borderColor: "rgba(247,244,238,0.08)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: "rgba(45,122,79,0.12)" }}
                />
                <div className="relative z-10">
                  <span
                    className="text-xs font-bold tabular-nums mb-5 block"
                    style={{ color: C.light }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full mb-5 transition-transform duration-300 group-hover:scale-125"
                    style={{ background: C.mid }}
                  />
                  <h3
                    className={`text-[15px] font-bold mb-3 leading-snug
                                  ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                    style={{ color: C.cream }}
                  >
                    {el.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(247,244,238,0.45)" }}
                  >
                    {el.description}
                  </p>
                </div>
                <div
                  className="absolute bottom-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100
                                transition-transform duration-300"
                  style={{ background: C.mid }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ SERVICES ═══════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <SectionLabel>Dargah services</SectionLabel>
              <h2
                className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-5"
                style={{ color: C.dark }}
              >
                {t("qutbul-madar-services")}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                Spiritual and community services available at Makanpur Shareef
                year-round.
              </p>
              <div
                className="relative h-48 rounded-2xl overflow-hidden mt-8 cursor-pointer group"
                onClick={() =>
                  setLightbox({
                    src: "/images/image2.webp",
                    label: "Dargah Shareef",
                  })
                }
              >
                <Image
                  src="/images/image2.webp"
                  alt="Dargah"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <div
              className="flex flex-col"
              style={{ borderTop: `1px solid ${C.cream3}` }}
            >
              {services.map((el, idx) => (
                <motion.div
                  key={el.title}
                  initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link
                    href={loc(`/services/${servicesLinks[idx] || ""}`)}
                    className="flex items-center justify-between gap-4 py-5 group
                               transition-all duration-200 hover:ps-2"
                    style={{ borderBottom: `1px solid ${C.cream3}` }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs font-bold tabular-nums w-6"
                        style={{ color: C.mid }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[15px] font-semibold transition-colors duration-200
                                       ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                        style={{ color: C.dark }}
                      >
                        {el.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 flex-shrink-0 transition-colors duration-200
                                  group-hover:text-[#2d7a4f] ${isRtl ? "rotate-180" : ""}`}
                      style={{ color: C.cream3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ GALLERY ═════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fade}>
                <SectionLabel>Visual archive</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fade}
                className="text-4xl sm:text-5xl font-bold"
                style={{ color: C.dark }}
              >
                {t("image-gallery")}
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href={loc("/image-gallery")}
                className="text-sm font-bold inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
                style={{ color: C.mid }}
              >
                View all
                <ChevronRight
                  className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[200px]">
            {[
              {
                src: "/images/image1.webp",
                label: "Annual Urs night",
                cls: "row-span-2",
              },
              { src: "/images/image2.webp", label: "Dargah Shareef", cls: "" },
              {
                src: "/images/image8.webp",
                label: "Shrine illuminated",
                cls: "",
              },
              {
                src: "/images/image5.webp",
                label: "Community gathering",
                cls: "",
              },
              { src: "/images/image6.webp", label: "Devotees", cls: "" },
            ].map(({ src, label, cls }, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                onClick={() => setLightbox({ src, label })}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${cls}`}
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300 flex items-end p-5"
                  style={{
                    background: `linear-gradient(to top, ${C.dark}cc, transparent)`,
                  }}
                >
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: C.cream }}
                    >
                      {label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: C.light }}>
                      Click to enlarge
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════ CHADAR POSHI ══════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div
            className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
            style={{ boxShadow: `0 24px 64px rgba(26,61,43,0.15)` }}
          >
            <div
              className="relative min-h-[400px] cursor-pointer group"
              onClick={() =>
                setLightbox({
                  src: "/images/image1.webp",
                  label: "Chadar Poshi",
                })
              }
            >
              <Image
                src="/images/image1.webp"
                alt="Chadar Poshi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, transparent, ${C.dark}33)`,
                }}
              />
            </div>
            <div
              className="flex flex-col justify-center p-10 lg:p-14"
              style={{ background: C.dark }}
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={fade}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="w-5 h-px" style={{ background: C.gold }} />
                  <span
                    className="text-[10px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: C.gold }}
                  >
                    Sacred tradition
                  </span>
                </motion.div>
                <motion.h2
                  variants={fade}
                  className={`text-3xl sm:text-4xl font-bold leading-[1.15] mb-2
                              ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                  style={{ color: C.cream }}
                >
                  {t("madarTitle")}
                </motion.h2>
                <motion.p
                  variants={fade}
                  className="text-sm font-medium mb-6"
                  style={{ color: C.light }}
                >
                  {t("madarSubtitle")}
                </motion.p>
                <motion.div
                  variants={fade}
                  className="w-10 h-0.5 rounded-full mb-7"
                  style={{ background: C.mid }}
                />
                <motion.p
                  variants={fade}
                  className="text-[14px] leading-[1.85] mb-8"
                  style={{ color: "rgba(247,244,238,0.55)" }}
                >
                  {t("madarShareefChadarPoshi").split("\n\n")[0]}
                </motion.p>
                <motion.div variants={fade} className="flex flex-wrap gap-3">
                  <Link
                    href={loc("/madar-shareef")}
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl
                               transition-all duration-200 active:scale-[0.98]"
                    style={{ background: C.mid, color: C.cream }}
                  >
                    {t("offerChadar")}
                    <ChevronRight
                      className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                    />
                  </Link>
                  <Link
                    href={loc("/contact")}
                    className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl
                               border transition-all duration-200 active:scale-[0.98]"
                    style={{
                      borderColor: "rgba(247,244,238,0.15)",
                      color: "rgba(247,244,238,0.6)",
                    }}
                  >
                    {t("learnMore")}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════ ARTICLES ══════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fade}>
                <SectionLabel>{t("qutbul-madar-articles")}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fade}
                className="text-4xl sm:text-5xl font-bold"
                style={{ color: C.dark }}
              >
                Latest articles
              </motion.h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {articles.slice(0, 3).map((article, idx) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-2xl p-7 border group hover:border-transparent
                           transition-all duration-300 flex flex-col"
                style={{ background: C.white, borderColor: C.cream3 }}
              >
                <span
                  className="text-xs font-bold tabular-nums mb-4 block"
                  style={{ color: C.mid }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`text-[15px] font-bold leading-snug mb-3 flex-1
                                ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                  style={{ color: C.dark }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5 line-clamp-3"
                  style={{ color: C.muted }}
                >
                  {article.description}
                </p>
                <Link
                  href={loc("/articles")}
                  className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all duration-200"
                  style={{ color: C.mid }}
                >
                  Read more
                  <ChevronRight
                    className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ════════════════════════════════ */}
      <section className="py-24" style={{ background: C.mid }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fade} className="flex items-center gap-2 mb-4">
                <span className="w-5 h-px" style={{ background: C.gold }} />
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase"
                   style={{ color: C.gold }}>
                  Support the shrine
                </p>
              </motion.div>
              <motion.h2
                variants={fade}
                className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-4"
                style={{ color: C.cream }}
              >
                Preserve centuries of
                <br />
                sacred heritage
              </motion.h2>
              <motion.p
                variants={fade}
                className="text-[15px] leading-relaxed max-w-lg mb-6"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                Your donation helps maintain the Dargah and serves thousands of
                pilgrims who visit Makanpur Shareef each year.
              </motion.p>
              <motion.div
                variants={fade}
                className="flex items-center gap-2 text-sm"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>00 – 91 – 9838360930</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-3 min-w-[200px]"
            >
              <Link
                href={loc("/donate")}
                className="text-sm font-bold px-8 py-4 rounded-xl text-center
                           transition-all duration-200 active:scale-[0.98]"
                style={{ background: C.cream, color: C.dark }}
              >
                Donate now
              </Link>
              <Link
                href={loc("/contact")}
                className="text-sm font-medium px-8 py-4 rounded-xl text-center border
                           transition-all duration-200 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(247,244,238,0.2)",
                  color: "rgba(247,244,238,0.7)",
                }}
              >
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
