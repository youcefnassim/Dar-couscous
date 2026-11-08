"use client";

import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle
} from "lucide-react";
import { initialAdminOrders, AdminOrder } from "@/lib/admin-mock-data";
import { formatPrice } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialAdminOrders);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch =
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.delivery_postal_code.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const updateOrderStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: AdminOrder["status"]) => {
    switch (status) {
      case "delivered":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-olive/15 text-olive">Livré</span>;
      case "out_for_delivery":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">En cours de livraison</span>;
      case "ready_for_delivery":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Prêt au départ</span>;
      case "preparing":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">En cuisine</span>;
      case "confirmed":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">Confirmé</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">Annulé</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800">Payé</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown flex items-center gap-2">
            <Package className="w-7 h-7 text-terracotta" />
            <span>Commandes &amp; Expéditions</span>
          </h1>
          <p className="text-xs sm:text-sm text-darkbrown/60 mt-1">
            Suivi des commandes en direct, validation des préparations en cuisine et expéditions à Paris.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-cream-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-darkbrown/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par N° commande, nom client ou CP..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-cream-300 focus:outline-none focus:border-terracotta"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {[
            { id: "all", label: "Tous" },
            { id: "preparing", label: "En cuisine" },
            { id: "ready_for_delivery", label: "Prêts" },
            { id: "out_for_delivery", label: "En cours" },
            { id: "delivered", label: "Livrés" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-darkbrown text-white"
                  : "bg-cream-100 text-darkbrown/70 hover:bg-cream-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-cream-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-cream-100 text-terracotta flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-darkbrown mb-1">
            Aucune commande pour le moment
          </h3>
          <p className="text-xs sm:text-sm text-darkbrown/60 max-w-md mx-auto">
            Les commandes passées par vos clients sur la boutique s&apos;afficheront ici automatiquement en temps réel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-cream-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-cream-200/80 pb-2 mb-3">
                  <span className="font-mono text-xs font-bold text-darkbrown">
                    {order.order_number}
                  </span>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-1.5 text-xs text-darkbrown/80 mb-3">
                  <div className="font-bold text-darkbrown text-sm">
                    {order.customer_name}
                  </div>
                  <div className="flex items-center gap-1.5 text-darkbrown/60 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{order.delivery_postal_code} {order.delivery_city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-darkbrown/60 text-[11px]">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Créneau : {order.delivery_slot}</span>
                  </div>
                  <div className="text-[11px] text-terracotta font-semibold">
                    {order.items_count} barquette{order.items_count > 1 ? "s" : ""} commandée{order.items_count > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                <span className="font-serif text-base font-bold text-darkbrown">
                  {formatPrice(order.total_cents)}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className="px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-darkbrown text-xs font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Détails</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbrown/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-cream-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-terracotta block">
                  {selectedOrder.order_number}
                </span>
                <h3 className="font-serif text-lg font-bold text-darkbrown">
                  {selectedOrder.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-darkbrown/50 hover:text-darkbrown hover:bg-cream-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-xs">
              {/* Status & Change */}
              <div className="bg-cream-50 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-darkbrown/60 block text-[10px]">Statut actuel :</span>
                  <div className="mt-0.5">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "preparing")}
                    className="px-2 py-1 bg-white border border-cream-300 rounded text-[11px] font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    En cuisine
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "ready_for_delivery")}
                    className="px-2 py-1 bg-white border border-cream-300 rounded text-[11px] font-semibold text-purple-700 hover:bg-purple-50"
                  >
                    Prêt
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                    className="px-2 py-1 bg-white border border-cream-300 rounded text-[11px] font-semibold text-olive hover:bg-olive/10"
                  >
                    Livré
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-2 border-b border-cream-200 pb-3">
                <div className="flex items-center gap-2 text-darkbrown">
                  <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                  <span>{selectedOrder.delivery_address}, {selectedOrder.delivery_postal_code} {selectedOrder.delivery_city}</span>
                </div>
                <div className="flex items-center gap-2 text-darkbrown">
                  <Phone className="w-4 h-4 text-terracotta shrink-0" />
                  <span>{selectedOrder.customer_phone}</span>
                </div>
                <div className="flex items-center gap-2 text-darkbrown">
                  <Mail className="w-4 h-4 text-terracotta shrink-0" />
                  <span>{selectedOrder.customer_email}</span>
                </div>
                <div className="flex items-center gap-2 text-darkbrown">
                  <Clock className="w-4 h-4 text-terracotta shrink-0" />
                  <span>{selectedOrder.delivery_date} — Créneau : {selectedOrder.delivery_slot}</span>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-darkbrown mb-2">Contenu de la commande :</h4>
                <div className="space-y-1.5">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1 border-b border-cream-100"
                    >
                      <span>
                        {item.quantity}x {item.product_name} ({item.weight_grams}g)
                      </span>
                      <span className="font-semibold text-darkbrown">
                        {formatPrice(item.price_cents * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2 font-serif text-sm font-bold text-darkbrown">
                <span>Total TTC :</span>
                <span>{formatPrice(selectedOrder.total_cents)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

