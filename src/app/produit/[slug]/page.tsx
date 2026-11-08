
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { ProductDetailClient } from "./ProductDetailClient";
import {
  ThermometerSnowflake,
  Clock,
  Flame,
  ShieldCheck,
  Scale,
  ChevronRight,
  Info,
  CheckCircle2
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return { title: "Plat non trouvé | DAR COUSCOUS" };
  }

  return {
    title: `${product.name} — ${formatPrice(product.price_cents)} | DAR COUSCOUS Paris`,
    description: `${product.subtitle}. ${product.description.slice(0, 150)}...`,
    openGraph: {
      title: `${product.name} — DAR COUSCOUS`,
      description: product.subtitle,
      images: [
        {
          url: product.images[0]?.url || "",
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-cream-50/30 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-darkbrown/60 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-terracotta">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/menu" className="hover:text-terracotta">Notre menu</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkbrown font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Section: Gallery + Purchase Column */}
        <div className="bg-white rounded-xl border border-cream-200 p-6 md:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-cream-200 shadow-sm flex items-center justify-center">
                <Image
                  src={product.images[0]?.url || "/images/logo.png"}
                  alt={product.images[0]?.alt || product.name}
                  fill
                  priority
                  className="object-contain p-6"
                />
                {product.category && (
                  <span className="absolute top-4 left-4 bg-darkbrown text-cream-100 text-xs font-semibold px-3 py-1 rounded">
                    {product.category.name}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-darkbrown text-xs font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-terracotta" />
                  <span>Poids net : {product.weight_grams} g</span>
                </span>
              </div>

              {/* Secondary thumbnails if available */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-24 h-20 rounded-md overflow-hidden border-2 border-cream-300"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Food reassurance indicators */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-cream-50 p-3 rounded border border-cream-200 flex items-center gap-2.5">
                  <ThermometerSnowflake className="w-5 h-5 text-terracotta shrink-0" />
                  <div>
                    <span className="font-bold text-darkbrown block">Conservation</span>
                    <span className="text-darkbrown/70">{product.storage_temperature}</span>
                  </div>
                </div>

                <div className="bg-cream-50 p-3 rounded border border-cream-200 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-olive shrink-0" />
                  <div>
                    <span className="font-bold text-darkbrown block">DLC Garantie</span>
                    <span className="text-darkbrown/70">{product.shelf_life_days} jours au frais</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Purchase & Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-darkbrown">
                    {product.name}
                  </h1>
                  <p className="text-sm font-medium text-olive mt-1">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-darkbrown">
                    {formatPrice(product.price_cents)}
                  </span>
                  <span className="text-xs text-darkbrown/60">
                    TVA incluse • Portion individuelle ({product.weight_grams}g)
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-darkbrown/80 leading-relaxed pt-2 border-t border-cream-200">
                  {product.description}
                </p>

                {/* Quick Highlights */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                    <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                    <span>Préparé le matin même dans notre atelier parisien (75011)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                    <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                    <span>Conditionné sous atmosphère protectrice en barquette micro-ondable</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                    <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                    <span>Semoule de tradition roulée à la main, cuite en 3 passages vapeur</span>
                  </div>
                </div>
              </div>

              {/* Interactive Quantity & Add to Cart Client Component */}
              <div className="pt-4 border-t border-cream-200">
                <ProductDetailClient product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Food Business Tabs & Details: Ingredients, Allergens, Reheating */}
        <div className="bg-white rounded-xl border border-cream-200 p-6 md:p-10 shadow-sm space-y-8">
          <h2 className="font-serif text-2xl font-bold text-darkbrown border-b border-cream-200 pb-4">
            Informations réglementaires &amp; Dégustation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients & Allergens */}
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-2">
                  <Info className="w-4 h-4 text-terracotta" />
                  <span>Liste des Ingrédients</span>
                </h3>
                <p className="text-xs text-darkbrown/80 leading-relaxed mt-2 p-3 bg-cream-50 rounded border border-cream-200">
                  {product.ingredients_text}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-darkbrown flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-terracotta" />
                  <span>Allergènes Majeurs</span>
                </h3>
                <p className="text-xs text-darkbrown/80 mt-1 p-3 bg-amber-50/70 text-amber-900 rounded border border-amber-200">
                  {product.allergens_text}
                </p>
              </div>

              {product.nutritional_info && (
                <div className="pt-2">
                  <h3 className="font-serif text-sm font-bold text-darkbrown mb-2">
                    Valeurs nutritionnelles moyennes (pour 100g)
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                    <div className="bg-cream-50 p-2 rounded border border-cream-200">
                      <span className="block text-darkbrown/60">Énergie</span>
                      <span className="font-bold text-darkbrown">
                        {Math.round(product.nutritional_info.calories_kcal / (product.weight_grams / 100))} kcal
                      </span>
                    </div>
                    <div className="bg-cream-50 p-2 rounded border border-cream-200">
                      <span className="block text-darkbrown/60">Protéines</span>
                      <span className="font-bold text-darkbrown">
                        {(product.nutritional_info.proteins_g / (product.weight_grams / 100)).toFixed(1)} g
                      </span>
                    </div>
                    <div className="bg-cream-50 p-2 rounded border border-cream-200">
                      <span className="block text-darkbrown/60">Glucides</span>
                      <span className="font-bold text-darkbrown">
                        {(product.nutritional_info.carbohydrates_g / (product.weight_grams / 100)).toFixed(1)} g
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reheating & Storage */}
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-2">
                  <Flame className="w-4 h-4 text-terracotta" />
                  <span>Conseils de Réchauffage</span>
                </h3>
                <div className="mt-2 space-y-3">
                  {product.reheating_instructions.microwave && (
                    <div className="p-3 bg-cream-50 rounded border border-cream-200 text-xs">
                      <span className="font-bold text-darkbrown block mb-1">
                        ⚡ Au four à micro-ondes (Recommandé) :
                      </span>
                      <p className="text-darkbrown/80">
                        {product.reheating_instructions.microwave}
                      </p>
                    </div>
                  )}

                  {product.reheating_instructions.oven && (
                    <div className="p-3 bg-cream-50 rounded border border-cream-200 text-xs">
                      <span className="font-bold text-darkbrown block mb-1">
                        🔥 Au four traditionnel :
                      </span>
                      <p className="text-darkbrown/80">
                        {product.reheating_instructions.oven}
                      </p>
                    </div>
                  )}

                  {product.reheating_instructions.steamer && (
                    <div className="p-3 bg-cream-50 rounded border border-cream-200 text-xs">
                      <span className="font-bold text-darkbrown block mb-1">
                        🍲 Au couscoussier vapeur :
                      </span>
                      <p className="text-darkbrown/80">
                        {product.reheating_instructions.steamer}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-darkbrown flex items-center gap-2">
                  <ThermometerSnowflake className="w-4 h-4 text-olive" />
                  <span>Stockage &amp; Traçabilité</span>
                </h3>
                <div className="p-3 bg-cream-50 rounded border border-cream-200 text-xs text-darkbrown/80 space-y-1 mt-1">
                  <p><strong>Température de stockage :</strong> {product.storage_temperature}</p>
                  <p><strong>Instructions :</strong> {product.storage_instructions}</p>
                  {product.lot_number && (
                    <p><strong>Numéro de lot atelier :</strong> {product.lot_number}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

