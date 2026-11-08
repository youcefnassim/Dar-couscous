import { Flame, Clock, HeartHandshake, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Savoir-faire Ancestral",
    description:
      "Des recettes transmises de mère en fille, avec une semoule fine roulée et cuite trois fois à la vapeur pour une légèreté incomparable.",
  },
  {
    icon: ShieldCheck,
    title: "Fraîcheur & Traçabilité",
    description:
      "Des viandes 100% françaises sélectionnées et des légumes frais de saison, cuisinés le matin même dans notre atelier parisien.",
  },
  {
    icon: Clock,
    title: "Barquette Individuelle",
    description:
      "Chaque portion de 400g à 520g est hermétiquement scellée, prête à être conservée au réfrigérateur (0-4°C) et réchauffée en 3 minutes.",
  },
  {
    icon: Flame,
    title: "Saveurs Préservées",
    description:
      "Notre bouillon aux douze épices douces et safran est dosé avec précision pour que le plat conserve toute son onctuosité une fois réchauffé.",
  },
];

export function WhyUs() {
  return (
    <section className="py-12 sm:py-16 bg-cream-50/60 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-olive font-bold">
            Engagement &amp; Qualité
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-darkbrown mt-1 sm:mt-2">
            Pourquoi choisir DAR COUSCOUS ?
          </h2>
          <p className="text-xs sm:text-sm text-darkbrown/70 mt-1 sm:mt-2">
            L&apos;excellence du couscous traditionnel sans les heures de préparation.
          </p>
        </div>

        {/* Cartes affichées deux par deux */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-3.5 sm:p-6 rounded-xl border border-cream-200 shadow-sm hover:border-terracotta/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-cream-100 flex items-center justify-center text-terracotta mb-2.5 sm:mb-4">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-darkbrown mb-1 sm:mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-darkbrown/70 leading-relaxed">
                    {feature.description}
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
