"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";
import { ARTICLES, getArticleBySlug } from "@/data/articles";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };
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

export default function ArticleDetailPage() {
  const C = useC();
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);

  const currentIdx = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIdx > 0 ? ARTICLES[currentIdx - 1] : null;
  const nextArticle = currentIdx < ARTICLES.length - 1 ? ARTICLES[currentIdx + 1] : null;

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: C.cream }}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4" style={{ color: C.ink }}>Article not found</p>
          <Link href={loc("/articles")} className="text-sm font-bold px-6 py-3 rounded-xl"
                style={{ background: C.dark, color: C.onDark }}>
            Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* HERO */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(200,149,108,0.14), transparent 60%)" }} />

        {/* Faint bg image */}
        <div className="absolute inset-0 opacity-[0.08]">
          <Image src={article.image} alt="" fill className="object-cover" sizes="100vw" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-16 pt-10 pb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
            <button onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer"
                    style={{ color: "rgba(247,244,238,0.35)" }}>
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              Back
            </button>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}><Tag light>Article</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-5"
                       style={{ color: C.onDark }}>
              {article.title}
            </motion.h1>
            <motion.div variants={fadeUp} className="flex items-center gap-2" style={{ color: "rgba(247,244,238,0.45)" }}>
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{article.date}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <div className="relative w-full" style={{ height: 360 }}>
        <Image src={article.image} alt={article.title} fill
               className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0"
             style={{ background: `linear-gradient(to bottom, transparent 40%, ${C.cream})` }} />
      </div>

      {/* ARTICLE BODY */}
      <section className="py-12 lg:py-16" style={{ background: C.cream }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">

          {/* Lead / description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="text-lg font-medium leading-[1.8] mb-10 pb-10"
            style={{ color: C.ink, borderBottom: `2px solid ${C.gold}` }}
          >
            {article.description}
          </motion.p>

          {/* Body paragraphs */}
          <div className="flex flex-col gap-5">
            {article.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.2) }}
                className="text-[15px] leading-[1.9]"
                style={{ color: C.muted }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      {(prevArticle || nextArticle) && (
        <section className="py-12" style={{ background: C.cream2, borderTop: `1px solid ${C.cream3}` }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-6" style={{ color: C.muted }}>
              More Articles
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {prevArticle && (
                <Link href={loc(`/articles/${prevArticle.slug}`)}
                      className="group flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: C.white, border: `1px solid ${C.cream3}` }}>
                  <div className="relative rounded-xl overflow-hidden" style={{ height: 120 }}>
                    <Image src={prevArticle.image} alt={prevArticle.title} fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="300px" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: C.gold }}>Previous</p>
                    <p className="text-sm font-bold leading-snug line-clamp-2" style={{ color: C.ink }}>{prevArticle.title}</p>
                  </div>
                </Link>
              )}
              {nextArticle && (
                <Link href={loc(`/articles/${nextArticle.slug}`)}
                      className="group flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 sm:col-start-2"
                      style={{ background: C.white, border: `1px solid ${C.cream3}` }}>
                  <div className="relative rounded-xl overflow-hidden" style={{ height: 120 }}>
                    <Image src={nextArticle.image} alt={nextArticle.title} fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="300px" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: C.gold }}>Next</p>
                    <p className="text-sm font-bold leading-snug line-clamp-2" style={{ color: C.ink }}>{nextArticle.title}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <Tag light>Explore more</Tag>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: C.onDark }}>Read all articles</h2>
            <p className="text-sm mt-2" style={{ color: "rgba(247,244,238,0.45)" }}>
              Scholarly writings on the life and legacy of Hazrat Qutbul Madar.
            </p>
          </div>
          <Link href={loc("/articles")}
                className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-xl shrink-0 transition-all duration-200 active:scale-[0.97]"
                style={{ background: C.gold, color: C.dark }}>
            All Articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
