# AllStore - Instructions pour Claude

> Ce fichier est la **mémoire vivante du projet**. Il est lu automatiquement
> par Claude au démarrage de chaque session (Mohamed ou Thomas, sur ce repo).
> Tout ce qui est écrit ici est "déjà su" sans avoir à être rappelé.
> **Mettre à jour à chaque jalon** (chantier terminé, nouvelle règle, etc.).

---

## DÉMARRAGE DE SESSION — checklist Claude

Au début d'une nouvelle conversation, Claude DOIT :

1. **Identifier l'utilisateur** :
   - Branche `claude/thomas-*` → c'est Thomas, charger `THOMAS_BRIEF.md`.
   - Branche `claude/mohamed-*` → c'est Mohamed, charger `MOHAMED_BRIEF.md`.
   - Branche `main` ou autre → demander une fois "Mohamed ou Thomas ?".
2. **Lire l'état du projet** ci-dessous (section "État du projet").
3. **Ne pas redemander à l'utilisateur** ce qui est déjà documenté ici ou dans les briefs.
4. **Mettre à jour ce fichier** (et `MARKETING_IDS.md` si besoin) quand un chantier est terminé, sans demander la permission, dans le même commit que le boulot livré.

## État du projet (snapshot — 2026-04-27)

**Site en prod** : https://allstore-tm.fr (Vercel auto-deploy depuis `main`).
**Stack** : HTML statique + JS vanilla, pas de framework, déploiement Vercel.
**Catalogue** : 189 produits dans `AllStore-SITE-WEB/products-data.js`.

### Sprints terminés
- ✅ **Marketing 5/5** — GA4, Meta Pixel, TikTok Pixel, Merchant verif, Trustpilot verif sur 35 pages. Détails : `MARKETING_IDS.md`.
- ✅ **Hooks Claude** — SessionStart (git pull auto), UserPromptSubmit (heure Paris).
- ✅ **Refonte boutique** — catégories style Nike (bandeaux horizontaux pleine largeur).

### Chantiers en cours / à faire
- 🔴 **Bannière Consent Mode v2 RGPD** — bloquant légal CNIL avant scaling EU. → Thomas.
- 🟠 **API Conversions Meta + Events API TikTok** côté serveur. → Thomas.
- 🟠 **Événements custom** (AddToCart, BeginCheckout, Purchase, Lead). → Thomas.
- 🟡 **Feed Google Shopping** XML/CSV depuis `products-data.js`. → Thomas.
- 🟢 **Widget Trustpilot** + étoiles PDPs + email invitation J+1. → Thomas.
- 💰 **Remplir 123 prix** dans `pricing-gabarit.csv`. → Mohamed.
- 🏛️ **Stripe KYC + SIRET micro-entreprise** (bloque pubs payantes). → Mohamed.

### Branches en attente (à arbitrer / merger)
- `claude/resume-work-aCjkY` — refonte cartes homepage (ratio 9:16, mix-blend-mode).
- `claude/share-website-link-45TKy` — refonte catégories boutique style Nike (probablement déjà appliquée).
- `claude/cool-jennings`, `claude/marketing-accounts-clarification-1AwIb`, `design/pre-apple-revert` — à trier.

### Documents de référence (à charger selon le besoin)
- `THOMAS_BRIEF.md` — chantiers techniques de Thomas (RGPD, CAPI, feed, Trustpilot…).
- `MARKETING_IDS.md` — IDs marketing (GA4, Meta, TikTok, Merchant, Trustpilot) + état détaillé.
- `MOHAMED_BRIEF.md` — chantiers business/produits/design de Mohamed.

---

## RÈGLE CRITIQUE — LIRE EN PREMIER

### boutique.html = NE PAS TOUCHER
La page boutique utilise un **rendu dynamique** depuis `products-data.js`.
Les cartes produits sont **générées automatiquement par JavaScript**, PAS codées en HTML.
**NE JAMAIS modifier boutique.html pour ajouter/supprimer/modifier des produits.**
**NE JAMAIS réécrire boutique.html avec des cartes HTML en dur.**
Si tu fais ça, tu casses toute la boutique.

### products-data.js = 4 constantes OBLIGATOIRES
Ce fichier contient **4 constantes** qui doivent TOUTES être présentes :
1. `PRODUCTS` — les données produits (objet JSON)
2. `BRAND_TIER` — classification luxe/streetwear (NE PAS SUPPRIMER)
3. `CAT_MAP` — mapping des catégories (NE PAS SUPPRIMER)
4. `FEATURED_IDS` — produits mis en avant (NE PAS SUPPRIMER)

**Si tu supprimes BRAND_TIER, CAT_MAP ou FEATURED_IDS, la boutique sera VIDE (page blanche).**
Pour modifier des produits, modifier UNIQUEMENT l'objet `PRODUCTS`.

## Structure du projet
- `AllStore-SITE-WEB/` — fichiers du site (HTML, JS, images)
- `AllStore-SITE-WEB/products-data.js` — données produits + constantes boutique (voir ci-dessus)
- `AllStore-SITE-WEB/boutique.html` — page boutique SPA avec rendu dynamique (NE PAS MODIFIER les cartes)
- Déploiement : push sur `main` → Vercel auto-deploy sur allstore-tm.fr

