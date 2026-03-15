"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Heart,
  Users,
  Soup,
  Globe,
} from "lucide-react";

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
const t1: Transition = { duration: 0.55, ease: "easeOut" };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: t1 },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── stat card ────────────────────────────────────────────────────────────────
function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center sm:text-start">
      <p
        className="text-2xl font-black tabular-nums"
        style={{ color: C.light }}
      >
        {num}
      </p>
      <p
        className="text-[11px] mt-0.5 tracking-wide"
        style={{ color: "rgba(247,244,238,0.35)" }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── value card ───────────────────────────────────────────────────────────────
function ValueCard({
  icon,
  title,
  body,
  accent = false,
  wide = false,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col gap-4 border transition-all duration-300
                  group hover:shadow-md ${wide ? "sm:col-span-2" : ""}`}
      style={{
        background: accent ? C.dark : C.white,
        borderColor: accent ? "transparent" : C.cream3,
        borderWidth: accent ? 0 : 1,
        boxShadow: accent ? `0 0 0 1px ${C.mid}33` : undefined,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                      transition-colors duration-300"
        style={{
          background: accent ? "rgba(74,160,106,0.15)" : C.cream2,
          color: accent ? C.light : C.mid,
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          className="text-[15px] font-bold mb-2 leading-snug"
          style={{ color: accent ? C.cream : C.dark }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-[1.8]"
          style={{ color: accent ? "rgba(247,244,238,0.55)" : C.muted }}
        >
          {body}
        </p>
      </div>
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full mt-auto"
        style={{ background: accent ? C.light : C.mid }}
      />
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function LangarBhandaraPage() {
  const t = useTranslations("langar");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const paragraphs = t("content").split("\n\n").filter(Boolean);
  const contactPara = paragraphs[paragraphs.length - 1];
  const bodyParas = paragraphs.slice(0, -1);
  const heroPara = bodyParas[0] ?? "";
  const cardParas = bodyParas.slice(1);

  const cardIcons = [
    <Heart key="1" className="w-5 h-5" />,
    <Users key="2" className="w-5 h-5" />,
    <Soup key="3" className="w-5 h-5" />,
    <Globe key="4" className="w-5 h-5" />,
    <Heart key="5" className="w-5 h-5" />,
    <Users key="6" className="w-5 h-5" />,
    <Globe key="7" className="w-5 h-5" />,
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
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.light} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/image7.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${C.dark}88, ${C.dark})`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-14">
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
              style={{ color: "rgba(247,244,238,0.4)" }}
            >
              {isRtl ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
              {t("back")}
            </button>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
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
              className="text-lg font-medium mb-8"
              style={{ color: C.light }}
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="w-12 h-0.5 rounded-full mb-10"
              style={{ background: C.mid }}
            />
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-10 pt-8"
              style={{ borderTop: "1px solid rgba(247,244,238,0.08)" }}
            >
              <StatCard num="Daily" label="Meals served" />
              <StatCard num="Free" label="No charge ever" />
              <StatCard num="All" label="Castes welcome" />
              <StatCard num="365" label="Days a year" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ INTRO BLOCKQUOTE ═══════════════════════ */}
      <section className="pt-16 pb-0" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 lg:p-10 relative overflow-hidden"
            style={{
              background: C.cream2,
              borderInlineStart: `4px solid ${C.mid}`,
              borderRadius: "0 16px 16px 0",
            }}
          >
            <div
              className="text-8xl leading-none absolute top-2 end-6 font-serif select-none"
              style={{ color: `${C.mid}12` }}
            >
              "
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-px" style={{ background: C.mid }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.mid }}
              >
                About this service
              </span>
            </div>
            <p
              className={`text-lg sm:text-xl font-medium leading-[1.85] relative
                           ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.dark }}
            >
              {heroPara}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ EDITORIAL GRID ══════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-5 h-px" style={{ background: C.mid }} />
            <span
              className="text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ color: C.mid }}
            >
              Why Langar – Bhandara matters
            </span>
            <div className="flex-1 h-px" style={{ background: C.cream3 }} />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardParas.map((para, idx) => {
              const isAccent = idx === 3;
              const isWide = idx === 5;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className={isWide ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  <ValueCard
                    icon={cardIcons[idx % cardIcons.length]}
                    title={
                      [
                        "Communal dining tradition",
                        "Daily meals with devotion",
                        "Open to all, without exception",
                        "The joy of giving",
                        "A beacon of hope",
                        "Solidarity & unity",
                      ][idx] ?? `Point ${idx + 1}`
                    }
                    body={para}
                    accent={isAccent}
                    wide={isWide}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ IMAGE STRIP ═════════════════════════════ */}
      <section className="pb-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-3 gap-3 h-[200px] lg:h-[260px]">
            {[
              { src: "/images/image7.webp", label: "Community gathering" },
              { src: "/images/image8.webp", label: "Devotees at Dargah" },
              { src: "/images/image6.webp", label: "Langar preparation" },
            ].map(({ src, label }, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
                <div
                  className="absolute inset-0 flex items-end p-4"
                  style={{
                    background: `linear-gradient(to top, ${C.dark}bb, transparent)`,
                  }}
                >
                  <span
                    className="text-xs font-medium opacity-0 group-hover:opacity-100
                                   transition-opacity duration-300"
                    style={{ color: C.cream }}
                  >
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CONTACT CARD ═════════════════════════ */}
      <section
        className="py-16"
        style={{ background: C.cream2, borderTop: `1px solid ${C.cream3}` }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl p-8 lg:p-10"
            style={{
              background: C.white,
              border: `1px solid ${C.cream3}`,
              boxShadow: "0 8px 32px rgba(26,61,43,0.07)",
            }}
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-5 h-px" style={{ background: C.mid }} />
                  <span
                    className="text-[10px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: C.mid }}
                  >
                    Get in touch
                  </span>
                </div>
                <p
                  className={`text-[15px] leading-[1.85]
                               ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                  style={{ color: C.muted }}
                >
                  {contactPara}
                </p>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <a
                  href="tel:00919838360930"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5
                             rounded-xl text-sm font-bold transition-all duration-200 active:scale-[0.98]"
                  style={{ background: C.dark, color: C.cream }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  Call now
                </a>
                <a
                  href="https://wa.me/919838360930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5
                             rounded-xl text-sm font-semibold border transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: C.cream2,
                    color: C.dark,
                    borderColor: C.cream3,
                  }}
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  WhatsApp
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
                Participate in this service
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className={`text-3xl sm:text-4xl font-bold leading-[1.15] mb-3
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.cream }}
              >
                {t("participate")}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-relaxed max-w-lg"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                Join volunteers and devotees at Makanpur Shareef and help serve
                meals to those in need — every day, for everyone.
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
                {t("participate")}
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
