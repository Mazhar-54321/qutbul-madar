"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Download,
  Search,
  FileText,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── books data ───────────────────────────────────────────────────────────────
const BOOKS = [
  { title: "Urdu Book",                                    file: "5_6086670301469344106.pdf" },
  { title: "Madarul Mohaam",                               file: "Madarul-mohaam-urdu.pdf" },
  { title: "Tazkira Madarul Alameen",                      file: "Tazkira-madarul-alameen-urdu.pdf" },
  { title: "Serul Madar Maroof Zaheerul Abrar",            file: "Serul-madar-maroof-zaheerul-abrar-urdu-pdf.pdf" },
  { title: "Serul Madar – Part 2",                         file: "Serul-madar-urdu-par-2.pdf" },
  { title: "Jamale Madariyat",                             file: "Jamale-Madariyat-Urdu-pdf.pdf" },
  { title: "Qutbe Wahdat",                                 file: "Qutbe-Wahdat.pdf" },
  { title: "Hazrat Shadana Barelvi Ek Madari Buzurg",      file: "Hazrat-shadana-Barelvi-ek-Madari-Buzurgpdf-urdu.pdf" },
  { title: "Hazrat Makhdoom Ashraf Aur Qutbul Madar",      file: "Hazrat-Makhdoom-ashrf-Aur-Qutbulmadarpdf-urdu.pdf" },
  { title: "Hazrat Ghareeb Nawaz Aur Khidmate Khalq",      file: "Hazrat-ghareeb-nawaz-aur-khidmate-khalqpdf-urdu.pdf" },
  { title: "Tassawwuf Ki Aadh Me Shiyat Ka Fareb",         file: "Tassawwuf-Ki-Aadh-Me-Shiyat-Ka-Fareb.pdf" },
  { title: "Shajra Urdu",                                  file: "Adobe-Scan-24-Jul-2023.pdf" },
  { title: "Tazkira Mashaikh Madariya",                    file: "Tazkira-mashaikh-madariya-pdfurdu.pdf" },
  { title: "Silsilay Madariya – New Addition",             file: "Silsilay-Madariya-pdf-New-addition.pdf" },
  { title: "Taziyadari",                                   file: "Taziyadari-urdu-pdf.pdf" },
  { title: "Takiya Aur Chilla Ki Azmat o Shan",            file: "Takiya-Aur-chilla-Ki-Azmat-o-shan.pdf" },
  { title: "Khanqahe Madariya k Sajjada Nasheen",          file: "Khanqahe-Madariya-k-Sajjada-nasheen.pdf" },
  { title: "Faizane Madarul Alameen",                      file: "Faizane-madarul-alameen-urdu-pdf.pdf" },
  { title: "Auraad o Wazaaif e Madariya",                  file: "Auraad-o-wazaaif-e-Madariya-urdu-pdf.pdf" },
  { title: "Zarbe Madar",                                  file: "ZARBE-MADAR.pdf" },
  { title: "Maarif e Qutbul Madar",                        file: "Maarif-e-Qutbulmadar-pdf-urdu.pdf" },
  { title: "Ghosul Aalam Madare Paak Number",              file: "0000_GA_Final-January-2019.pdf" },
  { title: "Fehrist Afkar-e-Sufiya Sattarween Shareef",    file: "Fehrist-Afkar-e-Sufiya-Sattarween-shareef-urdu-pdf.pdf" },
  { title: "Guru Nanak Aur Silsilay Madariya",             file: "Guru-Nanak-aur-Silsilay-Madariya.pdf" },
  { title: "Silsilay Madariya",                            file: "Silsilay-Madariya-pdf-urdu.pdf" },
  { title: "Mirate Madari",                                file: "Mirate_Madari_urdu.pdf" },
  { title: "Tawafe Istefaza",                              file: "Tawafe-istefaza-pdf-urdu.pdf" },
  { title: "Shajra Khaas Sajjada Nasheen",                 file: "Shajra-khaas-Sajjada-nasheen.pdf" },
  { title: "Maqame Qutbul Madar",                          file: "Maqame-Qutbulmadar-pdf-urdu.pdf" },
  { title: "Kundo Ki Niyaaz Ka Sharaye Hukm",              file: "Kundo-ki-niyaaz-ka-sharaye-Hukm-pdfurdu.pdf" },
];

