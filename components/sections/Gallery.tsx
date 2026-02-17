"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Separator } from "../ui/separator";

// Save all images in an array
const images = [
  { src: "/images/image1.webp", thumbnail: "/thumb1.jpg" },
  { src: "/images/image2.webp", thumbnail: "/thumb2.jpg" },
  { src: "/images/image3.webp", thumbnail: "/thumb1.jpg" },
  { src: "/images/image4.webp", thumbnail: "/thumb2.jpg" },
];

const Gallery = ({ t }: any) => {
  const [galleryImage, setGalleryImage] = useState("/images/image-1.webp");
  const [showImage, setShowImage] = useState("hidden");

  // Create a function to display next image
  const [index, setIndex] = useState(0);
  const nextImage = async () => {
    if (index + 1 == images.length) {
      await setIndex(0);
      setGalleryImage(images[0].src);
    } else {
      await setIndex(index + 1);
      setGalleryImage(images[index + 1].src);
    }
  };

  // Create a function to display previous image
  const prevImage = async () => {
    if (index == 0) {
      await setIndex(images.length - 1);
      setGalleryImage(images[images.length - 1].src);
    } else {
      await setIndex(index - 1);
      setGalleryImage(images[index - 1].src);
    }
  };

  return (
    <div className="w-5/6 mx-auto py-10">
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
        <Separator className="w-32 h-1.5 mx-auto bg-gradient-to-r from-transparent via-chart-2 to-transparent" />
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {images.map((image, i) => (
          <div
            key={i}
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
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Create container for gallery */}
      <div
        className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center ${showImage}`}
      >
        {/* Overlay click to close */}
        <div
          className="absolute inset-0"
          onClick={() => setShowImage("hidden")}
        />

        {/* Close Button */}
        <button
          onClick={() => setShowImage("hidden")}
          className="cursor-pointer absolute top-6 right-6 md:top-10 md:right-10 z-50 bg-white hover:bg-white p-3 rounded-full transition"
        >
          <X className="w-6 h-6 md:w-8 md:h-8 text-black" />
        </button>

        {/* LEFT ARROW */}
        <button
          onClick={prevImage}
          className="absolute left-4 md:left-10 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </button>

        {/* IMAGE */}
        <div className="relative w-full max-w-5xl px-4 z-40">
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
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={nextImage}
          className="absolute right-4 md:right-10 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
