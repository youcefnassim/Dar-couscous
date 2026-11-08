"use client";

import { useState } from "react";
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  ShieldCheck,
  ThermometerSnowflake
} from "lucide-react";
import { deliveryZones as initialZones, deliverySlots as initialSlots } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function AdminDeliveryPage() {
  const [testPostalCode, setTestPostalCode] = useState("");
  const [testResult, setTestResult] = useState<string | null>(null);

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const code = testPostalCode.trim();
    if (code.startsWith("75")) {
      setTestResult("✅ Éligible : Zone 1 (Paris Intra-muros) — Livraison réfrigérée 0-4°C assurée");
    } else if (
      code.startsWith("92") ||
      code.startsWith("93") ||
      code.startsWith("94")
    ) {
      setTestResult("✅ Éligible : Zone 2 (Petite Couronne) — Livraison réfrigérée sous créneau");
    } else {
      setTestResult("❌ Non éligible : Zone hors périmètre de fraîcheur garanti");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <Truck className="w-7 h-7 text-terracotta" />
            <span>Livraison &amp; Zones Parisiennes</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Gestion du périmètre de livraison sous chaîne du froid stricte, tarifs et créneaux horaires.
          </p>
        </div>

        <span className="text-xs font-semibold bg-olive/10 text-olive px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Norme chaîne du froid 0-4°C</span>
        </span>
      </div>

      {/* Postal Code Tester */}
      <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm">
        <h3 className="font-serif text-sm sm:text-base font-bold text-darkbrown mb-1">
          Testeur d&apos;éligibilité Code Postal
        </h3>
        <p className="text-xs text-darkbrown/60 mb-4">
          Vérifiez instantanément si une adresse parisienne ou de petite couronne est couverte par nos livreurs.
        </p>

        <form onSubmit={checkEligibility} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md">
          <input
            type="text"
            value={testPostalCode}
            onChange={(e) => setTestPostalCode(e.target.value)}
            placeholder="Ex: 75011, 92100, 93100, 94200"
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
            maxLength={5}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-darkbrown text-white text-xs font-bold rounded-lg hover:bg-darkbrown-light transition-colors"
          >
            Tester
          </button>
        </form>

        {testResult && (
          <div className="mt-3 p-3 rounded-lg bg-cream-50 text-xs font-medium text-darkbrown border border-cream-200">
            {testResult}
          </div>
        )}
      </div>

      {/* Delivery Zones Grid (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {initialZones.map((zone) => (
          <div
            key={zone.id}
            className="bg-white rounded-xl border border-cream-200 p-4 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block">
                  Périmètre
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-darkbrown">
                  {zone.name}
                </h3>
              </div>
              <span className="text-xs font-bold text-olive bg-olive/10 px-2 py-0.5 rounded">
                Active
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-darkbrown/80 bg-cream-50/70 p-3 rounded-lg border border-cream-200/60">
              <div className="flex justify-between">
                <span>Frais de livraison :</span>
                <strong className="text-darkbrown">{formatPrice(zone.delivery_fee_cents)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Livraison offerte dès :</span>
                <strong className="text-olive">{formatPrice(zone.free_delivery_threshold_cents)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Mode :</span>
                <strong className="text-darkbrown">Sous chaîne du froid (0-4°C)</strong>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-darkbrown/60 block mb-1">Arrondissements / Départements :</span>
              <div className="flex flex-wrap gap-1">
                {zone.postal_codes.slice(0, 10).map((cp) => (
                  <span
                    key={cp}
                    className="font-mono text-[10px] bg-cream-100 text-darkbrown px-1.5 py-0.5 rounded"
                  >
                    {cp}
                  </span>
                ))}
                {zone.postal_codes.length > 10 && (
                  <span className="text-[10px] text-darkbrown/50">+{zone.postal_codes.length - 10} autres</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Slots */}
      <div className="bg-white rounded-xl border border-cream-200 p-5 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2">
          <Clock className="w-5 h-5 text-terracotta" />
          <span>Créneaux de livraison du jour</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {initialSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-3.5 rounded-lg border border-cream-200 bg-cream-50/40 space-y-2"
            >
              <div className="flex justify-between items-center">
                <strong className="text-xs text-darkbrown">{slot.day_name}</strong>
                <span className="text-[10px] font-bold text-olive bg-olive/10 px-2 py-0.5 rounded">
                  {slot.time_range}
                </span>
              </div>
              <div className="text-[11px] text-darkbrown/60">
                Capacité max par coursier : <strong className="text-darkbrown">{slot.max_orders} barquettes</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

