"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, CalendarDays } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";


// ─── animation ────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

// ─── tag ──────────────────────────────────────────────────────────────────────
function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? "#e8c96b" : "#c9a84c" }}>
        {children}
      </span>
    </div>
  );
}

// ─── director card ────────────────────────────────────────────────────────────
function DirectorCard({
  imgSrc, name, title, idx, isRtl, C,
}: { imgSrc: string; name: string; title: string; idx: number; isRtl: boolean; C: { white: string; ink: string; muted: string; dark: string; gold: string; cream: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: C.white,
        border: "1px solid rgba(201,168,76,0.15)",
        boxShadow: "0 4px 24px rgba(10,31,18,0.06)",
      }}
    >
      {/* Gold top accent line — animates on hover */}
      <div className="h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
           style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

      {/* Photo */}
      <div className="relative h-72 overflow-hidden">
        <Image src={imgSrc} alt={name} fill
               className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
               sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0"
             style={{ background: `linear-gradient(to top, ${C.dark}dd 0%, transparent 55%)` }} />
        {/* Gold number badge */}
        <span className="absolute top-4 start-4 text-[10px] font-black px-2.5 py-1 rounded-full"
              style={{ background: "rgba(201,168,76,0.15)", color: C.gold, border: "1px solid rgba(201,168,76,0.35)" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-1 flex-1">
        <div className="w-8 h-0.5 rounded-full mb-3"
             style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
        <h3 className={`text-[15px] font-bold leading-snug mb-1 ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
            style={{ color: C.ink }}>
          {name}
        </h3>
        <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: C.muted }}>{title}</p>
      </div>
    </motion.div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function AboutUsPage() {
  const C = useC();
  const t = useTranslations("aboutUs");
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const directors = t.raw("directors") as Array<{ name: string; title: string }>;
  const directorImages = ["/images/1-370x370.jpg", "/images/2-370x370.jpg", "/images/3-370x370.jpg"];

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* ══════════════════════════ HERO ══════════════════════════════ */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(45,122,79,0.16), transparent 60%)" }} />

        {/* Large Arabic watermark */}
        <div className="absolute inset-0 flex items-center justify-end pe-20 select-none pointer-events-none">
          <span className="text-[200px] font-bold leading-none opacity-[0.025] hidden lg:block"
                style={{ color: C.onDark, fontFamily: "var(--font-urdu-display, serif)" }}>
            المدار
          </span>
        </div>

        {/* Portrait strip */}
        <div className="absolute inset-y-0 end-0 w-2/5 hidden lg:block">
          <Image src="/images/qutbul-madar-portrait.jpg" alt="Hazrat Qutbul Madar"
                 fill className="object-cover object-top opacity-[0.18]" sizes="40vw" priority />
          <div className="absolute inset-0"
               style={{ background: isRtl
                 ? `linear-gradient(to left, transparent, ${C.dark})`
                 : `linear-gradient(to right, transparent, ${C.dark})` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-32">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-12">
            <Link href={loc("/")}
                  className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200"
                  style={{ color: "rgba(247,244,238,0.35)" }}>
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              Back to home
            </Link>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={fadeUp}><Tag light>Khanqahe Madariya · Makanpur Shareef</Tag></motion.div>

            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

            {/* Arabic calligraphy */}
            <motion.div variants={fadeUp} className="text-4xl mb-4 leading-loose font-bold opacity-[0.08]"
                        style={{ color: C.onDark, fontFamily: "var(--font-urdu-display, serif)" }}>
              قطب المدار
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-4xl sm:text-5xl lg:text-[68px] font-bold leading-[1.0]
                          mb-5 tracking-tight ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
              style={{ color: C.onDark }}
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              {t("heroSubtitle")}
            </motion.p>

            <motion.blockquote variants={fadeUp} className="ps-5 py-2 mb-8"
                                style={{ borderInlineStart: `2px solid ${C.gold}` }}>
              <p className={`text-[15px] italic leading-[1.85] font-medium
                             ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                 style={{ color: "rgba(247,244,238,0.65)" }}>
                &ldquo;{t("welcomeQuote")}&rdquo;
              </p>
            </motion.blockquote>

            {/* Gold stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-10 pt-10"
                        style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
              {[
                { num: "596",  label: "Years of life" },
                { num: "800+", label: "Years of legacy" },
                { num: "3",    label: "Directors" },
                { num: "17th", label: "Hijri — Monthly Jalsa" },
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

      {/* ══════════════════════ WELCOME SECTION ═══════════════════════ */}
      <section className="py-24 lg:py-36" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <motion.div variants={fadeUp}><Tag>Our story</Tag></motion.div>

              <motion.h2
                variants={fadeUp}
                className={`text-4xl sm:text-5xl font-bold leading-[1.1] mb-5
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.ink }}
              >
                {t("welcomeTitle")}
              </motion.h2>

              <motion.div variants={fadeUp} className="w-14 h-1 rounded-full mb-8"
                          style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

              <motion.blockquote variants={fadeUp} className="ps-5 mb-8 py-2"
                                  style={{ borderInlineStart: `2px solid ${C.gold}` }}>
                <p className={`text-base font-semibold italic leading-relaxed
                               ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                   style={{ color: C.ink }}>
                  &ldquo;{t("welcomeQuote")}&rdquo;
                </p>
              </motion.blockquote>

              <motion.p variants={fadeUp} className="text-[15px] leading-[1.9] mb-8" style={{ color: C.muted }}>
                {t("welcomeText")}
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link href={loc("/history")}
                      className="inline-flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all duration-200"
                      style={{ color: C.gold }}>
                  Read full history
                  <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Portrait */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
              <div className="relative h-[520px] rounded-2xl overflow-hidden"
                   style={{ boxShadow: `0 32px 80px rgba(10,31,18,0.22)`, border: `1px solid rgba(201,168,76,0.15)` }}>
                <Image src="/images/qutbul-madar-portrait.jpg" alt="Hazrat Qutbul Madar"
                       fill className="object-cover object-top" sizes="420px" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to top, ${C.dark}cc 0%, transparent 45%)` }} />
                <div className="absolute bottom-5 start-5 end-5">
                  <p className="text-sm font-bold" style={{ color: C.onDark }}>Hazrat Syed Badiuddin Ahmad</p>
                  <p className="text-xs mt-0.5" style={{ color: C.gold }}>Zinda Shah Madar · Qutbul Madar</p>
                </div>
              </div>
              {/* Decorative gold corner */}
              <div className="absolute -bottom-3 -end-3 w-20 h-20 rounded-2xl -z-10"
                   style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ BOARD HEADER ══════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(45,122,79,0.12), transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp}><Tag light>Leadership</Tag></motion.div>

              <motion.h2
                variants={fadeUp}
                className={`text-4xl sm:text-5xl font-bold leading-[1.1] mb-5
                            ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                style={{ color: C.onDark }}
              >
                {t("boardTitle")}
              </motion.h2>

              <motion.div variants={fadeUp} className="w-14 h-0.5 rounded-full mb-7"
                          style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

              <motion.p variants={fadeUp} className="text-[15px] leading-[1.9]"
                        style={{ color: "rgba(247,244,238,0.55)" }}>
                {t("boardDesc")}
              </motion.p>
            </motion.div>

            {/* Jalsa info card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}
                        className="rounded-2xl p-8"
                        style={{
                          background: "rgba(201,168,76,0.04)",
                          border: "1px solid rgba(201,168,76,0.2)",
                          boxShadow: "0 0 0 1px rgba(201,168,76,0.05)",
                        }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                   style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
                <CalendarDays className="w-5 h-5" style={{ color: C.gold }} />
              </div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: C.gold }}>
                {t("jalsaLabel")}
              </p>
              <h3 className="text-xl font-bold mb-3" style={{ color: C.onDark }}>
                17th of every Hijri month
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(247,244,238,0.45)" }}>
                {t("jalsaText")}
              </p>
              <div className="mt-6 pt-6 flex items-center gap-3"
                   style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: C.gold, opacity: 0.7 }} />
                <span className="text-sm" style={{ color: "rgba(247,244,238,0.45)" }}>00 – 91 – 9838360930</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ DIRECTOR CARDS ════════════════════════ */}
      <section className="py-24 lg:py-36" style={{ background: C.cream2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <motion.div variants={fadeUp}><Tag>Meet the team</Tag></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold" style={{ color: C.ink }}>
              Our Directors
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {directors.map((director, idx) => (
              <DirectorCard key={idx} imgSrc={directorImages[idx]} name={director.name}
                            title={director.title} idx={idx} isRtl={isRtl} C={C} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(45,122,79,0.12), transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp}><Tag light>Get involved</Tag></motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-5"
                         style={{ color: C.onDark }}>
                Connect with us
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg mb-6"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                {t("contactCta")} — reach out to the directors or visit Makanpur Shareef
                to experience the spiritual legacy of Hazrat Qutbul Madar.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm"
                          style={{ color: "rgba(247,244,238,0.4)" }}>
                <Phone className="w-3.5 h-3.5" style={{ color: C.gold }} />
                <span>00 – 91 – 9838360930</span>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="flex flex-col gap-3 min-w-[200px]">
              <Link href={loc("/contact")}
                    className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                    style={{ background: C.gold, color: C.dark }}>
                Contact Us
              </Link>
              <Link href={loc("/donate")}
                    className="text-sm font-medium px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                    style={{ border: "1px solid rgba(201,168,76,0.25)", color: "rgba(247,244,238,0.6)" }}>
                Donate
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
