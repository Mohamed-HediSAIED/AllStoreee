# ROADMAP — du présent à "profit récurrent automatisé"

> **Mémoire vivante du plan d'action.**
> Chargée auto par Claude au démarrage de chaque session (référencée dans `CLAUDE.md`).
> Coche les cases au fur et à mesure (`[ ]` → `[x]`) dans le même commit que la tâche livrée.
> Créée 2026-05-26 après audit complet du repo.

---

## 🎯 Objectif

Passer d'un site allstore-tm.fr techniquement en ligne mais incapable d'encaisser un paiement → un site qui vend automatiquement avec preuve sociale, conformité légale et acquisition trafic.

**Chemin critique vers le premier profit récurrent automatisé** :
👉 **Phase 1 (Mohamed) → Phase 2 (Thomas) → Phase 3 (Thomas)** = ~1 semaine de calendrier réel.

---

## Phase 0 — Vente directe DM (en cours, ✅ déjà actif)

*Stratégie pragmatique pendant que le reste se met en place. Aucun bloquant.*

- [x] Pricing strategy actée (`PV = (PF × 2) + 15` pour luxe, `(PF × 1.8) + 12` pour streetwear, plancher `(PF × 1.6) + 10`)
- [x] 1er pricing client validé : Stussy 50 € → ajusté à 40 € pour ne pas faire fuir (cf. SESSION_LOG 2026-05-14)
- [ ] Convertir 3-5 conversations DM/Insta/TikTok cette semaine en ventes payées (Paylib/Lydia/Revolut/PayPal entre particuliers)
- [ ] À chaque vente : demander photos déballage au client → alimenter le carrousel avis-photos sur la home (1 cadre = 1 commande)
- [ ] **Limite à respecter** : ne pas dépasser quelques ventes/semaine avant Phase 1 (limite des radars URSSAF avant déclaration commerce détail)

---

## Phase 1 — 🔴 Déblocage légal (Mohamed seul, ~15 min + attente 1-7j)

*C'est LA seule phase qui te concerne directement avant que Thomas puisse câbler le paiement.*

- [ ] **1.1** Aller sur https://formalites.entreprises.gouv.fr → connexion → modifier l'entreprise existante (SIRET Uber Eats) → ajouter **activité secondaire commerce détail APE 47.91A** (vente à distance sur catalogue spécialisé)
- [ ] **1.2** Attendre validation INSEE (mail auto sous 1-7 jours)
- [ ] **1.3** Une fois validé → retourner dans Stripe Dashboard → finaliser le KYC (justif INSEE + RIB) → compte passe en "verified", paiements activés

**Pourquoi** : sans APE 47.91A → Stripe KYC bloqué → paiements impossibles → pubs Meta/TikTok payantes bloquées → Shopping Ads bloquées.

---

## Phase 2 — 🔴 Paiement en ligne fonctionnel (Thomas, ~1 jour)

*Le tunnel checkout est codé visuellement mais le bouton "Payer" appelle un endpoint qui n'existe pas. À créer.*

- [ ] **2.1** Créer `AllStore-SITE-WEB/api/create-payment-intent.js` (serverless Vercel) : reçoit items + shipping → Stripe API → PaymentIntent → renvoie `clientSecret`
- [ ] **2.2** Créer `AllStore-SITE-WEB/api/stripe-webhook.js` : écoute `payment_intent.succeeded` → envoie mail confirmation via Resend + trigger Trustpilot J+1
- [ ] **2.3** Configurer variables d'environnement Vercel : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` (déjà présent)
- [ ] **2.4** Tester en `pk_test_` (carte `4242 4242 4242 4242`) puis basculer en `pk_live_` (déjà dans le code : `pk_live_51TFdBi...`)
- [ ] **2.5** Vérifier que `confirmation.html` lit l'ID de commande depuis l'URL et affiche bien la confirmation
- [ ] **2.6** Pages PDP : vérifier que le bouton "Ajouter au panier" injecte bien dans `panier.html`, puis `panier.html` → `checkout.html`

---

## Phase 3 — 🔴 Conformité légale obligatoire (Thomas, ~3h)

*Sans ces pages, premier signalement CNIL = amende. Premier litige client = tu perds.*

