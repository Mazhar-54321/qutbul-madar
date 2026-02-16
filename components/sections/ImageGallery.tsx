"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  Mousewheel,
} from "swiper/modules";

// Import Swiper styles + extra for effects
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Your custom fancy styles (add to globals.css or a module)
import "./ImageGalleryFancy.css"; // we'll define below

// Assume images is array like: [{ original: '/img1.jpg', thumbnail: 'Alt text' }, ...]
interface ImageGalleryProps {
  images: { original: string; thumbnail: string }[];
  t: (key: string) => string; // your translation function
}

export default function ImageGallerySection({ images, t }: ImageGalleryProps) {
  return (
    <section className="relative py-32 bg-gradient-to-b from-chart-3/10 via-chart-3/5 to-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(var(--chart-2),0.08),transparent_40%)]" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-chart-2 to-white bg-clip-text text-transparent">
            {t("image-gallery")}
          </h2>
          <div className="w-40 h-1 mx-auto bg-gradient-to-r from-transparent via-chart-2/80 to-transparent rounded-full" />
        </motion.div>

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
            EffectCoverflow,
            Mousewheel,
          ]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 38, // Softer, more realistic tilt
            stretch: 0,
            depth: 280, // Deeper 3D feel
            modifier: 1.6, // Stronger curve & separation
            slideShadows: true,
            scale: 0.82, // Slightly smaller sides for focus on center
          }}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.4} // Show partial previews — feels expansive
          spaceBetween={40}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{
            delay: 4500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000} // Slower, cinematic transition
          mousewheel={{ forceToAxis: true }} // Nice wheel control
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 50 },
            1024: { slidesPerView: 2.2, spaceBetween: 60 },
          }}
          className="fancy-coverflow-swiper !pb-20 md:!pb-28" // Extra bottom padding for reflections
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="!h-auto group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                <Image
                  src={image.original}
                  alt={image.thumbnail}
                  width={1200}
                  height={800} // Adjust to your avg image ratio
                  className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 90vw, 70vw"
                  //   priority={index < 3}
                  loading="lazy"
                  //   placeholder="blur" // If you have blurDataURL or static imports
                />

                {/* Subtle glow overlay on hover/active */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Reflection (via pseudo-element) */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-60 blur-sm scale-y-[-1] origin-bottom pointer-events-none" />
              </div>

              {/* Optional caption below reflection */}
              {image.thumbnail && (
                <p className="text-center mt-6 text-lg font-medium text-white/80 opacity-0 group-[.swiper-slide-active]:opacity-100 transition-opacity duration-700">
                  {image.thumbnail}
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
