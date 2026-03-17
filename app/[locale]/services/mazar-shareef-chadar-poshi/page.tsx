"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";

const C = {
  dark:    "#0a1f12",
  mid:     "#1a3d2b",
  green:   "#2d7a4f",
  light:   "#4aa06a",
  gold:    "#c9a84c",
  goldHi:  "#e8c96b",
  cream:   "#f7f4ee",
  cream2:  "#ede9e0",
  cream3:  "#e0d8c8",
  muted:   "#6b7c6e",
  text:    "#1a1a12",
  white:   "#ffffff",
};

const t1: Transition = { duration: 0.55, ease: "easeOut" };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: C.gold }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? C.goldHi : C.gold }}>{children}</span>
    </div>
  );
}

export default function MazarShareefChadarPoshiPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const paragraphs = t("madarShareefChadarPoshi").split("\n\n").filter(Boolean);
  const contactPara = paragraphs[paragraphs.length - 1];
  const contentParas = paragraphs.slice(0, -1);
  const mid = Math.ceil(contentParas.length / 2);
  const colLeft = contentParas.slice(0, mid);
  const colRight = contentParas.slice(mid);

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

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl pb-10">
            <motion.div variants={fadeUp}><Tag light>Sacred tradition</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-3
                                   ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                       style={{ color: C.cream }}>
              {t("madarTitle")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              {t("madarSubtitle")}
            </motion.p>
          </motion.div>

          {/* Wide image banner */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="relative w-full aspect-[21/9] rounded-t-2xl overflow-hidden"
                      style={{ marginBottom: -2 }}>
            <Image src="/images/chadar-poshi.webp" alt="Madar e Shareef — Chadar Poshi"
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

      {/* HIGHLIGHT QUOTE */}
      <section className="py-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.6 }}
                      className="rounded-r-2xl p-8 lg:p-10 relative overflow-hidden"
                      style={{ background: C.dark, borderInlineStart: `3px solid ${C.gold}` }}>
            <div className="text-8xl leading-none absolute top-2 end-6 font-serif select-none"
                 style={{ color: "rgba(201,168,76,0.06)" }}>&quot;</div>
            <Tag light>About this tradition</Tag>
            <p className={`text-lg sm:text-xl font-medium leading-[1.85] relative
                           ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
               style={{ color: "rgba(247,244,238,0.85)" }}>
              {contentParas[0]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* TWO COLUMN BODY */}
      <section className="pb-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-6">
              {colLeft.slice(1).map((para, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
                          className={`text-[15px] leading-[1.9] ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                          style={{ color: C.muted }}>
                  {para}
                </motion.p>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }} transition={{ duration: 0.6 }}
                          className="relative rounded-2xl overflow-hidden mb-2"
                          style={{ aspectRatio: "4/3", border: "1px solid rgba(201,168,76,0.12)" }}>
                <Image src="/images/image4.webp" alt="Chadar Poshi ceremony"
                       fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to top, ${C.dark}66, transparent)` }} />
                <div className="absolute bottom-3 start-4">
                  <span className="text-xs font-medium" style={{ color: C.gold }}>Annual Chadar Poshi ceremony</span>
                </div>
              </motion.div>
              {colRight.map((para, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
                          className={`text-[15px] leading-[1.9] ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                          style={{ color: C.muted }}>
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="py-16" style={{ background: C.cream2, borderTop: `1px solid ${C.cream3}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.55 }}
                      className="rounded-2xl p-8 lg:p-10"
                      style={{ background: C.dark, border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 16px 48px rgba(10,31,18,0.2)" }}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <Tag>Offer a Chadar</Tag>
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
                   style={{ background: "rgba(247,244,238,0.06)", color: C.cream, border: "1px solid rgba(247,244,238,0.12)" }}>
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
              <motion.div variants={fadeUp}><Tag light>Honour the Sacred Tomb</Tag></motion.div>
              <motion.h2 variants={fadeUp}
                         className={`text-3xl sm:text-4xl font-bold leading-[1.15] mb-3 ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                         style={{ color: C.cream }}>
                Offer Chadar at Madar e Shareef
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                Participate in the sacred tradition of Chadar Poshi at the blessed
                Mazar of Hazrat Qutbul Madar at Makanpur Shareef.
              </motion.p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="flex flex-col gap-3 min-w-[200px]">
              <a href="tel:00919838360930"
                 className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                 style={{ background: C.gold, color: C.dark }}>
                Offer Chadar
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
