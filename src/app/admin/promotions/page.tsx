"use client";

import { useState } from "react";
import {
  Tag,
  Plus,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Percent,
  Calendar,
  Sparkles
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCatalogStore, PromoCode } from "@/store/catalogStore";

export default function AdminPromotionsPage() {
  const promos = useCatalogStore((state) => state.promoCodes);
  const togglePromo = useCatalogStore((state) => state.togglePromoCode);
  const addPromo = useCatalogStore((state) => state.addPromoCode);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(10);
  const [newMinOrder, setNewMinOrder] = useState(25);
  const [newDesc, setNewDesc] = useState("");

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const promo: PromoCode = {
      id: `promo-${Date.now()}`,
      code: newCode.toUpperCase().trim(),
      description: newDesc || `${newDiscount}% de remise sur votre commande`,
      discount_percent: Number(newDiscount),
      min_order_cents: Math.round(newMinOrder * 100),
      is_active: true,
      uses_count: 0,
    };

    addPromo(promo);
    setNewCode("");
    setNewDesc("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <Tag className="w-7 h-7 text-terracotta" />
            <span>Codes Promo &amp; Avantages</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Gérez les coupons de bienvenue, réductions en pourcentage et seuils d&apos;application.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-terracotta text-white rounded-lg text-xs font-bold hover:bg-terracotta-dark transition-colors flex items-center gap-1.5 shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un code promo</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddPromo}
          className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm space-y-4 animate-in fade-in duration-150"
        >
          <h3 className="font-serif text-base font-bold text-darkbrown">
            Nouveau Code Promo
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Code (ex: ETE2026)
              </label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="NOUVEAUCODE"
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 font-mono uppercase focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Remise (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={newDiscount}
                onChange={(e) => setNewDiscount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Commande minimum (€)
              </label>
              <input
                type="number"
                min="0"
                required
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
              Description de l&apos;offre
            </label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Ex: 10% offerts pour la fête des mères"
              className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-darkbrown/70 hover:bg-cream-100 rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold bg-darkbrown text-white rounded-lg hover:bg-darkbrown-light"
            >
              Ajouter le code
            </button>
          </div>
        </form>
      )}

      {/* Promos Grid (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className={`bg-white rounded-xl border p-4 shadow-sm flex flex-col justify-between transition-all ${
              promo.is_active ? "border-cream-200" : "border-cream-200/50 opacity-60 bg-cream-50/40"
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-sm sm:text-base font-bold bg-cream-100 text-darkbrown px-2 py-0.5 rounded border border-cream-300">
                    {promo.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(promo.code)}
                    className="p-1 rounded text-darkbrown/50 hover:text-darkbrown"
                    title="Copier le code"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <span className="font-serif text-lg font-bold text-terracotta">
                  -{promo.discount_percent}%
                </span>
              </div>

              <p className="text-xs text-darkbrown/70 mb-3">
                {promo.description}
              </p>

              <div className="bg-cream-50 p-2.5 rounded-lg space-y-1 text-[11px] text-darkbrown/80 mb-3 border border-cream-200/60">
                <div className="flex justify-between">
                  <span>Panier minimum :</span>
                  <strong>{formatPrice(promo.min_order_cents)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Utilisations :</span>
                  <strong>{promo.uses_count} fois</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
              <span
                className={`text-[11px] font-bold ${
                  promo.is_active ? "text-olive" : "text-darkbrown/40"
                }`}
              >
                {promo.is_active ? "● Actif" : "○ Inactif"}
              </span>

              <button
                type="button"
                onClick={() => togglePromo(promo.id)}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  promo.is_active
                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                    : "bg-olive/15 text-olive hover:bg-olive/25"
                }`}
              >
                {promo.is_active ? "Désactiver" : "Activer"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

