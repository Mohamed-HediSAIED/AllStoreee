# ALLSTORE — Marketing IDs (sprint 5/5 — 2026-04-26)

> Livrable pour Thomas. Tous les comptes marketing créés par Mohamed sont consolidés ici.
> Tous les Pixels/balises sont déjà installés sur les 35 pages HTML du site (sauf `boutique.html` qui est un redirect).

## IDs à utiliser dans le code

```env
# === GA4 — Google Analytics 4 ===
GA4_ID                = G-JDM113THEQ

# === Meta — Facebook / Instagram ===
META_PIXEL            = 2982649532126766
META_AD_ACCOUNT       = 2509269826135522
META_BUSINESS_ID      = 2747717115561204

# === TikTok ===
TIKTOK_PIXEL          = D7MKSCJC77U44OJIL7JG
TIKTOK_ADV_ACCOUNT    = ALLSTORE 24/7_adv
TIKTOK_BUSINESS_CTR   = ALLSTORE 24/7_bc_5k8dwx

# === Google Merchant Center ===
MERCHANT_ID           = 5774811453

# === Trustpilot ===
TRUSTPILOT_DOMAIN     = allstore-tm.fr
TRUSTPILOT_BU_URL     = https://www.trustpilot.com/review/allstore-tm.fr
```

## État détaillé par chantier

### Chantier 2 — Tracking & analytics

**Déjà fait côté code** :
- ✅ GA4 `gtag.js` installé sur 35 pages (commit `ba9931e`)
- ✅ Meta Pixel installé sur 35 pages (commit `bac1b54`)
- ✅ TikTok Pixel installé sur 35 pages (commit `df8fab9`)
- ✅ Vérifié en prod via Pixel Helpers (Meta + TikTok) et console GA4 Realtime

**À faire** (Thomas) :
- [ ] Brancher l'**API Conversions** Meta côté serveur (déjà activée côté Meta, juste l'endpoint serveur à câbler)
- [ ] Brancher l'**Events API** TikTok côté serveur (gain attribution iOS)
- [x] Event `Lead` — clic WhatsApp / Insta / TikTok (fait 2026-04-27, event delegation dans `global.js`)
- [ ] Events custom restants : `AddToCart`, `BeginCheckout`, `Purchase`
- [ ] Bannière **Consent Mode v2 RGPD** (CNIL) — aujourd'hui les Pixels firent sans consentement explicite, à régulariser

### Chantier 6 — Catalogue Google Shopping & Merchant Center

**Déjà fait** :
- ✅ Compte Merchant créé `5774811453`, nom `AllStore`
- ✅ Domaine `allstore-tm.fr` validé via meta tag (token `71cMC0vpmQt3LZ16iA1X4Vcu-_P6RWMWov1XNAN3NLw`, commit `49245b6`)

**À faire** (Thomas) :
- [ ] Générer un **feed XML/CSV produits** depuis `AllStore-SITE-WEB/products-data.js` (189 produits) au format Google Shopping. Schéma : https://support.google.com/merchants/answer/7052112
- [ ] Endpoint suggéré : route Vercel `/api/feed.xml` ou fichier statique `/feed.xml` à la racine
- [ ] Configurer côté Merchant : Livraison (transporteurs Colissimo/Mondial Relay + délais 2-7j), Taxes (TVA 20% France), politique de retour
- [ ] Activer **Free listings** (gratuit, pas de SIRET requis). Skip Shopping Ads payants tant que Stripe KYC bloqué.
- [ ] Brancher le catalogue Merchant à la **Boutique Instagram/Facebook** (chantier 6 cross-plateforme)

### Chantier 8 — Avis & Trustpilot

**Déjà fait** :
- ✅ Compte Trustpilot Business créé sous `ALLSTORE 24-7` (slash refusé par Trustpilot, on a mis tiret)
- ✅ Domaine `allstore-tm.fr` à valider (meta tag `cf89761f-b03f-4528-a6e7-84c1f9665b93` installée sur 35 pages, commit `6e4304e`)

