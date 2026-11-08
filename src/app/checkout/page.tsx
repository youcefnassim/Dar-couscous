"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Truck, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  CreditCard,
  Lock,
  ChevronLeft
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { deliveryZones, deliverySlots } from "@/lib/mock-data";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "75011",
    city: "Paris",
    instructions: "",
    deliveryDate: "",
    deliverySlotId: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const { items, getSubtotalCents, getDiscountCents, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
    // Set default delivery date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      deliveryDate: dateStr,
      deliverySlotId: deliverySlots[0]?.id || "",
    }));
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream-50/30">
        <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-darkbrown mb-2">
          Votre panier est vide
        </h2>
        <p className="text-sm text-darkbrown/70 mb-6">
          Veuillez sélectionner au moins un couscous pour passer commande.
        </p>
        <Link
          href="/menu"
          className="bg-terracotta text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-terracotta-hover transition-colors"
        >
          Voir le menu
        </Link>
      </div>
    );
  }

  // Delivery zone validation
  const matchedZone = deliveryZones.find((zone) =>
    zone.postal_codes.includes(formData.postalCode.trim())
  );

  const isPostalCodeValid = Boolean(matchedZone);

  const subtotalCents = getSubtotalCents();
  const discountCents = getDiscountCents();
  const isFreeDelivery = matchedZone && subtotalCents >= matchedZone.free_delivery_threshold_cents;
  const deliveryFeeCents = isFreeDelivery
    ? 0
    : matchedZone
    ? matchedZone.delivery_fee_cents
    : 390;

  const totalCents = Math.max(0, subtotalCents - discountCents + deliveryFeeCents);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      setFormError("Veuillez renseigner toutes vos coordonnées de livraison.");
      return;
    }

    if (!isPostalCodeValid) {
      setFormError(`Le code postal ${formData.postalCode} n'est pas encore desservi par notre flotte réfrigérée.`);
      return;
    }

    if (!formData.deliveryDate || !formData.deliverySlotId) {
      setFormError("Veuillez sélectionner une date et un créneau de livraison.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create local simulated order / prepare for Stripe checkout
      const orderPayload = {
        orderNumber: `DC-${Math.floor(100000 + Math.random() * 900000)}`,
        items,
        subtotalCents,
        discountCents,
        deliveryFeeCents,
        totalCents,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          postalCode: formData.postalCode,
          city: formData.city,
          instructions: formData.instructions,
        },
        delivery: {
          date: formData.deliveryDate,
          slot: deliverySlots.find((s) => s.id === formData.deliverySlotId)?.time_range || "",
        },
      };

      // Store in session for confirmation display
      if (typeof window !== "undefined") {
        sessionStorage.setItem("latest_order", JSON.stringify(orderPayload));
      }

      // Simulate payment step & forward to confirmation
      setTimeout(() => {
        clearCart();
        router.push(`/confirmation?orderNumber=${orderPayload.orderNumber}`);
      }, 1200);
    } catch {
      setFormError("Une erreur est survenue lors du traitement. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-50/40 min-h-screen py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/panier"
          className="inline-flex items-center gap-1 text-xs text-darkbrown/60 hover:text-terracotta mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour au panier</span>
        </Link>

        <h1 className="font-serif text-3xl font-bold text-darkbrown mb-8">
          Finalisation de votre commande
        </h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Delivery Info & Slot Selection */}
            <div className="lg:col-span-8 space-y-6">
              {/* Error Alert */}
              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-xs font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Contact Information */}
              <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-2 border-b border-cream-200 pb-3">
                  <span>1. Vos coordonnées</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ex: Camille"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Ex: Dupont"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="camille.dupont@email.fr"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                    <span className="text-[10px] text-darkbrown/60">Vous recevrez la confirmation et le suivi du livreur.</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Téléphone portable *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="06 12 34 56 78"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                    <span className="text-[10px] text-darkbrown/60">Nécessaire pour l&apos;accès et la remise en main propre.</span>
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-2 border-b border-cream-200 pb-3">
                  <MapPin className="w-5 h-5 text-terracotta" />
                  <span>2. Adresse de livraison à Paris</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Adresse (Numéro et nom de rue) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ex: 14 Rue de la Roquette, Bâtiment B"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-darkbrown block mb-1">
                        Code Postal *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="75011"
                        maxLength={5}
                        className={`w-full px-3 py-2 bg-cream-50/50 border rounded text-xs text-darkbrown focus:outline-none ${
                          isPostalCodeValid ? "border-olive" : "border-red-400"
                        }`}
                      />
                      {isPostalCodeValid ? (
                        <p className="text-[11px] text-olive font-medium mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Zone éligible : {matchedZone?.name}</span>
                        </p>
                      ) : (
                        <p className="text-[11px] text-red-600 mt-1">
                          Code postal hors zone de couverture actuelle.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-darkbrown block mb-1">
                        Ville *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Paris"
                        className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Instructions pour le livreur (Code d&apos;accès, étage, interphone...)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      placeholder="Ex: Code porte A421, 3ème étage gauche, sonnette Dupont"
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery Scheduling: Date & Time Slot */}
              <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-2 border-b border-cream-200 pb-3">
                  <Calendar className="w-5 h-5 text-terracotta" />
                  <span>3. Date et créneau horaire de livraison</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Date de livraison souhaitée *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkbrown block mb-1">
                      Créneau de livraison *
                    </label>
                    <select
                      value={formData.deliverySlotId}
                      onChange={(e) => setFormData({ ...formData, deliverySlotId: e.target.value })}
                      className="w-full px-3 py-2 bg-cream-50/50 border border-cream-200 rounded text-xs text-darkbrown focus:outline-none focus:border-terracotta"
                    >
                      {deliverySlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.time_range} ({slot.available_orders} places restantes)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-cream-100/50 p-3 rounded-md text-xs text-darkbrown/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-terracotta shrink-0" />
                  <span>
                    Votre commande est acheminée en véhicule réfrigéré pour préserver la température réglementaire de 0°C à 4°C.
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary & Payment Button */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif text-lg font-bold text-darkbrown border-b border-cream-200 pb-3">
                Récapitulatif
              </h2>

              {/* Items summary */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-xs text-darkbrown">
                    <div>
                      <span className="font-semibold">{item.quantity}x</span> {item.product_name}
                      <span className="block text-[10px] text-darkbrown/60">{item.weight_grams}g</span>
                    </div>
                    <span className="font-semibold">{formatPrice(item.price_cents * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-darkbrown/80 border-t border-cream-200 pt-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold text-darkbrown">{formatPrice(subtotalCents)}</span>
                </div>

                {discountCents > 0 && (
                  <div className="flex justify-between text-olive">
                    <span>Remise</span>
                    <span className="font-semibold">-{formatPrice(discountCents)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Livraison réfrigérée</span>
                  <span className="font-semibold text-darkbrown">
                    {deliveryFeeCents === 0 ? (
                      <span className="text-olive font-bold">OFFERTE</span>
                    ) : (
                      formatPrice(deliveryFeeCents)
                    )}
                  </span>
                </div>

                <div className="border-t border-cream-200 pt-3 flex justify-between text-base font-bold text-darkbrown">
                  <span>Total à régler</span>
                  <span>{formatPrice(totalCents)}</span>
                </div>
              </div>

              {/* Secure Payment section */}
              <div className="bg-cream-50 p-3 rounded-lg border border-cream-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-darkbrown">
                  <CreditCard className="w-4 h-4 text-terracotta" />
                  <span>Carte bancaire sécurisée (Stripe)</span>
                </div>
                <p className="text-[10px] text-darkbrown/60 leading-tight">
                  Transaction cryptée SSL 256 bits. Les fonds sont validés uniquement après confirmation de livraison.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || !isPostalCodeValid}
                className={`w-full py-3.5 px-4 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isSubmitting || !isPostalCodeValid
                    ? "bg-cream-300 text-darkbrown/50 cursor-not-allowed"
                    : "bg-terracotta text-white hover:bg-terracotta-hover active:scale-[0.99]"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? "Validation en cours..."
                    : `Payer et Confirmer • ${formatPrice(totalCents)}`}
                </span>
              </button>

              <div className="text-center text-[10px] text-darkbrown/50">
                En confirmant, vous acceptez nos Conditions Générales de Vente.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

