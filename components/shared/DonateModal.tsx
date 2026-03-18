"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function DonateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
                         transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
            >
              <X className="w-4 h-4" />
            </button>
            <Image
              src="/images/donate.jpg"
              alt="Donate to Dargah Qutbul Madar"
              width={500}
              height={700}
              className="object-contain w-auto"
              style={{ maxHeight: "88vh" }}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
