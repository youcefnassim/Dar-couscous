"use client";

import { useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  ChefHat,
  ThermometerSnowflake,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Euro
} from "lucide-react";

import { useCatalogStore } from "@/store/catalogStore";

export default function AdminSettingsPage() {
  const currentSettings = useCatalogStore((state) => state.settings);
  const updateSettings = useCatalogStore((state) => state.updateSettings);

  const [atelierName, setAtelierName] = useState(currentSettings?.atelierName || "DAR COUSCOUS");
  const [address, setAddress] = useState(currentSettings?.address || "Atelier Central Paris, 11e Arrondissement");
  const [postalCode, setPostalCode] = useState(currentSettings?.postalCode || "75011");
  const [city, setCity] = useState(currentSettings?.city || "Paris");
  const [emailContact, setEmailContact] = useState(currentSettings?.emailContact || "contact@darcouscous.com");
  const [emailAdmin, setEmailAdmin] = useState(currentSettings?.emailAdmin || "admin@darcouscous.com");
  const [phone, setPhone] = useState(currentSettings?.phone || "+33 1 42 00 00 00");
  const [deliveryFee, setDeliveryFee] = useState(
    currentSettings ? currentSettings.deliveryFeeCents / 100 : 3.9
  );
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(
    currentSettings ? currentSettings.freeDeliveryThresholdCents / 100 : 35.0
  );
  const [tvaRate, setTvaRate] = useState(currentSettings?.tvaRate || 10.0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      atelierName,
      address,
      postalCode,
      city,
      emailContact,
      emailAdmin,
      phone,
      deliveryFeeCents: Math.round(deliveryFee * 100),
      freeDeliveryThresholdCents: Math.round(freeDeliveryThreshold * 100),
      tvaRate,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <Settings className="w-7 h-7 text-terracotta" />
            <span>Paramètres Atelier &amp; Entreprise</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Coordonnées légales, paramètres fiscaux, frais de transport et normes sanitaires.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-olive/15 text-olive px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Paramètres enregistrés avec succès !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Atelier Identity */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2 border-b border-cream-200 pb-2">
            <ChefHat className="w-5 h-5 text-terracotta" />
            <span>Identité &amp; Localisation Atelier</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Nom commercial
              </label>
              <input
                type="text"
                value={atelierName}
                onChange={(e) => setAtelierName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Adresse de cuisine &amp; départ coursiers
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Code postal
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Ville
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Contact & Notifications */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2 border-b border-cream-200 pb-2">
            <Mail className="w-5 h-5 text-olive" />
            <span>Contacts &amp; Alertes</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Email public client
              </label>
              <input
                type="email"
                value={emailContact}
                onChange={(e) => setEmailContact(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Email de direction &amp; administration
              </label>
              <input
                type="email"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Téléphone atelier
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Food Safety */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-2 border-b border-cream-200 pb-2">
            <Euro className="w-5 h-5 text-terracotta" />
            <span>Tarifs de Livraison &amp; Normes Sanitaires</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Frais de livraison standard (€)
              </label>
              <input
                type="number"
                step="0.10"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Livraison gratuite dès (€)
              </label>
              <input
                type="number"
                step="1"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-darkbrown/70 block mb-1">
                Taux TVA traiteur (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={tvaRate}
                onChange={(e) => setTvaRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div className="bg-cream-50 p-3 rounded-lg flex items-center gap-3 border border-cream-200">
            <ThermometerSnowflake className="w-6 h-6 text-olive shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-darkbrown block">Protocole Chaîne du Froid (0-4°C)</span>
              <span className="text-darkbrown/60">
                Toutes les barquettes sont scellées et transportées dans des caissons isothermes avec accumulateurs eutectiques certifiés.
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-terracotta text-white font-bold text-xs rounded-lg hover:bg-terracotta-dark transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les paramètres</span>
          </button>
        </div>
      </form>
    </div>
  );
}

