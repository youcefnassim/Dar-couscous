# DAR COUSCOUS — La tradition dans chaque boîte

> Plateforme e-commerce full-stack de couscous artisanal traditionnel prêt à déguster, conditionné en barquettes individuelles hermétiques réfrigérées et livré à Paris.

---

## 🍽️ Présentation de la Marque

- **Nom :** DAR COUSCOUS
- **Slogan :** *La tradition dans chaque boîte.*
- **Positionnement :** Couscous artisanal authentique, semoule roulée à la main et cuite 3 fois à la vapeur, viandes confites et bouillon mijoté aux 12 épices. Format individuel hermétique (400g à 520g) réfrigéré (0°C à 4°C), prêt à réchauffer en 3 minutes au micro-ondes.
- **Rayonnement :** Livraison à Paris (75001 à 75020) et proche banlieue (92, 93, 94).

---

## 🎨 Charte Graphique & Design System

Inspiré de la Méditerranée et des matières nobles :
- **Crème (`#F5EBDD`)** : Douceur de la semoule et élégance.
- **Terracotta (`#B66B48`)** : Couleur des plats en terre cuite et des épices.
- **Vert Olive (`#65734C`)** : Arômes du terroir et des huiles d'olive vierges.
- **Brun Sombre (`#33251F`)** : Profondeur, bois ancien et typographie de prestige.
- **Blanc (`#FFFFFF`)** : Clarté et respiration.

**Typographies :**
- Titres : *Playfair Display* (sérif élégant)
- Textes courants : *Inter* (lisibilité moderne)

---

## 🛠️ Stack Technique

- **Frontend :** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **State Management :** Zustand (panier réactif persistant avec calcul des seuils de livraison offerte).
- **Backend & Base de données :** Supabase (PostgreSQL, Auth, RLS, Storage).
- **Paiements :** Stripe (Payment Intents / Checkout avec vérification webhook).
- **Emails Transactionnels :** Resend.
- **Déploiement :** Vercel & Supabase Cloud.

---

## 🚀 Démarrage Rapide

### 1. Cloner et installer les dépendances
```bash
git clone https://github.com/youcefnassim/Dar-couscous.git
cd Dar-couscous
npm install
```

### 2. Configuration des variables d'environnement
Créez un fichier `.env.local` à partir de `.env.local.example` :
```bash
cp .env.local.example .env.local
```

Renseignez vos clés API :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Lancer en local
```bash
npm run dev
```
Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 📦 Parcours Client & Pages Disponibles

| Route | Description |
|---|---|
| `/` | Page d'accueil conversion avec Hero compact, plats en vedette, engagements et histoire |
| `/menu` | Carte interactive filtrable par catégorie (Poulet, Merguez, Agneau, Végétarien, Royal), recherche et tri |
| `/produit/[slug]` | Fiche produit détaillée avec photos, poids net, ingrédients complets, allergènes, DLC, conseils de réchauffage |
| `/panier` | Panier persistant, jauge de livraison offerte (seuil 35 €), codes promo (`BIENVENUE10`) |
| `/checkout` | Validation de zone par code postal parisien, sélection de créneaux horaires, saisie des consignes d'accès |
| `/confirmation` | Récapitulatif de commande, reçu imprimable, rappel des consignes de conservation (0-4°C) |
| `/notre-histoire` | Savoir-faire artisanal, secret de la semoule vapeur et du bouillon |
| `/livraison` | Modalités de transport réfrigéré, codes postaux éligibles et politique du froid |
| `/faq` | Accordéon avec réponses aux questions sur les barquettes micro-ondables et la traçabilité |
| `/contact` | Formulaire de contact atelier et coordonnées du 11e arrondissement |
| `/mentions-legales`, `/politique-de-confidentialite`, `/conditions-generales-de-vente` | Conformité légale française et RGPD |

---

## 🏛️ Architecture & Suivi des Phases

- [x] **Phase 1 : Frontend Public & Expérience Client** (Design system, responsive mobile/desktop, panier Zustand, pages produits, checkout et confirmation)
- [ ] **Phase 2 : Supabase & Base de données** (20 tables PostgreSQL, RLS, Auth administrateur)
- [ ] **Phase 3 : Passerelle Stripe & Webhook** (Paiement réel sécurisé, déstockage automatique)
- [ ] **Phase 4 : Dashboard Administrateur** (`/admin` : Gestion des stocks, barquettes, commandes, créneaux et promotions)
- [ ] **Phase 5 : Analytics & Déploiement Vercel**

