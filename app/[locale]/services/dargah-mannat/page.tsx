"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Heart,
  Sparkles,
  Wind,
  Globe,
  Star,
  BookOpen,
  Users,
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
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

// ─── card icons ───────────────────────────────────────────────────────────────
const cardMeta = [
  { title: "Heartfelt prayers", icon: <Heart className="w-4 h-4" /> },
  { title: "Amplified blessings", icon: <Sparkles className="w-4 h-4" /> },
  { title: "Sacred atmosphere", icon: <Wind className="w-4 h-4" /> },
  { title: "Open to all", icon: <Globe className="w-4 h-4" /> },
  { title: "Faith & surrender", icon: <Star className="w-4 h-4" /> },
  { title: "Ancient tradition", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Community of faith", icon: <Users className="w-4 h-4" /> },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export default function DargahMannatPage() {
  const t = useTranslations("dargah-mannat");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  // Split paragraphs
  const paragraphs = t("content").split("\n\n").filter(Boolean);
  const contactPara = paragraphs[paragraphs.length - 1];
  const bodyParas = paragraphs.slice(0, -1);
  const introPara = bodyParas[0] ?? "";
  const cardParas = bodyParas.slice(1);

  return (
    <main
      className="min-h-screen"
      style={{ background: C.cream, color: C.text }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════ TOP NAV BAR ═══════════════════════ */}
      <div
        className="sticky top-16 z-40 flex items-center justify-between px-6 lg:px-16 h-12"
        style={{
          background: C.dark,
          borderBottom: `1px solid rgba(247,244,238,0.06)`,
        }}
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
        <span className="text-sm font-bold" style={{ color: C.cream }}>
          {t("title")}
        </span>
        <Link
          href={loc("/our-services")}
          className="text-xs font-medium transition-colors"
          style={{ color: "rgba(247,244,238,0.4)" }}
        >
          All services
        </Link>
      </div>

      {/* ══════════════════════ SPLIT HERO ════════════════════════════ */}
      <section className="grid lg:grid-cols-[360px_1fr] min-h-[calc(100vh-112px)]">
        {/* ── LEFT — dark green sticky panel ── */}
        <div
          className="relative flex flex-col justify-between p-8 lg:p-12
                     lg:sticky lg:top-28 lg:h-[calc(100vh-112px)] overflow-hidden"
          style={{ background: C.dark }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, ${C.light} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Faint bg image */}
          <div className="absolute inset-0 opacity-[0.08]">
            <Image
              src="/images/image2.webp"
              alt=""
              fill
              className="object-cover object-center"
              sizes="360px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${C.dark}88, ${C.dark})`,
              }}
            />
          </div>

          {/* Top content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            {/* Tag */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-5 h-px" style={{ background: C.light }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.light }}
              >
                Dargah service
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1]
                          tracking-tight mb-3
                          ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.cream }}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base font-medium mb-8"
              style={{ color: C.light }}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="w-10 h-0.5 rounded-full mb-8"
              style={{ background: C.mid }}
            />
          </motion.div>

          {/* Arabic calligraphy — decorative centre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 text-center my-auto py-8"
            style={{
              fontFamily: "var(--font-urdu-display, serif)",
              fontSize: "clamp(60px, 8vw, 90px)",
              color: "rgba(247,244,238,0.06)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            مناّت
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative z-10 grid grid-cols-3 gap-4 pt-6"
            style={{ borderTop: "1px solid rgba(247,244,238,0.08)" }}
          >
            {[
              { num: "Daily", label: "Prayers offered" },
              { num: "All", label: "Faiths welcome" },
              { num: "Free", label: "No charge" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-lg font-black" style={{ color: C.light }}>
                  {num}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "rgba(247,244,238,0.3)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — cream scrollable content ── */}
        <div
          className="flex flex-col gap-0"
          style={{ borderInlineStart: `1px solid ${C.cream3}` }}
        >
          {/* Intro blockquote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 lg:p-12"
            style={{ borderBottom: `1px solid ${C.cream3}` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px" style={{ background: C.mid }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.mid }}
              >
                About this service
              </span>
            </div>

            <div
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: C.cream2,
                borderInlineStart: `4px solid ${C.mid}`,
                borderRadius: "0 16px 16px 0",
              }}
            >
              <div
                className="absolute top-2 end-4 text-8xl leading-none font-serif select-none"
                style={{ color: `${C.mid}10` }}
              >
                "
              </div>
              <p
                className={`text-lg font-medium leading-[1.85] relative
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.dark }}
              >
                {introPara}
              </p>
            </div>
          </motion.div>

          {/* Card grid */}
          <div
            className="p-8 lg:p-12"
            style={{ borderBottom: `1px solid ${C.cream3}` }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-px" style={{ background: C.mid }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.mid }}
              >
                What makes Dargah Mannat special
              </span>
              <div className="flex-1 h-px" style={{ background: C.cream3 }} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {cardParas.map((para, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className={`rounded-2xl p-6 border group transition-all duration-300
                              hover:shadow-md relative overflow-hidden
                              ${idx === 2 ? "sm:col-span-2" : ""}`}
                  style={{
                    background: idx === 1 ? C.dark : C.white,
                    borderColor: idx === 1 ? "transparent" : C.cream3,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4
                               transition-colors duration-300"
                    style={{
                      background:
                        idx === 1 ? "rgba(74,160,106,0.15)" : C.cream2,
                      color: idx === 1 ? C.light : C.mid,
                    }}
                  >
                    {cardMeta[idx % cardMeta.length].icon}
                  </div>

                  <h3
                    className="text-[14px] font-bold mb-2 leading-snug"
                    style={{ color: idx === 1 ? C.cream : C.dark }}
                  >
                    {cardMeta[idx % cardMeta.length].title}
                  </h3>
                  <p
                    className="text-sm leading-[1.8]"
                    style={{
                      color: idx === 1 ? "rgba(247,244,238,0.5)" : C.muted,
                    }}
                  >
                    {para}
                  </p>

                  {/* Hover bottom line */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-px scale-x-0
                               group-hover:scale-x-100 transition-transform duration-400"
                    style={{ background: idx === 1 ? C.light : C.mid }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image strip */}
          <div
            className="p-8 lg:p-12"
            style={{ borderBottom: `1px solid ${C.cream3}` }}
          >
            <div className="grid grid-cols-3 gap-3 h-44">
              {[
                { src: "/images/image2.webp", label: "Dargah Shareef" },
                { src: "/images/image9.webp", label: "Shrine at night" },
                { src: "/images/image10.webp", label: "Annual Urs" },
              ].map(({ src, label }, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0
                               group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${C.dark}cc, transparent)`,
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ color: C.cream }}
                    >
                      {label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="p-8 lg:p-12"
            style={{ borderBottom: `1px solid ${C.cream3}` }}
          >
            <div
              className="rounded-2xl p-8"
              style={{
                background: C.white,
                border: `1px solid ${C.cream3}`,
                boxShadow: "0 8px 32px rgba(26,61,43,0.06)",
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
                <div className="flex flex-col gap-3 min-w-[180px]">
                  <a
                    href="tel:00919838360930"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5
                               rounded-xl text-sm font-bold transition-all duration-200
                               active:scale-[0.98]"
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
                               rounded-xl text-sm font-semibold border transition-all duration-200
                               active:scale-[0.98]"
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
                Offer your prayers
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
                Entrust your heartfelt prayers to the divine grace of Hazrat
                Qutbul Madar at Makanpur Shareef — and experience the peace of
                surrender and faith.
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