- [ ] **3.1** Bannière Consent Mode v2 RGPD (CNIL) — Cookiebot gratuit < 5k visiteurs/mois OU implé custom. Doit gérer les 4 catégories : `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`. Les 3 Pixels (GA4, Meta, TikTok) ne firent QUE après consentement explicite.
- [ ] **3.2** Créer `AllStore-SITE-WEB/mentions-legales.html` (LCEN obligatoire) : raison sociale, SIRET, hébergeur Vercel, contact, directeur publication
- [ ] **3.3** Créer `AllStore-SITE-WEB/retours.html` : délai 14 jours rétractation légal + procédure
- [ ] **3.4** Réviser `AllStore-SITE-WEB/livraison.html` : délais réels, transporteurs (Colissimo / Mondial Relay), gestion litiges, frais retour à charge client
- [ ] **3.5** Lier les 3 nouvelles pages dans le footer de toutes les pages

---

## Phase 4 — 🟠 Catalogue vendable (Mohamed, ~2-4h)

*Aujourd'hui 71% du catalogue est invisible (135 produits sur 189 affichent "Prix bientôt disponible").*

- [ ] **4.1** Ouvrir `pricing-gabarit.csv` → remplir les **135 prix manquants** selon la formule appropriée :
  - **Luxe authentique** (Burberry, LV, Loro Piana, Hermès, Prada…) : `PV = (PF × 2) + 15`
  - **Streetwear avec marché secondaire actif** (Stussy, Carhartt, Supreme basics) : `PV = (PF × 1.8) + 12`
  - **Plancher absolu** : `(PF × 1.6) + 10` — ne jamais descendre en dessous (sinon perte une fois URSSAF prélevée)
- [ ] **4.2** Me demander d'injecter les prix dans `products-data.js` (objet `PRODUCTS`) — je le fais en 5 min
- [ ] **4.3** Vérifier en passant les coloris : vrais noms de couleurs (pas "Coloris 1") + photos profil latéral pour les chaussures
- [ ] **4.4** Documenter la formule "marché secondaire actif" dans `PRICING_GUIDE.md` (validée 14 mai, jamais écrite)

---

## Phase 5 — 🟠 Preuve sociale (Thomas, ~½ jour)

*Le carrousel avis-photos est en place. Maintenant on ajoute Trustpilot par-dessus.*

