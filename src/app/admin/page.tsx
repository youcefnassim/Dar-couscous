"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  Filter
} from "lucide-react";
import { initialAdminOrders, initialInventory } from "@/lib/admin-mock-data";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(initialAdminOrders);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // KPI Calculations
  const totalRevenueCents = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
    .reduce((acc, o) => acc + o.total_cents, 0);

  const pendingOrders = orders.filter((o) =>
    ["pending_payment", "paid", "confirmed", "preparing"].includes(o.status)
  );

  const completedOrders = orders.filter((o) => o.status === "delivered");
  const lowStockItems = initialInventory.filter(
    (item) => item.available_portions <= item.low_stock_threshold
  );

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-olive/15 text-olive">Livré</span>;
      case "preparing":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">En préparation</span>;
      case "confirmed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Confirmé</span>;
      case "ready_for_delivery":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">Prêt à livrer</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">Payé</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown">
          Tableau de Bord Atelier
        </h1>
        <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
          Supervision des commandes en temps réel, alertes de stock et expéditions du jour à Paris.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-darkbrown/60 block">Chiffre d&apos;affaires</span>
            <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
              {formatPrice(totalRevenueCents)}
            </span>
            <span className="text-[11px] text-darkbrown/50 mt-1 block">
              {orders.length} commande{orders.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-cream-100 text-terracotta flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Orders Today */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-darkbrown/60 block">Commandes du jour</span>
            <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
              {orders.length}
            </span>
            <span className="text-[11px] text-darkbrown/60 mt-1 block">
              {orders.reduce((acc, o) => acc + o.items_count, 0)} portion{orders.length > 1 ? "s" : ""} commandée{orders.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-cream-100 text-darkbrown flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-darkbrown/60 block">En cuisine &amp; Préparation</span>
            <span className="font-serif text-2xl font-bold text-darkbrown mt-1 block">
              {pendingOrders.length}
            </span>
            <span className="text-[11px] text-darkbrown/50 mt-1 block">
              {pendingOrders.length === 0 ? "Aucune commande en attente" : "Créneaux en cours"}
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-cream-100 text-darkbrown flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-xl border border-cream-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-darkbrown/60 block">Alertes Stock portions</span>
            <span className="font-serif text-2xl font-bold text-red-600 mt-1 block">
              {lowStockItems.length}
            </span>
            <span className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Réapprovisionner atelier</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Production & Inventory Quick View */}
      <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-cream-200 pb-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-darkbrown">
              État des Portions Fraîches (Production du Jour)
            </h2>
            <p className="text-xs text-darkbrown/60">
              Traçabilité des lots et respect strict des seuils d&apos;alerte atelier.
            </p>
          </div>
          <span className="text-xs text-olive font-bold bg-olive/10 px-2.5 py-1 rounded">
            Chaîne du froid 0-4°C Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {initialInventory.map((item) => (
            <div
              key={item.product_id}
              className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                item.available_portions <= item.low_stock_threshold
                  ? "bg-red-50/70 border-red-200 text-red-950"
                  : "bg-cream-50/60 border-cream-200 text-darkbrown"
              }`}
            >
              <div className="flex justify-between items-start">
                <strong className="font-serif text-sm block">{item.product_name}</strong>
                <span className="text-[10px] font-bold text-darkbrown/60">{item.lot_number}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold">
                  {item.available_portions} <span className="text-xs font-normal">portions</span>
                </span>
                <span className="text-[10px] text-darkbrown/50">Cible : {item.daily_target}</span>
              </div>

              <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.available_portions <= item.low_stock_threshold
                      ? "bg-red-600"
                      : "bg-olive"
                  }`}
                  style={{ width: `${Math.min(100, (item.available_portions / item.daily_target) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-cream-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-cream-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-darkbrown">
              Commandes Récentes à Livrer
            </h2>
            <p className="text-xs text-darkbrown/60">
              Mise à jour automatique dès réception de nouveaux paiements en ligne.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-darkbrown/50" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-cream-50 border border-cream-200 rounded px-2.5 py-1 text-darkbrown focus:outline-none"
            >
              <option value="all">Tous les statuts ({orders.length})</option>
              <option value="preparing">En préparation</option>
              <option value="confirmed">Confirmé</option>
              <option value="ready_for_delivery">Prêt à livrer</option>
              <option value="delivered">Livré</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-darkbrown">
            <thead className="bg-cream-50 text-[11px] font-bold text-darkbrown/70 border-b border-cream-200">
              <tr>
                <th className="py-3 px-4">Commande</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Adresse &amp; Créneau</th>
                <th className="py-3 px-4">Articles</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-darkbrown/60">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-darkbrown/40">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-darkbrown">Aucune commande enregistrée</span>
                      <p className="text-xs text-darkbrown/50 max-w-sm">
                        Les nouvelles commandes passées par les clients apparaîtront ici automatiquement en temps réel.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-darkbrown">
                      {order.order_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block">{order.customer_name}</span>
                      <span className="text-[11px] text-darkbrown/60">{order.customer_phone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="block">{order.delivery_address} ({order.delivery_postal_code})</span>
                      <span className="text-[11px] text-olive font-medium">{order.delivery_slot}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {order.items.map((i, idx) => (
                        <span key={idx} className="block text-[11px]">
                          {i.quantity}x {i.product_name}
                        </span>
                      ))}
                    </td>
                    <td className="py-3.5 px-4 font-bold">
                      {formatPrice(order.total_cents)}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-cream-100 text-darkbrown/70 hover:text-darkbrown transition-colors"
                        title="Voir le bon de livraison"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

