"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, Check, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      price_cents: product.price_cents,
      quantity: 1,
      image_url: product.images[0]?.url || "",
      weight_grams: product.weight_grams,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  return (
    <div className="group bg-white rounded-lg border border-cream-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Product Image & Badges */}
      <Link href={`/produit/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-cream-50">
        <Image
          src={product.images[0]?.url || "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"}
          alt={product.images[0]?.alt || product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category tag */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-darkbrown/85 backdrop-blur-sm text-cream-100 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
            {product.category.name}
          </span>
        )}

        {/* Portion Net Weight Badge */}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-darkbrown text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
          {product.weight_grams} g
        </span>

        {/* Stock warning if applicable */}
        {isOutOfStock ? (
          <div className="absolute inset-0 bg-darkbrown/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-darkbrown text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
              Épuisé pour aujourd&apos;hui
            </span>
          </div>
        ) : isLowStock ? (
          <span className="absolute top-3 right-3 bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Dernières portions
          </span>
        ) : null}
      </Link>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <Link href={`/produit/${product.slug}`}>
            <h3 className="font-serif text-xl font-bold text-darkbrown group-hover:text-terracotta transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-olive font-medium mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <p className="text-xs text-darkbrown/70 line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-3 border-t border-cream-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-darkbrown/50 block">Portion individuelle</span>
            <span className="text-lg font-bold text-darkbrown">
              {formatPrice(product.price_cents)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/produit/${product.slug}`}
              className="p-2 text-darkbrown/60 hover:text-darkbrown rounded-md hover:bg-cream-100 transition-colors"
              title="Voir la fiche détaillée"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                isAdded
                  ? "bg-olive text-white"
                  : isOutOfStock
                  ? "bg-cream-200 text-darkbrown/40 cursor-not-allowed"
                  : "bg-terracotta text-white hover:bg-terracotta-hover shadow-sm active:scale-95"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Ajouté</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

