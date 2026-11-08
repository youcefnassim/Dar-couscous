"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight, Phone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Notre Menu" },
  { href: "/notre-histoire", label: "Notre Histoire" },
  { href: "/livraison", label: "Livraison Paris" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ne pas afficher la navbar publique dans l'espace administration
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200"
          : "bg-white border-b border-cream-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo officiel en vedette */}
          <Link href="/" className="flex items-center gap-2 group py-1">
            <div className="relative h-12 sm:h-16 w-32 sm:w-36 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/images/logo.png"
                alt="DAR COUSCOUS — La tradition dans chaque boîte"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-cream-100 text-terracotta"
                      : "text-darkbrown/80 hover:text-darkbrown hover:bg-cream-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Cart & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* CTA Commander Desktop */}
            <Link
              href="/menu"
              className="hidden lg:inline-flex items-center gap-1.5 bg-terracotta text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-terracotta-hover transition-colors shadow-sm active:scale-95"
            >
              <span>Commander</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Cart Button */}
            <Link
              href="/panier"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cream-200 bg-cream-50 hover:bg-cream-100 text-darkbrown transition-all shadow-sm active:scale-95"
              aria-label="Voir mon panier"
            >
              <ShoppingBag className="w-4 h-4 text-terracotta" />
              <span className="text-xs font-bold text-darkbrown hidden xs:inline">
                Panier
              </span>
              {mounted && itemCount > 0 && (
                <span className="bg-terracotta text-white font-bold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-darkbrown hover:bg-cream-100 transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white/98 backdrop-blur-md px-5 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-cream-100 text-terracotta"
                      : "text-darkbrown hover:bg-cream-50"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-darkbrown/30" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-cream-200 space-y-2">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-terracotta text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-terracotta-hover transition-colors shadow-sm"
            >
              <span>Découvrir la carte &amp; Commander</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-darkbrown/60">
              <Phone className="w-3.5 h-3.5 text-terracotta" />
              <span>Atelier Paris 11e : 01 42 00 24 50</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
