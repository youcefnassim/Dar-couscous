-- ==============================================================================
-- DAR COUSCOUS — SCHEMA POSTGRESQL COMPLET & SÉCURISÉ (20 TABLES)
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'staff', 'admin');

CREATE TYPE order_status AS ENUM (
  'pending_payment',
  'paid',
  'confirmed',
  'preparing',
  'ready_for_delivery',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'refunded'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'succeeded',
  'failed',
  'refunded'
);

CREATE TYPE promo_type AS ENUM ('percentage', 'fixed');

CREATE TYPE inventory_movement_type AS ENUM (
  'production_in',
  'order_out',
  'loss_spoilage',
  'inventory_adjustment',
  'order_refund_restore'
);

-- ==============================================================================
-- TABLE 1: PROFILES (Extends Supabase auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'customer' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 2: CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 3: PRODUCTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE NOT NULL,
  weight_grams INT NOT NULL CHECK (weight_grams > 0),
  storage_instructions TEXT NOT NULL,
  storage_temperature TEXT NOT NULL DEFAULT 'Entre 0°C et +4°C',
  shelf_life_days INT NOT NULL DEFAULT 4,
  reheating_instructions JSONB NOT NULL DEFAULT '{}'::jsonb,
  nutritional_info JSONB DEFAULT '{}'::jsonb,
  ingredients_text TEXT NOT NULL,
  allergens_text TEXT NOT NULL,
  lot_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 4: PRODUCT_IMAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN DEFAULT FALSE NOT NULL,
  position INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 5: INGREDIENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  supplier TEXT,
  origin_country TEXT DEFAULT 'France',
  is_organic BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 6: ALLERGENS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.allergens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  code TEXT UNIQUE,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 7: PRODUCT_INGREDIENTS (Many-to-Many)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_ingredients (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES public.ingredients(id) ON DELETE CASCADE,
  percentage NUMERIC(5,2),
  PRIMARY KEY (product_id, ingredient_id)
);

-- ==============================================================================
-- TABLE 8: PRODUCT_ALLERGENS (Many-to-Many)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_allergens (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  allergen_id UUID REFERENCES public.allergens(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, allergen_id)
);

-- ==============================================================================
-- TABLE 9: DELIVERY_ZONES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  postal_codes TEXT[] NOT NULL,
  delivery_fee_cents INT DEFAULT 390 NOT NULL,
  min_order_cents INT DEFAULT 2000 NOT NULL,
  free_delivery_threshold_cents INT DEFAULT 3500 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 10: DELIVERY_SLOTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.delivery_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  day_name TEXT NOT NULL,
  time_range TEXT NOT NULL,
  max_orders INT DEFAULT 20 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 11: PROMOTIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  type promo_type NOT NULL DEFAULT 'percentage',
  value NUMERIC(10,2) NOT NULL,
  min_order_cents INT DEFAULT 0 NOT NULL,
  max_uses INT,
  current_uses INT DEFAULT 0 NOT NULL,
  starts_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 12: PROMOTION_USAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promotion_usages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  promotion_id UUID NOT NULL REFERENCES public.promotions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id UUID,
  used_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 13: ORDERS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status order_status NOT NULL DEFAULT 'pending_payment',
  subtotal_cents INT NOT NULL CHECK (subtotal_cents >= 0),
  discount_cents INT DEFAULT 0 NOT NULL CHECK (discount_cents >= 0),
  delivery_fee_cents INT DEFAULT 0 NOT NULL CHECK (delivery_fee_cents >= 0),
  tax_cents INT DEFAULT 0 NOT NULL,
  total_cents INT NOT NULL CHECK (total_cents >= 0),
  promo_code TEXT,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_postal_code TEXT NOT NULL,
  delivery_city TEXT NOT NULL,
  delivery_instructions TEXT,
  delivery_date DATE NOT NULL,
  delivery_slot TEXT NOT NULL,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 14: ORDER_ITEMS (Historical Snapshot)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  price_cents INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  weight_grams INT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 15: PAYMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  amount_cents INT NOT NULL,
  currency TEXT DEFAULT 'eur' NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  payment_method TEXT DEFAULT 'card',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 16: INVENTORY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inventory (
  product_id UUID PRIMARY KEY REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_available INT NOT NULL DEFAULT 0 CHECK (quantity_available >= 0),
  quantity_reserved INT NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
  low_stock_threshold INT NOT NULL DEFAULT 5,
  daily_production_target INT DEFAULT 30 NOT NULL,
  last_batch_date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 17: INVENTORY_MOVEMENTS (Audit Trail)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type inventory_movement_type NOT NULL,
  quantity_changed INT NOT NULL,
  new_quantity INT NOT NULL,
  reference_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  lot_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 18: CUSTOMER_ADDRESSES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.customer_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Domicile',
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  delivery_instructions TEXT,
  is_default BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 19: REVIEWS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- TABLE 20: BUSINESS_SETTINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.business_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_date ON public.orders(delivery_date);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON public.inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_prod ON public.inventory_movements(product_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allergens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_allergens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Public Read Policies for Catalog & Delivery
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public can view active delivery zones" ON public.delivery_zones FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view active delivery slots" ON public.delivery_slots FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (is_approved = true OR public.is_admin());
CREATE POLICY "Public can view allergens and ingredients" ON public.allergens FOR SELECT USING (true);
CREATE POLICY "Public can view ingredients" ON public.ingredients FOR SELECT USING (true);
CREATE POLICY "Public can view business settings" ON public.business_settings FOR SELECT USING (true);

-- 2. Customer Policies
CREATE POLICY "Users can view and update own profile" ON public.profiles FOR ALL USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can manage own addresses" ON public.customer_addresses FOR ALL USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Allow guests and users to create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow order items creation" ON public.order_items FOR INSERT WITH CHECK (true);

-- 3. Full Admin Access Policies
CREATE POLICY "Admin full access on categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on product_images" ON public.product_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on orders" ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on order_items" ON public.order_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on payments" ON public.payments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on inventory" ON public.inventory FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on inventory_movements" ON public.inventory_movements FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on delivery_zones" ON public.delivery_zones FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on delivery_slots" ON public.delivery_slots FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on promotions" ON public.promotions FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on promotion_usages" ON public.promotion_usages FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on business_settings" ON public.business_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access on reviews" ON public.reviews FOR ALL USING (public.is_admin());

