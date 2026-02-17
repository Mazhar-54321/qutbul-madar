"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "../ui/separator";

// Save all images in an array
const images = [
  { src: "/images/image1.webp", thumbnail: "/thumb1.jpg" },
  { src: "/images/image2.webp", thumbnail: "/thumb2.jpg" },
  { src: "/images/image3.webp", thumbnail: "/thumb1.jpg" },
  { src: "/images/image4.webp", thumbnail: "/thumb2.jpg" },
  { src: "/images/image5.webp", thumbnail: "/thumb2.jpg" },
  { src: "/images/image6.webp", thumbnail: "/thumb2.jpg" },
  { src: "/images/image7.webp", thumbnail: "/thumb2.jpg" },
  { src: "/images/image8.webp", thumbnail: "/thumb2.jpg" },
];

const Gallery = ({ t }: any) => {
  const [galleryImage, setGalleryImage] = useState("/images/image1.webp");
  const [showImage, setShowImage] = useState("hidden");
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    if (index + 1 === images.length) {
      setIndex(0);
      setGalleryImage(images[0].src);
    } else {
      setIndex(index + 1);
      setGalleryImage(images[index + 1].src);
    }
  };

  const prevImage = () => {
    if (index === 0) {
      setIndex(images.length - 1);
      setGalleryImage(images[images.length - 1].src);
    } else {
      setIndex(index - 1);
      setGalleryImage(images[index - 1].src);
    }
  };

  return (
    <div className="w-5/6 mx-auto py-10 ">
      {/* Heading Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          {t("image-gallery")}
        </h2>
        <Separator className="w-32 h-1.5 mx-auto bg-gradient-to-r from-transparent via-chart-3 to-transparent" />
      </motion.div>

      {/* Grid */}
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {images.slice(0, 6).map((image, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-[300px] overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => {
              setShowImage("");
              setGalleryImage(image.src);
              setIndex(i);
            }}
          >
            <Image
              src={image.src}
              alt={image.thumbnail}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showImage !== "hidden" && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay click to close */}
            <div
              className="absolute inset-0"
              onClick={() => setShowImage("hidden")}
            />

            {/* Close Button */}
            <button
              onClick={() => setShowImage("hidden")}
              className="cursor-pointer absolute top-6 right-6 md:top-10 md:right-10 z-50 bg-white p-3 rounded-full transition"
            >
              <X className="w-6 h-6 md:w-8 md:h-8 text-black" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white text-sm md:text-base font-medium">
              {index + 1} / {images.length}
            </div>

            {/* LEFT ARROW */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-10 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </button>

            {/* IMAGE with animation */}
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl px-4 z-40"
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={galleryImage}
                  alt="Gallery Image"
                  fill
                  className="object-contain rounded-3xl"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>

            {/* RIGHT ARROW */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-10 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
