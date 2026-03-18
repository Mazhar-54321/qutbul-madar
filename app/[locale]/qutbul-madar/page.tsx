"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";

const t1: Transition = { duration: 0.55, ease: "easeOut" };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: "#c8956c" }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? "#e8b48a" : "#c8956c" }}>{children}</span>
    </div>
  );
}

export default function QutbulMadarPage() {
  const C = useC();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const sections = t.raw("sections") as Array<{ title: string; description: string }>;

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* HERO */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(45,122,79,0.14), transparent 60%)" }} />

        {/* Faint portrait */}
        <div className="absolute inset-y-0 end-0 w-2/5 hidden lg:block opacity-[0.12]">
          <Image src="/images/Qutbul-Madar.jpg" alt="" fill className="object-cover object-top" sizes="40vw" />
          <div className="absolute inset-0"
               style={{ background: isRtl ? `linear-gradient(to left, transparent, ${C.dark})` : `linear-gradient(to right, transparent, ${C.dark})` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
            <button onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer"
                    style={{ color: "rgba(247,244,238,0.35)" }}>
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              Back
            </button>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={fadeUp}><Tag light>Sufi Saint · Makanpur Shareef</Tag></motion.div>
            <motion.div variants={fadeUp} className="text-4xl mb-3 leading-loose opacity-[0.12]"
                        style={{ color: C.onDark, fontFamily: "var(--font-urdu-display, serif)" }}>
              قطب المدار
            </motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
                       style={{ color: C.onDark }}>
              {t("heroTitle")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              Born 856 CE · Aleppo, Syria → Makanpur, India
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-10 pt-8"
                        style={{ borderTop: "1px solid rgba(200,149,108,0.1)" }}>
              {[
                { num: "596", label: "Years of life" },
                { num: "856 CE", label: "Year of birth" },
                { num: "1417 CE", label: "Year of passing" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black animate-shimmer">{num}</p>
                  <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16 lg:py-20" style={{ background: C.cream }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
            <div>
              <Tag>Introduction</Tag>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55 }}
                className="rounded-r-2xl p-7 mb-8 relative overflow-hidden"
                style={{ background: C.cream2, borderInlineStart: `3px solid ${C.gold}` }}
              >
                <div className="absolute top-2 end-4 text-8xl leading-none font-serif select-none"
                     style={{ color: "rgba(200,149,108,0.08)" }}>&quot;</div>
                <p className={`text-lg font-medium leading-[1.85] relative ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                   style={{ color: C.ink }}>
                  {t("introduction")}
                </p>
              </motion.div>

              <div className="flex flex-col gap-5">
                {sections.slice(0, 4).map((sec, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="rounded-xl p-5"
                    style={{ background: C.white, border: `1px solid ${C.cream3}` }}>
                    <div className="w-5 h-px mb-3" style={{ background: C.gold }} />
                    <h3 className="text-sm font-bold mb-2" style={{ color: C.ink }}>{sec.title}</h3>
                    <p className="text-[13px] leading-[1.8]" style={{ color: C.muted }}>{sec.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="sticky top-24"
            >
              <div className="relative rounded-2xl overflow-hidden"
                   style={{ height: 480, border: "1px solid rgba(200,149,108,0.15)", boxShadow: "0 24px 60px rgba(10,31,18,0.18)" }}>
                <Image src="/images/Qutbul-Madar.jpg" alt="Hazrat Qutbul Madar"
                       fill className="object-cover object-top" sizes="380px" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to top, ${C.dark}cc 0%, transparent 50%)` }} />
                <div className="absolute bottom-5 start-5 end-5">
                  <p className="text-sm font-bold" style={{ color: C.onDark }}>Hazrat Syed Badiuddin Ahmad</p>
                  <p className="text-xs mt-0.5" style={{ color: C.gold }}>Zinda Shah Madar · Qutbul Madar</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp}><Tag light>Learn more</Tag></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: C.onDark }}>
              Explore the full history
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                      style={{ color: "rgba(247,244,238,0.45)" }}>
              Dive deeper into the life, miracles, and spiritual legacy of Hazrat Qutbul Madar.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.25 }}
                      className="flex flex-col gap-3 min-w-[200px]">
            <Link href={loc("/history")}
                  className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                  style={{ background: C.gold, color: C.dark }}>
              Read History
            </Link>
            <Link href={loc("/articles")}
                  className="text-sm font-medium px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                  style={{ border: "1px solid rgba(200,149,108,0.25)", color: "rgba(247,244,238,0.6)" }}>
              Read Articles
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
