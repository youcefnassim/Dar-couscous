-- ==============================================================================
-- DAR COUSCOUS — SEED DATA INITIAL
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, display_order, is_active)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Royal', 'royal', 'Le grand festin réunissant toutes nos viandes d''exception.', 1, true),
  ('c1000000-0000-0000-0000-000000000002', 'Agneau', 'agneau', 'Souris et épaule d''agneau confites lentement aux épices douces.', 2, true),
  ('c1000000-0000-0000-0000-000000000003', 'Poulet', 'poulet', 'Poulet fermier label rouge mariné et mijoté au bouillon doré.', 3, true),
  ('c1000000-0000-0000-0000-000000000004', 'Merguez', 'merguez', 'Merguez artisanales pur bœuf et agneau, délicatement relevées.', 4, true),
  ('c1000000-0000-0000-0000-000000000005', 'Végétarien', 'vegetarien', 'Une explosion de 7 légumes du terroir et pois chiches fondants.', 5, true)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (
  id, name, slug, subtitle, description, price_cents, category_id, is_active, is_featured,
  weight_grams, storage_instructions, storage_temperature, shelf_life_days,
  reheating_instructions, nutritional_info, ingredients_text, allergens_text, lot_number
)
VALUES
  (
    'p1000000-0000-0000-0000-000000000001',
    'DAR Royal',
    'dar-royal',
    'L''apogée de notre savoir-faire : agneau fondant, poulet fermier et merguez',
    'Notre couscous le plus généreux. Une association magistrale d''épaule d''agneau confite, de poulet fermier mijoté et de véritables merguez artisanales grillées. Accompagné de notre semoule roulée à la main extra-fine, cuite à la vapeur trois fois, de légumes mijotés et de bouillon aux 12 épices.',
    1590,
    'c1000000-0000-0000-0000-000000000001',
    true,
    true,
    520,
    'Conserver immédiatement au réfrigérateur entre 0°C et +4°C. Ne pas congeler.',
    'Entre 0°C et +4°C',
    4,
    '{"microwave": "Percez le film protecteur de la barquette. Réchauffez 3 min 30 à 750W.", "oven": "12 à 15 minutes à 160°C dans un plat couvert."}'::jsonb,
    '{"calories_kcal": 680, "proteins_g": 42, "carbohydrates_g": 68, "fat_g": 24}'::jsonb,
    'Semoule de blé dur fine, bouillon maison, agneau français (18%), poulet fermier (15%), merguez artisanale (12%), carottes, courgettes, navets, pois chiches, smen, épices douces, safran.',
    'Céréales contenant du gluten (blé), céleri, produits laitiers (beurre clarifié smen).',
    'LOT-2026-DC-042'
  ),
  (
    'p1000000-0000-0000-0000-000000000002',
    'DAR Agneau',
    'dar-agneau',
    'Épaule d''agneau mijotée 5 heures, fondante à souhait',
    'Pour les puristes du couscous traditionnel maghrébin. Une généreuse portion d''agneau français cuite à feu doux pendant plus de cinq heures dans un bouillon onctueux parfumé au safran et au gingembre frais.',
    1390,
    'c1000000-0000-0000-0000-000000000002',
    true,
    true,
    480,
    'Conserver entre 0°C et +4°C au réfrigérateur. DLC indiquée sur l''emballage.',
    'Entre 0°C et +4°C',
    4,
    '{"microwave": "Percez le film protecteur, 3 minutes à 750W.", "oven": "15 minutes à 150°C dans un plat couvert."}'::jsonb,
    '{"calories_kcal": 610, "proteins_g": 36, "carbohydrates_g": 62, "fat_g": 22}'::jsonb,
    'Semoule de blé dur fine, épaule d''agneau français (30%), bouillon d''agneau maison, carottes, navets, courgettes, pois chiches, huile d''olive vierge extra, safran pur.',
    'Gluten (blé), céleri, lait.',
    'LOT-2026-DC-043'
  ),
  (
    'p1000000-0000-0000-0000-000000000003',
    'DAR Poulet',
    'dar-poulet',
    'Poulet fermier mariné au citron confit et coriandre fraîche',
    'Un grand classique réconfortant. De tendres morceaux de haut de cuisse de poulet fermier français, mijotés dans un bouillon limpide et soyeux, relevé d''une touche de citron confit et de pois chiches moelleux.',
    1090,
    'c1000000-0000-0000-0000-000000000003',
    true,
    true,
    460,
    'Conserver entre 0°C et +4°C au réfrigérateur.',
    'Entre 0°C et +4°C',
    4,
    '{"microwave": "Percez le film protecteur, réchauffez 3 minutes à 750W.", "oven": "12 minutes à 160°C."}'::jsonb,
    '{"calories_kcal": 540, "proteins_g": 34, "carbohydrates_g": 60, "fat_g": 16}'::jsonb,
    'Semoule de blé dur, cuisses de poulet fermier français (28%), bouillon de volaille aux herbes fraîches, carottes, courgettes, navets, pois chiches, citrons confits, coriandre.',
    'Gluten (blé), céleri.',
    'LOT-2026-DC-045'
  ),
  (
    'p1000000-0000-0000-0000-000000000004',
    'DAR Merguez',
    'dar-merguez',
    'Véritables merguez d''artisan boucher, parfumées et subtilement piquantes',
    'Trois merguez pur bœuf et agneau préparées selon la méthode traditionnelle, sans colorant artificiel ni conservateur. Saisies à la plancha sur semoule fine et légumes fondants.',
    1190,
    'c1000000-0000-0000-0000-000000000004',
    true,
    true,
    450,
    'À conserver entre 0°C et +4°C. Bien respecter la date limite de consommation.',
    'Entre 0°C et +4°C',
    4,
    '{"microwave": "Percez le film, réchauffez 3 minutes à 750W.", "oven": "10-12 minutes à 170°C."}'::jsonb,
    '{"calories_kcal": 590, "proteins_g": 28, "carbohydrates_g": 64, "fat_g": 24}'::jsonb,
    'Semoule de blé dur, merguez artisanales bœuf & agneau (35%), bouillon de légumes, carottes, courgettes, navets, pois chiches, paprika doux, carvi.',
    'Gluten (blé), céleri.',
    'LOT-2026-DC-044'
  ),
  (
    'p1000000-0000-0000-0000-000000000005',
    'DAR Végétal',
    'dar-vegetal',
    'Sept légumes du maraîchage bio et pois chiches fondants',
    'Une interprétation végétarienne fidèle à la tradition des grandes tablées familiales. Carottes fanes, navets nouveaux, courgettes tendres, potimarron, fenouil et pois chiches mijotés dans un bouillon 100% végétal.',
    990,
    'c1000000-0000-0000-0000-000000000005',
    true,
    false,
    430,
    'À conserver entre 0°C et +4°C au réfrigérateur.',
    'Entre 0°C et +4°C',
    4,
    '{"microwave": "Percez le film protecteur, réchauffez 2 min 45 à 750W.", "oven": "10 minutes à 160°C."}'::jsonb,
    '{"calories_kcal": 440, "proteins_g": 16, "carbohydrates_g": 68, "fat_g": 10}'::jsonb,
    'Semoule de blé dur, bouillon végétal mijoté maison, carottes, navets, courgettes, potimarron, fenouil, pois chiches bio, huile d''olive extra bio, coriandre, menthe.',
    'Gluten (blé), céleri.',
    'LOT-2026-DC-046'
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Product Images
INSERT INTO public.product_images (product_id, url, alt, is_primary, position)
VALUES
  ('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80', 'Couscous Royal DAR COUSCOUS', true, 1),
  ('p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80', 'Couscous Agneau DAR COUSCOUS', true, 1),
  ('p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80', 'Couscous Poulet DAR COUSCOUS', true, 1),
  ('p1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80', 'Couscous Merguez DAR COUSCOUS', true, 1),
  ('p1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80', 'Couscous Végétal DAR COUSCOUS', true, 1);

-- 4. Insert Initial Inventory
INSERT INTO public.inventory (product_id, quantity_available, quantity_reserved, low_stock_threshold, daily_production_target)
VALUES
  ('p1000000-0000-0000-0000-000000000001', 45, 0, 5, 40),
  ('p1000000-0000-0000-0000-000000000002', 38, 0, 5, 30),
  ('p1000000-0000-0000-0000-000000000003', 60, 0, 5, 50),
  ('p1000000-0000-0000-0000-000000000004', 50, 0, 5, 40),
  ('p1000000-0000-0000-0000-000000000005', 40, 0, 5, 30)
ON CONFLICT (product_id) DO NOTHING;

-- 5. Insert Delivery Zones
INSERT INTO public.delivery_zones (id, name, postal_codes, delivery_fee_cents, min_order_cents, free_delivery_threshold_cents, is_active)
VALUES
  (
    'z1000000-0000-0000-0000-000000000001',
    'Paris Intra-Muros (75001 - 75020)',
    ARRAY['75001','75002','75003','75004','75005','75006','75007','75008','75009','75010','75011','75012','75013','75014','75015','75016','75017','75018','75019','75020'],
    390,
    2000,
    3500,
    true
  ),
  (
    'z1000000-0000-0000-0000-000000000002',
    'Hauts-de-Seine (92)',
    ARRAY['92100','92200','92300','92400','92110','92120','92130','92170','92210'],
    490,
    2500,
    4500,
    true
  ),
  (
    'z1000000-0000-0000-0000-000000000003',
    'Seine-Saint-Denis (93)',
    ARRAY['93100','93200','93300','93400','93500','93170','93260'],
    490,
    2500,
    4500,
    true
  ),
  (
    'z1000000-0000-0000-0000-000000000004',
    'Val-de-Marne (94)',
    ARRAY['94160','94200','94220','94230','94250','94300','94800'],
    490,
    2500,
    4500,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Promotions
INSERT INTO public.promotions (code, type, value, min_order_cents, max_uses, is_active)
VALUES
  ('BIENVENUE10', 'percentage', 10.00, 2000, 500, true),
  ('PARIS15', 'percentage', 15.00, 3000, 200, true),
  ('DAR5', 'fixed', 5.00, 2500, 100, true)
ON CONFLICT (code) DO NOTHING;

-- 7. Insert Business Settings
INSERT INTO public.business_settings (key, value, description)
VALUES
  (
    'general',
    '{"brand_name": "DAR COUSCOUS", "slogan": "La tradition dans chaque boîte.", "email": "bonjour@darcouscous.fr", "phone": "01 42 00 24 50", "address": "24 Rue Léon Frot, 75011 Paris"}'::jsonb,
    'Informations générales de l''établissement'
  ),
  (
    'tax',
    '{"vat_rate_food": 5.5, "vat_rate_delivery": 10.0, "is_tax_included": true}'::jsonb,
    'Configuration des taux de TVA applicables'
  ),
  (
    'delivery',
    '{"default_fee_cents": 390, "free_threshold_cents": 3500, "temp_min": 0, "temp_max": 4}'::jsonb,
    'Règles globales de transport et conservation'
  )
ON CONFLICT (key) DO NOTHING;

