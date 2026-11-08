import { ShoppingCart, ChefHat, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ShoppingCart,
    title: "1. Commandez en ligne",
    description:
      "Composez votre menu de barquettes individuelles et choisissez votre créneau de livraison adapté à votre emploi du temps.",
  },
  {
    num: "02",
    icon: ChefHat,
    title: "2. Préparation du jour",
    description:
      "Nos cuisiniers préparent vos couscous le matin même, avec un bouillon mijoté lentement et une semoule cuite à la vapeur.",
  },
  {
    num: "03",
    icon: Truck,
    title: "3. Livré frais & Réchauffé",
    description:
      "Livraison en véhicule réfrigéré (0-4°C) à Paris. Conservez votre barquette au frais ou réchauffez-la en 3 min 30 au micro-ondes.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-terracotta font-bold">
            Simplicité &amp; Confort
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown mt-2">
            Comment ça marche ?
          </h2>
          <p className="text-sm text-darkbrown/70 mt-2">
            Du mijotage dans notre atelier jusqu&apos;à votre table en 3 étapes simples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-cream-50/50 p-6 rounded-lg border border-cream-200 text-center flex flex-col items-center"
              >
                <span className="absolute top-4 right-4 font-serif text-3xl font-bold text-cream-300 select-none">
                  {step.num}
                </span>

                <div className="w-12 h-12 rounded-full bg-white border border-cream-300 shadow-sm flex items-center justify-center text-terracotta mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-lg font-bold text-darkbrown mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-darkbrown/70 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

