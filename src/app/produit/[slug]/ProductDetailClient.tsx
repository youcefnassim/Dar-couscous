"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ShoppingBag, Check, ArrowRight, AlertCircle } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useCatalogStore } from "@/store/catalogStore";

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Live product from catalog store
  const liveProduct = useCatalogStore((state) =>
    state.products.find((p) => p.id === product.id)
  ) || product;

  const isActive = liveProduct.is_active;
  const priceCents = liveProduct.price_cents;
  const weightGrams = liveProduct.weight_grams;
  const stockQuantity = liveProduct.stock_quantity ?? 30;
  const isOutOfStock = stockQuantity <= 0;

  const handleIncrement = () => {
    if (quantity < Math.min(stockQuantity, 20)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!isActive) return;

    addItem({
      product_id: liveProduct.id,
      product_name: liveProduct.name,
      product_slug: liveProduct.slug,
      price_cents: priceCents,
      quantity,
      image_url: liveProduct.images[0]?.url || "/images/logo.png",
      weight_grams: weightGrams,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  if (!isActive) {
    return (
      <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-darkbrown space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Ce couscous est momentanément suspendu à l&apos;atelier</span>
        </div>
        <p className="text-xs text-darkbrown/80 leading-relaxed">
          Nos chefs cuisiniers ont temporairement désactivé ce plat pour aujourd&apos;hui (préparation en cours ou rupture d&apos;ingrédients frais).
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta hover:underline"
        >
          <span>Découvrir les autres couscous disponibles au menu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity & Add to Cart button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Counter */}
        <div className="flex items-center justify-between border border-cream-300 rounded-md bg-cream-50/50 px-3 py-2 sm:w-36">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1 || isOutOfStock}
            className="p-1 rounded text-darkbrown hover:bg-cream-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Diminuer la quantité"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm text-darkbrown">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= stockQuantity || isOutOfStock}
            className="p-1 rounded text-darkbrown hover:bg-cream-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Augmenter la quantité"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 py-3 px-6 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
            justAdded
              ? "bg-olive text-white"
              : isOutOfStock
              ? "bg-cream-200 text-darkbrown/40 cursor-not-allowed"
              : "bg-terracotta text-white hover:bg-terracotta-hover active:scale-[0.99]"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>{quantity} portion{quantity > 1 ? "s" : ""} ajoutée{quantity > 1 ? "s" : ""} au panier !</span>
            </>
          ) : isOutOfStock ? (
            <span>Plat épuisé pour aujourd&apos;hui</span>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>
                Ajouter au panier • {formatPrice(priceCents * quantity)}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Post-add quick banner */}
      {justAdded && (
        <div className="p-3 bg-cream-100 rounded-md border border-cream-300 flex items-center justify-between text-xs animate-in fade-in duration-200">
          <span className="font-medium text-darkbrown">
            Votre sélection a été mise à jour.
          </span>
          <Link
            href="/panier"
            className="font-bold text-terracotta hover:underline inline-flex items-center gap-1"
          >
            <span>Voir le panier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
