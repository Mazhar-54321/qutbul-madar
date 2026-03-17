"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── theme ────────────────────────────────────────────────────────────────────
const C = {
  dark:    "#0a1f12",
  mid:     "#1a3d2b",
  green:   "#2d7a4f",
  light:   "#4aa06a",
  gold:    "#c9a84c",
  goldHi:  "#e8c96b",
  goldDim: "rgba(201,168,76,0.10)",
  cream:   "#f7f4ee",
  cream2:  "#ede9e0",
  cream3:  "#e0d8c8",
  muted:   "#6b7c6e",
  text:    "#1a1a12",
};

// ─── animation ────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

// ─── tag ──────────────────────────────────────────────────────────────────────
function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: C.gold }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? C.goldHi : C.gold }}>
        {children}
      </span>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const t = useTranslations("history");
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  interface Section {
    key: string;
    title: string;
    content: string | { fatherSide?: string; motherSide?: string };
    year?: string;
  }

  const sections: Section[] = [
    {
      key: "identity",
      title: t("identity.title"),
      year: "242 AH",
      content: `${t("identity.birthName")} — ${t("identity.titles")}\n\n${t("identity.amongSufis")}`,
    },
    { key: "birth",      title: t("birth.title"),             year: "242 AH", content: t("birth.content") },
    { key: "dreams",     title: t("dreamsBeforeBirth.title"),  content: t("dreamsBeforeBirth.content") },
    { key: "miracles",   title: t("miraclesAtBirth.title"),    content: t("miraclesAtBirth.content") },
    {
      key: "genealogy",
      title: t("genealogy.title"),
      content: { fatherSide: t("genealogy.fatherSide"), motherSide: t("genealogy.motherSide") },
    },
    { key: "education",  title: t("education.title"),          content: t("education.content") },
    { key: "spiritual",  title: t("spiritualTraining.title"),  content: t("spiritualTraining.content") },
    { key: "prophet",    title: t("meetingProphet.title"),     content: t("meetingProphet.content") },
    { key: "mission",    title: t("missionToIndia.title"),     content: t("missionToIndia.content") },
    { key: "journey",    title: t("journeyToIndia.title"),     content: t("journeyToIndia.content") },
    { key: "arrival",    title: t("arrivalKhambat.title"),     year: "282 AH", content: t("arrivalKhambat.content") },
    { key: "maqam",      title: t("maqam.title"),              content: t("maqam.content") },
  ];

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* ══════════════════════════ HERO ══════════════════════════════ */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        {/* Gold dot pattern */}
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.4 }} />

        {/* Radial green glow */}
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(45,122,79,0.18), transparent 60%)" }} />

        {/* Large Arabic watermark */}
        <div className="absolute inset-y-0 end-0 w-1/2 hidden lg:flex items-center justify-center select-none pointer-events-none">
          <span className="text-[260px] leading-none font-bold opacity-[0.03]"
                style={{ color: C.cream, fontFamily: "var(--font-urdu-display, serif)" }}>
            قطب
          </span>
        </div>

        {/* Image strip */}
        <div className="absolute inset-y-0 end-0 w-2/5 hidden lg:block">
          <Image src="/images/image2.webp" alt="Dargah Shareef" fill
                 className="object-cover opacity-[0.12]" sizes="40vw" />
          <div className="absolute inset-0"
               style={{ background: isRtl
                 ? `linear-gradient(to left, transparent, ${C.dark})`
                 : `linear-gradient(to right, transparent, ${C.dark})` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-32">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-12">
            <Link href={loc("/")}
                  className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200
                             hover:opacity-100"
                  style={{ color: "rgba(247,244,238,0.35)" }}>
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              Back to home
            </Link>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={fadeUp}><Tag light>Sacred biography</Tag></motion.div>

            {/* Gold top bar */}
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

            <motion.h1
              variants={fadeUp}
              className={`text-4xl sm:text-5xl lg:text-[68px] font-bold leading-[1.0]
                          mb-5 tracking-tight
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.cream }}
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              {t("heroSubtitle")}
            </motion.p>

            <motion.div variants={fadeUp} className="ps-5 py-2 mb-8"
                        style={{ borderInlineStart: `2px solid ${C.gold}` }}>
              <p className="text-[15px] italic leading-[1.9] font-medium"
                 style={{ color: "rgba(247,244,238,0.65)" }}>
                {t("introduction.p1")}
              </p>
            </motion.div>

            <motion.p variants={fadeUp} className="text-[14px] leading-[1.9] mb-10"
                      style={{ color: "rgba(247,244,238,0.45)" }}>
              {t("introduction.p2")}
            </motion.p>

            {/* Gold stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-10 pt-10"
                        style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
              {[
                { num: "596", label: "Years of life" },
                { num: "242", label: "Birth year (AH)" },
                { num: "12",  label: "Biography sections" },
                { num: "1417",label: "Year of passing (AD)" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black tabular-nums animate-shimmer">{num}</p>
                  <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TIMELINE BODY ════════════════════════ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-20 items-start">

            {/* ── Sticky left index ── */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5"
                 style={{ color: C.gold }}>
                Contents
              </p>
              <nav className="flex flex-col gap-0.5">
                {sections.map((s, idx) => (
                  <a key={s.key} href={`#section-${s.key}`}
                     className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition-all duration-150 group"
                     style={{ color: C.muted }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = "rgba(201,168,76,0.07)";
                       e.currentTarget.style.color = C.dark;
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = "transparent";
                       e.currentTarget.style.color = C.muted;
                     }}>
                    <span className="text-[10px] font-black tabular-nums w-5 flex-shrink-0"
                          style={{ color: C.gold }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-[13px]">{s.title}</span>
                  </a>
                ))}
              </nav>

              {/* Sidebar image */}
              <div className="mt-8 rounded-2xl overflow-hidden relative h-52"
                   style={{ border: `1px solid rgba(201,168,76,0.15)` }}>
                <Image src="/images/image10.webp" alt="Annual Urs" fill className="object-cover" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to top, ${C.dark}cc, transparent)` }} />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <p className="text-xs font-medium" style={{ color: C.cream }}>Annual Urs night</p>
                  <span className="w-4 h-px" style={{ background: C.gold }} />
                </div>
              </div>
            </div>

            {/* ── Timeline sections ── */}
            <div className="flex flex-col divide-y" style={{ borderColor: C.cream3 }}>
              {sections.map((section, idx) => (
                <motion.div
                  key={section.key}
                  id={`section-${section.key}`}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="py-10 grid sm:grid-cols-[100px_1fr] gap-6 items-start first:pt-0 last:pb-0"
                >
                  {/* Left meta */}
                  <div className="flex sm:flex-col gap-3 sm:gap-2 items-center sm:items-start">
                    <span className="text-3xl font-black tabular-nums leading-none"
                          style={{ color: "rgba(201,168,76,0.12)" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-0 sm:flex-col sm:items-start">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                           style={{ background: C.gold }} />
                      <div className="flex-1 sm:flex-none h-px sm:h-8 sm:w-px"
                           style={{ background: C.cream3, minWidth: 20 }} />
                    </div>
                    {section.year && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{
                              background: "rgba(201,168,76,0.08)",
                              color: C.gold,
                              border: "1px solid rgba(201,168,76,0.2)",
                            }}>
                        {section.year}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className={`text-xl sm:text-2xl font-bold mb-3 leading-snug
                                    ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                        style={{ color: C.dark }}>
                      {section.title}
                    </h2>
                    <div className="w-8 h-0.5 rounded-full mb-5"
                         style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                    <div className="text-[15px] leading-[1.9] space-y-3" style={{ color: C.muted }}>
                      {typeof section.content === "string" ? (
                        section.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
                      ) : (
                        <>
                          {section.content.fatherSide && (
                            <div className="rounded-xl p-5"
                                 style={{
                                   background: C.cream2,
                                   border: `1px solid rgba(201,168,76,0.15)`,
                                   borderInlineStart: `3px solid ${C.gold}`,
                                 }}>
                              <p className="text-xs font-bold mb-2" style={{ color: C.gold }}>Father&apos;s lineage</p>
                              <p>{section.content.fatherSide}</p>
                            </div>
                          )}
                          {section.content.motherSide && (
                            <div className="rounded-xl p-5"
                                 style={{
                                   background: C.cream2,
                                   border: `1px solid rgba(201,168,76,0.15)`,
                                   borderInlineStart: `3px solid ${C.gold}`,
                                 }}>
                              <p className="text-xs font-bold mb-2" style={{ color: C.gold }}>Mother&apos;s lineage</p>
                              <p>{section.content.motherSide}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(45,122,79,0.15), transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp}><Tag light>Continue exploring</Tag></motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4"
                         style={{ color: C.cream }}>
                Explore the Gallery &amp; Services
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                View sacred photos from Makanpur Shareef or discover the spiritual services
                offered at the Dargah of Hazrat Qutbul Madar.
              </motion.p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="flex flex-col gap-3 min-w-[200px]">
              <Link href={loc("/image-gallery")}
                    className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                    style={{ background: C.gold, color: C.dark }}>
                View Gallery
              </Link>
              <Link href={loc("/our-services")}
                    className="text-sm font-medium px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                    style={{ border: "1px solid rgba(201,168,76,0.25)", color: "rgba(247,244,238,0.6)" }}>
                Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
