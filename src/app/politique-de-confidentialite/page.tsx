export const metadata = {
  title: "Politique de Confidentialité — DAR COUSCOUS",
  description: "Protection des données personnelles et respect du RGPD par DAR COUSCOUS Paris.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-cream-200 p-8 md:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-darkbrown/80 leading-relaxed">
          <h1 className="font-serif text-3xl font-bold text-darkbrown border-b border-cream-200 pb-4">
            Politique de Confidentialité (RGPD)
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">1. Collecte des Données Personnelles</h2>
            <p>
              Dans le cadre de l&apos;exécution des commandes de couscous et de leur livraison à Paris, DAR COUSCOUS collecte les données strictement nécessaires : nom, prénom, adresse postale de livraison, numéro de téléphone portable, adresse email et instructions d&apos;accès.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">2. Finalités du Traitement</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Préparation et expédition des repas réfrigérés dans le créneau réservé.</li>
              <li>Transmission des consignes de livraison au livreur dédié.</li>
              <li>Émission des factures légales et reçus de paiement sécurisé.</li>
              <li>Communication sur le statut de la commande par SMS ou email.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">3. Sécurité des Paiements</h2>
            <p>
              Les données bancaires (numéro de carte, cryptogramme) ne transitent jamais sur nos serveurs. Elles sont collectées directement par notre prestataire certifié PCI-DSS de niveau 1 : <strong>Stripe Inc.</strong>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">4. Vos Droits (Accès, Rectification, Suppression)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD 2016/679), vous bénéficiez d&apos;un droit d&apos;accès, de rectification, de portabilité et de suppression de vos données personnelles. Pour exercer ce droit, écrivez à : <strong>dpo@darcouscous.fr</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

