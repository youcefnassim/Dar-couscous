import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  discountPercentage: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getItemCount: () => number;
  getSubtotalCents: () => number;
  getDiscountCents: () => number;
  getTotalCents: (deliveryFeeCents: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountPercentage: 0,

      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product_id === newItem.product_id
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            return { items: updated };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null, discountPercentage: 0 }),

      applyPromoCode: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === "BIENVENUE10" || clean === "DAR10") {
          set({ promoCode: clean, discountPercentage: 10 });
          return true;
        }
        if (clean === "PARIS15") {
          set({ promoCode: clean, discountPercentage: 15 });
          return true;
        }
        return false;
      },

      removePromoCode: () => set({ promoCode: null, discountPercentage: 0 }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotalCents: () => {
        return get().items.reduce(
          (total, item) => total + item.price_cents * item.quantity,
          0
        );
      },

      getDiscountCents: () => {
        const subtotal = get().getSubtotalCents();
        const percentage = get().discountPercentage;
        if (percentage <= 0) return 0;
        return Math.round((subtotal * percentage) / 100);
      },

      getTotalCents: (deliveryFeeCents: number) => {
        const subtotal = get().getSubtotalCents();
        const discount = get().getDiscountCents();
        return Math.max(0, subtotal - discount + deliveryFeeCents);
      },
    }),
    {
      name: "dar-couscous-cart-v1",
    }
  )
);

