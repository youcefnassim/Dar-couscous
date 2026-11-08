export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  is_primary: boolean;
  position: number;
}

export interface Ingredient {
  id: string;
  name: string;
  is_organic?: boolean;
}

export interface Allergen {
  id: string;
  name: string;
  code?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  price_cents: number;
  category_id: string;
  category?: Category;
  is_active: boolean;
  is_featured: boolean;
  weight_grams: number;
  storage_instructions: string;
  storage_temperature: string;
  shelf_life_days: number;
  reheating_instructions: {
    microwave?: string;
    oven?: string;
    steamer?: string;
  };
  ingredients_text: string;
  allergens_text: string;
  nutritional_info?: {
    calories_kcal: number;
    proteins_g: number;
    carbohydrates_g: number;
    fat_g: number;
    fiber_g: number;
    salt_g: number;
  };
  lot_number?: string;
  images: ProductImage[];
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: string;
  product_name: string;
  product_slug: string;
  price_cents: number;
  quantity: number;
  image_url: string;
  weight_grams: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  postal_codes: string[];
  delivery_fee_cents: number;
  min_order_cents: number;
  free_delivery_threshold_cents: number;
  is_active: boolean;
}

export interface DeliverySlot {
  id: string;
  day_of_week: number; // 0=Sunday, 1=Monday, etc.
  day_name: string;
  time_range: string;
  max_orders: number;
  available_orders: number;
  is_active: boolean;
}

export interface CheckoutFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  delivery_instructions: string;
  delivery_date: string;
  delivery_slot: string;
}

