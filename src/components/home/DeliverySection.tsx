import Link from "next/link";
import { MapPin, Clock, ThermometerSnowflake, CheckCircle2 } from "lucide-react";

export function DeliverySection() {
  return (
    <section className="py-16 bg-cream-100/50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-cream-200 shadow-sm p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-olive font-bold">
                Livraison Paris &amp; Proche Banlieue
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown">
                Vos barquettes livrées fraîches, directement chez vous ou au bureau.
              </h2>
              <p className="text-sm text-darkbrown/70 leading-relaxed">
                Nous assurons une logistique du froid rigoureuse. Nos barquettes hermétiques arrivent à une température comprise entre 0°C et 4°C, prêtes à être placées au frigo ou réchauffées immédiatement.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>Tous les arrondissements de Paris (75001 à 75020)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>Proche banlieue : 92, 93, 94 éligibles</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>Créneaux déjeuner (11h30 - 14h) et dîner (18h30 - 21h30)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-darkbrown/80">
                  <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  <span>Livraison offerte dès 35 € d&apos;achat</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/livraison"
                  className="inline-flex items-center text-xs font-semibold text-terracotta hover:underline underline-offset-4"
                >
                  Consulter la liste complète des codes postaux éligibles →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-cream-50 p-6 rounded-lg border border-cream-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-terracotta/10 text-terracotta shrink-0 mt-0.5">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-darkbrown">Chaîne du froid ininterrompue</h4>
                  <p className="text-xs text-darkbrown/70 mt-0.5">
                    Transport en véhicule frigorifique ou caissons isothermes certifiés à 0-4°C.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-olive/10 text-olive shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-darkbrown">Créneaux horaires précis</h4>
                  <p className="text-xs text-darkbrown/70 mt-0.5">
                    Sélectionnez votre tranche horaire lors du paiement pour être certain d&apos;être disponible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-darkbrown/10 text-darkbrown shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-darkbrown">Expédié depuis notre atelier du 11e</h4>
                  <p className="text-xs text-darkbrown/70 mt-0.5">
                    Préparation artisanale le matin même pour une fraîcheur irréprochable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