**À faire** (Thomas) :
- [ ] Installer le **widget Trustpilot** (TrustBox) sur la home + footer du site — snippet JS officiel Trustpilot, doc : https://support.trustpilot.com/hc/en-us/articles/115011421468
- [ ] **Mini-carousel d'avis** dans la section "Vu sur Instagram" / Trust band de l'index
- [ ] **Étoiles Trustpilot** sur les PDPs (snippet rating)
- [ ] **Email d'invitation auto** post-achat : utilise l'infra existante `api/send-bulk-email.js` (Resend), envoyer à `commande+24h` après confirmation Stripe
- [ ] Configurer l'API Trustpilot Generate Review Link pour personnaliser les invits

### Chantier 10 — Pubs payantes (Meta Ads + TikTok Ads)

**Bloqué** par Stripe KYC (Mohamed pas encore déclaré micro-entreprise). Reprendre dès que SIRET dispo.

**Comptes prêts** :
- ✅ Meta Ad Account `2509269826135522`
- ✅ TikTok Advertiser Account `ALLSTORE 24/7_adv`

## Identifiants comptes (pour accès Thomas)

- **Email business AllStore** : `allstore.24.7.tm@gmail.com` (utilisé pour Meta Business, TikTok Ads, Google Merchant, Trustpilot — Thomas a aussi le login)
- **Email perso Mohamed** (compte Google créateur de GA4 sur authuser=2) : `deddys121gamer@gmail.com`
- **Email Thomas** (invité Admin GA4) : `thomas.dergarabedian@gmail.com`
- **Comptes sociaux ALLSTORE** :
  - Instagram : [@allstore.tm](https://www.instagram.com/allstore.tm)
  - TikTok : [@allstore.tm](https://www.tiktok.com/@allstore.tm) (renommé depuis `@allstore247.co`)

### Matrice d'accès Thomas (qui peut faire quoi sur quoi)

| Compte | Mode d'accès Thomas | Statut |
|---|---|---|
| GA4 (`G-JDM113THEQ`) | Invité comme **Admin** sur la propriété (email Thomas) | ✅ 2026-04-27 |
| Meta Business Manager | Login partagé `allstore.24.7.tm@gmail.com` | ✅ partagé |
| TikTok Ads Manager | Login partagé `allstore.24.7.tm@gmail.com` | ✅ partagé |
| Google Merchant Center | Login partagé `allstore.24.7.tm@gmail.com` | ✅ partagé |
| Trustpilot Business | Login partagé `allstore.24.7.tm@gmail.com` | ✅ partagé |

**Note sécurité** : à terme, pour audit/révocation propre, idéal serait d'inviter le compte personnel de Thomas comme co-admin sur Meta/TikTok/Merchant/Trustpilot (au lieu du login partagé). Pas urgent — à faire si rotation d'équipe ou suspicion compromission.

## Notes & gotchas

1. **GA4 a été créé sur un compte Google différent** (`authuser=2`) que celui du Merchant Center. Pour donner accès Thomas → Mohamed doit ajouter l'email Thomas en Admin sur la propriété GA4 directement depuis ce compte.

2. **`@allstore.tm` Instagram = compte récupéré à un tiers** (flippé). Email Gmail attaché = `allstore.24.7.tm@gmail.com`. Voir mémoire `allstore_social_accounts.md`.

3. **Bug Trustpilot dashboard** sur `/dashboard/claim` → ne pas insister, ouvrir en navigation privée si bug.

4. **Bannière cookies RGPD manquante** sur le site (CNIL exige consentement avant Pixels). Aujourd'hui les 3 Pixels firent sans consent. À régulariser AVANT scaling trafic EU.

5. **Tous les snippets de tracking** sont insérés dans le `<head>` de chaque page HTML, dans cet ordre :
   - `<meta name="google-site-verification">` (Merchant)
   - `<meta name="trustpilot-one-time-domain-verification-id">` (Trustpilot)
   - GA4 `gtag.js` (2 scripts)
   - Meta Pixel (`fbq`, 1 script + 1 noscript)
   - TikTok Pixel (`ttq`, 1 script)

   Ordre matters pour la lisibilité du diff — préserver lors d'ajouts futurs.

## Commits du sprint marketing

| Commit | Contenu |
|---|---|
| `ba9931e` | Install GA4 sur 35 pages |
| `bac1b54` | Install Meta Pixel sur 35 pages |
| `4ac4ae0` | Renommer TikTok @allstore247.co → @allstore.tm dans le site |
| `df8fab9` | Install TikTok Pixel sur 35 pages |
| `49245b6` | Meta google-site-verification (Merchant) |
| `6e4304e` | Meta trustpilot-one-time-domain-verification-id |