- [ ] **5.1** Widget Trustpilot TrustBox sur home + footer (snippet officiel : https://support.trustpilot.com/hc/en-us/articles/115011421468). `TRUSTPILOT_BU_URL = https://www.trustpilot.com/review/allstore-tm.fr`
- [ ] **5.2** Mini-carrousel d'avis dans la section "Vu sur Instagram" / Trust band de l'index
- [ ] **5.3** Étoiles Trustpilot par produit sur chaque PDP (snippet rating)
- [ ] **5.4** Email Trustpilot J+1 automatique post-achat (webhook Stripe → Resend scheduling ou cron Vercel)
- [ ] **5.5** Compléter le carrousel avis-photos avec les nouvelles commandes (1 cadre par client)

---

## Phase 6 — 🟡 Acquisition gratuite (Thomas, ~½ jour)

*Tant qu'aucun budget pub, on joue le SEO + le free listings + l'Insta/FB shop.*

- [ ] **6.1** Générer un feed Google Shopping XML depuis `products-data.js` → endpoint Vercel `/feed.xml` ou statique `/feed.xml` à la racine. Schéma : https://support.google.com/merchants/answer/7052112
- [ ] **6.2** Soumettre le feed dans Merchant Center (`MERCHANT_ID = 5774811453`)
- [ ] **6.3** Configurer Merchant : transporteurs (Colissimo / Mondial Relay + délais 2-7j), Taxes (TVA 20% France), politique de retour
- [ ] **6.4** Activer **Free listings** (gratuit, pas besoin de Stripe activé)
- [ ] **6.5** Brancher catalogue Merchant ↔ Boutique Instagram/Facebook (Commerce Manager Meta)

---

## Phase 7 — 🟡 Acquisition payante (Thomas + Mohamed, ½ jour + budget test)

*À déclencher seulement quand Phases 1-5 sont vertes.*

- [ ] **7.1** API Conversions Meta (CAPI) côté serveur — endpoint qui mirror les events client. Gain attribution iOS post-ATT majeur. `META_PIXEL = 2982649532126766`
- [ ] **7.2** Events API TikTok côté serveur (gain attribution iOS pareil). `TIKTOK_PIXEL = D7MKSCJC77U44OJIL7JG`
- [ ] **7.3** Events custom client : `AddToCart`, `BeginCheckout`, `Purchase` (Lead déjà fait ✅ via PR #3)
- [ ] **7.4** ✋ **Mohamed** : lancer 1ère campagne Meta Ads, budget test 10-20 €/jour pendant 3-7 jours sur 1 produit phare (Stussy / Essentials / Tom Ford). Mesurer CPA réel.
- [ ] **7.5** Décision scale : si CPA < 50% du prix vente → scaler. Si CPA > → tester autre produit/créa.

---

## Phase 8 — 🟢 Nettoyage et finitions (parallèle, quand calme)

- [ ] **8.1** Photos manquantes catégories "Nos Collections" : chaussures + vêtements (chantier ouvert depuis 14 mai, en pause — choix tendance : Salomon/On chunky pour chaussures, crochet/knit polo pour vêtements)
- [ ] **8.2** Branches dormantes à trier : `cool-jennings`, `resume-work-aCjkY`, `share-website-link-45TKy`, `design/pre-apple-revert`, `jobm-implementation-T340w`, `marketing-accounts-clarification-1AwIb`, `mohamed-edito-3-photos`, `mohamed-photo-chaussures-niche`, `review-summer-phrase-jryEc` → soit merger soit fermer
- [ ] **8.3** Suivi régulier parcours client (home → boutique → PDP → checkout) pour détecter les friction points
- [ ] **8.4** Planning éditorial : programmer date de revert édition été → édition automne (suggestion mi-septembre 2026)
- [ ] **8.5** À terme — quand CA dépasse seuils micro : basculer micro-entreprise → SASU à l'IS (vrai cadre fiscal pour scaling)

---

## 📊 Récap — qui fait quoi, combien de temps

| Phase | Pilote | Effort | Débloque |
|---|---|---|---|
| 0 — Vente DM directe | **Mohamed** | en cours | Profit cash immédiat |
| 1 — APE 47.91A + Stripe KYC | **Mohamed** | 15 min + attente 1-7j | Paiement légal |
| 2 — Backend paiement Stripe | Thomas | 1 jour | Site qui encaisse |
| 3 — RGPD + pages légales | Thomas | 3h | Risque CNIL/conso |
| 4 — Remplir 135 prix | **Mohamed** | 2-4h | 71% catalogue débloqué |
| 5 — Trustpilot UI | Thomas | ½ jour | Conversion +20-40% |
| 6 — Google Shopping + Insta Shop | Thomas | ½ jour | Trafic gratuit |
| 7 — CAPI + 1ère pub Meta | Thomas + Mohamed | ½ jour + budget | Trafic scalable |
| 8 — Finitions | Thomas + Mohamed | continu | Qualité |

---

## ⚠️ Règles d'or pour ne rien casser

1. **Tâches Mohamed seulement** : 1.1, 1.2, 1.3, 4.1, 4.3, 4.4, 7.4, 0.x. Tout le reste passe par Thomas.
2. **boutique.html** : NE JAMAIS toucher (cf. CLAUDE.md "RÈGLE CRITIQUE").
3. **products-data.js** : ne JAMAIS supprimer `BRAND_TIER`, `CAT_MAP`, `FEATURED_IDS` (sinon page blanche).
4. **Branches** : préfixer `claude/mohamed-*` ou `claude/thomas-*` selon qui code. Jamais push direct sur main.
5. **À chaque tâche terminée** : cocher la case ici + même commit que le livrable + ligne dans `SESSION_LOG.md`.

---

## 📚 Documents liés

- `CLAUDE.md` — état projet + règles techniques
- `MOHAMED_BRIEF.md` — chantiers business Mohamed
- `THOMAS_BRIEF.md` — chantiers techniques Thomas
- `MARKETING_IDS.md` — tous les IDs marketing
- `PRICING_GUIDE.md` — formules de prix détaillées
- `SESSION_LOG.md` — journal continu inter-sessions
- `EDITION_ETE_DECISIONS.md` — décisions saisonnières été 2026
