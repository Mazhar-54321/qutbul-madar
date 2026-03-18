"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Phone, MessageCircle,
  Heart, Sparkles, Wind, Globe, Star, BookOpen, Users,
} from "lucide-react";
import { useC } from "@/hooks/useThemeColors";


const t1: Transition = { duration: 0.55, ease: "easeOut" };
const t2: Transition = { duration: 0.5,  ease: "easeOut" };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const fadeIn  = { hidden: { opacity: 0 },         show: { opacity: 1, transition: t2 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const cardMeta = [
  { title: "Heartfelt prayers",    icon: <Heart    className="w-4 h-4" /> },
  { title: "Amplified blessings",  icon: <Sparkles className="w-4 h-4" /> },
  { title: "Sacred atmosphere",    icon: <Wind     className="w-4 h-4" /> },
  { title: "Open to all",          icon: <Globe    className="w-4 h-4" /> },
  { title: "Faith & surrender",    icon: <Star     className="w-4 h-4" /> },
  { title: "Ancient tradition",    icon: <BookOpen className="w-4 h-4" /> },
  { title: "Community of faith",   icon: <Users    className="w-4 h-4" /> },
];

function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? "#e8c96b" : "#c9a84c" }}>{children}</span>
    </div>
  );
}

export default function DargahMannatPage() {
  const C = useC();
  const t = useTranslations("dargah-mannat");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const paragraphs = t("content").split("\n\n").filter(Boolean);
  const contactPara = paragraphs[paragraphs.length - 1];
  const bodyParas   = paragraphs.slice(0, -1);
  const introPara   = bodyParas[0] ?? "";
  const cardParas   = bodyParas.slice(1);

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* ── Sticky top nav bar ───────────────────────────────────────── */}
      <div className="sticky top-16 z-40 flex items-center justify-between px-6 lg:px-16 h-12"
           style={{ background: C.dark, borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <button onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200 cursor-pointer"
                style={{ color: "rgba(247,244,238,0.4)" }}>
          {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          {t("back")}
        </button>
        <span className="text-sm font-bold" style={{ color: C.gold }}>{t("title")}</span>
        <Link href={loc("/our-services")} className="text-xs font-medium transition-colors"
              style={{ color: "rgba(247,244,238,0.35)" }}>
          All services
        </Link>
      </div>

      {/* ── Split hero ───────────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-[360px_1fr] min-h-[calc(100vh-112px)]">

        {/* LEFT — dark sticky panel */}
        <div className="relative flex flex-col justify-between p-8 lg:p-12
                        lg:sticky lg:top-28 lg:h-[calc(100vh-112px)] overflow-hidden"
             style={{ background: C.dark }}>
          <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
          <div className="absolute inset-0"
               style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(45,122,79,0.12), transparent 60%)" }} />
          <div className="absolute inset-0 opacity-[0.06]">
            <Image src="/images/image2.webp" alt="" fill className="object-cover" sizes="360px" />
            <div className="absolute inset-0"
                 style={{ background: `linear-gradient(to bottom, ${C.dark}88, ${C.dark})` }} />
          </div>

          {/* Top content */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
            <motion.div variants={fadeUp}><Tag light>Dargah service</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-10 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-3
                                   ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                       style={{ color: C.onDark }}>
              {t("title")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base font-medium mb-8" style={{ color: C.light }}>
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Arabic calligraphy watermark */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                      className="relative z-10 text-center my-auto py-8 select-none"
                      style={{
                        fontFamily: "var(--font-urdu-display, serif)",
                        fontSize: "clamp(60px, 8vw, 90px)",
                        color: "rgba(201,168,76,0.08)",
                        lineHeight: 1,
                      }}>
            مناّت
          </motion.div>

          {/* Gold stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                      className="relative z-10 grid grid-cols-3 gap-4 pt-6"
                      style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
            {[
              { num: "Daily", label: "Prayers offered" },
              { num: "All",   label: "Faiths welcome" },
              { num: "Free",  label: "No charge" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-lg font-black animate-shimmer">{num}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(247,244,238,0.3)" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — scrollable cream content */}
        <div className="flex flex-col gap-0" style={{ borderInlineStart: `1px solid rgba(201,168,76,0.12)` }}>

          {/* Intro blockquote */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.6 }}
                      className="p-8 lg:p-12" style={{ borderBottom: `1px solid ${C.cream3}` }}>
            <Tag>About this service</Tag>
            <div className="rounded-r-2xl p-7 relative overflow-hidden"
                 style={{ background: C.cream2, borderInlineStart: `3px solid ${C.gold}` }}>
              <div className="absolute top-2 end-4 text-8xl leading-none font-serif select-none"
                   style={{ color: "rgba(201,168,76,0.07)" }}>&quot;</div>
              <p className={`text-lg font-medium leading-[1.85] relative
                             ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                 style={{ color: C.ink }}>
                {introPara}
              </p>
            </div>
          </motion.div>

          {/* Card grid */}
          <div className="p-8 lg:p-12" style={{ borderBottom: `1px solid ${C.cream3}` }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-px" style={{ background: C.gold }} />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: C.gold }}>
                What makes Dargah Mannat special
              </span>
              <div className="flex-1 h-px" style={{ background: C.cream3 }} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {cardParas.map((para, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.45, delay: idx * 0.07 }}
                            className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5
                                        relative overflow-hidden ${idx === 2 ? "sm:col-span-2" : ""}`}
                            style={{
                              background: idx === 1 ? C.dark : C.white,
                              border: idx === 1 ? "1px solid rgba(201,168,76,0.2)" : `1px solid rgba(201,168,76,0.1)`,
                            }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                       style={{
                         background: idx === 1 ? "rgba(201,168,76,0.12)" : C.cream2,
                         color: idx === 1 ? C.gold : C.green,
                       }}>
                    {cardMeta[idx % cardMeta.length].icon}
                  </div>
                  <h3 className="text-[14px] font-bold mb-2 leading-snug"
                      style={{ color: idx === 1 ? C.cream : C.ink }}>
                    {cardMeta[idx % cardMeta.length].title}
                  </h3>
                  <p className="text-sm leading-[1.8]"
                     style={{ color: idx === 1 ? "rgba(247,244,238,0.5)" : C.muted }}>
                    {para}
                  </p>
                  <div className="absolute bottom-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                       style={{ background: C.gold }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image strip */}
          <div className="p-8 lg:p-12" style={{ borderBottom: `1px solid ${C.cream3}` }}>
            <div className="grid grid-cols-3 gap-3 h-44">
              {[
                { src: "/images/image2.webp",  label: "Dargah Shareef" },
                { src: "/images/image9.webp",  label: "Shrine at night" },
                { src: "/images/image10.webp", label: "Annual Urs" },
              ].map(({ src, label }, i) => (
                <motion.div key={src} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative rounded-xl overflow-hidden group cursor-pointer"
                            style={{ border: "1px solid rgba(201,168,76,0.1)" }}>
                  <Image src={src} alt={label} fill
                         className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ background: `linear-gradient(to top, ${C.dark}cc, transparent)` }}>
                    <span className="text-xs font-medium" style={{ color: C.gold }}>{label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.55 }}
                      className="p-8 lg:p-12" style={{ borderBottom: `1px solid ${C.cream3}` }}>
            <div className="rounded-2xl p-8"
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
              <motion.div variants={fadeUp}><Tag light>Offer your prayers</Tag></motion.div>
              <motion.h2 variants={fadeUp}
                         className={`text-3xl sm:text-4xl font-bold leading-[1.15] mb-3 ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                         style={{ color: C.onDark }}>
                {t("participate")}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                Entrust your heartfelt prayers to the divine grace of Hazrat Qutbul Madar
                at Makanpur Shareef — and experience the peace of surrender and faith.
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
