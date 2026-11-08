"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Package,
  Calendar,
  UtensilsCrossed,
  Truck,
  Award,
  Sparkles
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("month");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-terracotta" />
            <span>Statistiques &amp; Performance Atelier</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Analyse des ventes de couscous, préférences des parisiens et taux d&apos;écoulement des stocks.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-cream-100 p-1 rounded-lg border border-cream-200 text-xs">
          {(["day", "week", "month"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                period === p ? "bg-darkbrown text-white" : "text-darkbrown/70 hover:text-darkbrown"
              }`}
            >
              {p === "day" ? "Aujourd'hui" : p === "week" ? "Cette semaine" : "Ce mois"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Highlights (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Chiffre d&apos;affaires</span>
          <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
            0,00 €
          </span>
          <span className="text-[11px] text-darkbrown/50">Lancement officiel</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Barquettes vendues</span>
          <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
            0
          </span>
          <span className="text-[11px] text-darkbrown/50">Objectif du mois : 500</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Panier moyen</span>
          <span className="font-serif text-2xl font-bold text-olive mt-1 block">
            0,00 €
          </span>
          <span className="text-[11px] text-olive font-medium">Cible : 32,50 €</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Taux de satisfaction</span>
          <span className="font-serif text-2xl font-bold text-terracotta mt-1 block">
            100%
          </span>
          <span className="text-[11px] text-terracotta font-medium">Recettes artisanales</span>
        </div>
      </div>

      {/* Recettes Repartition */}
      <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-terracotta" />
          <span>Répartition prévisionnelle par recette</span>
        </h3>

        <div className="space-y-3">
          {[
            { name: "DAR Royal (Agneau, Poulet, Merguez)", target: "35%", color: "bg-terracotta" },
            { name: "DAR Poulet Fermier mariné", target: "25%", color: "bg-olive" },
            { name: "DAR Agneau confit", target: "20%", color: "bg-darkbrown" },
            { name: "DAR Merguez artisanale", target: "12%", color: "bg-amber-600" },
            { name: "DAR Végétal 7 légumes", target: "8%", color: "bg-teal-600" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-darkbrown font-medium">
                <span>{item.name}</span>
                <span>{item.target}</span>
              </div>
              <div className="w-full bg-cream-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: item.target }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Zones Share */}
      <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2">
          <Truck className="w-5 h-5 text-olive" />
          <span>Répartition géographique Paris &amp; Petite Couronne</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-cream-50/60 p-4 rounded-lg border border-cream-200 space-y-2">
            <strong className="text-darkbrown text-sm block">Zone 1 : Paris Intra-muros (75)</strong>
            <p className="text-darkbrown/60">
              Cœur de cible traiteur bureau &amp; dîner à domicile.
            </p>
            <span className="text-xs font-bold text-terracotta block">
              Estimation : 70% des livraisons
            </span>
          </div>

          <div className="bg-cream-50/60 p-4 rounded-lg border border-cream-200 space-y-2">
            <strong className="text-darkbrown text-sm block">Zone 2 : Petite Couronne (92, 93, 94)</strong>
            <p className="text-darkbrown/60">
              Zones résidentielles et d&apos;affaires périphériques sous chaîne du froid garantie.
            </p>
            <span className="text-xs font-bold text-olive block">
              Estimation : 30% des livraisons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

