# Brief pour le Claude de Mohamed

> Brief chargé automatiquement par Claude quand la branche commence par `claude/mohamed-*`,
> ou à coller en premier message sinon.
> Mis à jour le 2026-04-27.
> Source de vérité business : `MARKETING_IDS.md`. Règles projet : `CLAUDE.md`.

---

```
Salut Claude. Je suis Mohamed, fondateur d'ALLSTORE
(reseller authentique luxe + streetwear, https://allstore-tm.fr).
Je bosse avec Thomas — il gère le code & intégrations techniques.
Moi je gère le business, les produits, les images, le design, et les
relations avec les comptes marketing.

═══════════════════════════════════════════════════════════════════
CONTEXTE PARTAGÉ
═══════════════════════════════════════════════════════════════════

Thomas et moi partageons le MÊME compte Claude et le MÊME dossier
AllStoreee/. Donc TON instance et la SIENNE peuvent tourner en parallèle
sur le même repo. Risque réel = collisions, écrasement de commits,
divergences sur main. Lis la section "Coordination" ci-dessous AVANT
de toucher quoi que ce soit.

═══════════════════════════════════════════════════════════════════
RÈGLES ABSOLUES (lire avant de toucher au repo)
═══════════════════════════════════════════════════════════════════

1. boutique.html : NE PAS TOUCHER (rendu dynamique depuis products-data.js)
2. products-data.js : ne JAMAIS supprimer BRAND_TIER, CAT_MAP, FEATURED_IDS
   (sinon page blanche). Modifier UNIQUEMENT l'objet PRODUCTS.
3. Langage marketing AllStore (table dans CLAUDE.md à la racine) :
   - JAMAIS "réplique", "copie", "dupe", "imitation"
   - TOUJOURS "authentique", "sourcing officiel", "neuf en boutique"
   - Exception : "Maison Margiela Replica" (vrai nom du modèle)
4. Déploiement : push sur main → Vercel auto-deploy sur allstore-tm.fr

═══════════════════════════════════════════════════════════════════
COORDINATION AVEC THOMAS (impératif)
═══════════════════════════════════════════════════════════════════

1. Toujours bosser sur une branche dédiée — JAMAIS push direct sur main.
2. Préfixe MES branches par "mohamed" : claude/mohamed-<feature>.
   Thomas utilise claude/thomas-* pour les siennes.
3. NE TOUCHE JAMAIS aux branches de Thomas (ne checkout, ne merge,
   ne rebase, ne supprime). Si t'as besoin de son taf : demande-moi.
4. git pull origin main au démarrage (le hook SessionStart le fait déjà).
5. Avant un push qui semble proche d'un conflit :
   git fetch && git rebase origin/main sur ma branche.
6. Si tu vois des modifs locales non commitées que TU n'as pas faites :
   c'est le taf en cours de Thomas. NE COMMIT PAS, NE STASH PAS,
   NE RESET PAS. Demande-moi quoi faire.

═══════════════════════════════════════════════════════════════════
MES CHANTIERS (par ordre de priorité)
═══════════════════════════════════════════════════════════════════

🏛️ ADMINISTRATIF — débloque le reste
─────────────────────────────────────────
[ ] Déclaration micro-entreprise (SIRET) sur autoentrepreneur.urssaf.fr
    Tant que pas fait → Stripe KYC bloqué → pas de pubs Meta/TikTok payantes,
    pas de Shopping Ads. Free listings Merchant marchent quand même.

[ ] Compléter Stripe KYC une fois le SIRET reçu

[x] Donner accès Admin GA4 à Thomas ✅ 2026-04-27
    GA4 sur authuser=2 (compte Google différent du Merchant).
    Thomas (thomas.dergarabedian@gmail.com) ajouté en Admin sur la propriété.

💰 PRICING & CATALOGUE
─────────────────────────────────────────
[ ] Remplir les 123 prix manquants dans pricing-gabarit.csv
    Ces produits affichent "Prix bientôt disponible" et un bouton désactivé
    tant que price=0 dans products-data.js.
    Une fois rempli → demander à Claude d'injecter les prix dans products-data.js.

[ ] Vérifier les coloris : noms de vraies couleurs (pas "Coloris 1"),
    photos de profil latéral (vue de côté), même direction par modèle.

[ ] Sources d'images : dossier ALLSTORE 2 IMAGES/ → copier dans AllStore-SITE-WEB/
    avant utilisation.

🎨 DESIGN / CONTENU SITE
─────────────────────────────────────────
[ ] Arbitrer les branches design en attente :
    - claude/resume-work-aCjkY (cartes homepage 9:16 + mix-blend-mode)
    - claude/share-website-link-45TKy (catégories style Nike, ajouts produits)
    Décider lesquelles merger sur main.

[ ] Suivi régulier du parcours client (homepage → boutique → PDP → assistant)
    pour détecter les friction points.

🌞 ÉDITION ÉTÉ — refonte home (en cours, deadline ~10 mai)
─────────────────────────────────────────
Pivot saisonnier : sortir l'écharpe et les pulls cachemire de la home,
mettre en avant casquettes, lunettes, tees, sneakers basses, sacs week-end.
Stratégie complète discutée 2026-04-27 dans la session Claude.
RÉPARTITION : Thomas pilote la direction créa + le code (il a la main
sur les tendances). Toi tu valides en tant que founder + tu fournis
les assets (images, contenu social, validation business).

TES tâches :

[ ] Valider la tagline + le mood proposés par Thomas
    Thomas te soumet 2-3 directions (preppy / beach lux / festival /
    club…) avec mood-board. Tu valides celle qui colle à la marque
    et au langage marketing AllStore (table dans CLAUDE.md).

[ ] Fournir / sourcer les assets visuels de l'édition été
    Une fois le mood validé, Thomas te dit ce qu'il faut comme images
    (hero desktop 16:9 + hero mobile 9:16, photos catégories, etc.).
    Toi tu sources : libre de droits / shooting perso / images marques.

[ ] Valider la liste des produits hivernaux à hide en home
    Thomas pré-propose la liste (il a la main fashion).
    Toi tu valides au regard du stock réel et des ventes en cours.
    Catégories candidates : écharpes, doudounes, pulls cachemire/laine.
    Mi-saison à arbitrer ensemble : Hoodies Burberry, Crewneck Stone Island.

[ ] Recharger contenus "VU SUR INSTAGRAM" en mood été
    Stories clients en casquette, sneakers blanches au soleil, sac de plage…
    Pas de hoodie ni d'écharpe en arrière-plan.
    C'est toi qui a les accès Insta @allstore.tm, donc c'est toi qui post.

[ ] Décider la date de revert édition automne (planning éditorial)
    Suggestion : mi-septembre 2026.
    Programmer un rappel calendrier (ou demander à Claude une routine planifiée).

[ ] Validation finale + merge de la PR Thomas
    Thomas code en branche claude/thomas-edition-ete-home, ouvre une PR,
    tu reviews le visuel sur le preview Vercel et tu mergues si OK.

📞 RELATIONS COMPTES & SOCIAL
─────────────────────────────────────────
[ ] Maintenir l'accès aux comptes business :
    Email : allstore.24.7.tm@gmail.com
    Insta : @allstore.tm  |  TikTok : @allstore.tm

[ ] Trustpilot — répondre aux premiers avis quand ils arrivent.

[ ] Suivre l'arrivée des emails de validation (Merchant, Trustpilot).

═══════════════════════════════════════════════════════════════════
CE QUE THOMAS FAIT (pas toi, ne touche pas à ça)
═══════════════════════════════════════════════════════════════════
- Bannière Consent Mode v2 RGPD
- API Conversions Meta + Events API TikTok côté serveur
- Événements custom (AddToCart, BeginCheckout, Purchase, Lead)
- Feed Google Shopping (XML/CSV)
- Widget Trustpilot + étoiles PDPs
- Email invitation Trustpilot J+1 post-achat
- Branchement Catalogue Merchant ↔ Boutique Insta/Facebook
- Édition Été — direction créa (mood, tagline, sélection produits) +
  code (HTML/JS/data) : réordonner cartes catégories, pills filtres saison,
  bandeau promo top, champ season+subcat dans products-data.js, filtre JS
  pour cacher les hivernaux. Toi tu valides le visuel + fournis les images.
Détails dans THOMAS_BRIEF.md.

═══════════════════════════════════════════════════════════════════
RÉFÉRENCES
═══════════════════════════════════════════════════════════════════
- État global du projet : CLAUDE.md (section "État du projet")
- IDs marketing complets : MARKETING_IDS.md
- Règles projet : CLAUDE.md
- Branche de dev : claude/mohamed-<feature> (jamais push direct main)

Quand un chantier est terminé : METS À JOUR CLAUDE.md (section
"État du projet") dans le même commit que le livrable. C'est ça qui
maintient la mémoire vivante du projet entre sessions.
```
