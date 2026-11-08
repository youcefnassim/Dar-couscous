"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { products as fallbackProducts, categories } from "@/lib/mock-data";
import { useCatalogStore } from "@/store/catalogStore";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  const liveProducts = useCatalogStore((state) => state.products) || fallbackProducts;

  const activeProducts = useMemo(
    () => liveProducts.filter((p) => p.is_active),
    [liveProducts]
  );

  const filteredProducts = useMemo(() => {
    return liveProducts
      .filter((product) => {
        // Only active products
        if (!product.is_active) return false;

        // Category filter
        if (selectedCategory !== "all" && product.category_id !== selectedCategory) {
          return false;
        }

        // Search filter
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchSub = product.subtitle.toLowerCase().includes(q);
          const matchIngr = product.ingredients_text.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchSub && !matchIngr) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price_cents - b.price_cents;
        if (sortBy === "price-desc") return b.price_cents - a.price_cents;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      });
  }, [liveProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-cream-50/40 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-terracotta font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>La Carte du Jour</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-darkbrown">
            Notre Menu
          </h1>
          <p className="text-sm text-darkbrown/70 mt-2">
            Chaque couscous est préparé le matin dans notre atelier parisien. Livré en barquette individuelle réfrigérée (0-4°C), prête à réchauffer en 3 minutes.
          </p>
        </div>

        {/* Filter Controls: Categories, Search, Sort */}
        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-darkbrown text-white shadow-sm"
                  : "bg-cream-100 text-darkbrown hover:bg-cream-200"
              }`}
            >
              Tous ({activeProducts.length})
            </button>

            {categories.map((cat) => {
              const count = activeProducts.filter(
                (p) => p.category_id === cat.id
              ).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-terracotta text-white shadow-sm"
                      : "bg-cream-100 text-darkbrown hover:bg-cream-200"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search bar & Sort dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-cream-200">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un plat, ingrédient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-cream-50/50 border border-cream-200 rounded-md text-xs text-darkbrown placeholder:text-darkbrown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-darkbrown/60" />
              <span className="text-xs text-darkbrown/70 font-medium">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-cream-50/50 border border-cream-200 rounded-md py-1.5 px-2.5 text-darkbrown focus:outline-none focus:border-terracotta"
              >
                <option value="featured">Recommandés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name-asc">Nom (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille de produits deux par deux */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-cream-200 p-12 text-center max-w-md mx-auto my-12">
            <p className="font-serif text-xl font-bold text-darkbrown">
              Aucun couscous ne correspond à votre recherche
            </p>
            <p className="text-xs text-darkbrown/60 mt-2 mb-4">
              Essayez un autre mot-clé ou réinitialisez les filtres pour voir toute notre carte.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-terracotta text-white rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

