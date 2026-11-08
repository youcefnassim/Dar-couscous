"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight, Phone, Clock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const leftNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Notre Menu" },
];

const rightNavLinks = [
  { href: "/notre-histoire", label: "Notre Histoire" },
  { href: "/livraison", label: "Livraison" },
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
          ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-cream-200"
          : "bg-white border-b border-cream-200/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Style Maison Gastronomique : 3 colonnes symétriques (Gauche - Centre Logo - Droite) */}
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* --- COLONNE GAUCHE --- */}
          {/* Mobile : Bouton Menu Burger */}
          <div className="flex items-center md:hidden w-1/4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-darkbrown hover:bg-cream-100 transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop : Liens de gauche */}
          <nav className="hidden md:flex items-center space-x-8 w-1/3 justify-start">
            {leftNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 hover:text-terracotta ${
                    isActive ? "text-terracotta" : "text-darkbrown/85"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-terracotta rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* --- COLONNE CENTRALE : LOGO MAJESTUEUX CENTRÉ --- */}
          <div className="flex items-center justify-center flex-1 md:w-1/3">
            <Link
              href="/"
              className="group flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-14 sm:h-18 w-32 sm:w-40">
                <Image
                  src="/images/logo.png"
                  alt="DAR COUSCOUS — La tradition dans chaque boîte"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* --- COLONNE DROITE --- */}
          {/* Desktop : Liens de droite + Panier + Bouton Commander */}
          <div className="hidden md:flex items-center justify-end space-x-6 w-1/3">
            <nav className="flex items-center space-x-6">
              {rightNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 hover:text-terracotta ${
                      isActive ? "text-terracotta" : "text-darkbrown/85"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-terracotta rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bouton Panier */}
            <Link
              href="/panier"
              className="relative p-2.5 rounded-full border border-cream-200 bg-cream-50 hover:bg-cream-100 text-darkbrown transition-all shadow-2xs hover:border-terracotta/40"
              aria-label="Mon Panier"
            >
              <ShoppingBag className="w-4 h-4 text-darkbrown" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* CTA Commander */}
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 bg-terracotta text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors shadow-sm"
            >
              <span>Commander</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile : Panier sur la droite */}
          <div className="flex items-center justify-end md:hidden w-1/4">
            <Link
              href="/panier"
              className="relative p-2 rounded-full border border-cream-200 bg-cream-50 text-darkbrown"
              aria-label="Mon Panier"
            >
              <ShoppingBag className="w-5 h-5 text-darkbrown" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>

      {/* Menu Déroulant Mobile Élégant */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white/98 backdrop-blur-md px-6 pt-5 pb-8 space-y-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-center">
            {[...leftNavLinks, ...rightNavLinks].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-sm uppercase tracking-widest font-serif font-bold transition-colors ${
                    isActive ? "text-terracotta" : "text-darkbrown hover:text-terracotta"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-cream-200 space-y-3">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-terracotta text-white py-3 rounded-lg text-xs uppercase tracking-wider font-bold hover:bg-terracotta-hover transition-colors shadow-sm"
            >
              <span>Découvrir la carte &amp; Commander</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-darkbrown/60 pt-1">
              <Phone className="w-3.5 h-3.5 text-terracotta" />
              <span>Atelier Paris 11e : 01 42 00 24 50</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
