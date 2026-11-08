"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Comment sont conditionnés les couscous DAR COUSCOUS ?",
    a: "Chaque couscous est conditionné individuellement dans une barquette hermétique sous atmosphère protectrice, fabriquée en polypropylène sans BPA, 100% recyclable et conçue spécifiquement pour le réchauffage au micro-ondes.",
  },
  {
    q: "Combien de temps puis-je conserver ma barquette ?",
    a: "Nos plats sont cuisinés frais le matin même. Ils se conservent entre 3 et 4 jours au réfrigérateur (entre 0°C et +4°C). La date limite de consommation (DLC) exacte est imprimée sur l'étiquette de traçabilité de chaque barquette.",
  },
  {
    q: "Comment réchauffer mon couscous pour une texture optimale ?",
    a: "La méthode la plus rapide : percez le film protecteur à la pointe du couteau et réchauffez 3 minutes à 750W au micro-ondes. Laissez reposer une minute avant d'ouvrir. Au four : transvasez dans un plat adapté, couvrez d'aluminium et enfournez 12 à 15 minutes à 160°C.",
  },
  {
    q: "Les viandes sont-elles certifiées Halal et d'origine française ?",
    a: "Oui, absolument. Toutes nos viandes (agneau, poulet fermier, bœuf) sont d'origine France rigoureusement tracées et certifiées Halal. Nos merguez sont fabriquées par un artisan boucher partenaire selon la tradition.",
  },
  {
    q: "Quelles sont les zones et horaires de livraison ?",
    a: "Nous livrons l'ensemble des 20 arrondissements de Paris (75001 à 75020) ainsi que la première couronne des départements 92, 93 et 94. Vous pouvez choisir entre des créneaux de déjeuner (11h30-14h) et de dîner (18h30-21h30).",
  },
  {
    q: "Comment la chaîne du froid est-elle garantie lors de la livraison ?",
    a: "Nos livreurs utilisent des véhicules frigorifiques ou des caissons isothermes équipés d'enregistreurs de température calibrés à 0-4°C. Votre commande ne subit aucune rupture de froid.",
  },
  {
    q: "Quelle est la taille des portions ?",
    a: "Nos portions individuelles sont très généreuses : entre 430g et 520g selon la recette (jusqu'à 520g pour le DAR Royal). C'est un repas complet et équilibré pour une personne avec semoule, viande, légumes et bouillon.",
  },
  {
    q: "Puis-je congeler ma barquette ?",
    a: "Nos couscous sont livrés frais et non congelés. Si vous souhaitez congeler votre barquette, nous vous recommandons de le faire dès réception. Pour la déguster, laissez-la décongeler 12h au réfrigérateur avant réchauffage.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-terracotta font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>Questions Fréquentes</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-darkbrown">
            Tout ce que vous devez savoir
          </h1>
          <p className="text-sm text-darkbrown/70 max-w-lg mx-auto">
            Conservation, réchauffage, livraison et traçabilité : retrouvez les réponses de notre équipe.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-xl border border-cream-200 p-6 md:p-8 shadow-sm divide-y divide-cream-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="font-serif text-base font-bold text-darkbrown group-hover:text-terracotta transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-darkbrown/50 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-terracotta" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-darkbrown/75 mt-3 leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="bg-cream-100 rounded-xl p-6 text-center space-y-3 border border-cream-300">
          <h3 className="font-serif text-lg font-bold text-darkbrown">
            Vous avez une question spécifique ?
          </h3>
          <p className="text-xs text-darkbrown/70">
            Notre équipe est disponible pour vous répondre par email ou par téléphone.
          </p>
          <div className="pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-md text-xs font-semibold hover:bg-terracotta-hover transition-colors"
            >
              <span>Contactez notre atelier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

