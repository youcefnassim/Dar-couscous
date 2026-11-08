import { ShoppingCart, ChefHat, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ShoppingCart,
    title: "1. Commandez en ligne",
    description:
      "Composez votre sélection de barquettes individuelles et choisissez votre créneau de livraison.",
  },
  {
    num: "02",
    icon: ChefHat,
    title: "2. Préparation du jour",
    description:
      "Nos cuisiniers préparent vos couscous le matin même, avec un bouillon mijoté et semoule vapeur.",
  },
  {
    num: "03",
    icon: Truck,
    title: "3. Livré frais & Réchauffé",
    description:
      "Livraison en véhicule réfrigéré (0-4°C) à Paris. À déguster après 3 min au micro-ondes.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-terracotta font-bold">
            Simplicité &amp; Confort
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-darkbrown mt-1 sm:mt-2">
            Comment ça marche ?
          </h2>
          <p className="text-xs sm:text-sm text-darkbrown/70 mt-1 sm:mt-2">
            Du mijotage dans notre atelier jusqu&apos;à votre table en 3 étapes simples.
          </p>
        </div>

        {/* Grille deux par deux sur mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === 2;
            return (
              <div
                key={idx}
                className={`relative bg-cream-50/60 p-3.5 sm:p-6 rounded-xl border border-cream-200 text-center flex flex-col items-center justify-between ${
                  isLast ? "col-span-2 md:col-span-1 max-w-sm mx-auto w-full" : ""
                }`}
              >
                <span className="absolute top-2 right-2.5 sm:top-4 sm:right-4 font-serif text-xl sm:text-3xl font-bold text-cream-300 select-none">
                  {step.num}
                </span>

                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border border-cream-300 shadow-sm flex items-center justify-center text-terracotta mb-2.5 sm:mb-4">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>

                <div>
                  <h3 className="font-serif text-xs sm:text-lg font-bold text-darkbrown mb-1 sm:mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-darkbrown/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
