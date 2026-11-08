"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ShieldCheck, 
  ChevronLeft 
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

const PARIS_DELIVERY_FEE_CENTS = 390;
const FREE_DELIVERY_THRESHOLD_CENTS = 3500;

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    items,
    promoCode,
    discountPercentage,
    removeItem,
    updateQuantity,
    applyPromoCode,
    removePromoCode,
    getSubtotalCents,
    getDiscountCents,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream-50/30">
        <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const subtotalCents = getSubtotalCents();
  const discountCents = getDiscountCents();
  const isFreeDelivery = subtotalCents >= FREE_DELIVERY_THRESHOLD_CENTS;
  const deliveryFeeCents = items.length === 0 ? 0 : isFreeDelivery ? 0 : PARIS_DELIVERY_FEE_CENTS;
  const totalCents = Math.max(0, subtotalCents - discountCents + deliveryFeeCents);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD_CENTS - subtotalCents);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoMessage({ type: "success", text: "Code promo appliqué avec succès !" });
      setPromoInput("");
    } else {
      setPromoMessage({ type: "error", text: "Code promo non valide. Essayez BIENVENUE10" });
    }
  };

  return (
    <div className="bg-cream-50/30 min-h-screen py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 text-xs text-darkbrown/60 hover:text-terracotta transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continuer mes achats</span>
          </Link>
        </div>

        <h1 className="font-serif text-3xl font-bold text-darkbrown mb-8">
          Votre Panier ({items.reduce((acc, i) => acc + i.quantity, 0)} portions)
        </h1>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-xl border border-cream-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-terracotta mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-darkbrown">
              Votre panier est encore vide
            </h2>
            <p className="text-xs text-darkbrown/70 mt-2 mb-6 leading-relaxed">
              Découvrez nos délicieuses recettes de couscous traditionnel préparées chaque matin et livrées chez vous à Paris.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-terracotta-hover transition-colors shadow-sm"
            >
              <span>Découvrir le menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Full Cart Layout: Items + Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-cream-200 p-6 shadow-sm divide-y divide-cream-200">
              {/* Free delivery progress bar */}
              <div className="pb-4">
                {isFreeDelivery ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-olive bg-olive/10 p-3 rounded-md">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Félicitations ! Vous bénéficiez de la livraison offerte sur Paris.</span>
                  </div>
                ) : (
                  <div className="bg-cream-100/70 p-3 rounded-md space-y-1.5">
                    <div className="flex justify-between text-xs text-darkbrown">
                      <span>Ajoutez <strong>{formatPrice(remainingForFreeDelivery)}</strong> pour la livraison offerte</span>
                      <span className="font-bold">{Math.round((subtotalCents / FREE_DELIVERY_THRESHOLD_CENTS) * 100)}%</span>
                    </div>
                    <div className="w-full bg-cream-300 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-terracotta h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotalCents / FREE_DELIVERY_THRESHOLD_CENTS) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-4 pt-4">
                {items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3"
                  >
                    {/* Item Image + Details */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-white border border-cream-200 shrink-0 flex items-center justify-center">
                        <Image
                          src={item.image_url || "/images/logo.png"}
                          alt={item.product_name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/produit/${item.product_slug}`}
                          className="font-serif text-base font-bold text-darkbrown hover:text-terracotta transition-colors"
                        >
                          {item.product_name}
                        </Link>
                        <p className="text-xs text-darkbrown/60">
                          Barquette individuelle ({item.weight_grams} g)
                        </p>
                        <p className="text-xs font-semibold text-darkbrown mt-1">
                          {formatPrice(item.price_cents)} l&apos;unité
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-cream-300 rounded-md bg-cream-50 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1 text-darkbrown hover:text-terracotta"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-darkbrown">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1 text-darkbrown hover:text-terracotta"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="font-bold text-sm text-darkbrown">
                          {formatPrice(item.price_cents * item.quantity)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.product_id)}
                        className="text-darkbrown/40 hover:text-red-600 p-1 transition-colors"
                        title="Supprimer du panier"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-6">
              <h2 className="font-serif text-lg font-bold text-darkbrown border-b border-cream-200 pb-3">
                Récapitulatif de commande
              </h2>

              {/* Promo Code Input Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label htmlFor="promo" className="text-xs font-semibold text-darkbrown block">
                  Code promotionnel
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-darkbrown/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="promo"
                      type="text"
                      placeholder="Ex: BIENVENUE10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-cream-50 border border-cream-200 rounded text-xs text-darkbrown uppercase tracking-wider focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cream-200 text-darkbrown hover:bg-cream-300 font-semibold text-xs rounded transition-colors"
                  >
                    Appliquer
                  </button>
                </div>

                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.type === "success" ? "text-olive font-semibold" : "text-red-600"
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}

                {promoCode && (
                  <div className="flex items-center justify-between bg-olive/10 text-olive text-xs p-2 rounded">
                    <span>Code actif : <strong>{promoCode}</strong> (-{discountPercentage}%)</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-red-500 hover:underline text-[11px]"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs text-darkbrown/80 border-t border-cream-200 pt-4">
                <div className="flex justify-between">
                  <span>Sous-total plats</span>
                  <span className="font-semibold text-darkbrown">{formatPrice(subtotalCents)}</span>
                </div>

                {discountCents > 0 && (
                  <div className="flex justify-between text-olive">
                    <span>Remise ({discountPercentage}%)</span>
                    <span className="font-semibold">-{formatPrice(discountCents)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frais de livraison Paris</span>
                  <span className="font-semibold text-darkbrown">
                    {deliveryFeeCents === 0 ? (
                      <span className="text-olive uppercase font-bold">Offerte</span>
                    ) : (
                      formatPrice(deliveryFeeCents)
                    )}
                  </span>
                </div>

                <div className="border-t border-cream-200 pt-3 flex justify-between text-base font-bold text-darkbrown">
                  <span>Total TTC</span>
                  <span>{formatPrice(totalCents)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 bg-terracotta text-white py-3.5 rounded-md font-semibold text-sm hover:bg-terracotta-hover transition-colors shadow-sm"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-cream-200 space-y-2 text-[11px] text-darkbrown/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
                  <span>Paiement sécurisé par Stripe (CB, Visa, Mastercard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-terracotta shrink-0" />
                  <span>Livraison réfrigérée 0-4°C sur créneau sélectionné</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

