"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { products as fallbackProducts } from "@/lib/mock-data";
import { useCatalogStore } from "@/store/catalogStore";

export function FeaturedProducts() {
  const liveProducts = useCatalogStore((state) => state.products) || fallbackProducts;
  const featuredProducts = liveProducts.filter((p) => p.is_active).slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-terracotta font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nos Plats Emblématiques</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown">
              Les Couscous du Jour
            </h2>
            <p className="text-sm text-darkbrown/70 mt-1 max-w-xl">
              Cuisinés le matin même avec des ingrédients rigoureusement sourcés. Barquettes individuelles réfrigérées prêtes à réchauffer.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-hover transition-colors shrink-0"
          >
            <span>Voir tout le menu ({liveProducts.filter((p) => p.is_active).length} recettes)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Produits affichés deux par deux */}
        {featuredProducts.length === 0 ? (
          <div className="bg-cream-50 p-8 rounded-xl border border-cream-200 text-center">
            <p className="text-sm text-darkbrown/70">
              Nos cuisines préparent actuellement la prochaine fournée. Consultez notre menu pour découvrir nos recettes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

