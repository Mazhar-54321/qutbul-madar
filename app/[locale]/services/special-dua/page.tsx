"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";


const t1: Transition = { duration: 0.55, ease: "easeOut" };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? "#e8c96b" : "#c9a84c" }}>{children}</span>
    </div>
  );
}

export default function SpecialDuaPage() {
  const C = useC();
  const t = useTranslations("special-dua");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const paragraphs = t("content").split("\n\n").filter(Boolean);
  const contactPara = paragraphs[paragraphs.length - 1];
  const bodyParas = paragraphs.slice(0, -1);
  const leadPara = bodyParas[0] ?? "";
  const restParas = bodyParas.slice(1);

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* HERO */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(45,122,79,0.14), transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
            <button onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200 cursor-pointer"
                    style={{ color: "rgba(247,244,238,0.35)" }}>
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              {t("back")}
            </button>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl pb-8">
            <motion.div variants={fadeUp}><Tag light>Dargah service</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-3
                                   ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                       style={{ color: C.onDark }}>
              {t("title")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Hero image */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="relative w-full rounded-t-2xl overflow-hidden"
                      style={{ aspectRatio: "16/7", marginBottom: -2 }}>
            <Image src="/images/special-dua.webp" alt="Special Dua — Qutbul Madar Dargah"
                   fill priority className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0"
                 style={{ background: `linear-gradient(to bottom, rgba(10,31,18,0.1) 0%, transparent 40%, ${C.cream} 100%)` }} />
            <div className="absolute top-4 end-4 px-3 py-1.5 rounded-full text-xs font-bold"
                 style={{ background: "rgba(10,31,18,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,168,76,0.35)", color: C.gold }}>
              Makanpur Shareef
            </div>
          </motion.div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 lg:py-20" style={{ background: C.cream }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-16">

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      className="flex items-center gap-3 mb-8">
            <span className="w-5 h-px" style={{ background: C.gold }} />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: C.gold }}>
              About this service
            </span>
            <div className="flex-1 h-px" style={{ background: C.cream3 }} />
          </motion.div>

          {/* Lead blockquote */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.55 }}
                      className="rounded-r-2xl p-7 mb-8 relative overflow-hidden"
                      style={{ background: C.cream2, borderInlineStart: `3px solid ${C.gold}` }}>
            <div className="absolute top-2 end-4 text-8xl leading-none font-serif select-none"
                 style={{ color: "rgba(201,168,76,0.08)" }}>&quot;</div>
            <p className={`text-lg font-medium leading-[1.85] relative ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
               style={{ color: C.ink }}>
              {leadPara}
            </p>
          </motion.div>

          {/* Body paragraphs */}
          <div className="flex flex-col gap-6 mb-10">
            {restParas.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
                        className={`text-[15px] leading-[1.9] ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                        style={{ color: C.muted }}>
                {para}
              </motion.p>
            ))}
          </div>

          <div className="h-px mb-10"
               style={{ background: `linear-gradient(to right, ${C.gold}, transparent)`, opacity: 0.18 }} />

          {/* Contact card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.55 }}
                      className="rounded-2xl p-8"
                      style={{ background: C.dark, border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 16px 48px rgba(10,31,18,0.2)" }}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <Tag>Get in touch</Tag>
                <p className={`text-[15px] leading-[1.85] ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                   style={{ color: "rgba(247,244,238,0.55)" }}>
                  {contactPara}
                </p>
              </div>
              <div className="flex flex-col gap-3 min-w-[180px]">
                <a href="tel:00919838360930"
                   className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-[0.98]"
                   style={{ background: C.gold, color: C.dark }}>
                  <Phone className="w-4 h-4 shrink-0" /> Call now
                </a>
                <a href="https://wa.me/919838360930" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                   style={{ background: "rgba(247,244,238,0.06)", color: C.onDark, border: "1px solid rgba(247,244,238,0.12)" }}>
                  <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp}><Tag light>Request a Special Dua</Tag></motion.div>
              <motion.h2 variants={fadeUp}
                         className={`text-3xl sm:text-4xl font-bold leading-[1.15] mb-3 ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                         style={{ color: C.onDark }}>
                {t("participate")}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                Connect with the Dargah to have a dedicated prayer offered on your behalf
                at the sacred shrine of Hazrat Qutbul Madar.
              </motion.p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="flex flex-col gap-3 min-w-[200px]">
              <a href="tel:00919838360930"
                 className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                 style={{ background: C.gold, color: C.dark }}>
                {t("participate")}
              </a>
              <Link href={loc("/contact")}
                    className="text-sm font-medium px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                    style={{ border: "1px solid rgba(201,168,76,0.25)", color: "rgba(247,244,238,0.6)" }}>
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
