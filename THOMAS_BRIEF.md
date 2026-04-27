# Brief pour le Claude de Thomas

> Brief à copier-coller en premier message au Claude de Thomas.
> Mis à jour le 2026-04-27.
> Source de vérité des IDs : `MARKETING_IDS.md`. Règles projet : `CLAUDE.md`.

---

```
Salut Claude. Je suis Thomas, je bosse avec Mohamed sur ALLSTORE
(reseller authentique luxe + streetwear, https://allstore-tm.fr).
On s'est réparti le boulot avec Mohamed. Voici MA part — la tienne par
extension. Mohamed gère la création de comptes business et le SIRET ;
moi je gère tout ce qui est code & intégrations techniques.

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

═══════════════════════════════════════════════════════════════════
CE QUE MOHAMED FAIT (pas toi, ne touche pas à ça)
═══════════════════════════════════════════════════════════════════
- Stripe KYC + déclaration micro-entreprise (SIRET)
- Remplir les 123 prix dans pricing-gabarit.csv
- Donner accès admin GA4 à mon email (le compte GA4 est sur authuser=2)
- Création/admin comptes : Meta Business, TikTok Ads, Merchant, Trustpilot

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
