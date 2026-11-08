export interface AdminOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_postal_code: string;
  delivery_city: string;
  delivery_instructions?: string;
  delivery_date: string;
  delivery_slot: string;
  status:
    | "pending_payment"
    | "paid"
    | "confirmed"
    | "preparing"
    | "ready_for_delivery"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "refunded";
  total_cents: number;
  subtotal_cents: number;
  delivery_fee_cents: number;
  items_count: number;
  items: Array<{
    product_name: string;
    quantity: number;
    price_cents: number;
    weight_grams: number;
  }>;
  created_at: string;
  internal_notes?: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  postal_code: string;
  orders_count: number;
  total_spent_cents: number;
  last_order_date: string;
  created_at: string;
}

export interface InventoryItem {
  product_id: string;
  product_name: string;
  category_name: string;
  available_portions: number;
  daily_target: number;
  low_stock_threshold: number;
  lot_number: string;
  price_cents: number;
  last_batch_time: string;
}

// Initialisé à ZÉRO pour un lancement propre en production
export const initialAdminOrders: AdminOrder[] = [];

export const initialAdminCustomers: AdminCustomer[] = [];

export const initialInventory: InventoryItem[] = [
  {
    product_id: "prod-royal",
    product_name: "DAR Royal",
    category_name: "Royal",
    available_portions: 0,
    daily_target: 30,
    low_stock_threshold: 5,
    lot_number: "LOT-2026-DC-001",
    price_cents: 1590,
    last_batch_time: "En attente de production",
  },
  {
    product_id: "prod-agneau",
    product_name: "DAR Agneau",
    category_name: "Agneau",
    available_portions: 0,
    daily_target: 25,
    low_stock_threshold: 5,
    lot_number: "LOT-2026-DC-002",
    price_cents: 1390,
    last_batch_time: "En attente de production",
  },
  {
    product_id: "prod-poulet",
    product_name: "DAR Poulet",
    category_name: "Poulet",
    available_portions: 0,
    daily_target: 35,
    low_stock_threshold: 5,
    lot_number: "LOT-2026-DC-003",
    price_cents: 1090,
    last_batch_time: "En attente de production",
  },
  {
    product_id: "prod-merguez",
    product_name: "DAR Merguez",
    category_name: "Merguez",
    available_portions: 0,
    daily_target: 30,
    low_stock_threshold: 5,
    lot_number: "LOT-2026-DC-004",
    price_cents: 1190,
    last_batch_time: "En attente de production",
  },
  {
    product_id: "prod-vegetal",
    product_name: "DAR Végétal",
    category_name: "Végétarien",
    available_portions: 0,
    daily_target: 20,
    low_stock_threshold: 5,
    lot_number: "LOT-2026-DC-005",
    price_cents: 990,
    last_batch_time: "En attente de production",
  },
];
