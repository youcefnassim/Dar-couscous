import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { products as defaultProducts } from "@/lib/mock-data";
import { initialInventory, InventoryItem, AdminOrder, AdminCustomer, initialAdminOrders, initialAdminCustomers } from "@/lib/admin-mock-data";

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discount_percent: number;
  min_order_cents: number;
  is_active: boolean;
  uses_count: number;
}

export interface AtelierSettings {
  atelierName: string;
  address: string;
  postalCode: string;
  city: string;
  emailContact: string;
  emailAdmin: string;
  phone: string;
  deliveryFeeCents: number;
  freeDeliveryThresholdCents: number;
  tvaRate: number;
}

const defaultPromoCodes: PromoCode[] = [
  {
    id: "promo-1",
    code: "BIENVENUE10",
    description: "10% de réduction pour votre première commande à Paris.",
    discount_percent: 10,
    min_order_cents: 2500,
    is_active: true,
    uses_count: 0,
  },
  {
    id: "promo-2",
    code: "PARIS15",
    description: "15% de remise spéciale pour les commandes de groupe.",
    discount_percent: 15,
    min_order_cents: 4000,
    is_active: true,
    uses_count: 0,
  },
  {
    id: "promo-3",
    code: "COUSCOUSLOVE",
    description: "Offre fidélité week-end pour nos habitués parisiens.",
    discount_percent: 20,
    min_order_cents: 5000,
    is_active: false,
    uses_count: 0,
  },
];

const defaultSettings: AtelierSettings = {
  atelierName: "DAR COUSCOUS",
  address: "Atelier Central Paris, 11e Arrondissement",
  postalCode: "75011",
  city: "Paris",
  emailContact: "contact@darcouscous.com",
  emailAdmin: "admin@darcouscous.com",
  phone: "+33 1 42 00 00 00",
  deliveryFeeCents: 390,
  freeDeliveryThresholdCents: 3500,
  tvaRate: 10.0,
};

interface CatalogState {
  products: Product[];
  inventory: InventoryItem[];
  promoCodes: PromoCode[];
  settings: AtelierSettings;
  orders: AdminOrder[];
  customers: AdminCustomer[];
  isHydrated: boolean;

  setHydrated: (val: boolean) => void;
  toggleProductActive: (productId: string) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  adjustStock: (productId: string, delta: number) => void;
  togglePromoCode: (promoId: string) => void;
  addPromoCode: (promo: PromoCode) => void;
  updateSettings: (newSettings: Partial<AtelierSettings>) => void;
  addOrder: (order: AdminOrder) => void;
  updateOrderStatus: (orderId: string, status: AdminOrder["status"]) => void;
  resetToDefaults: () => void;
}

// BroadcastChannel for instant cross-tab live synchronization
let syncChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  try {
    syncChannel = new BroadcastChannel("dar_couscous_live_sync");
  } catch (e) {
    console.warn("BroadcastChannel not supported", e);
  }
}

const notifySync = () => {
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type: "SYNC_CATALOG", timestamp: Date.now() });
    } catch {
      // ignore
    }
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dar_catalog_updated"));
  }
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: defaultProducts,
      inventory: initialInventory,
      promoCodes: defaultPromoCodes,
      settings: defaultSettings,
      orders: initialAdminOrders,
      customers: initialAdminCustomers,
      isHydrated: false,

      setHydrated: (val: boolean) => set({ isHydrated: val }),

      toggleProductActive: (productId: string) => {
        set((state) => {
          const updated = state.products.map((p) =>
            p.id === productId ? { ...p, is_active: !p.is_active } : p
          );
          return { products: updated };
        });
        notifySync();
      },

      updateProduct: (productId: string, updates: Partial<Product>) => {
        set((state) => {
          const updated = state.products.map((p) =>
            p.id === productId ? { ...p, ...updates } : p
          );
          return { products: updated };
        });
        notifySync();
      },

      adjustStock: (productId: string, delta: number) => {
        set((state) => {
          const updatedInventory = state.inventory.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  available_portions: Math.max(0, item.available_portions + delta),
                  last_batch_time: "Mis à jour à l'instant",
                }
              : item
          );
          // Also sync stock_quantity on the product
          const currentInv = updatedInventory.find((i) => i.product_id === productId);
          const newQty = currentInv ? currentInv.available_portions : 0;
          const updatedProducts = state.products.map((p) =>
            p.id === productId ? { ...p, stock_quantity: newQty } : p
          );
          return { inventory: updatedInventory, products: updatedProducts };
        });
        notifySync();
      },

      togglePromoCode: (promoId: string) => {
        set((state) => {
          const updated = state.promoCodes.map((p) =>
            p.id === promoId ? { ...p, is_active: !p.is_active } : p
          );
          return { promoCodes: updated };
        });
        notifySync();
      },

      addPromoCode: (promo: PromoCode) => {
        set((state) => ({
          promoCodes: [promo, ...state.promoCodes],
        }));
        notifySync();
      },

      updateSettings: (newSettings: Partial<AtelierSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
        notifySync();
      },

      addOrder: (newOrder: AdminOrder) => {
        set((state) => {
          const updatedOrders = [newOrder, ...state.orders];
          
          // Also update or add customer
          const existingCustIndex = state.customers.findIndex(
            (c) => c.email.toLowerCase() === newOrder.customer_email.toLowerCase()
          );
          let updatedCustomers = [...state.customers];
          if (existingCustIndex > -1) {
            const cust = updatedCustomers[existingCustIndex];
            updatedCustomers[existingCustIndex] = {
              ...cust,
              orders_count: cust.orders_count + 1,
              total_spent_cents: cust.total_spent_cents + newOrder.total_cents,
              last_order_date: newOrder.delivery_date,
            };
          } else {
            updatedCustomers.unshift({
              id: `cust-${Date.now()}`,
              name: newOrder.customer_name,
              email: newOrder.customer_email,
              phone: newOrder.customer_phone,
              postal_code: newOrder.delivery_postal_code,
              orders_count: 1,
              total_spent_cents: newOrder.total_cents,
              last_order_date: newOrder.delivery_date,
              created_at: new Date().toISOString(),
            });
          }

          return { orders: updatedOrders, customers: updatedCustomers };
        });
        notifySync();
      },

      updateOrderStatus: (orderId: string, status: AdminOrder["status"]) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
        notifySync();
      },

      resetToDefaults: () => {
        set({
          products: defaultProducts,
          inventory: initialInventory,
          promoCodes: defaultPromoCodes,
          settings: defaultSettings,
          orders: initialAdminOrders,
          customers: initialAdminCustomers,
        });
        notifySync();
      },
    }),
    {
      name: "dar_couscous_live_catalog_v2",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

// Listen to cross-tab updates
if (typeof window !== "undefined") {
  if (syncChannel) {
    syncChannel.onmessage = (event) => {
      if (event.data?.type === "SYNC_CATALOG") {
        useCatalogStore.persist.rehydrate();
      }
    };
  }

  // Also listen for native storage changes across browser tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "dar_couscous_live_catalog_v2") {
      useCatalogStore.persist.rehydrate();
    }
  });
}
