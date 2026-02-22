"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function MadarShareefPage() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full -translate-x-1/2" />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t("back")}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
text-[clamp(2.5rem,5vw,4.5rem)]
font-extrabold
leading-[1.2]
tracking-normal
break-words
bg-gradient-to-r from-blue-400 via-white to-blue-400
bg-clip-text text-transparent
"
        >
          {t("madarTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="
mt-6
max-w-3xl
mx-auto
text-lg sm:text-xl
leading-relaxed
break-words
text-neutral-300
"
        >
          {t("madarSubtitle")}
        </motion.p>
      </section>

      {/* Image Section */}
      <section className="relative max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-[16/7] overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/chadar-poshi.webp"
            alt="Madar Shareef"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8 text-neutral-300 text-lg leading-relaxed"
        >
          {t("madarShareefChadarPoshi")
            .split("\n\n")
            .map((para: string, i: number) => (
              <p key={i} className="tracking-wide">
                {para}
              </p>
            ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-blue-500/40">
            {t("offerChadar")}
          </button>
        </motion.div>
      </section>
    </div>
  );
}
