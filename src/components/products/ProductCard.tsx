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
      image_url: product.images[0]?.url || "/images/logo.png",
      weight_grams: product.weight_grams,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  return (
    <div className="group bg-white rounded-xl border border-cream-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Product Image (Official Logo) & Badges */}
      <Link
        href={`/produit/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-white border-b border-cream-100 flex items-center justify-center p-3 sm:p-5"
      >
        <Image
          src={product.images[0]?.url || "/images/logo.png"}
          alt={product.images[0]?.alt || product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category tag */}
        {product.category && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-darkbrown/90 backdrop-blur-sm text-cream-100 text-[9px] sm:text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-sm">
            {product.category.name}
          </span>
        )}

        {/* Portion Net Weight Badge */}
        <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/95 backdrop-blur-sm text-darkbrown text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded shadow-sm border border-cream-200">
          {product.weight_grams} g
        </span>

        {/* Stock warning if applicable */}
        {isOutOfStock ? (
          <div className="absolute inset-0 bg-darkbrown/65 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-darkbrown text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
              Épuisé
            </span>
          </div>
        ) : isLowStock ? (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-terracotta text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
            Dernières
          </span>
        ) : null}
      </Link>

      {/* Product Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/produit/${product.slug}`}>
            <h3 className="font-serif text-sm sm:text-base font-bold text-darkbrown group-hover:text-terracotta transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[10px] sm:text-xs text-olive font-medium mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          <p className="text-[11px] sm:text-xs text-darkbrown/70 line-clamp-2 leading-relaxed mt-1.5 hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-3 pt-2.5 border-t border-cream-200 flex items-center justify-between gap-1">
          <div>
            <span className="text-[9px] sm:text-[10px] text-darkbrown/50 block leading-tight">Portion</span>
            <span className="text-sm sm:text-base font-bold text-darkbrown">
              {formatPrice(product.price_cents)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href={`/produit/${product.slug}`}
              className="p-1.5 text-darkbrown/60 hover:text-darkbrown rounded hover:bg-cream-100 transition-colors hidden sm:inline-flex"
              title="Voir la fiche détaillée"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-semibold tracking-wide transition-all ${
                isAdded
                  ? "bg-olive text-white"
                  : isOutOfStock
                  ? "bg-cream-200 text-darkbrown/40 cursor-not-allowed"
                  : "bg-terracotta text-white hover:bg-terracotta-hover shadow-sm active:scale-95"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3 h-3" />
                  <span className="hidden xs:inline">Ajouté</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
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
