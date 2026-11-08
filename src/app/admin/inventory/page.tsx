"use client";

import { useState } from "react";
import {
  Boxes,
  Plus,
  Minus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ThermometerSnowflake,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { initialInventory, InventoryItem } from "@/lib/admin-mock-data";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [temperatureCheck, setTemperatureCheck] = useState<number>(2.4);

  const adjustStock = (productId: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              available_portions: Math.max(0, item.available_portions + amount),
              last_batch_time: "Mis à jour à l'instant",
            }
          : item
      )
    );
  };

  const totalPortions = inventory.reduce((acc, item) => acc + item.available_portions, 0);
  const totalTarget = inventory.reduce((acc, item) => acc + item.daily_target, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <Boxes className="w-7 h-7 text-terracotta" />
            <span>Stocks &amp; Traçabilité Alimentaire</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Supervision de la production matinale, barquettes individuelles scellées et chaîne du froid (0-4°C).
          </p>
        </div>

        {/* Cold chain status pill */}
        <div className="flex items-center gap-2 bg-olive/10 border border-olive/20 px-3 py-2 rounded-xl text-olive">
          <ThermometerSnowflake className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block leading-tight">Chambre Froide : +{temperatureCheck}°C</span>
            <span className="text-[10px] text-olive/80">Conformité sanitaire active</span>
          </div>
        </div>
      </div>

      {/* Production Overview Cards (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Total portions prêtes</span>
          <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
            {totalPortions}
          </span>
          <span className="text-[11px] text-darkbrown/50">Sur {totalTarget} cibles du jour</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Taux de réalisation</span>
          <span className="font-serif text-2xl font-bold text-olive mt-1 block">
            {totalTarget > 0 ? Math.round((totalPortions / totalTarget) * 100) : 0}%
          </span>
          <span className="text-[11px] text-olive font-medium">Production du matin</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Recettes en rupture</span>
          <span className="font-serif text-2xl font-bold text-terracotta mt-1 block">
            {inventory.filter((i) => i.available_portions === 0).length}
          </span>
          <span className="text-[11px] text-terracotta font-medium">Sur 5 recettes</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Traçabilité LOTS</span>
          <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
            5 / 5
          </span>
          <span className="text-[11px] text-olive flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Lots conformes
          </span>
        </div>
      </div>

      {/* Production Matrix & Batch Adjustment (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {inventory.map((item) => (
          <div
            key={item.product_id}
            className="bg-white rounded-xl border border-cream-200 p-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif text-base font-bold text-darkbrown">
                    {item.product_name}
                  </h3>
                  <span className="text-[10px] text-darkbrown/50 uppercase tracking-wider">
                    {item.category_name}
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold bg-cream-100 text-darkbrown px-2 py-0.5 rounded">
                  {item.lot_number}
                </span>
              </div>

              {/* Progress and Portions */}
              <div className="my-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xl sm:text-2xl font-bold text-darkbrown">
                    {item.available_portions} <span className="text-xs font-normal text-darkbrown/60">portions</span>
                  </span>
                  <span className="text-xs text-darkbrown/50">Cible : {item.daily_target}</span>
                </div>

                <div className="w-full bg-cream-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.available_portions <= item.low_stock_threshold
                        ? "bg-red-500"
                        : "bg-olive"
                    }`}
                    style={{
                      width: `${Math.min(100, (item.available_portions / item.daily_target) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-darkbrown/60 mb-4">
                Dernière fournée : <strong className="text-darkbrown">{item.last_batch_time}</strong>
              </div>
            </div>

            {/* Quick Adjustment Controls */}
            <div className="pt-3 border-t border-cream-200 flex items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={() => adjustStock(item.product_id, -1)}
                disabled={item.available_portions <= 0}
                className="p-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-darkbrown disabled:opacity-30 disabled:cursor-not-allowed"
                title="Retirer 1 portion"
              >
                <Minus className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => adjustStock(item.product_id, +5)}
                className="px-2 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-darkbrown text-xs font-bold"
              >
                +5
              </button>

              <button
                type="button"
                onClick={() => adjustStock(item.product_id, +10)}
                className="px-2 py-1.5 rounded-lg bg-terracotta/10 hover:bg-terracotta/20 text-terracotta text-xs font-bold"
              >
                +10
              </button>

              <button
                type="button"
                onClick={() => adjustStock(item.product_id, +1)}
                className="p-1.5 rounded-lg bg-darkbrown text-white hover:bg-darkbrown-light"
                title="Ajouter 1 portion"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

