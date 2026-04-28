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
CONTEXTE (acté 2026-04-28) : Mohamed a DÉJÀ un SIRET actif (utilisé pour
livraison Uber Eats, en prestation de services BIC ~21,2% URSSAF).
Donc PAS besoin de créer un nouveau SIRET — il faut juste ÉTENDRE l'activité
existante au commerce de détail (vente marchandises BIC ~12,3%).

[ ] Vérifier le SIRET actuel sur annuaire-entreprises.data.gouv.fr
    Voir si un code APE commerce (47.xx) est déjà présent.

[ ] Ajouter activité secondaire commerce sur formalites.entreprises.gouv.fr
    "Modification d'entreprise" → "Modification d'activité"
    Libellé : "Commerce de détail d'habillement et chaussures via internet"
    Code APE : 47.91A (vente à distance)
    Durée : ~15 min en ligne, gratuit. Confirmation reçue 1-7 jours après.

[ ] Compléter Stripe KYC dès réception confirmation extension d'activité
    Une fois Stripe live → encaissement OK → Thomas peut activer pubs Meta/TikTok.

[ ] Vérifier éligibilité versement libératoire IR à 1%
    Sur impots.gouv.fr ou simulateur autoentrepreneur.urssaf.fr.

[x] Donner accès Admin GA4 à Thomas ✅ 2026-04-27
    GA4 sur authuser=2 (compte Google différent du Merchant).
    Thomas (thomas.dergarabedian@gmail.com) ajouté en Admin sur la propriété.

[x] Direction Édition Été — mood + tagline ✅ 2026-04-28
    Mood "Riviera Quiet Luxury" + tagline « L'été se porte authentique. »
    Hide complet 20 produits hivernaux. Détail : EDITION_ETE_DECISIONS.md.

[x] Formule de pricing AllStore actée ✅ 2026-04-28
    PV = (PF × 2) + 15  | Plancher = (PF × 1.6) + 10  | Marge nette ~30-35%.
    Détail : PRICING_GUIDE.md (calcul URSSAF 12,3% + Stripe + livraison inclus).

💰 PRICING & CATALOGUE
─────────────────────────────────────────
[ ] Remplir les 123 prix manquants dans pricing-gabarit.csv
    Workflow :
    1. Demander prix d'achat au fournisseur (colonne prix_sourcing_eur).
    2. Calculer prix_vente_eur avec la formule du PRICING_GUIDE.md :
       PV = (PF × 2) + 15, arrondi au 5€ supérieur.
    3. Remplir aussi marge_eur et marge_pct (calculs simples).
    4. Quand 20-30 lignes prêtes → demander à Claude d'injecter dans
       products-data.js (5 min).
    Référence formule complète : PRICING_GUIDE.md.

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
Détails dans THOMAS_BRIEF.md.

═══════════════════════════════════════════════════════════════════
RÉFÉRENCES
═══════════════════════════════════════════════════════════════════
- État global du projet : CLAUDE.md (section "État du projet")
- IDs marketing complets : MARKETING_IDS.md
- Règles projet : CLAUDE.md
- Décisions Édition Été 2026 : EDITION_ETE_DECISIONS.md
- Formule pricing AllStore : PRICING_GUIDE.md
- Branche de dev : claude/mohamed-<feature> (jamais push direct main)

Quand un chantier est terminé : METS À JOUR CLAUDE.md (section
"État du projet") dans le même commit que le livrable. C'est ça qui
maintient la mémoire vivante du projet entre sessions.
```
