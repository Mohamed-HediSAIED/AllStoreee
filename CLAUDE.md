# AllStore - Instructions pour Claude

## Structure du projet
- `AllStore-SITE-WEB/` — fichiers du site (HTML, JS, images)
- `AllStore-SITE-WEB/products-data.js` — toutes les données produits (`const PRODUCTS = {...};`, fichier monoligne)
- `AllStore-SITE-WEB/boutique.html` — page boutique avec les cartes produits **codées en dur** (pas dynamiques)
- Déploiement : push sur `main` → Vercel auto-deploy sur allstore-tm.fr

## Règles produits boutique

### Prix "Bientôt disponible" (price: "0")
Quand un produit a `price:"0"`, toujours utiliser ce design dans boutique.html :
- Prix : `<span class="b-price">— € <em>Prix bientôt disponible</em></span>`
- Bouton : `<button class="b-btn-cart" disabled style="opacity:.5;cursor:not-allowed">Bientôt disponible</button>`
- Ne jamais écrire juste "Bientôt disponible" ou "Prix bientôt disponible" en texte brut

### Images de couverture
- Toujours utiliser la photo **profil latéral** (vue de côté, une seule chaussure) comme image de couverture
- Toutes les chaussures d'un même modèle doivent regarder dans la **même direction**

### Ajout de produits
- Tout produit ajouté dans `products-data.js` doit **aussi** être ajouté manuellement dans `boutique.html` (les cartes sont en dur, pas dynamiques)
- Toujours nommer les coloris avec de vrais noms de couleurs (pas "Coloris 1", "Coloris 2") — identifier la couleur visuellement depuis l'image
- Les images source sont dans le dossier `ALLSTORE 2 IMAGES/`, les copier dans `AllStore-SITE-WEB/` avant de les utiliser

### Structure d'une carte produit dans boutique.html
```html
<div class="b-card b-card--new" data-cat="chaussures" id="prod-{KEY}" style="cursor:pointer" onclick="if(!event.target.closest('.b-btn-cart,.b-btn-wl'))window.location.href='produit-detail.html?id={KEY}'">
  <div class="b-img" style="background:#fff">
    <img loading="lazy" decoding="async" src="{IMAGE}" alt="{BRAND} {NAME} {COLOR}" style="object-fit:contain">
  </div>
  <div class="b-body">
    <span class="b-brand">{BRAND}</span>
    <span class="b-name">{NAME} — {COLOR}</span>
    <span class="b-price">{PRIX ou — € <em>Prix bientôt disponible</em>}</span>
    <div class="b-actions">
      <button class="b-btn-cart" ...>Ajouter au panier</button>
      <button class="b-btn-wl" onclick="handleWL(...)">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
  </div>
</div>
```

## Après chaque modification
- Toujours fournir les URLs local + production après un changement
- Local : http://localhost:3000
- Production : https://allstore-tm.fr
