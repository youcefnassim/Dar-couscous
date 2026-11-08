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

export const initialAdminOrders: AdminOrder[] = [
  {
    id: "ord-101",
    order_number: "DC-784210",
    customer_name: "Camille Laurent",
    customer_email: "camille.laurent@gmail.com",
    customer_phone: "06 45 12 78 90",
    delivery_address: "18 Rue de Charonne, Bât A",
    delivery_postal_code: "75011",
    delivery_city: "Paris",
    delivery_instructions: "Digicode 4125B, 3ème étage droite",
    delivery_date: "2026-11-09",
    delivery_slot: "11h30 - 13h00",
    status: "confirmed",
    total_cents: 3180,
    subtotal_cents: 3180,
    delivery_fee_cents: 0,
    items_count: 2,
    items: [
      { product_name: "DAR Royal", quantity: 2, price_cents: 1590, weight_grams: 520 },
    ],
    created_at: "2026-11-08T18:40:00Z",
    internal_notes: "Client régulier atelier 11e.",
  },
  {
    id: "ord-102",
    order_number: "DC-784211",
    customer_name: "Karim Benali",
    customer_email: "k.benali@outlook.fr",
    customer_phone: "07 89 23 45 67",
    delivery_address: "42 Boulevard Voltaire",
    delivery_postal_code: "75011",
    delivery_city: "Paris",
    delivery_instructions: "Interphone Benali",
    delivery_date: "2026-11-09",
    delivery_slot: "11h30 - 13h00",
    status: "preparing",
    total_cents: 4270,
    subtotal_cents: 4270,
    delivery_fee_cents: 0,
    items_count: 3,
    items: [
      { product_name: "DAR Agneau", quantity: 2, price_cents: 1390, weight_grams: 480 },
      { product_name: "DAR Royal", quantity: 1, price_cents: 1590, weight_grams: 520 },
    ],
    created_at: "2026-11-08T19:15:00Z",
  },
  {
    id: "ord-103",
    order_number: "DC-784212",
    customer_name: "Sophie Martin",
    customer_email: "sophie.martin@wanadoo.fr",
    customer_phone: "06 11 22 33 44",
    delivery_address: "5 Rue Saint-Antoine",
    delivery_postal_code: "75004",
    delivery_city: "Paris",
    delivery_date: "2026-11-09",
    delivery_slot: "13h00 - 14h30",
    status: "paid",
    total_cents: 2570,
    subtotal_cents: 2180,
    delivery_fee_cents: 390,
    items_count: 2,
    items: [
      { product_name: "DAR Poulet", quantity: 2, price_cents: 1090, weight_grams: 460 },
    ],
    created_at: "2026-11-08T19:45:00Z",
  },
  {
    id: "ord-104",
    order_number: "DC-784213",
    customer_name: "Julien Moreau",
    customer_email: "j.moreau@techparis.io",
    customer_phone: "06 99 88 77 66",
    delivery_address: "12 Avenue de l'Opéra",
    delivery_postal_code: "75001",
    delivery_city: "Paris",
    delivery_instructions: "Bureau 4e étage - Société Alpha",
    delivery_date: "2026-11-09",
    delivery_slot: "11h30 - 13h00",
    status: "ready_for_delivery",
    total_cents: 5750,
    subtotal_cents: 5750,
    delivery_fee_cents: 0,
    items_count: 5,
    items: [
      { product_name: "DAR Merguez", quantity: 3, price_cents: 1190, weight_grams: 450 },
      { product_name: "DAR Poulet", quantity: 2, price_cents: 1090, weight_grams: 460 },
    ],
    created_at: "2026-11-08T20:05:00Z",
  },
  {
    id: "ord-105",
    order_number: "DC-784209",
    customer_name: "Amina Zeroual",
    customer_email: "amina.z@gmail.com",
    customer_phone: "07 55 44 33 22",
    delivery_address: "88 Avenue Parmentier",
    delivery_postal_code: "75011",
    delivery_city: "Paris",
    delivery_date: "2026-11-08",
    delivery_slot: "18h30 - 20h00",
    status: "delivered",
    total_cents: 3970,
    subtotal_cents: 3970,
    delivery_fee_cents: 0,
    items_count: 3,
    items: [
      { product_name: "DAR Végétal", quantity: 2, price_cents: 990, weight_grams: 430 },
      { product_name: "DAR Royal", quantity: 1, price_cents: 1590, weight_grams: 520 },
    ],
    created_at: "2026-11-08T15:20:00Z",
  },
];