## Coordination Mohamed / Thomas

**Compte Claude et dossier `AllStoreee/` partagés entre Mohamed et Thomas.**
Les deux peuvent lancer des sessions Claude en parallèle sur le même repo —
risque de collisions si on ne respecte pas les règles ci-dessous.

### Répartition des chantiers
- **Mohamed** : business (SIRET, Stripe KYC), création/admin comptes marketing, prix produits (`pricing-gabarit.csv`), produits & images, design.
- **Thomas** : code & intégrations techniques (Consent Mode RGPD, CAPI Meta, Events API TikTok, événements custom, feed Google Shopping, widget Trustpilot, email post-achat). Détail dans `THOMAS_BRIEF.md`.

### Règles de branches (impératif)
1. **Toujours** bosser sur une branche dédiée — JAMAIS push direct sur `main`.
2. Préfixe les branches par ton nom : `claude/mohamed-<feature>` ou `claude/thomas-<feature>`.
3. **Ne touche jamais aux branches de l'autre** (ne checkout, ne merge, ne rebase, ne supprime). Si tu as besoin de leur taf, demande à l'humain.
4. `git pull origin main` au démarrage de chaque session (le hook SessionStart le fait déjà).
5. Avant un push qui semble proche d'un conflit : `git fetch && git rebase origin/main` sur ta branche.
6. Si tu vois des modifs locales non commitées que tu n'as pas faites → c'est probablement le taf en cours de l'autre. **Ne commit pas, ne stash pas, ne reset pas. Demande à l'humain.**

## Comment ajouter/supprimer un produit
1. Ouvrir `products-data.js`
2. Ajouter ou supprimer l'entrée dans l'objet `PRODUCTS` uniquement
3. **NE PAS toucher aux lignes BRAND_TIER, CAT_MAP, FEATURED_IDS en bas du fichier**
4. **NE PAS modifier boutique.html** — les cartes se génèrent automatiquement
5. Si c'est une nouvelle marque, l'ajouter aussi dans `BRAND_TIER` (luxe ou street)

## Règles produits boutique

### Prix "Bientôt disponible" (price: "0")
Les produits avec `price:"0"` affichent automatiquement "Prix bientôt disponible" et un bouton désactivé.

### Images de couverture
- Toujours utiliser la photo **profil latéral** (vue de côté, une seule chaussure) comme image de couverture
- Toutes les chaussures d'un même modèle doivent regarder dans la **même direction**

### Noms de coloris
- Toujours nommer les coloris avec de vrais noms de couleurs (pas "Coloris 1", "Coloris 2")
- Identifier la couleur visuellement depuis l'image

### Images source
- Les images source sont dans le dossier `ALLSTORE 2 IMAGES/`
- Les copier dans `AllStore-SITE-WEB/` avant de les utiliser

## Après chaque modification
- Toujours fournir les URLs local + production après un changement
- Local : http://localhost:3000
- Production : https://allstore-tm.fr

## Langage marketing AllStore — TOUJOURS APPLIQUER

Ces règles s'appliquent à TOUT texte visible par les clients (site, réseaux, messages, descriptions).

| Ne dis pas | Dis plutôt |
|---|---|
| Acheter | Recevoir le mien |
| Pas cher | Accessible |
| Meilleur | N°1 des avis |
| En promo | Offre limitée |
| Inscris-toi | Commence maintenant |
| Seulement ici | Exclusif |
| Soldes | Offre spéciale |
| Indispensable | Essentiel |
| De qualité | Conçu pour durer |
| Garanti | Satisfait ou remboursé |
| On est les meilleurs | +10 000 clients satisfaits |
| Profitez-en | Avant rupture |
| Livraison rapide | Chez toi en 48h |
| Nouveau | Enfin disponible |
| Cliquez ici | Découvre comment |
| Newsletter | Accès VIP |
| Gratuit | Offert |
| Dépêchez-vous | Plus que X places |
| Abonnez-vous | Rejoins la communauté |
| Contactez-nous | On en parle ? |
| Réplique / Replica | Pièce authentique / Sourcé officiellement (sauf "Maison Margiela Replica" = nom de modèle) |
| Sourcing d'exception | Sourcing officiel marques |
| Luxe accessible | Reseller authentique luxe + streetwear |
| Imitation / Copie | Pièce authentique sourcée officiellement |
| Style inspiré | Pièce officielle |

## Positionnement business

ALLSTORE est un **reseller authentique** : on achète neuf chez les marques officielles (lv.com, burberry.com, casablancaparis.com, etc.) et on revend avec marge. Modèle StockX / GOAT / Vestiaire Collective. **100% légal**.

- JAMAIS dire "réplique", "copie", "dupe", "imitation", "qualité 1:1", "grade miroir"
- TOUJOURS dire "authentique", "sourcing officiel", "neuf en boutique"
- Exception unique : "Maison Margiela Replica" = vrai nom du modèle Margiela (la sneaker s'appelle "Replica")
