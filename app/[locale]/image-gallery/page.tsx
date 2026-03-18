"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useC } from "@/hooks/useThemeColors";

const t1: Transition = { duration: 0.55, ease: "easeOut" };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t1 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

// ─── all gallery images ───────────────────────────────────────────────────────
type GalleryImage = { src: string; label: string; category: "events" | "dargah" | "services" };

const IMAGES: GalleryImage[] = [
  // Events
  { src: "/images/IMG_20240207_161713-scaled.jpg",          label: "Dam Madar Bedar Par",          category: "events" },
  { src: "/images/20231201014935_IMG_7875-rotated.jpg",     label: "Madar Portrait",               category: "events" },
  { src: "/images/20231201023639_IMG_7928.jpg",             label: "Sadr at Dargah",               category: "events" },
  { src: "/images/IMG-20231203-WA0030.jpg",                 label: "Gaddi Nasheen",                category: "events" },
  { src: "/images/IMG-20240227-WA0018.jpg",                 label: "Sadr",                         category: "events" },
  { src: "/images/IMG-20240227-WA0020.jpg",                 label: "Urs Mubarak",                  category: "events" },
  { src: "/images/IMG-20240227-WA0021.jpg",                 label: "Qutbul Madar Family",          category: "events" },
  { src: "/images/IMG_20230915_170248-scaled.jpg",          label: "Dargah Shareef",               category: "events" },
  { src: "/images/IMG_20231202_150718-scaled.jpg",          label: "Annual Event",                 category: "events" },
  { src: "/images/IMG_20231221_224352-scaled.jpg",          label: "Dam Madar Night",              category: "events" },
  { src: "/images/IMG_20231223_154037-scaled.jpg",          label: "Dua Ceremony",                 category: "events" },
  // Dargah (numbered series)
  { src: "/images/1.jpg",  label: "Dargah Shareef — 1",  category: "dargah" },
  { src: "/images/2.jpg",  label: "Dargah Shareef — 2",  category: "dargah" },
  { src: "/images/3.jpg",  label: "Dargah Shareef — 3",  category: "dargah" },
  { src: "/images/4.jpg",  label: "Dargah Shareef — 4",  category: "dargah" },
  { src: "/images/5.jpg",  label: "Dargah Shareef — 5",  category: "dargah" },
  { src: "/images/6.jpg",  label: "Dargah Shareef — 6",  category: "dargah" },
  { src: "/images/7.jpg",  label: "Dargah Shareef — 7",  category: "dargah" },
  { src: "/images/8.jpg",  label: "Dargah Shareef — 8",  category: "dargah" },
  { src: "/images/9.jpg",  label: "Dargah Shareef — 9",  category: "dargah" },
  { src: "/images/10.jpg", label: "Dargah Shareef — 10", category: "dargah" },
  { src: "/images/11.jpg", label: "Dargah Shareef — 11", category: "dargah" },
  { src: "/images/12.jpg", label: "Dargah Shareef — 12", category: "dargah" },
  { src: "/images/13.jpg", label: "Dargah Shareef — 13", category: "dargah" },
  // Services
  { src: "/images/IMG-20240427-WA0004-1024x466.jpg",  label: "Big Deg Distribution",        category: "services" },
  { src: "/images/IMG-20240427-WA0005-1024x466.jpg",  label: "Big Deg Taqseem",             category: "services" },
  { src: "/images/IMG-20240427-WA0007-1024x683.jpg",  label: "Deg Preparation",             category: "services" },
  { src: "/images/IMG-20240427-WA0008-1024x683.jpg",  label: "Deg at Dargah",               category: "services" },
  { src: "/images/IMG-20240427-WA0009-1-683x1024.jpg", label: "Langar Service",             category: "services" },
  { src: "/images/IMG-20240427-WA0010-1024x683.jpg",  label: "Community Service",           category: "services" },
  { src: "/images/IMG-20240427-WA0011-1-1024x683.jpg", label: "Dargah Service",             category: "services" },
  { src: "/images/IMG-20240427-WA0018.jpg",           label: "Chadar Poshi",                category: "services" },
  { src: "/images/IMG-20240427-WA0021-1024x730.jpg",  label: "Special Dua",                 category: "services" },
  { src: "/images/WhatsApp-Image-2024-04-27-at-19.53.21_1ec0e053-1024x466.jpg", label: "Live Ziyarat", category: "services" },
  { src: "/images/WhatsApp-Image-2024-04-27-at-19.59.08_3441e7a4-466x1024.jpg", label: "Full Ghilaaf", category: "services" },
];

const TABS = [
  { key: "all",      label: "All Photos",    count: IMAGES.length },
  { key: "events",   label: "Events",        count: IMAGES.filter(i => i.category === "events").length },
  { key: "dargah",   label: "Dargah",        count: IMAGES.filter(i => i.category === "dargah").length },
  { key: "services", label: "Services",      count: IMAGES.filter(i => i.category === "services").length },
] as const;