// ─── pdf modal ────────────────────────────────────────────────────────────────
function PdfModal({ url, downloadUrl, title, onClose }: { url: string; downloadUrl: string; title: string; onClose: () => void }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: C.cream }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ background: C.dark, color: C.cream }}
        >
          <span className="text-sm font-bold truncate max-w-[60%]">{title}</span>
          <div className="flex items-center gap-3">
            {/* Zoom controls */}
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs tabular-nums w-10 text-center">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {/* Download */}
            <a
              href={downloadUrl}
              download={title}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </a>
            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="flex-1 overflow-auto flex flex-col items-center py-4 px-2 gap-3"
          style={{ background: "#525659" }}
        >
          {loading && (
            <div className="flex flex-col items-center justify-center h-48 gap-3" style={{ color: C.cream }}>
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm">Loading PDF…</span>
            </div>
          )}
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => setLoading(false)}
            loading=""
          >
            <div className="shadow-lg">
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </div>
          </Document>
        </div>

        {/* Footer pagination */}
        {numPages > 0 && (
          <div
            className="flex items-center justify-center gap-4 px-5 py-2.5 flex-shrink-0 text-sm font-medium"
            style={{ background: C.dark, color: C.cream }}
          >
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="tabular-nums text-xs">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── book card ────────────────────────────────────────────────────────────────
function BookCard({
  title,
  file,
  idx,
  isRtl,
}: {
  title: string;
  file: string;
  idx: number;
  isRtl: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pdfPath = `https://github.com/Mazhar-54321/qutbul-madar/releases/download/Urdu-Books/${file}`;
  const proxyPath = `/api/pdf?file=${encodeURIComponent(file)}`;

  return (
    <>
      {open && <PdfModal url={proxyPath} downloadUrl={pdfPath} title={title} onClose={() => setOpen(false)} />}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: (idx % 6) * 0.06 }}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{ background: C.white, borderColor: C.cream3 }}
    >
      {/* Top colour band */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(to right, ${C.dark}, ${C.mid})` }}
      />

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Book icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                       transition-colors duration-300 group-hover:bg-[#2d7a4f]"
            style={{ background: C.cream2 }}
          >
            <BookOpen
              className="w-5 h-5 transition-colors duration-300 group-hover:text-white"
              style={{ color: C.mid }}
            />
          </div>
          {/* Index badge */}
          <span
            className="text-[10px] font-bold tabular-nums px-2 py-1 rounded-full flex-shrink-0"
            style={{ background: C.cream2, color: C.mid }}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <div className="flex-1">
          <div className="w-6 h-0.5 rounded-full mb-3" style={{ background: C.mid }} />
          <h3
            className={`text-[14px] font-bold leading-snug
                        ${isRtl ? "font-[var(--font-urdu-display)]" : ""}`}
            style={{ color: C.dark }}
          >
            {title}
          </h3>
          <p className="text-[11px] mt-1.5 font-medium" style={{ color: C.muted }}>
            Urdu · PDF
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2" style={{ borderTop: `1px solid ${C.cream3}` }}>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold
                       px-3 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
            style={{ background: C.dark, color: C.cream }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Read
          </button>
          <a
            href={pdfPath}
            download={title}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold
                       px-3 py-2.5 rounded-xl border transition-all duration-200 active:scale-[0.97]"
            style={{
              background: C.cream2,
              borderColor: C.cream3,
              color: C.text,
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>
    </motion.div>
    </>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function UrduBooksPage() {
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

  const [query, setQuery] = useState("");

  const filtered = BOOKS.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main
      className="min-h-screen"
      style={{ background: C.cream, color: C.text }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════ HERO ══════════════════════════════ */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.light} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-16">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <Link
              href={loc("/")}
              className="inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200"
              style={{ color: "rgba(247,244,238,0.4)" }}
            >
              {isRtl ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
              Back to home
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px" style={{ background: C.light }} />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: C.light }}
              >
                Islamic & Sufi Literature
              </span>
            </motion.div>

            {/* Arabic accent */}
            <motion.div
              variants={fadeUp}
              className="text-3xl mb-2 opacity-10 font-serif"
              style={{ color: C.cream, fontFamily: "var(--font-urdu-display, serif)" }}
            >
              کتب اردو
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-3"
              style={{ color: C.cream }}
            >
              Urdu Books
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(247,244,238,0.55)" }}
            >
              A curated collection of Urdu books on Hazrat Qutbul Madar, the Madariya
              Silsilah, and Sufi traditions — available to read online or download free.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-8 pt-8"
              style={{ borderTop: "1px solid rgba(247,244,238,0.08)" }}
            >
              {[
                { num: "30", label: "Books available" },
                { num: "Free", label: "No charge" },
                { num: "PDF", label: "Format" },
                { num: "Urdu", label: "Language" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold tabular-nums" style={{ color: C.light }}>
                    {num}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(247,244,238,0.35)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ SEARCH BAR ════════════════════════════ */}
      <section className="py-8 sticky top-[56px] z-30" style={{ background: C.cream2, borderBottom: `1px solid ${C.cream3}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search
                className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 pointer-events-none"
                style={{ color: C.muted }}
              />
              <input
                type="text"
                placeholder="Search books…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: C.white,
                  border: `1px solid ${C.cream3}`,
                  color: C.text,
                }}
                onFocus={(e) => (e.target.style.borderColor = C.mid)}
                onBlur={(e) => (e.target.style.borderColor = C.cream3)}
              />
            </div>

            {/* Count */}
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: C.muted }} />
              <span className="text-sm font-semibold" style={{ color: C.muted }}>
                {filtered.length} of {BOOKS.length} books
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ BOOKS GRID ════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((book, idx) => (
                <BookCard
                  key={book.file}
                  title={book.title}
                  file={book.file}
                  idx={BOOKS.indexOf(book)}
                  isRtl={isRtl}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: C.cream3 }} />
              <p className="text-lg font-semibold mb-1" style={{ color: C.dark }}>
                No books found
              </p>
              <p className="text-sm" style={{ color: C.muted }}>
                Try a different search term
              </p>
            </motion.div>
          )}
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
                More resources
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold leading-[1.15] mb-3"
                style={{ color: C.cream }}
              >
                Explore more about Qutbul Madar
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-relaxed max-w-lg"
                style={{ color: "rgba(247,244,238,0.55)" }}
              >
                Read the full history, browse articles, or visit the gallery to
                learn more about the life and legacy of Hazrat Syed Badiuddin
                Zinda Shah Madar.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-3 min-w-[180px]"
            >
              <Link
                href={loc("/history")}
                className="text-sm font-bold px-8 py-4 rounded-xl text-center
                           transition-all duration-200 active:scale-[0.98]"
                style={{ background: C.cream, color: C.dark }}
              >
                Read History
              </Link>
              <Link
                href={loc("/image-gallery")}
                className="text-sm font-medium px-8 py-4 rounded-xl text-center border
                           transition-all duration-200 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(247,244,238,0.2)",
                  color: "rgba(247,244,238,0.7)",
                }}
              >
                View Gallery
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
