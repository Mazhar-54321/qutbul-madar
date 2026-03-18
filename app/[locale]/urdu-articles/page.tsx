"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";

const t1: Transition = { duration: 0.55, ease: "easeOut" };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const ARTICLE_IMAGES = [
  "/images/1-760x428.jpg",
  "/images/2-760x428.jpg",
  "/images/3-760x428.jpg",
  "/images/4-760x428.jpg",
  "/images/5-760x428.jpg",
  "/images/6-760x428.jpg",
  "/images/7-760x428.jpg",
];

function Tag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="w-6 h-px" style={{ background: "#c8956c" }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: light ? "#e8b48a" : "#c8956c" }}>{children}</span>
    </div>
  );
}

export default function UrduArticlesPage() {
  const C = useC();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const articles = t.raw("articles") as Array<{ title: string; description: string }>;

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* HERO */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(45,122,79,0.14), transparent 60%)" }} />

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
            <motion.div variants={fadeUp}><Tag light>Knowledge & Research</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
                       style={{ color: C.onDark }}>
              Urdu Articles
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-medium" style={{ color: C.light }}>
              Urdu scholarly writings on the life and legacy of Hazrat Qutbul Madar
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-20" style={{ background: C.cream }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-8">
            {articles.map((article, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: C.white,
                  border: `1px solid ${C.cream3}`,
                  boxShadow: "0 4px 20px rgba(10,31,18,0.05)",
                }}
              >
                <div className="h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                     style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                <div className="grid md:grid-cols-[240px_1fr] gap-0">
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ minHeight: 180 }}>
                    <Image
                      src={ARTICLE_IMAGES[idx] ?? ARTICLE_IMAGES[0]}
                      alt={article.title}
                      fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="240px"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-7 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: C.gold }}>
                        Article {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className={`text-lg font-bold leading-snug font-[var(--font-urdu-display)]`}
                        style={{ color: C.ink }}>
                      {article.title}
                    </h2>
                    <p className={`text-[14px] leading-[1.85] line-clamp-4 font-[var(--font-urdu-display)]`}
                       style={{ color: C.muted }}>
                      {article.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