export const initialAdminCustomers: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Camille Laurent",
    email: "camille.laurent@gmail.com",
    phone: "06 45 12 78 90",
    postal_code: "75011",
    orders_count: 6,
    total_spent_cents: 19840,
    last_order_date: "2026-11-08",
    created_at: "2026-09-12",
  },
  {
    id: "cust-2",
    name: "Karim Benali",
    email: "k.benali@outlook.fr",
    phone: "07 89 23 45 67",
    postal_code: "75011",
    orders_count: 4,
    total_spent_cents: 14250,
    last_order_date: "2026-11-08",
    created_at: "2026-10-01",
  },
  {
    id: "cust-3",
    name: "Sophie Martin",
    email: "sophie.martin@wanadoo.fr",
    phone: "06 11 22 33 44",
    postal_code: "75004",
    orders_count: 2,
    total_spent_cents: 5140,
    last_order_date: "2026-11-08",
    created_at: "2026-10-24",
  },
  {
    id: "cust-4",
    name: "Julien Moreau",
    email: "j.moreau@techparis.io",
    phone: "06 99 88 77 66",
    postal_code: "75001",
    orders_count: 9,
    total_spent_cents: 48900,
    last_order_date: "2026-11-08",
    created_at: "2026-08-15",
  },
  {
    id: "cust-5",
    name: "Amina Zeroual",
    email: "amina.z@gmail.com",
    phone: "07 55 44 33 22",
    postal_code: "75011",
    orders_count: 3,
    total_spent_cents: 11910,
    last_order_date: "2026-11-08",
    created_at: "2026-10-18",
  },
];

export const initialInventory: InventoryItem[] = [
  {
    product_id: "prod-royal",
    product_name: "DAR Royal",
    category_name: "Royal",
    available_portions: 45,
    daily_target: 50,
    low_stock_threshold: 8,
    lot_number: "LOT-2026-DC-042",
    price_cents: 1590,
    last_batch_time: "Ce matin à 06h30",
  },
  {
    product_id: "prod-agneau",
    product_name: "DAR Agneau",
    category_name: "Agneau",
    available_portions: 38,
    daily_target: 40,
    low_stock_threshold: 5,
    lot_number: "LOT-2026-DC-043",
    price_cents: 1390,
    last_batch_time: "Ce matin à 06h30",
  },
  {
    product_id: "prod-poulet",
    product_name: "DAR Poulet",
    category_name: "Poulet",
    available_portions: 60,
    daily_target: 60,
    low_stock_threshold: 8,
    lot_number: "LOT-2026-DC-045",
    price_cents: 1090,
    last_batch_time: "Ce matin à 07h00",
  },
  {
    product_id: "prod-merguez",
    product_name: "DAR Merguez",
    category_name: "Merguez",
    available_portions: 50,
    daily_target: 50,
    low_stock_threshold: 8,
    lot_number: "LOT-2026-DC-044",
    price_cents: 1190,
    last_batch_time: "Ce matin à 07h15",
  },
  {
    product_id: "prod-vegetal",
    product_name: "DAR Végétal",
    category_name: "Végétarien",
    available_portions: 4, // Intentionally low to show low-stock alert!
    daily_target: 30,
    low_stock_threshold: 6,
    lot_number: "LOT-2026-DC-046",
    price_cents: 990,
    last_batch_time: "Ce matin à 07h30",
  },
];

