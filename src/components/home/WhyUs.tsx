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
    <section className="py-16 bg-cream-50/60 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-olive font-bold">
            Engagement &amp; Qualité
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown mt-2">
            Pourquoi choisir DAR COUSCOUS ?
          </h2>
          <p className="text-sm text-darkbrown/70 mt-2">
            L&apos;excellence du couscous traditionnel sans les heures de préparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-cream-200 shadow-sm hover:border-terracotta/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-cream-100 flex items-center justify-center text-terracotta mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-darkbrown mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-darkbrown/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

