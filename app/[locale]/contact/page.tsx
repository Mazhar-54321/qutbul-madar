"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
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

const contacts = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98383 60930",
    href: "tel:+919838360930",
    action: "Call now",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 98383 60930",
    href: "https://wa.me/919838360930",
    action: "Message us",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@qutbulmadar.org",
    href: "mailto:info@qutbulmadar.org",
    action: "Send email",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Dargah Qutbul Madar, Makanpur, Kanpur, Uttar Pradesh, India",
    href: "https://maps.google.com/?q=Makanpur+Kanpur+Uttar+Pradesh",
    action: "Get directions",
  },
];

export default function ContactPage() {
  const C = useC();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = ["ur", "ar"].includes(locale);
  const loc = (href: string) => `/${locale}${href}`;

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
                    className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer transition-colors"
                    style={{ color: "rgba(247,244,238,0.35)" }}>
              {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              Back
            </button>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={fadeUp}><Tag light>Get in touch</Tag></motion.div>
            <motion.div variants={fadeUp} className="w-12 h-1 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
            <motion.h1 variants={fadeUp}
                       className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
                       style={{ color: C.onDark }}>
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-medium" style={{ color: C.light }}>
              Reach out to Dargah Qutbul Madar, Makanpur Shareef
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-20" style={{ background: C.cream }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 gap-5">
            {contacts.map(({ icon: Icon, label, value, href, action }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: C.white,
                  border: `1px solid ${C.cream3}`,
                  boxShadow: "0 4px 24px rgba(10,31,18,0.06)",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: "rgba(201,168,76,0.1)", color: C.gold }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5" style={{ color: C.gold }}>{label}</p>
                  <p className="text-[15px] font-semibold leading-snug" style={{ color: C.ink }}>{value}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: C.green }}>
                  <span>{action}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="h-px w-0 group-hover:w-full transition-all duration-500"
                     style={{ background: C.gold }} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* INFO BLOCK */}
      <section className="pb-20" style={{ background: C.cream }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-5">

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl p-8"
              style={{ background: C.dark, border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-5 h-5" style={{ color: C.gold }} />
                <Tag light>Visiting Hours</Tag>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  { day: "All Days", time: "Open 24 hours" },
                  { day: "Urs Mubarak", time: "13–15 February (Special)" },
                  { day: "Monthly Jalsa", time: "17th of every Hijri month" },
                ].map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between py-2.5"
                      style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    <span className="text-sm" style={{ color: "rgba(247,244,238,0.55)" }}>{day}</span>
                    <span className="text-sm font-semibold" style={{ color: C.onDark }}>{time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8"
              style={{ background: C.cream2, border: `1px solid ${C.cream3}` }}
            >
              <Tag>Explore</Tag>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: C.muted }}>
                Learn more about the Dargah, its services, and the legacy of Hazrat Qutbul Madar.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Our Services", href: "/our-services" },
                  { label: "About Us", href: "/about-us" },
                  { label: "History", href: "/history" },
                  { label: "Image Gallery", href: "/image-gallery" },
                ].map(({ label, href }) => (
                  <Link key={href} href={loc(href)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{ background: C.white, color: C.ink, border: `1px solid ${C.cream3}` }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.gold; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.cream3; }}>
                    {label}
                    <ChevronRight className="w-3.5 h-3.5" style={{ color: C.gold }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
