import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DeliverySection } from "@/components/home/DeliverySection";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/lib/mock-data";

export default function HomePage() {
  // 4 featured products
  const featuredProducts = products.filter((p) => p.is_active).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Products Grid */}
      <section className="py-16 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-terracotta font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nos Plats Emblématiques</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown">
                Les Couscous du Jour
              </h2>
              <p className="text-sm text-darkbrown/70 mt-1 max-w-xl">
                Cuisinés le matin même avec des ingrédients rigoureusement sourcés. Barquettes individuelles réfrigérées prêtes à réchauffer.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-hover transition-colors shrink-0"
            >
              <span>Voir tout le menu (5 recettes)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pourquoi DAR COUSCOUS ? */}
      <WhyUs />

      {/* 4. Comment ça marche (Commander, Préparer, Livrer) */}
      <HowItWorks />

      {/* 5. Livraison à Paris */}
      <DeliverySection />

      {/* 6. Short Brand Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs uppercase tracking-widest text-olive font-bold">
            Maison Fondée sur la Transmission
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-darkbrown">
            « Nous rendons au couscous ses lettres de noblesse dans un format pensé pour la vie parisienne. »
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/80 leading-relaxed max-w-2xl mx-auto">
            Chez DAR COUSCOUS, pas de raccourcis industriels. La semoule est aérée à la main et cuite à la vapeur en trois bains successifs, les viandes sont lentement confites et le bouillon mijote plus de six heures. Un plaisir authentique, accessible sans passer des heures en cuisine.
          </p>
          <div className="pt-2">
            <Link
              href="/notre-histoire"
              className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:underline underline-offset-4"
            >
              <span>Découvrir l&apos;histoire de notre famille</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

