"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles (you can import more like 'swiper/css/effect-fade')
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
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
  Star,
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = ["ur", "ar", "fa", "he"].includes(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showAllImages, setShowAllImages] = useState(false);
  const galleryImages = [
    "/images/image1.webp",
    "/images/image2.webp",
    "/images/image3.webp",
    "/images/image4.webp",
    "/images/image5.webp",
    "/images/image6.webp",
    "/images/image7.webp",
    "/images/image8.webp",
    "/images/image9.webp",
    "/images/image10.webp",
    "/images/image11.webp",
    "/images/image12.webp",
    "/images/image13.webp",
    "/images/image14.webp",
    "/images/image15.webp",
    "/images/image16.webp",
    "/images/image17.webp",
    "/images/image18.webp",
    "/images/image19.webp",
    "/images/image20.webp",
  ];
  const images = [
    { original: "/images/image1.webp", thumbnail: "/thumb1.jpg" },
    { original: "/images/image2.webp", thumbnail: "/thumb2.jpg" },
    { original: "/images/image3.webp", thumbnail: "/thumb1.jpg" },
    { original: "/images/image4.webp", thumbnail: "/thumb2.jpg" },
  ];
  const displayedImages = showAllImages
    ? galleryImages
    : galleryImages.slice(0, 6);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const sections = t.raw("sections") as Array<{
    title: string;
    description: string;
  }>;

  const services = t.raw("services") as Array<{ title: string }>;

  const featureIcons = [
    <Zap key="1" className="w-8 h-8" />,
    <HeartHandshake key="2" className="w-8 h-8" />,
    <BookOpen key="3" className="w-8 h-8" />,
    <Users key="4" className="w-8 h-8" />,
    <Landmark key="5" className="w-8 h-8" />,
    <PhoneCall key="6" className="w-8 h-8" />,
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-background min-h-screen overflow-x-hidden"
    >
      {/* ================= HERO SECTION WITH PARALLAX ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/qutbul-madar-main.webp"
            alt={t("heroImageAlt")}
            fill
            priority
            className="object-cover brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x:
                    typeof window !== "undefined"
                      ? Math.random() * window.innerWidth
                      : 0,
                  y:
                    typeof window !== "undefined"
                      ? Math.random() * window.innerHeight
                      : 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 px-6 text-center max-w-6xl mx-auto"
        >
          {/* Decorative stars */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center gap-4 mb-8"
          >
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-white drop-shadow-2xl leading-tight mb-6"
          >
            {t("heroTitle")}
          </motion.h1>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/70">
            <ChevronDown className="w-8 h-8" />
          </div>
        </motion.div>
      </section>

      {/* ================= INTRODUCTION WITH REVEAL ANIMATION ================= */}
      <section className="relative py-32 md:py-40 bg-muted/5 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-1 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-12 text-foreground leading-[1.1] relative inline-block">
              {t("introTitle")}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-2xl sm:text-3xl leading-relaxed text-muted-foreground font-light max-w-4xl mx-auto"
            >
              {t("introduction")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= KEY FEATURES WITH 3D HOVER EFFECT ================= */}
      <section className="relative py-32 bg-chart-1/5">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              {t("key-features")}
            </h2>
            <Separator className="w-32 h-1.5 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((el, idx) => (
              <motion.div
                key={el.title}
                initial={{ opacity: 0, y: 80, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{
                  y: -16,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                style={{ perspective: 1000 }}
              >
                <Card className="h-full overflow-hidden border-2 border-border/30 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl bg-gradient-to-br from-background to-muted/20 group relative">
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                  </div>

                  <CardHeader className="pb-6 relative">
                    <div className="flex items-start gap-5">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-chart-1/20 flex items-center justify-center text-primary shadow-lg group-hover:shadow-primary/20"
                      >
                        {featureIcons[idx % featureIcons.length]}
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold leading-tight">
                          {el.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-base leading-relaxed">
                      {el.description}
                    </CardDescription>
                  </CardContent>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-1 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES WITH MAGNETIC HOVER ================= */}
      <section className="relative py-32 bg-chart-2/5 overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              {t("qutbul-madar-services")}
            </h2>
            <Separator className="w-32 h-1.5 mx-auto bg-gradient-to-r from-transparent via-chart-2 to-transparent" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((el, idx) => (
              <motion.div
                key={el.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  rotateZ: idx % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="h-full overflow-hidden border-2 border-border/30 hover:border-chart-2/50 transition-all duration-500 shadow-lg hover:shadow-2xl bg-gradient-to-br from-background via-background to-chart-2/5 group relative">
                  {/* Number badge with glow */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-chart-2/80 to-chart-2 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-chart-2/30"
                    >
                      {idx + 1}
                    </motion.div>
                  </div>

                  <CardHeader className="pb-4 pt-6">
                    <CardTitle className="text-2xl font-bold pr-16">
                      {el.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Link
                      href={`/services/${el.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group/link inline-flex items-center gap-2 text-chart-2 font-semibold hover:gap-4 transition-all duration-300"
                    >
                      <span>{t("learnMore")}</span>
                      <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>

                  {/* Gradient bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-chart-2 via-primary to-chart-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMAGE GALLERY WITH REVEAL ================= */}
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]} // Add EffectCoverflow
          effect="coverflow"
          coverflowEffect={{
            rotate: 50, // How much rotation (higher = more dramatic)
            stretch: 0, // Space between slides
            depth: 200, // 3D depth (higher = more "pop out")
            modifier: 1, // Strength of effect
            slideShadows: true, // Nice shadows for realism
            scale: 0.9, // Slightly smaller non-active slides
          }}
          grabCursor={true} // Shows hand cursor on drag – feels interactive
          centeredSlides={true} // Centers the active slide
          slidesPerView={"auto"} // Or 1.5–2 for partial side previews
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={800}
          className="my-swiper rounded-2xl overflow-hidden shadow-2xl"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src={image.original}
                  alt={image.thumbnail}
                  fill
                  className="object-contain"
                  priority={index === 0} // load first image eagerly
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
                {/* Optional overlay text */}
                {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-3xl md:text-5xl font-bold">
                  {image.thumbnail}
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
