"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
};

// ─── animation ────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-5 h-px" style={{ background: C.light }} />
      <span
        className="text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: C.light }}
      >
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
    {
      key: "birth",
      title: t("birth.title"),
      year: "242 AH",
      content: t("birth.content"),
    },
    {
      key: "dreams",
      title: t("dreamsBeforeBirth.title"),
      content: t("dreamsBeforeBirth.content"),
    },
    {
      key: "miracles",
      title: t("miraclesAtBirth.title"),
      content: t("miraclesAtBirth.content"),
    },
    {
      key: "genealogy",
      title: t("genealogy.title"),
      content: {
        fatherSide: t("genealogy.fatherSide"),
        motherSide: t("genealogy.motherSide"),
      },
    },
    {
      key: "education",
      title: t("education.title"),
      content: t("education.content"),
    },
    {
      key: "spiritual",
      title: t("spiritualTraining.title"),
      content: t("spiritualTraining.content"),
    },
    {
      key: "prophet",
      title: t("meetingProphet.title"),
      content: t("meetingProphet.content"),
    },
    {
      key: "mission",
      title: t("missionToIndia.title"),
      content: t("missionToIndia.content"),
    },
    {
      key: "journey",
      title: t("journeyToIndia.title"),
      content: t("journeyToIndia.content"),
    },
    {
      key: "arrival",
      title: t("arrivalKhambat.title"),
      year: "282 AH",
      content: t("arrivalKhambat.content"),
    },
    {
      key: "maqam",
      title: t("maqam.title"),
      content: t("maqam.content"),
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ background: C.cream, color: C.text }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════ HERO ══════════════════════════════ */}
      <section
        style={{ background: C.dark }}
        className="relative overflow-hidden"
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.light} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Image strip — right side on desktop */}
        <div className="absolute inset-y-0 end-0 w-2/5 hidden lg:block">
          <Image
            src="/images/image2.webp"
            alt="Dargah Shareef"
            fill
            className="object-cover opacity-20"
            sizes="40vw"
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
              className="inline-flex items-center gap-2 text-xs font-semibold
                         transition-colors duration-200"
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
              <SectionLabel>Sacred biography</SectionLabel>
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

            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-[1.9] mb-4"
              style={{ color: "rgba(247,244,238,0.6)" }}
            >
              {t("introduction.p1")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-[1.9]"
              style={{ color: "rgba(247,244,238,0.6)" }}
            >
              {t("introduction.p2")}
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-8 mt-10 pt-10"
              style={{ borderTop: "1px solid rgba(247,244,238,0.1)" }}
            >
              {[
                { num: "596", label: "Years of life" },
                { num: "242", label: "Birth year (AH)" },
                { num: "12", label: "Biography sections" },
                { num: "1417", label: "Year of passing (AD)" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: C.light }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(247,244,238,0.35)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TIMELINE BODY ════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-20 items-start">
            {/* ── Sticky left index ── */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <p
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5"
                style={{ color: C.mid }}
              >
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((s, idx) => (
                  <a
                    key={s.key}
                    href={`#section-${s.key}`}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm
                               transition-all duration-150"
                    style={{ color: C.muted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = C.cream2;
                      e.currentTarget.style.color = C.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = C.muted;
                    }}
                  >
                    <span
                      className="text-[10px] font-bold tabular-nums w-5 flex-shrink-0"
                      style={{ color: C.mid }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-[13px]">{s.title}</span>
                  </a>
                ))}
              </nav>

              {/* Sidebar image */}
              <div className="mt-8 rounded-2xl overflow-hidden relative h-52">
                <Image
                  src="/images/image10.webp"
                  alt="Annual Urs"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${C.dark}99, transparent)`,
                  }}
                />
                <p
                  className="absolute bottom-3 left-3 text-xs font-medium"
                  style={{ color: C.cream }}
                >
                  Annual Urs night
                </p>
              </div>
            </div>

            {/* ── Timeline sections ── */}
            <div
              className="flex flex-col divide-y"
              style={{ borderColor: C.cream3 }}
            >
              {sections.map((section, idx) => (
                <motion.div
                  key={section.key}
                  id={`section-${section.key}`}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="py-10 grid sm:grid-cols-[100px_1fr] gap-6 items-start
                             first:pt-0 last:pb-0"
                >
                  {/* Left meta */}
                  <div className="flex sm:flex-col gap-3 sm:gap-2 items-center sm:items-start">
                    <span
                      className="text-2xl font-black tabular-nums leading-none"
                      style={{ color: C.cream3 }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-0 sm:flex-col sm:items-start">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: C.mid }}
                      />
                      <div
                        className="flex-1 sm:flex-none h-px sm:h-8 sm:w-px"
                        style={{ background: C.cream3, minWidth: 20 }}
                      />
                    </div>
                    {section.year && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: C.cream2,
                          color: C.mid,
                          border: `1px solid ${C.cream3}`,
                        }}
                      >
                        {section.year}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h2
                      className={`text-xl sm:text-2xl font-bold mb-4 leading-snug
                                    ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                      style={{ color: C.dark }}
                    >
                      {section.title}
                    </h2>
                    <div
                      className="w-8 h-0.5 rounded-full mb-5"
                      style={{ background: C.mid }}
                    />
                    <div
                      className="text-[15px] leading-[1.9] space-y-3"
                      style={{ color: C.muted }}
                    >
                      {typeof section.content === "string" ? (
                        section.content
                          .split("\n\n")
                          .map((para, i) => <p key={i}>{para}</p>)
                      ) : (
                        <>
                          {section.content.fatherSide && (
                            <div
                              className="rounded-xl p-5"
                              style={{
                                background: C.cream2,
                                border: `1px solid ${C.cream3}`,
                              }}
                            >
                              <p
                                className="text-xs font-bold mb-2"
                                style={{ color: C.mid }}
                              >
                                Father&apos;s lineage
                              </p>
                              <p>{section.content.fatherSide}</p>
                            </div>
                          )}
                          {section.content.motherSide && (
                            <div
                              className="rounded-xl p-5"
                              style={{
                                background: C.cream2,
                                border: `1px solid ${C.cream3}`,
                              }}
                            >
                              <p
                                className="text-xs font-bold mb-2"
                                style={{ color: C.mid }}
                              >
                                Mother&apos;s lineage
                              </p>
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
      <section className="py-20" style={{ background: C.mid }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4"
                style={{ color: "rgba(247,244,238,0.5)" }}
              >
                Continue exploring
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ color: C.cream }}
              >
                Explore the Gallery & Services
              </h2>
              <p
                className="text-[15px] leading-relaxed max-w-lg"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                View photos from Makanpur Shareef or learn about the sacred
                services offered at the Dargah of Hazrat Qutbul Madar.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[180px]">
              <Link
                href={loc("/image-gallery")}
                className="text-sm font-bold px-7 py-3.5 rounded-xl text-center
                           transition-all duration-200 active:scale-[0.98]"
                style={{ background: C.cream, color: C.dark }}
              >
                View Gallery
              </Link>
              <Link
                href={loc("/our-services")}
                className="text-sm font-medium px-7 py-3.5 rounded-xl text-center border
                           transition-all duration-200 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(247,244,238,0.2)",
                  color: "rgba(247,244,238,0.7)",
                }}
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
