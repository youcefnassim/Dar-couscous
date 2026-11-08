import Link from "next/link";
import { 
  MapPin, 
  Truck, 
  ThermometerSnowflake, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
import { deliveryZones } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Zones et Modalités de Livraison — DAR COUSCOUS Paris",
  description: "Découvrez notre service de livraison réfrigérée (0-4°C) à Paris et en Île-de-France. Frais, créneaux et codes postaux desservis.",
};

export default function LivraisonPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-olive font-bold">
            Logistique Réfrigérée
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-darkbrown">
            Livraison de vos barquettes à Paris
          </h1>
          <p className="text-sm text-darkbrown/70 max-w-xl mx-auto">
            Une chaîne du froid strictement certifiée entre 0°C et 4°C, pour une sécurité alimentaire absolue de notre cuisine à votre porte.
          </p>
        </div>

        {/* 3 Pillars of DAR COUSCOUS delivery — Deux par deux */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-3.5 sm:p-6 rounded-xl border border-cream-200 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cream-100 flex items-center justify-center text-terracotta">
              <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-sm sm:text-lg font-bold text-darkbrown leading-tight">
              Température Contrôlée
            </h3>
            <p className="text-[11px] sm:text-xs text-darkbrown/70 leading-relaxed">
              Transport en véhicules réfrigérés (0°C à 4°C).
            </p>
          </div>

          <div className="bg-white p-3.5 sm:p-6 rounded-xl border border-cream-200 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cream-100 flex items-center justify-center text-olive">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-sm sm:text-lg font-bold text-darkbrown leading-tight">
              Créneaux Ponctuels
            </h3>
            <p className="text-[11px] sm:text-xs text-darkbrown/70 leading-relaxed">
              Créneau midi (11h30-14h) ou soir (18h30-21h30).
            </p>
          </div>

          <div className="col-span-2 md:col-span-1 max-w-sm mx-auto w-full bg-white p-3.5 sm:p-6 rounded-xl border border-cream-200 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cream-100 flex items-center justify-center text-darkbrown">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-sm sm:text-lg font-bold text-darkbrown leading-tight">
              Fraîcheur Garantie
            </h3>
            <p className="text-[11px] sm:text-xs text-darkbrown/70 leading-relaxed">
              Cuisiné le matin même. DLC 4 jours au réfrigérateur.
            </p>
          </div>
        </div>

        {/* Eligible Zones Table */}
        <div className="bg-white rounded-xl border border-cream-200 p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-darkbrown">
            Zones &amp; Tarifs de Livraison
          </h2>

          <div className="space-y-4">
            {deliveryZones.map((zone) => (
              <div
                key={zone.id}
                className="p-5 rounded-lg border border-cream-200 bg-cream-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-terracotta" />
                    <span>{zone.name}</span>
                  </h3>
                  <p className="text-xs text-darkbrown/70">
                    Codes postaux : {zone.postal_codes.slice(0, 8).join(", ")}
                    {zone.postal_codes.length > 8 && " ... et plus"}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-darkbrown">
                  <div>
                    <span className="block text-darkbrown/50">Frais de livraison</span>
                    <span className="font-bold text-sm text-darkbrown">
                      {formatPrice(zone.delivery_fee_cents)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-darkbrown/50">Livraison offerte dès</span>
                    <span className="font-bold text-sm text-olive">
                      {formatPrice(zone.free_delivery_threshold_cents)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-darkbrown/50">Commande minimum</span>
                    <span className="font-semibold text-darkbrown">
                      {formatPrice(zone.min_order_cents)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reheating instructions reminder */}
        <div className="bg-cream-100 rounded-xl p-6 border border-cream-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base font-bold text-darkbrown">
              Comment déguster votre couscous à la réception ?
            </h4>
            <p className="text-xs text-darkbrown/70">
              Percez le film et réchauffez 3 minutes au micro-ondes. Votre couscous retrouve toute sa vapeur et son onctuosité.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors shrink-0"
          >
            <span>Commander maintenant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

