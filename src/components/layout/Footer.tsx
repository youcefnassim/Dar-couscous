import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, ThermometerSnowflake } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-darkbrown text-cream-100 pt-16 pb-12 mt-auto border-t border-darkbrown-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white block">
              DAR COUSCOUS
            </span>
            <p className="font-serif italic text-cream-200 text-lg">
              « La tradition dans chaque boîte. »
            </p>
            <p className="text-sm text-cream-100/80 leading-relaxed max-w-sm">
              Couscous d&apos;exception préparé selon les recettes ancestrales maghrébines. 
              Conditionné en barquettes individuelles hermétiques, réfrigérées et prêtes à réchauffer.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-cream-200">
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded">
                <ThermometerSnowflake className="w-4 h-4 text-terracotta-200" />
                <span>Chaîne du froid certifiée (0-4°C)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded">
                <ShieldCheck className="w-4 h-4 text-olive-200" />
                <span>Viandes d&apos;origine France &amp; Halal</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              La Maison
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-100/80">
              <li>
                <Link href="/" className="hover:text-terracotta-200 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-terracotta-200 transition-colors">
                  Notre Menu
                </Link>
              </li>
              <li>
                <Link href="/notre-histoire" className="hover:text-terracotta-200 transition-colors">
                  Notre Histoire &amp; Savoir-faire
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-terracotta-200 transition-colors">
                  Zones &amp; Modalités de Livraison
                </Link>
              </li>
              <li>
                <Link href="/panier" className="hover:text-terracotta-200 transition-colors">
                  Mon Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Trust */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              Informations
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-100/80">
              <li>
                <Link href="/faq" className="hover:text-terracotta-200 transition-colors">
                  Foire Aux Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-terracotta-200 transition-colors">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales-de-vente" className="hover:text-terracotta-200 transition-colors">
                  Conditions Générales de Vente
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="hover:text-terracotta-200 transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta-200 transition-colors">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Paris Contact & Atelier */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              Atelier Parisien
            </h4>
            <div className="space-y-3 text-sm text-cream-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta mt-0.5 shrink-0" />
                <span>Atelier DAR COUSCOUS<br />75011 Paris, France</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <span>01 42 00 24 50</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span>bonjour@darcouscous.fr</span>
              </div>
              <div className="pt-2 text-xs text-cream-200/60">
                Livraisons du Lundi au Dimanche sur créneaux réservés.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/60 gap-4">
          <p>© {new Date().getFullYear()} DAR COUSCOUS Paris. Tous droits réservés.</p>
          <p className="flex items-center gap-3">
            <span>Confectionné avec passion à Paris</span>
            <span>•</span>
            <span>Semoule de tradition vapeur</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

