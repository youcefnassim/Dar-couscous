import Link from "next/link";
import Image from "next/image";
import { ArrowRight, UtensilsCrossed, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-cream-100/70 via-cream-50/40 to-white py-12 md:py-16 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-cream-200/60 border border-cream-300/80 px-3 py-1.5 rounded-full text-xs font-semibold text-darkbrown">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Couscous traditionnel frais • Barquettes individuelles</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-darkbrown leading-tight tracking-tight">
              Le goût de la tradition, <br className="hidden sm:inline" />
              <span className="text-terracotta italic font-normal">prêt à déguster.</span>
            </h1>

            <p className="text-base sm:text-lg text-darkbrown/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Découvrez nos couscous préparés avec soin, conditionnés individuellement et livrés chez vous à Paris.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta text-white px-7 py-3.5 rounded-md font-medium text-sm hover:bg-terracotta-hover transition-all shadow-sm hover:shadow active:scale-95"
              >
                <span>Découvrir le menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/notre-histoire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-cream-300 text-darkbrown px-6 py-3.5 rounded-md font-medium text-sm hover:bg-cream-100 hover:border-cream-300 transition-colors"
              >
                <span>Notre histoire</span>
              </Link>
            </div>

            {/* Micro reassurance badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-cream-200/80 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
              <div>
                <span className="block font-serif text-lg font-bold text-darkbrown">100% Frais</span>
                <span className="text-[11px] text-darkbrown/60">Semoule & légumes du jour</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-darkbrown">0 - 4°C</span>
                <span className="text-[11px] text-darkbrown/60">Transport réfrigéré</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-darkbrown">3-4 min</span>
                <span className="text-[11px] text-darkbrown/60">Prêt à réchauffer</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white flex items-center justify-center p-4">
                <Image
                  src="/images/logo.png"
                  alt="DAR COUSCOUS — La tradition dans chaque boîte"
                  fill
                  priority
                  className="object-contain p-4"
                />
              </div>

              {/* Floating card badge */}
              <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-lg p-3.5 shadow-lg border border-cream-200 max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-terracotta shrink-0">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-darkbrown">Recette d&apos;artisan</p>
                    <p className="text-[10px] text-darkbrown/60">Semoule vapeur 3 bains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

