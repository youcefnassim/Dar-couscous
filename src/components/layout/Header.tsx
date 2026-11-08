"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Notre menu" },
  { href: "/notre-histoire", label: "Notre histoire" },
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Notice for Paris Delivery */}
      <div className="bg-darkbrown text-cream text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span>✨ Couscous d&apos;artisan préparé à Paris • Barquettes réfrigérées prêtes à réchauffer • Livraison offerte dès 35 €</span>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-cream-200"
            : "bg-white border-cream-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col group">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-darkbrown group-hover:text-terracotta transition-colors">
                DAR COUSCOUS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-olive font-semibold -mt-1">
                Paris • Maison de Tradition
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-terracotta relative py-1 ${
                      isActive ? "text-terracotta font-semibold" : "text-darkbrown"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Cart & CTA */}
            <div className="flex items-center space-x-4">
              <Link
                href="/menu"
                className="hidden lg:inline-flex items-center gap-1.5 bg-terracotta text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-terracotta-hover transition-colors shadow-sm"
              >
                <span>Commander</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Cart Button */}
              <Link
                href="/panier"
                className="relative p-2.5 rounded-full border border-cream-200 bg-cream-50 hover:bg-cream-100 text-darkbrown transition-colors"
                aria-label="Voir mon panier"
              >
                <ShoppingBag className="w-5 h-5 text-darkbrown" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-darkbrown hover:bg-cream-100 transition-colors"
                aria-label="Ouvrir le menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cream-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium rounded-md px-3 transition-colors ${
                    isActive
                      ? "bg-cream-100 text-terracotta font-semibold"
                      : "text-darkbrown hover:bg-cream-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-cream-200">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-terracotta text-white py-3 rounded-md font-medium hover:bg-terracotta-hover transition-colors text-center"
              >
                <span>Découvrir le menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

