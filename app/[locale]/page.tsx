"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  HeartHandshake,
  BookOpen,
  Users,
  Landmark,
  PhoneCall,
  Zap,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // ← shadcn carousel
import { cn } from "@/lib/utils";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = ["ur", "ar", "fa", "he"].includes(locale);
  const slideFrom = isRtl ? 60 : -60;

  const sections = t.raw("sections") as Array<{
    title: string;
    description: string;
  }>;

  const services = t.raw("services") as Array<{ title: string }>;

  // Unique icons for features
  const featureIcons = [
    <Zap className="w-8 h-8 text-primary" />,
    <HeartHandshake className="w-8 h-8 text-primary" />,
    <BookOpen className="w-8 h-8 text-primary" />,
    <Users className="w-8 h-8 text-primary" />,
    <Landmark className="w-8 h-8 text-primary" />,
    <PhoneCall className="w-8 h-8 text-primary" />,
  ];

  return (
    <div className="relative bg-background min-h-screen overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/qutbul-madar-main.webp"
            alt={t("heroImageAlt")}
            fill
            priority
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 px-6 text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl leading-tight">
            {t("heroTitle", { default: "Qutbul Madar" })}
          </h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <ChevronDown className="w-10 h-10 animate-bounce" />
        </motion.div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="relative py-32 md:py-40 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t("introTitle", { default: "Our Sacred Journey" })}
            </h2>
            <Separator className="w-24 h-1 mx-auto mb-12 bg-primary/60" />
            <p className="text-xl sm:text-2xl leading-relaxed text-muted-foreground font-light">
              {t("introduction")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section className="relative py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {t("key-features")}
            </h2>
            <Separator className="w-24 h-1 mx-auto bg-primary/60" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((el, idx) => (
              <motion.div
                key={el.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        {featureIcons[idx % featureIcons.length]}
                      </div>
                      <CardTitle className="text-2xl">{el.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {el.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative py-32 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {t("qutbul-madar-services")}
            </h2>
            <Separator className="w-24 h-1 mx-auto bg-primary/60" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((el, idx) => (
              <motion.div
                key={el.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <Badge className="h-12 w-12 rounded-full text-lg font-bold flex items-center justify-center bg-primary/10 text-primary border-primary/30">
                        {idx + 1}
                      </Badge>
                      <CardTitle className="text-xl">{el.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/services/${el.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      {t("learnMore", { default: "Learn More" })}
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEW: IMAGE GALLERY SECTION ================= */}
      {/* ================= IMAGE GALLERY ================= */}
      <section className="relative py-16 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {t("imageGallery", { default: "Image Gallery" })}
            </h2>
            <Separator className="w-24 h-1 mx-auto bg-primary/60" />
          </motion.div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {[
                "/images/image1.webp",
                "/images/image2.webp",
                "/images/image3.webp",
                "/images/image4.webp",
                // add more images here if you have
              ].map((imgSrc, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <Image
                      src={imgSrc}
                      alt={`Gallery image ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows only on larger screens */}
            <div className="hidden sm:block">
              <CarouselPrevious className="left-2 md:left-4" />
              <CarouselNext className="right-2 md:right-4" />
            </div>

            {/* Dots visible on all screens – clean & touch-friendly */}
            <div className="mt-6 flex justify-center gap-3">
              {Array.from({ length: 4 }).map(
                (
                  _,
                  idx, // change 4 to your actual image count
                ) => (
                  <button
                    key={idx}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      idx === 0
                        ? "bg-primary w-6"
                        : "bg-muted hover:bg-primary/70",
                    )}
                    // You can make them clickable if you add carousel API later
                  />
                ),
              )}
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  );
}

// Unique icons for features
const featureIcons = [
  <Zap className="w-8 h-8 text-primary" />,
  <HeartHandshake className="w-8 h-8 text-primary" />,
  <BookOpen className="w-8 h-8 text-primary" />,
  <Users className="w-8 h-8 text-primary" />,
  <Landmark className="w-8 h-8 text-primary" />,
  <PhoneCall className="w-8 h-8 text-primary" />,
];