// ─── lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: GalleryImage[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const img = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center
                   bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest uppercase"
           style={{ color: "rgba(200,149,108,0.7)" }}>
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 w-12 h-12 rounded-full flex items-center justify-center
                   bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={img.src}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl mx-4 sm:mx-16 rounded-xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Image
            src={img.src} alt={img.label}
            width={1200} height={800}
            className="object-contain w-full"
            style={{ maxHeight: "80vh" }}
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 px-6 py-4"
             style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
          <p className="text-sm font-semibold text-white">{img.label}</p>
          <p className="text-[11px] mt-0.5" style={{ color: "rgba(200,149,108,0.7)" }}>
            Dargah Qutbul Madar · Makanpur Shareef
          </p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center
                   bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function ImageGalleryPage() {
  const C = useC();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const [activeTab, setActiveTab] = useState<"all" | "events" | "dargah" | "services">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTab === "all" ? IMAGES : IMAGES.filter(i => i.category === activeTab);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => i === null ? null : (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextImage = useCallback(() =>
    setLightboxIndex(i => i === null ? null : (i + 1) % filtered.length), [filtered.length]);

  return (
    <main className="min-h-screen" style={{ background: C.cream, color: C.text }} dir={isRtl ? "rtl" : "ltr"}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(45,122,79,0.14), transparent 60%)" }} />

        {/* Background mosaic of images */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-[0.06] overflow-hidden">
          {IMAGES.slice(0, 8).map((img) => (
            <div key={img.src} className="relative overflow-hidden">
              <Image src={img.src} alt="" fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-16">
          {/* Back button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200 cursor-pointer"
              style={{ color: "rgba(247,244,238,0.35)" }}
            >
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              Back
            </button>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-6 h-px" style={{ background: "#c8956c" }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#e8b48a" }}>
                Visual Archive
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />

            <motion.h1 variants={fadeUp}
                       className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
                       style={{ color: C.onDark }}>
              Image Gallery
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg font-medium mb-8" style={{ color: C.light }}>
              Moments from Dargah Qutbul Madar, Makanpur Shareef
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-10 pt-8"
                        style={{ borderTop: "1px solid rgba(200,149,108,0.1)" }}>
              {TABS.slice(1).map(({ label, count }) => (
                <div key={label}>
                  <p className="text-2xl font-black animate-shimmer">{count}</p>
                  <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>{label}</p>
                </div>
              ))}
              <div>
                <p className="text-2xl font-black animate-shimmer">{IMAGES.length}</p>
                <p className="text-[11px] mt-1 tracking-wide" style={{ color: "rgba(247,244,238,0.3)" }}>Total Photos</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ FILTER TABS ══════════ */}
      <section style={{ background: C.cream2, borderBottom: `1px solid ${C.cream3}` }} className="sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-4">
            {TABS.map(({ key, label, count }) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold
                             tracking-[0.1em] uppercase transition-all duration-200"
                  style={{
                    background: active ? C.gold : "transparent",
                    color:      active ? C.dark : C.muted,
                    border:     active ? `1px solid ${C.gold}` : `1px solid ${C.cream3}`,
                  }}
                >
                  {label}
                  <span className="text-[10px] font-black opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ MASONRY GRID ══════════ */}
      <section className="py-12 lg:py-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
            >
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                  className="break-inside-avoid mb-3 relative group rounded-xl overflow-hidden cursor-pointer"
                  style={{ border: `1px solid ${C.cream3}` }}
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={img.src} alt={img.label}
                    width={600} height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${C.dark}ee 0%, transparent 55%)` }}
                  >
                    <p className="text-xs font-semibold" style={{ color: C.onDark }}>{img.label}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ZoomIn className="w-3 h-3" style={{ color: C.gold }} />
                      <span className="text-[10px]" style={{ color: C.gold }}>Click to enlarge</span>
                    </div>
                  </div>

                  {/* Index badge */}
                  <div className="absolute top-2 start-2 px-2 py-0.5 rounded-full text-[9px] font-black
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                       style={{ background: "rgba(10,31,18,0.7)", color: C.gold, backdropFilter: "blur(4px)" }}>
                    {idx + 1}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-lg font-semibold" style={{ color: C.muted }}>No photos in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pattern-dots" style={{ opacity: 0.3 }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-5">
                <span className="w-6 h-px" style={{ background: "#c8956c" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#e8b48a" }}>
                  Visit Makanpur Shareef
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp}
                         className="text-3xl sm:text-4xl font-bold leading-[1.15] mb-3"
                         style={{ color: C.onDark }}>
                Witness it in person
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed max-w-lg"
                        style={{ color: "rgba(247,244,238,0.45)" }}>
                These photographs capture only a glimpse of the sacred atmosphere at
                Dargah Qutbul Madar. Come experience it yourself.
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
              <Link href={loc("/")}
                    className="text-sm font-medium px-8 py-4 rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
                    style={{ border: "1px solid rgba(200,149,108,0.25)", color: "rgba(247,244,238,0.6)" }}>
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ LIGHTBOX ══════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
