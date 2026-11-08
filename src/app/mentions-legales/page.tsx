export const metadata = {
  title: "Mentions Légales — DAR COUSCOUS",
  description: "Mentions légales réglementaires de la plateforme DAR COUSCOUS Paris.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-cream-200 p-8 md:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-darkbrown/80 leading-relaxed">
          <h1 className="font-serif text-3xl font-bold text-darkbrown border-b border-cream-200 pb-4">
            Mentions Légales
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">1. Éditeur de la Plateforme</h2>
            <p>
              Le site <strong>DAR COUSCOUS</strong> (accessible à l&apos;adresse <code>https://darcouscous.fr</code>) est édité par la société <strong>DAR COUSCOUS SAS</strong>, société par actions simplifiée au capital de 10 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro <strong>RCS Paris B 912 345 678</strong>.
            </p>
            <p>
              <strong>Siège social &amp; Atelier de production :</strong> 24 Rue Léon Frot, 75011 Paris, France.<br />
              <strong>Numéro de TVA intracommunautaire :</strong> FR 82 912345678.<br />
              <strong>Directeur de la publication :</strong> Direction Générale DAR COUSCOUS.<br />
              <strong>Contact :</strong> bonjour@darcouscous.fr — Tél : 01 42 00 24 50.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">2. Hébergement</h2>
            <p>
              La plateforme web est hébergée par <strong>Vercel Inc.</strong>, situé au 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. La base de données et les serveurs d&apos;authentification sont hébergés par <strong>Supabase Inc.</strong> sur des infrastructures européennes conformes au RGPD (région AWS Frankfurt / Paris).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">3. Propriété Intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur le site (textes, visuels, photographies culinaires, logos, typographies, icônes et architecture logicielle) constitue une œuvre protégée par les lois en vigueur sur la propriété intellectuelle. Toute reproduction ou distribution sans accord préalable écrit est strictement interdite.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-darkbrown">4. Hygiène &amp; Agréments Sanitaires</h2>
            <p>
              Notre atelier de préparation culinaire respecte les normes d&apos;hygiène HACCP européennes strictes relatives à la manipulation de denrées alimentaires réfrigérées (règlement CE n°852/2004). Déclaration d&apos;activité effectuée auprès de la Direction Départementale de la Protection des Populations (DDPP de Paris).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

