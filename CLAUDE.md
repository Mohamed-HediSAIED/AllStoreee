# AllStore - Instructions pour Claude

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
