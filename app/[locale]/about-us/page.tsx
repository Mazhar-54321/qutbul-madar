"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, CalendarDays } from "lucide-react";

// ─── theme ────────────────────────────────────────────────────────────────────
const C = {
  dark: "#1a3d2b",
  mid: "#2d7a4f",
  light: "#4aa06a",
  cream: "#f7f4ee",
  cream2: "#ede9e0",
  cream3: "#e0d8c8",
  muted: "#6b7c6e",
  text: "#2a2a1e",
  white: "#ffffff",
};

// ─── animation ────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// ─── section label ────────────────────────────────────────────────────────────
function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-5 h-px" style={{ background: light ? C.light : C.mid }} />
      <span
        className="text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: light ? C.light : C.mid }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── director card ────────────────────────────────────────────────────────────
function DirectorCard({
  imgSrc,
  name,
  title,
  idx,
  isRtl,
}: {
  imgSrc: string;
  name: string;
  title: string;
  idx: number;
  isRtl: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
      style={{ background: C.white, borderColor: C.cream3 }}
    >
      {/* Photo */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${C.dark}cc 0%, transparent 55%)`,
          }}
        />
        {/* Index badge */}
        <span
          className="absolute top-4 start-4 text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: C.mid, color: C.cream }}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-1 flex-1">
        <div className="w-8 h-0.5 rounded-full mb-3" style={{ background: C.mid }} />
        <h3
          className={`text-[15px] font-bold leading-snug mb-1
                      ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
          style={{ color: C.dark }}
        >
          {name}
        </h3>
        <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: C.muted }}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function AboutUsPage() {
  const t = useTranslations("aboutUs");
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const directors = t.raw("directors") as Array<{ name: string; title: string }>;

  const directorImages = [
    "/images/director-1.jpg",
    "/images/director-2.jpg",
    "/images/director-3.jpg",
  ];

  return (
    <main
      className="min-h-screen"
      style={{ background: C.cream, color: C.text }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════ HERO ══════════════════════════════ */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.light} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Portrait strip — right side on desktop */}
        <div className="absolute inset-y-0 end-0 w-2/5 hidden lg:block">
          <Image
            src="/images/qutbul-madar-portrait.jpg"
            alt="Hazrat Qutbul Madar"
            fill
            className="object-cover object-top opacity-25"
            sizes="40vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: isRtl
                ? `linear-gradient(to left, transparent, ${C.dark})`
                : `linear-gradient(to right, transparent, ${C.dark})`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-28">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <Link
              href={loc("/")}
              className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200"
              style={{ color: "rgba(247,244,238,0.45)" }}
            >
              {isRtl ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
              Back to home
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel light>Khanqahe Madariya · Makanpur Shareef</SectionLabel>
            </motion.div>

            {/* Arabic calligraphy accent */}
            <motion.div
              variants={fadeUp}
              className="text-3xl mb-3 opacity-15 font-serif"
              style={{ color: C.cream, fontFamily: "var(--font-urdu-display, serif)" }}
            >
              قطب المدار
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]
                          mb-4 tracking-tight
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.cream }}
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg font-medium mb-8"
              style={{ color: C.light }}
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="w-14 h-0.5 rounded-full mb-8"
              style={{ background: C.mid }}
            />

            {/* Welcome quote */}
            <motion.blockquote
              variants={fadeUp}
              className="border-s-2 ps-5 py-1 mb-6"
              style={{ borderColor: C.mid }}
            >
              <p
                className={`text-[15px] italic leading-[1.85] font-medium
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: "rgba(247,244,238,0.7)" }}
              >
                &ldquo;{t("welcomeQuote")}&rdquo;
              </p>
            </motion.blockquote>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-8 mt-10 pt-10"
              style={{ borderTop: "1px solid rgba(247,244,238,0.1)" }}
            >
              {[
                { num: "596", label: "Years of life" },
                { num: "800+", label: "Years of legacy" },
                { num: "3", label: "Directors" },
                { num: "17th", label: "Hijri — Monthly Jalsa" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold tabular-nums" style={{ color: C.light }}>
                    {num}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(247,244,238,0.35)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ WELCOME SECTION ═══════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Our story</SectionLabel>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className={`text-4xl sm:text-5xl font-bold leading-[1.12] mb-6
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.dark }}
              >
                {t("welcomeTitle")}
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="w-14 h-1 rounded-full mb-7"
                style={{ background: C.mid }}
              />

              <motion.blockquote
                variants={fadeUp}
                className="border-s-2 ps-5 mb-7 py-1"
                style={{ borderColor: C.mid }}
              >
                <p
                  className={`text-base font-semibold italic leading-relaxed
                              ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                  style={{ color: C.dark }}
                >
                  &ldquo;{t("welcomeQuote")}&rdquo;
                </p>
              </motion.blockquote>

              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-[1.9] mb-8"
                style={{ color: C.muted }}
              >
                {t("welcomeText")}
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link
                  href={loc("/history")}
                  className="inline-flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all duration-200"
                  style={{ color: C.mid }}
                >
                  Read full history
                  <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Portrait image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div
                className="relative h-[480px] rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 20px 60px rgba(26,61,43,0.18)` }}
              >
                <Image
                  src="/images/qutbul-madar-portrait.jpg"
                  alt="Hazrat Qutbul Madar"
                  fill
                  className="object-cover object-top"
                  sizes="420px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${C.dark}99 0%, transparent 50%)`,
                  }}
                />
                <div className="absolute bottom-5 start-5 end-5">
                  <p className="text-sm font-semibold" style={{ color: C.cream }}>
                    Hazrat Syed Badiuddin Ahmad
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: C.light }}>
                    Zinda Shah Madar · Qutbul Madar
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                className="absolute -bottom-3 -end-3 w-24 h-24 rounded-2xl -z-10"
                style={{ background: C.cream3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ BOARD HEADER ══════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: C.dark }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel light>Leadership</SectionLabel>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className={`text-4xl sm:text-5xl font-bold leading-[1.1] mb-6
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.cream }}
              >
                {t("boardTitle")}
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="w-14 h-0.5 rounded-full mb-7"
                style={{ background: C.mid }}
              />

              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-[1.9]"
                style={{ color: "rgba(247,244,238,0.6)" }}
              >
                {t("boardDesc")}
              </motion.p>
            </motion.div>

            {/* Jalsa info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="rounded-2xl p-8 border"
              style={{
                background: "rgba(247,244,238,0.04)",
                borderColor: "rgba(247,244,238,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: C.mid }}
              >
                <CalendarDays className="w-5 h-5" style={{ color: C.cream }} />
              </div>
              <p
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
                style={{ color: C.light }}
              >
                {t("jalsaLabel")}
              </p>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.cream }}
              >
                17th of every Hijri month
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(247,244,238,0.5)" }}>
                {t("jalsaText")}
              </p>

              <div
                className="mt-6 pt-6 flex items-center gap-3"
                style={{ borderTop: "1px solid rgba(247,244,238,0.08)" }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: C.light }} />
                <span className="text-sm" style={{ color: "rgba(247,244,238,0.55)" }}>
                  00 – 91 – 9838360930
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ DIRECTOR CARDS ════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Meet the team</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: C.dark }}
            >
              Our Directors
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {directors.map((director, idx) => (
              <DirectorCard
                key={idx}
                imgSrc={directorImages[idx]}
                name={director.name}
                title={director.title}
                idx={idx}
                isRtl={isRtl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ════════════════════════════ */}
      <section className="py-24" style={{ background: C.mid }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4"
                style={{ color: "rgba(247,244,238,0.5)" }}
              >
                Get involved
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-4"
                style={{ color: C.cream }}
              >
                Connect with us
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-relaxed max-w-lg mb-6"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                {t("contactCta")} — reach out to the directors or visit Makanpur Shareef
                to experience the spiritual legacy of Hazrat Qutbul Madar.
              </motion.p>
              <motion.div
                variants={fadeUp}
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
                href={loc("/contact")}
                className="text-sm font-bold px-8 py-4 rounded-xl text-center
                           transition-all duration-200 active:scale-[0.98]"
                style={{ background: C.cream, color: C.dark }}
              >
                Contact Us
              </Link>
              <Link
                href={loc("/donate")}
                className="text-sm font-medium px-8 py-4 rounded-xl text-center border
                           transition-all duration-200 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(247,244,238,0.2)",
                  color: "rgba(247,244,238,0.7)",
                }}
              >
                Donate
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
