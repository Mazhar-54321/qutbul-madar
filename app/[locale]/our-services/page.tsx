"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";

const t1: Transition = { duration: 0.55, ease: "easeOut" };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const SERVICE_DATA = [
  {
    slug: "mazar-shareef-chadar-poshi",
    image: "/images/IMG-20240427-WA0018.jpg",
    tag: "Sacred Tradition",
  },
  {
    slug: "langar-bhandara",
    image: "/images/IMG_20230915_170248-scaled.jpg",
    tag: "Community Service",
  },
  {
    slug: "dargah-mannat",
    image: "/images/IMG_20231223_154037-scaled.jpg",
    tag: "Spiritual Prayer",
  },
  {
    slug: "special-dua",
    image: "/images/IMG-20240427-WA0021-1024x730.jpg",
    tag: "Dedicated Prayer",
  },
  {
    slug: "full-ghilaf",
    image: "/images/WhatsApp-Image-2024-04-27-at-19.59.08_3441e7a4-466x1024.jpg",
    tag: "Sacred Covering",
  },
  {
    slug: "big-deg",
    image: "/images/IMG-20240427-WA0005-1024x466.jpg",
    tag: "Nourishment",
  },
  {
    slug: "live-ziyarat",
    image: "/images/WhatsApp-Image-2024-04-27-at-19.53.21_1ec0e053-1024x466.jpg",
    tag: "Remote Ziyarat",
  },
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

export default function OurServicesPage() {
  const C = useC();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;
  const services = t.raw("services") as Array<{ title: string }>;

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
            <motion.div variants={fadeUp}><Tag light>Dargah Qutbul Madar</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
                       style={{ color: C.onDark }}>
              Our Services
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              Spiritual &amp; community services at Makanpur Shareef, available year-round to all devotees.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-10 pt-8"
                        style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
              <div>
                <p className="text-2xl font-black animate-shimmer">7</p>
                <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>Services</p>
              </div>
              <div>
                <p className="text-2xl font-black animate-shimmer">365</p>
                <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>Days a year</p>
              </div>
              <div>
                <p className="text-2xl font-black animate-shimmer">Free</p>
                <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>No charge ever</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => {
              const data = SERVICE_DATA[idx];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                >
                  <Link
                    href={loc(`/services/${data.slug}`)}
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: C.white,
                      border: `1px solid ${C.cream3}`,
                      boxShadow: "0 4px 24px rgba(10,31,18,0.06)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 200 }}>
                      <Image src={data.image} alt={service.title} fill
                             className="object-cover transition-transform duration-700 group-hover:scale-105"
                             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0"
                           style={{ background: `linear-gradient(to top, ${C.dark}cc, transparent 60%)` }} />
                      <div className="absolute top-3 start-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                           style={{ background: "rgba(10,31,18,0.75)", backdropFilter: "blur(6px)", color: C.gold, border: "1px solid rgba(201,168,76,0.3)" }}>
                        {data.tag}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1.5" style={{ color: C.gold }}>
                          {String(idx + 1).padStart(2, "0")}
                        </p>
                        <h3 className={`text-[15px] font-bold leading-snug ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
                            style={{ color: C.ink }}>
                          {service.title}
                        </h3>
                      </div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                           style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}>
                        <ArrowUpRight className="w-4 h-4" style={{ color: C.gold }} />
                      </div>
                    </div>
                    <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 mx-6 mb-4 rounded-full"
                         style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp}><Tag light>Get involved</Tag></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold leading-[1.15] mb-3"
                       style={{ color: C.onDark }}>
              Participate in our services
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                      style={{ color: "rgba(247,244,238,0.45)" }}>
              Contact the Dargah to arrange your participation in any of our spiritual or community services.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.25 }}
                      className="flex flex-col gap-3 min-w-[200px]">
            <Link href={loc("/contact")}
                  className="text-sm font-bold px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                  style={{ background: C.gold, color: C.dark }}>
              Contact Us
            </Link>
            <a href="tel:+919838360930"
               className="text-sm font-medium px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
               style={{ border: "1px solid rgba(201,168,76,0.25)", color: "rgba(247,244,238,0.6)" }}>
              Call now
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
