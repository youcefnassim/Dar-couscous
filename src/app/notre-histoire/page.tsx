import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Award } from "lucide-react";

export const metadata = {
  title: "Notre Histoire — DAR COUSCOUS Paris",
  description: "L'art et la tradition du véritable couscous maghrébin, préparé chaque jour dans notre atelier parisien.",
};

export default function NotreHistoirePage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-olive font-bold">
            Maison d&apos;Artisanat Culinaire
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-darkbrown">
            La Tradition dans Chaque Boîte
          </h1>
          <p className="text-base text-darkbrown/70 max-w-xl mx-auto">
            Comment une passion familiale transmise sur trois générations est devenue la première maison de couscous frais individuel à Paris.
          </p>
        </div>

        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-cream-200">
          <Image
            src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1400&q=80"
            alt="Préparation de la semoule et des épices traditionnelles"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Narrative Section 1: The Origin */}
        <div className="bg-white rounded-xl border border-cream-200 p-8 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-terracotta text-sm font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Nos Racines</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-darkbrown">
            Le rituel du couscous réinventé pour le quotidien
          </h2>
          <p className="text-sm text-darkbrown/80 leading-relaxed">
            Dans nos mémoires d&apos;enfance, le couscous était synonyme de fête, de rassemblement et de générosité. Mais dans le rythme trépidant de Paris, trouver le temps de faire mijoter un bouillon pendant cinq heures et de rouler la semoule en trois bains de vapeur est devenu un luxe rare.
          </p>
          <p className="text-sm text-darkbrown/80 leading-relaxed">
            C&apos;est de ce constat qu&apos;est né <strong>DAR COUSCOUS</strong> : apporter toute l&apos;authenticité gustative et l&apos;émotion d&apos;un couscous familial dans une barquette individuelle pratique, conservée au frais et réchauffable en quelques minutes.
          </p>
        </div>

        {/* Narrative Section 2: The Craft */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded bg-cream-100 flex items-center justify-center text-terracotta">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-darkbrown">
              La Semoule Aérienne
            </h3>
            <p className="text-xs text-darkbrown/75 leading-relaxed">
              Nous n&apos;utilisons aucune semoule précuite industrielle. Notre grain fin est frotté à l&apos;huile d&apos;olive, cuit trois fois à la vapeur douce et aéré à la main avec une touche de beurre clarifié traditionnel (smen).
            </p>
          </div>

          <div className="bg-white rounded-xl border border-cream-200 p-6 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded bg-cream-100 flex items-center justify-center text-olive">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-darkbrown">
              Le Bouillon aux Douze Épices
            </h3>
            <p className="text-xs text-darkbrown/75 leading-relaxed">
              La véritable âme du couscous. Des os d&apos;agneau et des carcasses de volailles mijotés longuement avec des branches de céleri, de la coriandre fraîche, du safran en filaments et un mélange secret de ras el hanout artisanal.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-darkbrown rounded-2xl p-8 sm:p-10 text-center text-white space-y-4 shadow-md">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100">
            Envie de goûter la différence ?
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/80 max-w-md mx-auto">
            Commandez votre couscous individuel frais préparé aujourd&apos;hui et découvrez une nouvelle manière de savourer la tradition.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors shadow-sm"
            >
              <span>Découvrir notre menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

