"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";

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
const t1: Transition = { duration: 0.55, ease: "easeOut" };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: t1 },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── page ─────────────────────────────────────────────────────────────────────
export default function LiveZiyaratPage() {
  const t = useTranslations("live-ziyarat");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  // Build a single long content string from translation keys, split like MadarShareef does
  const content = [
    t("intro"),
    t("belief_body"),
    t("process_body"),
    t("preparation_body"),
    t("purpose_body"),
    t("impact_body"),
    t("volunteer_body"),
  ].join("\n\n");

  const paragraphs = content.split("\n\n").filter(Boolean);
  const contactPara = paragraphs[paragraphs.length - 1];
  const contentParas = paragraphs.slice(0, -1);
  const mid = Math.ceil(contentParas.length / 2);
  const colLeft = contentParas.slice(0, mid);
  const colRight = contentParas.slice(mid);

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
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-0">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-xs font-semibold
                         transition-colors duration-200 cursor-pointer"
              style={{ color: "rgba(247,244,238,0.45)" }}
            >
              {isRtl ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
              {t("back")}
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl pb-10"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-5 h-px" style={{ background: C.light }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.light }}
              >
                Dargah service
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]
                          tracking-tight mb-3
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.cream }}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={`text-lg font-medium mb-8
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.light }}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="w-12 h-0.5 rounded-full"
              style={{ background: C.mid }}
            />
          </motion.div>

          {/* Wide image banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full aspect-[21/9] rounded-t-2xl overflow-hidden"
            style={{ marginBottom: -2 }}
          >
            <Image
              src="/images/live-ziyarat.webp"
              alt={t("title")}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom,
                  rgba(26,61,43,0.2) 0%,
                  rgba(26,61,43,0.1) 50%,
                  ${C.cream} 100%)`,
              }}
            />
            <div
              className="absolute top-5 end-5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(26,61,43,0.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(74,160,106,0.3)",
                color: C.light,
              }}
            >
              Makanpur Shareef
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ HIGHLIGHT QUOTE ════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Dark quote block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 lg:p-10 mb-16"
            style={{ background: C.dark }}
          >
            <div
              className="text-6xl leading-none mb-4 font-serif"
              style={{ color: "rgba(74,160,106,0.25)" }}
            >
              "
            </div>
            <p
              className={`text-lg sm:text-xl font-medium leading-relaxed mb-5
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: "rgba(247,244,238,0.8)" }}
            >
              {t("impact_body")}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: C.mid }} />
              <span
                className="text-xs font-semibold"
                style={{ color: C.light }}
              >
                {t("title")} — Qutbul Madar Dargah
              </span>
            </div>
          </motion.div>

          {/* Section label */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-5 h-px" style={{ background: C.mid }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.mid }}
              >
                About this service
              </span>
              <div className="flex-1 h-px" style={{ background: C.cream3 }} />
            </motion.div>

            {/* Two-column body */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left col */}
              <div className="flex flex-col gap-6">
                {colLeft.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className={`text-[15px] leading-[1.9]
                                ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                    style={{ color: C.muted }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Right col */}
              <div className="flex flex-col gap-6">
                {colRight.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 + 0.1 }}
                    className={`text-[15px] leading-[1.9]
                                ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                    style={{ color: C.muted }}
                  >
                    {para}
                  </motion.p>
                ))}

                {/* Inline image — right col bottom */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative h-64 rounded-2xl overflow-hidden mt-2"
                >
                  <Image
                    src="/images/live-ziyarat/gallery.jpg"
                    alt="Live Ziyarat session"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${C.dark}aa, transparent)`,
                    }}
                  />
                  <p
                    className="absolute bottom-4 left-4 text-xs font-medium"
                    style={{ color: C.cream }}
                  >
                    Devotees at Dargah Shareef
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl p-7 lg:p-8 mb-12"
            style={{ background: C.cream2, border: `1px solid ${C.cream3}` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px" style={{ background: C.mid }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.mid }}
              >
                Get in touch
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <p
                className={`text-[15px] leading-[1.85]
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.muted }}
              >
                {contactPara}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:00919838360930"
                  className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl
                             text-sm font-bold transition-all duration-200 active:scale-[0.98]"
                  style={{ background: C.dark, color: C.cream }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  00 – 91 – 9838360930
                </a>
                <a
                  href="https://wa.me/919838360930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl
                             text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: C.cream,
                    color: C.dark,
                    border: `1px solid ${C.cream3}`,
                  }}
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  WhatsApp us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ════════════════════════════ */}
      <section className="py-20" style={{ background: C.mid }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
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
                Book your session
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className={`text-3xl sm:text-4xl font-bold leading-[1.15] mb-3
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.cream }}
              >
                {t("volunteer_heading")}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-relaxed max-w-lg"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                {t("belief_body")}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-3 min-w-[200px]"
            >
              <a
                href="tel:00919838360930"
                className="text-sm font-bold px-8 py-4 rounded-xl text-center
                           transition-all duration-200 active:scale-[0.98]"
                style={{ background: C.cream, color: C.dark }}
              >
                {t("volunteer_heading")}
              </a>
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
    </main>
  );
}
