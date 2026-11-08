"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Ne pas afficher sur les pages admin pour garder l'interface admin épurée
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-terracotta text-white shadow-lg hover:bg-terracotta-hover hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20 flex items-center justify-center group"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      <span className="sr-only">Retour en haut de page</span>
    </button>
  );
}

