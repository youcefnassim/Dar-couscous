"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  HeartHandshake,
  Calendar
} from "lucide-react";
import { initialAdminCustomers, AdminCustomer } from "@/lib/admin-mock-data";
import { formatPrice } from "@/lib/utils";
import { useCatalogStore } from "@/store/catalogStore";

export default function AdminCustomersPage() {
  const customers = useCatalogStore((state) => state.customers) || initialAdminCustomers;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.postal_code.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <Users className="w-7 h-7 text-terracotta" />
            <span>Répertoire Clients</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Fichier clients, historique des commandes de couscous et fidélité gourmande.
          </p>
        </div>
      </div>

      {/* KPI Cards (2 par 2 on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Total clients enregistrés</span>
          <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
            {customers.length}
          </span>
          <span className="text-[11px] text-darkbrown/50">Paris &amp; Île-de-France</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm">
          <span className="text-xs text-darkbrown/60 font-medium block">Clients réguliers</span>
          <span className="font-serif text-2xl font-bold text-olive mt-1 block">
            {customers.filter((c) => c.orders_count > 1).length}
          </span>
          <span className="text-[11px] text-olive font-medium">+ de 2 commandes</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm col-span-2 lg:col-span-1">
          <span className="text-xs text-darkbrown/60 font-medium block">Panier moyen</span>
          <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
            {customers.length > 0
              ? formatPrice(
                  Math.round(
                    customers.reduce((acc, c) => acc + c.total_spent_cents, 0) / customers.length
                  )
                )
              : "0,00 €"}
          </span>
          <span className="text-[11px] text-darkbrown/50">Par commande client</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, email ou code postal..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
          />
        </div>
      </div>

      {/* Customer List or Empty State */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-xl border border-cream-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-cream-100 text-terracotta flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-darkbrown mb-1">
            Aucun client enregistré pour l&apos;instant
          </h3>
          <p className="text-xs sm:text-sm text-darkbrown/60 max-w-md mx-auto">
            Dès que des clients passeront commande sur DAR COUSCOUS, leurs profils et historiques d&apos;achats s&apos;afficheront ici.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="bg-white rounded-xl border border-cream-200 p-4 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-base font-bold text-darkbrown">
                    {cust.name}
                  </h3>
                  <span className="text-xs text-darkbrown/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    <span>{cust.postal_code}</span>
                  </span>
                </div>
                <span className="font-bold text-xs bg-olive/10 text-olive px-2.5 py-1 rounded-full">
                  {cust.orders_count} commande{cust.orders_count > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-1 text-xs text-darkbrown/70 border-t border-cream-200 pt-2">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-darkbrown/40" />
                  <span>{cust.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-darkbrown/40" />
                  <span>{cust.phone}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-cream-200 text-xs">
                <span className="text-darkbrown/60">Total dépensé :</span>
                <strong className="font-serif text-sm font-bold text-darkbrown">
                  {formatPrice(cust.total_spent_cents)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

