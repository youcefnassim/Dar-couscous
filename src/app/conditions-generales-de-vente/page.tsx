export const metadata = {
  title: "Conditions Générales de Vente — DAR COUSCOUS",
  description: "Conditions générales de vente de repas préparés réfrigérés DAR COUSCOUS Paris.",
};

export default function CGVPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-cream-200 p-8 md:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-darkbrown/80 leading-relaxed">
          <h1 className="font-serif text-3xl font-bold text-darkbrown border-b border-cream-200 pb-4">
            Conditions Générales de Vente (CGV)
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">Article 1 — Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente régissent l&apos;ensemble des commandes passées sur la plateforme <code>darcouscous.fr</code> pour la fourniture de repas préparés réfrigérés en barquettes individuelles hermétiques, livrés à Paris et première couronne.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">Article 2 — Produits &amp; Conservation</h2>
            <p>
              Les produits proposés sont des plats cuisinés réfrigérés. Ils doivent impérativement être conservés au réfrigérateur entre 0°C et +4°C dès leur remise au client, et consommés avant la date limite de consommation (DLC) indiquée sur l&apos;emballage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">Article 3 — Prix &amp; Règlement</h2>
            <p>
              Les prix sont exprimés en euros toutes taxes comprises (€ TTC). La TVA applicable sur les plats préparés à emporter ou livrés est de 5,5% ou 10% selon la réglementation fiscale française. Le paiement s&apos;effectue comptant en ligne par carte bancaire sécurisée via notre partenaire Stripe.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">Article 4 — Livraison &amp; Responsabilité</h2>
            <p>
              La livraison est effectuée à l&apos;adresse communiquée par le client lors de la commande, dans le créneau horaire validé. Le client s&apos;engage à être présent ou représenté pour réceptionner les denrées périssables réfrigérées. En cas d&apos;absence du client, le colis ne pourra être laissé sur le pas de porte pour des raisons impérieuses de sécurité alimentaire et de rupture de chaîne du froid.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">Article 5 — Droit de Rétractation (Exclusion légale)</h2>
            <p>
              Conformément à l&apos;article L.221-28 4° du Code de la Consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens susceptibles de se détériorer ou de se périmer rapidement (denrées alimentaires fraîches sous température dirigée).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

