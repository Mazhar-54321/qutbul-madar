"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function ScrollToTop() {
  const { dark } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center
                 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "#c8956c",
        color: dark ? "#1c1208" : "#1c1208",
        boxShadow: "0 4px 20px rgba(200,149,108,0.45)",
      }}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
