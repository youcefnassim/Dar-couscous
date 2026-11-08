import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DeliverySection } from "@/components/home/DeliverySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Products Grid (Live synchronized) */}
      <FeaturedProducts />

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

