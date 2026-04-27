# Brief pour le Claude de Thomas

> Brief à copier-coller en premier message au Claude de Thomas.
> Mis à jour le 2026-04-27.
> Source de vérité des IDs : `MARKETING_IDS.md`. Règles projet : `CLAUDE.md`.

---

```
Salut Claude. Je suis Thomas, je bosse avec Mohamed sur ALLSTORE
(reseller authentique luxe + streetwear, https://allstore-tm.fr).
On s'est réparti le boulot avec Mohamed. Voici MA part — la tienne par
extension. Seul le SIRET reste exclusif Mohamed (entité légale perso).
Pour TOUT le reste — comptes marketing, social, code, créa, validation —
on a tous les 2 les accès et on s'arbitre selon dispo. La répartition
ci-dessous reflète qui PILOTE par défaut, pas qui a le droit.

═══════════════════════════════════════════════════════════════════
CONTEXTE PARTAGÉ
═══════════════════════════════════════════════════════════════════

Mohamed et moi partageons le MÊME compte Claude et le MÊME dossier
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
COORDINATION AVEC MOHAMED (impératif)
═══════════════════════════════════════════════════════════════════

1. Toujours bosser sur une branche dédiée — JAMAIS push direct sur main.
2. Préfixe MES branches par "thomas" : claude/thomas-<feature>.
   Mohamed utilise claude/mohamed-* ou autres préfixes pour les siennes.
3. NE TOUCHE JAMAIS aux branches de Mohamed (ne checkout, ne merge,
   ne rebase, ne supprime). Si t'as besoin de son taf : demande-moi.
4. git pull origin main au démarrage (le hook SessionStart le fait déjà).
5. Avant un push qui semble proche d'un conflit :
   git fetch && git rebase origin/main sur ma branche.
6. Si tu vois des modifs locales non commitées que TU n'as pas faites :
   c'est le taf en cours de Mohamed. NE COMMIT PAS, NE STASH PAS,
   NE RESET PAS. Demande-moi quoi faire.

═══════════════════════════════════════════════════════════════════
MES CHANTIERS (par ordre de priorité)
═══════════════════════════════════════════════════════════════════

🔴 BLOQUANT LÉGAL — à faire en premier
─────────────────────────────────────────
[ ] Bannière Consent Mode v2 RGPD (CNIL)
    Aujourd'hui les 3 Pixels (GA4, Meta, TikTok) firent SANS consentement
    explicite. À régulariser AVANT scaling trafic EU.
    → Solution recommandée : Cookiebot, Axeptio, ou implé custom.
    → Doit gérer les 4 catégories : analytics_storage, ad_storage,
      ad_user_data, ad_personalization.

🟠 TRACKING SERVEUR (priorité gain attribution)
─────────────────────────────────────────
[ ] API Conversions Meta (CAPI) côté serveur
    Déjà activée côté Meta dashboard. Juste l'endpoint serveur à câbler.
    META_PIXEL = 2982649532126766
    Doc : https://developers.facebook.com/docs/marketing-api/conversions-api

[ ] Events API TikTok côté serveur (gain attrib iOS)
    TIKTOK_PIXEL = D7MKSCJC77U44OJIL7JG
    Doc : https://business-api.tiktok.com/portal/docs?id=1771101303285761

[ ] Événements custom (côté client + miroir serveur)
    Aujourd'hui seul PageView remonte. À ajouter :
    - AddToCart    (clic bouton ajouter panier)
    - BeginCheckout (entrée tunnel)
    - Purchase     (confirmation Stripe — webhook côté serveur)
    - Lead         (clic WhatsApp / Insta DM)

🟡 GOOGLE SHOPPING (free listings)
─────────────────────────────────────────
[ ] Feed produits Google Shopping
    Source : AllStore-SITE-WEB/products-data.js (189 produits)
    Format : XML ou CSV — schéma https://support.google.com/merchants/answer/7052112
    Endpoint suggéré : route Vercel /api/feed.xml OU statique /feed.xml
    MERCHANT_ID = 5774811453
    NB : Activer "Free listings" (gratuit, pas de SIRET requis).
    Skip Shopping Ads payants tant que Stripe KYC bloqué côté Mohamed.

[ ] Brancher catalogue Merchant → Boutique Instagram/Facebook

🟢 TRUSTPILOT (preuve sociale)
─────────────────────────────────────────
[ ] Widget TrustBox sur home + footer
    Doc : https://support.trustpilot.com/hc/en-us/articles/115011421468
    TRUSTPILOT_BU_URL = https://www.trustpilot.com/review/allstore-tm.fr

[ ] Mini-carousel d'avis dans la section "Vu sur Instagram" / Trust band

[ ] Étoiles Trustpilot sur les PDPs (snippet rating par produit)

[ ] Email d'invitation auto J+1 post-achat
    Utiliser l'infra existante : api/send-bulk-email.js (Resend)
    Trigger : webhook Stripe payment_succeeded → cron J+1
    Bonus : API Trustpilot Generate Review Link pour personnaliser

🌞 ÉDITION ÉTÉ — refonte home (en cours, deadline ~10 mai)
─────────────────────────────────────────
Pivot saisonnier décidé avec Mohamed le 2026-04-27.
Constat : la home actuelle pousse écharpes/pulls fin avril → on bascule
sur une "édition été" qui met en avant casquettes / lunettes / tees /
sneakers basses / sacs week-end.
RÉPARTITION : tu pilotes la direction créa + le code (Mohamed reconnaît
que t'as la main sur les tendances vestimentaires). Mohamed valide en
tant que founder + fournit les assets visuels (images, contenu social).

PARTIE CRÉA (à proposer à Mohamed pour validation) :

[ ] Soumettre 2-3 directions de mood + tagline
    Exemples de directions : preppy / beach lux / festival / club / outdoor
    technique. Pour chaque direction : tagline courte (langage marketing
    AllStore — voir CLAUDE.md) + 3-5 références visuelles (mood-board).
    Mohamed choisit celle qui colle à la marque.

[ ] Pré-proposer la liste des produits hivernaux à hide
    Tu as la main fashion → tu décides quoi sortir.
    Catégories candidates : écharpes, doudounes, pulls cachemire/laine.
    Mi-saison à arbitrer avec Mohamed : Hoodies Burberry, Crewneck Stone Island.
    Livrable : liste IDs produits par statut (winter / summer / all).

[ ] Brief asset visuel pour Mohamed (une fois mood validé)
    Lui dire exactement ce qu'il faut : hero desktop 16:9, hero mobile 9:16,
    photos catégories en mood été, contenu Insta à recharger, etc.

PARTIE CODE :

[ ] Ajouter champ season + subcat dans products-data.js
    Schéma proposé :
      season: "summer" | "winter" | "all"  (filtre saisonnier home)
      subcat: "casquette" | "lunettes" | "tee" | "polo" | "sneaker_basse"
              | "sneaker_haute" | "sac_we" | "echarpe" | "pull" | "hoodie"
              | "doudoune" | "veste" | "lifestyle" | etc.
    ATTENTION : ne pas casser BRAND_TIER, CAT_MAP, FEATURED_IDS
    (voir CLAUDE.md règle critique).

[ ] Logique JS de filtrage côté home
    Si édition été active → ne pas afficher les produits season:"winter".
    Possibilité : flag global SUMMER_EDITION = true en haut du file ou
    toggle date-based (auto-revert mi-septembre par exemple).

[ ] Réordonner les cartes "NOS COLLECTIONS" dans index.html
    Ordre actuel : SACS → ACCESSOIRES → CHAUSSURES → VÊTEMENTS → MONTRES
    Ordre cible été (priorité conversion, intent tête→pieds) :
      1. CASQUETTES   (10+ modèles luxe = arme n°1 été)
      2. LUNETTES
      3. TEES & POLOS
      4. SNEAKERS BASSES
      5. SACS WEEK-END
      6. (optionnel) LIFESTYLE / MI-SAISON en bas
    NB : sous-cats plus granulaires que les cats actuelles (chaussures /
    vetements / sacs / accessoires) — cf. tâche subcat ci-dessus.

[ ] Pills/filtres "Édition Été" au-dessus de "La Sélection"
    Pills suggérées : Tout · Casquettes · Lunettes · Tees · Sneakers · Sacs week-end
    Clic pill = filtre la sélection sans recharger la page.

[ ] Bandeau promo top édition été
    Texte type : "Édition Été — Livraison 48h offerte sur ta première casquette".
    Wording final : à valider par Mohamed (langage marketing AllStore).

[ ] Renommer titres sections home pour cohérence
    "La Sélection" → "La Sélection Été" (ou ce que vous décidez).

WORKFLOW :
- Coder en branche claude/thomas-edition-ete-home
- Push regulier, ouvrir une PR pour preview Vercel
- Mohamed review le visuel sur le preview avant merge

ORDRE DE PRIO SUGGÉRÉ : créa (mood+tagline+liste hivernaux) en premier
pour aligner avec Mohamed, puis data structure (season/subcat), puis
filtre JS, puis réordonnancement HTML, puis pills + bandeau.

═══════════════════════════════════════════════════════════════════
CE QUE MOHAMED PILOTE (toi t'as accès aussi, mais c'est lui qui drive)
═══════════════════════════════════════════════════════════════════
RAPPEL : tous les comptes boutique sont PARTAGÉS (vous avez tous les 2
les accès). Seul le SIRET est exclusivement Mohamed (entité légale).
Pour le reste, "Mohamed pilote" veut dire "il drive par défaut" —
si t'es dispo et lui pas, fais-le.

- Stripe KYC + déclaration micro-entreprise (SIRET) — exclusif Mohamed
- Remplir les 123 prix dans pricing-gabarit.csv (validation business)
- Validation founder : merge des PRs sensibles, validation visuels/taglines
- Sourcing produits & images (lui décide quoi acheter / quel shooting)
- Édition Été : valider mood/tagline/liste hivernaux que tu lui proposes,
  fournir les assets visuels (hero + photos), recharger les contenus Insta
  en mood été (toi tu peux aussi si tu veux, vous avez les 2 les accès),
  merger ta PR après review preview Vercel

═══════════════════════════════════════════════════════════════════
RÉFÉRENCES
═══════════════════════════════════════════════════════════════════
- IDs marketing complets : MARKETING_IDS.md à la racine
- Règles projet : CLAUDE.md à la racine
- Branche de dev : claude/<feature>-<timestamp> (jamais push direct main)
- Email business : allstore.24.7.tm@gmail.com

Commence par me dire par quel chantier tu veux qu'on attaque. Si tu hésites,
recommande-moi le plus rentable / le plus rapide à débloquer.
```
