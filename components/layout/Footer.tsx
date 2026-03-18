"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { DonateModal } from "@/components/shared/DonateModal";

const C = {
  dark:  "#0f2419",
  mid:   "#2d7a4f",
  gold:  "#c9a84c",
  cream: "#f7f4ee",
  muted: "rgba(247,244,238,0.45)",
  dim:   "rgba(247,244,238,0.08)",
  line:  "rgba(201,168,76,0.15)",
};

const links = {
  navigate: [
    { label: "About Us",    href: "/about-us" },
    { label: "History",     href: "/history" },
    { label: "Our Services",href: "/our-services" },
    { label: "Image Gallery",href: "/image-gallery" },
    { label: "Contact",     href: "/contact" },
  ],
  books: [
    { label: "Urdu Books",  href: "/urdu-books" },
    { label: "Farsi Books", href: "/farsi-books" },
    { label: "Hindi Books", href: "/hindi-books" },
    { label: "Urdu Articles", href: "/urdu-articles" },
    { label: "English Articles", href: "/english-articles" },
  ],
};

export default function Footer() {
  const locale = useLocale();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      style={{ background: C.dark }}
    >
      {/* ── Gold top border ────────────────────────────────────────── */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }}
      />

      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Monogram */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center rounded-lg text-[11px] font-black"
                style={{
                  width: 36, height: 36,
                  background: "rgba(201,168,76,0.08)",
                  border: `1px solid rgba(201,168,76,0.35)`,
                  color: C.gold,
                  letterSpacing: "0.06em",
                }}
              >
                QM
              </div>
              <div>
                <p className="text-sm font-bold leading-tight tracking-wide" style={{ color: C.cream }}>
                  Qutbul Madar
                </p>
                <p className="text-[9px] tracking-[0.12em] uppercase" style={{ color: "rgba(201,168,76,0.55)" }}>
                  Makanpur Shareef
                </p>
              </div>
            </div>

            {/* Arabic calligraphy */}
            <p
              className="text-2xl mb-4 leading-loose"
              style={{
                color: "rgba(201,168,76,0.2)",
                fontFamily: "var(--font-urdu-display, serif)",
              }}
            >
              قطب المدار
            </p>

            <p className="text-[13px] leading-relaxed mb-6" style={{ color: C.muted }}>
              The official website of Hazrat Qutbul Madar, the luminous Sufi saint
              of Makanpur Shareef, Uttar Pradesh, India.
            </p>

            {/* Gold divider */}
            <div className="h-px w-12 rounded-full" style={{ background: C.gold, opacity: 0.4 }} />
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5 flex items-center gap-2"
              style={{ color: C.gold }}
            >
              <span className="w-4 h-px" style={{ background: C.gold }} />
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.navigate.map((l) => (
                <li key={l.href}>
                  <Link
                    href={loc(l.href)}
                    className="text-[13px] transition-colors duration-200 hover:text-[#c9a84c]"
                    style={{ color: C.muted }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setDonateOpen(true)}
                  className="text-[13px] transition-colors duration-200 hover:text-[#c9a84c]"
                  style={{ color: C.muted }}
                >
                  Donate
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 — Books & Articles */}
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5 flex items-center gap-2"
              style={{ color: C.gold }}
            >
              <span className="w-4 h-px" style={{ background: C.gold }} />
              Books & Articles
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.books.map((l) => (
                <li key={l.href}>
                  <Link
                    href={loc(l.href)}
                    className="text-[13px] transition-colors duration-200 hover:text-[#c9a84c]"
                    style={{ color: C.muted }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5 flex items-center gap-2"
              style={{ color: C.gold }}
            >
              <span className="w-4 h-px" style={{ background: C.gold }} />
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.gold, opacity: 0.7 }} />
                <span className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
                  Dargah Qutbul Madar,<br />
                  Makanpur, Kanpur,<br />
                  Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: C.gold, opacity: 0.7 }} />
                <a
                  href="tel:+919838360930"
                  className="text-[13px] transition-colors duration-200 hover:text-[#c9a84c]"
                  style={{ color: C.muted }}
                >
                  +91 98383 60930
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: C.gold, opacity: 0.7 }} />
                <a
                  href="mailto:info@qutbulmadar.org"
                  className="text-[13px] transition-colors duration-200 hover:text-[#c9a84c]"
                  style={{ color: C.muted }}
                >
                  info@qutbulmadar.org
                </a>
              </li>
            </ul>

            {/* Donate CTA */}
            <button
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center gap-2 mt-7 text-[12px] font-bold px-5 py-2.5
                         rounded-lg transition-all duration-200 active:scale-[0.97]"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: `1px solid rgba(201,168,76,0.3)`,
                color: C.gold,
              }}
            >
              Donate to the Shrine
            </button>
          </div>
        </div>

        {/* ── Bottom row ──────────────────────────────────────────── */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mt-14 pt-6"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          <p className="text-[11px]" style={{ color: "rgba(247,244,238,0.25)" }}>
            © {new Date().getFullYear()} Qutbul Madar Dargah, Makanpur Shareef. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "rgba(247,244,238,0.18)" }}>
            Est. 12th Century · 596 Years of Spiritual Legacy
          </p>
        </div>
      </div>
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </footer>
  );
}
