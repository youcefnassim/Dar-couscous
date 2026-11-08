"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ThermometerSnowflake, 
  Flame, 
  ArrowRight,
  Printer
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderData {
  orderNumber: string;
  items: Array<{
    product_name: string;
    quantity: number;
    price_cents: number;
    weight_grams: number;
  }>;
  subtotalCents: number;
  discountCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    instructions?: string;
  };
  delivery: {
    date: string;
    slot: string;
  };
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get("orderNumber") || "DC-784210";
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("latest_order");
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Success Header Card */}
      <div className="bg-white rounded-xl border border-cream-200 p-8 text-center shadow-sm mb-8">
        <div className="w-16 h-16 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-widest text-olive font-bold">
          Paiement Confirmé
        </span>
        <h1 className="font-serif text-3xl font-bold text-darkbrown mt-1">
          Merci pour votre commande !
        </h1>
        <p className="text-sm text-darkbrown/70 mt-2">
          Numéro de commande : <strong className="text-darkbrown">{order?.orderNumber || orderNumberParam}</strong>
        </p>
        <p className="text-xs text-darkbrown/60 mt-1">
          Un email de confirmation contenant votre facture détaillée a été envoyé à{" "}
          <strong>{order?.customer.email || "votre adresse email"}</strong>.
        </p>
      </div>

      {/* Order Details Accordion / Summary */}
      <div className="bg-white rounded-xl border border-cream-200 p-6 md:p-8 shadow-sm space-y-6 mb-8">
        <div className="flex items-center justify-between border-b border-cream-200 pb-4">
          <h2 className="font-serif text-xl font-bold text-darkbrown">
            Détails de la livraison
          </h2>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs text-darkbrown/70 hover:text-terracotta border border-cream-300 px-3 py-1.5 rounded transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer le reçu</span>
          </button>
        </div>

        {/* Delivery & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-darkbrown">
          <div className="bg-cream-50 p-4 rounded-lg border border-cream-200 space-y-2">
            <span className="font-bold flex items-center gap-2 text-darkbrown">
              <MapPin className="w-4 h-4 text-terracotta" />
              <span>Adresse de livraison</span>
            </span>
            <p className="text-darkbrown/80">
              {order ? (
                <>
                  {order.customer.firstName} {order.customer.lastName}<br />
                  {order.customer.address}<br />
                  {order.customer.postalCode} {order.customer.city}<br />
                  Tél : {order.customer.phone}
                </>
              ) : (
                <>Paris Intra-Muros</>
              )}
            </p>
            {order?.customer.instructions && (
              <p className="text-[11px] text-darkbrown/60 italic border-t border-cream-200 pt-1 mt-1">
                Note : {order.customer.instructions}
              </p>
            )}
          </div>

          <div className="bg-cream-50 p-4 rounded-lg border border-cream-200 space-y-2">
            <span className="font-bold flex items-center gap-2 text-darkbrown">
              <Calendar className="w-4 h-4 text-terracotta" />
              <span>Date &amp; Créneau</span>
            </span>
            <p className="text-darkbrown/80">
              Date : <strong>{order?.delivery.date || "Demain"}</strong><br />
              Créneau : <strong>{order?.delivery.slot || "11h30 - 13h00"}</strong>
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-olive font-semibold pt-1">
              <ThermometerSnowflake className="w-3.5 h-3.5" />
              <span>Livraison réfrigérée 0-4°C certifiée</span>
            </div>
          </div>
        </div>

        {/* Items Summary Table */}
        <div>
          <h3 className="font-serif text-base font-bold text-darkbrown mb-3">
            Articles commandés
          </h3>
          <div className="divide-y divide-cream-200 border-t border-b border-cream-200">
            {(order?.items || [
              { product_name: "DAR Royal", quantity: 2, price_cents: 1590, weight_grams: 520 },
            ]).map((item, idx) => (
              <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-darkbrown">{item.quantity}x</span>{" "}
                  <span>{item.product_name}</span>
                  <span className="text-darkbrown/60 text-[10px] ml-2">({item.weight_grams}g)</span>
                </div>
                <span className="font-bold text-darkbrown">
                  {formatPrice(item.price_cents * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-3 flex justify-between items-center text-sm font-bold text-darkbrown">
            <span>Montant total réglé</span>
            <span>{formatPrice(order?.totalCents || 3180)}</span>
          </div>
        </div>

        {/* Food safety reminder */}
        <div className="bg-cream-100 p-4 rounded-lg border border-cream-300 text-xs text-darkbrown space-y-2">
          <span className="font-bold flex items-center gap-1.5 text-darkbrown">
            <Flame className="w-4 h-4 text-terracotta" />
            <span>Conseils de conservation et de dégustation à réception</span>
          </span>
          <p className="text-darkbrown/80 leading-relaxed text-[11px]">
            Dès réception de votre colis réfrigéré, placez immédiatement vos barquettes au réfrigérateur entre 0°C et +4°C. 
            Pour réchauffer, percez simplement le film protecteur de la barquette et passez 3 minutes au micro-ondes (750W).
          </p>
        </div>
      </div>

      {/* Back to Home CTA */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-md font-semibold text-xs hover:bg-terracotta-hover transition-colors shadow-sm"
        >
          <span>Retour à l&apos;accueil</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
