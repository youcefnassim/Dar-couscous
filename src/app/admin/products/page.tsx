"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UtensilsCrossed,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Save,
  X,
  ChefHat,
  ThermometerSnowflake
} from "lucide-react";
import { products as initialProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editWeight, setEditWeight] = useState<number>(0);

  const filteredProducts = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category?.name && p.category.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleProductActive = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
    );
  };

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setEditPrice(product.price_cents / 100);
    setEditWeight(product.weight_grams);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    setProductsList((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              price_cents: Math.round(editPrice * 100),
              weight_grams: editWeight,
            }
          : p
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <UtensilsCrossed className="w-7 h-7 text-terracotta" />
            <span>Plats &amp; Produits</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Gestion du menu traiteur, tarification des barquettes individuelles et disponibilité quotidienne.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-olive/10 text-olive px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ThermometerSnowflake className="w-4 h-4" />
            <span>Barquettes 0°C à 4°C</span>
          </span>
        </div>
      </div>

      {/* Quick Search & Summary */}
      <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un couscous (Royal, Agneau...)"
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
          />
        </div>

        <div className="text-xs text-darkbrown/60 flex items-center gap-3">
          <span>
            Total : <strong className="text-darkbrown">{productsList.length} recettes</strong>
          </span>
          <span>•</span>
          <span>
            Actifs : <strong className="text-olive">{productsList.filter((p) => p.is_active).length}</strong>
          </span>
        </div>
      </div>

      {/* Products Grid (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl border p-4 shadow-sm flex flex-col justify-between transition-all ${
              product.is_active ? "border-cream-200" : "border-red-200 opacity-60 bg-cream-50/40"
            }`}
          >
            <div>
              {/* Product Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="relative w-14 h-12 bg-cream-100 rounded-lg p-1 shrink-0 flex items-center justify-center border border-cream-200">
                  <Image
                    src="/images/logo.png"
                    alt={product.name}
                    width={48}
                    height={38}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cream-100 text-darkbrown/80 mb-1">
                    {product.category?.name || "Couscous"}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold text-terracotta">
                    {formatPrice(product.price_cents)}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-sm sm:text-base font-bold text-darkbrown mb-1">
                {product.name}
              </h3>
              <p className="text-[11px] text-darkbrown/60 line-clamp-2 mb-3">
                {product.subtitle}
              </p>

              {/* Specs */}
              <div className="bg-cream-50/80 rounded-lg p-2 space-y-1 text-[11px] text-darkbrown/80 mb-4 border border-cream-200/60">
                <div className="flex justify-between">
                  <span>Portion :</span>
                  <strong className="text-darkbrown">{product.weight_grams}g</strong>
                </div>
                <div className="flex justify-between">
                  <span>Conservation :</span>
                  <strong className="text-olive">0°C - 4°C</strong>
                </div>
                <div className="flex justify-between">
                  <span>Statut :</span>
                  {product.is_active ? (
                    <span className="text-olive font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> En vente
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Épuisé
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-cream-200">
              <button
                type="button"
                onClick={() => handleStartEdit(product)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-cream-100 hover:bg-cream-200 text-darkbrown text-xs font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Modifier</span>
              </button>

              <button
                type="button"
                onClick={() => toggleProductActive(product.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  product.is_active
                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                    : "bg-olive/15 text-olive hover:bg-olive/25"
                }`}
              >
                {product.is_active ? "Désactiver" : "Activer"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbrown/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-cream-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-darkbrown">
                Modifier : {editingProduct.name}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg text-darkbrown/50 hover:text-darkbrown hover:bg-cream-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                  Prix public (€ TTC)
                </label>
                <input
                  type="number"
                  step="0.10"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                  Poids net par barquette (en grammes)
                </label>
                <input
                  type="number"
                  step="10"
                  value={editWeight}
                  onChange={(e) => setEditWeight(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-darkbrown/70 hover:bg-cream-100"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-terracotta text-white hover:bg-terracotta-dark shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

