# BUDGET 2026 — investissements, coûts, break-even

> **Suivi mensuel des dépenses + projections.**
> Référencé dans `CLAUDE.md` (chargé auto à chaque session).
> À mettre à jour le 1er de chaque mois avec les chiffres réels.
> Créé 2026-05-27.

---

## 1. Coûts FIXES mensuels (récurrents, payés même si 0 vente)

| Poste | Coût mensuel | Note |
|---|---|---|
| Domaine `.fr` (allstore-tm.fr) | ~1 €/mois (12 €/an) | Renouvellement auto |
| Hébergement Vercel | **0 €** | Gratuit jusqu'à 100 Go bande passante/mois |
| Email transactionnel Resend | **0-20 €/mois** | Gratuit jusqu'à 3 000 emails/mois |
| Cookiebot (RGPD) | **0 €/mois** | Gratuit < 5 000 visiteurs/mois |
| Trustpilot Business | **0 €/mois** | Plan gratuit suffit au début |
| Stripe (abonnement) | **0 €** | Pas de frais fixes, juste % par transaction |
| GA4 + Meta + TikTok Analytics | **0 €** | Tous gratuits |
| **Sous-total mensuel fixe minimal** | **~1-25 €/mois** | Négligeable |

## 2. Coûts VARIABLES par commande

Hypothèse panier moyen 80 €, deux configurations :

### A. Modèle dropshipping pur (fournisseur livre direct au client)

| Poste | Sur panier 80 € |
|---|---|
| Coût produit | -30 à -40 € |
| Stripe (1,4 % + 0,25 €) | -1,4 € |
| Colissimo | 0 € (fournisseur l'absorbe) |
| Emballage | 0 € (fournisseur emballe) |
| URSSAF (12,3 %) | -9,8 € |
| Versement libératoire IR (1 %) | -0,8 € |
| **Total coûts variables** | **~42-52 € par commande** |
| **Net dans la poche** | **~28-38 €** (35-48 % marge nette) |

### B. Modèle reçoit-puis-réexpédie (achat stock puis revente)

| Poste | Sur panier 80 € |
|---|---|
| Coût produit | -30 à -40 € |
| Stripe (1,4 % + 0,25 €) | -1,4 € |
| Colissimo offert au client | -7 € (à ta charge) |
| Emballage + sticker AllStore | -1 € |
| URSSAF (12,3 %) | -9,8 € |
| Versement libératoire IR (1 %) | -0,8 € |
| **Total coûts variables** | **~50-60 € par commande** |
| **Net dans la poche** | **~20-30 €** (25-38 % marge nette) |

**Le dropshipping est ~10 €/commande plus rentable** — privilégier dès que le fournisseur le permet.

## 3. Coûts d'ACQUISITION (variables, modulables)

| Canal | Coût | Quand l'activer |
|---|---|---|
| Insta organique @allstore.tm | 0 € (temps) | Déjà actif |
| Google Shopping Free listings | 0 € | Phase 6 |
| Bouche-à-oreille / DM | 0 € (temps) | Déjà actif |
| Meta Ads | 10-50 €/jour | Phase 7, après Phase 1+2+3 livrées |
| TikTok Ads | 10-50 €/jour | Phase 7, idem |
| Micro-influenceurs | 50-500 €/post | À tester quand traction prouvée (M+3) |
| Flyering local (voir section 4) | 100-300 € one-shot | Test possible dès juillet |

## 4. Flyering papier — détail

### Coûts d'impression + distribution

| Quantité | Impression A6 250g r/v (Printoclock/Vistaprint) | Distribution pro | Distribution toi-même |
|---|---|---|---|
| 1 000 flyers | 35-50 € | 60-90 € | gratuit, ~4-6 h marche |
| 2 500 flyers | 60-90 € | 120-180 € | gratuit, ~10-15 h |
| 5 000 flyers | 100-150 € | 200-300 € | gratuit, ~20-30 h |

### Budget test recommandé

**100 €** = 2 500 flyers imprimés + distribution toi-même dans 2-3 quartiers ciblés.

### Conversion attendue (réaliste)

- Taux de lecture : ~10-15 %
- Taux d'action (scan QR / visite site) : 0,1-0,5 % des flyers distribués
- Taux conversion sur visiteurs flyers : 1-2 %

**Estimation 2 500 flyers** : 3-12 visiteurs → 0-1 commande directe.

### Comment maximiser le ROI

1. **Cibler quartiers résidentiels CSP+ jeunes actifs/étudiants** (proches universités, centres-villes gentrifiés).
2. **QR code + code promo trackable** : `VOISIN10` -10 % sur 1ère commande (trackable Stripe).
3. **Visuel premium** : photo produit hype + URL + QR + code promo. Style mini-affiche, pas pub criante.
4. **Distribution malin** : tôt le matin, pas avec les autres pubs (poubelle directe).

**Verdict** : canal de **notoriété locale**, pas de scaling. À tester à 100 €. Si > 5 conversions via code VOISIN10 → scaler à 5 000-10 000 flyers. Sinon arrêter.

## 5. Coûts ADMINISTRATIFS / LÉGAUX

| Poste | Coût | Quand |
|---|---|---|
| Ajout APE 47.91A sur SIRET existant | **0 €** | Phase 1 |
| URSSAF (vente marchandises BIC micro) | 12,3 % du CA brut | Mensuel/trimestriel |
| Versement libératoire impôt revenu (option) | 1 % du CA brut | Mensuel/trimestriel |
| Assurance Responsabilité Civile Pro | 100-200 €/an | Dès la 1ère vente |
| Comptable (si bascule SASU) | 1 000-2 500 €/an | Quand CA > 188 700 €/an (seuil micro) |

## 6. Outils production de contenu (optionnel)

| Outil | Coût | Usage |
|---|---|---|
| Canva Pro | 15 €/mois | Visuels Insta/flyers |
| CapCut Pro | 10 €/mois | Vidéos courtes Insta/TikTok |
| Buffer/Later | 10-20 €/mois | Planifier les posts |
| Banque d'images | 0 € (Unsplash) | Déjà utilisé |

---

## 7. Trois budgets totaux — sur 6 mois (juillet → décembre 2026)

### 🟢 Budget MINIMALISTE (organic + 1 test flyering)

| Poste | Coût |
|---|---|
| One-shot lancement (domaine + assurance RC pro + 2 500 flyers) | ~250 € |
| Fixes mensuels × 6 | ~30 € |
| Variables (50 commandes × 20 € moyen) | ~1 000 € |
| **Total à investir** | **~1 280 €** |
| **CA attendu** | 3-5 K€ |
| **Net après tout** | **600 € - 2 K€** |
| **ROI** | 0,5× à 1,5× (break-even environ) |

### 🟡 Budget RAISONNABLE (pubs modérées 10 €/jour)

| Poste | Coût |
|---|---|
| One-shot lancement (domaine + assurance + 2 500 flyers + Canva 6 mois) | ~400 € |
| Fixes mensuels × 6 (incluant outils) | ~150 € |
| Pubs Meta + TikTok 10 €/jour × 6 mois | ~1 800 € |
| Variables (300 commandes × 20 €) | ~6 000 € |
| **Total à investir** | **~8 350 €** |
| **CA attendu** | 14-36 K€ |
| **Net après tout** | **3,5 - 11 K€** |
| **ROI** | 1,4× à 2,3× |

### 🔴 Budget AMBITIEUX (pubs agressives 50 €/jour)

| Poste | Coût |
|---|---|
| One-shot lancement (consult comptable + outils + 10 000 flyers) | ~1 200 € |
| Fixes mensuels × 6 | ~300 € |
| Pubs Meta + TikTok 50 €/jour × 6 mois | ~9 000 € |
| Comptable mensuel | ~600 € |
| Variables (1 500 commandes × 25 €) | ~37 500 € |
| **Total à investir** | **~48 600 €** |
| **CA attendu** | 120-400 K€ |
| **Net après tout** | **30 - 100 K€** |
| **ROI** | 1,6× à 3× |
| **⚠️ Alerte** | Tu passes le seuil micro (188 700 €/an CA) → bascule SASU obligatoire |

---

## 8. Break-even point (seuil de rentabilité)

À **~30 € net par commande** (modèle dropshipping panier moyen 80 €) :

| Objectif | Commandes/mois |
|---|---|
| Couvrir fixes mensuels (~100 €/mois) | **3-5 commandes/mois** |
| Couvrir budget pub 10 €/jour (300 €/mois) | **15-20 commandes/mois** |
| Couvrir budget pub 50 €/jour (1 500 €/mois) | **65-75 commandes/mois** |
| Devenir vraiment profitable | **50+ commandes/mois** |

**Cible centrale réaliste** : atteindre **20 commandes/mois en M+3** (octobre 2026) = ~600 € de marge nette/mois en plus du budget pub couvert.

---

## 9. Roadmap dépenses jour 0 → mois 6

### One-shot avant le 1er juillet (recommandation : ~300 €)

- [ ] **0 €** — Ajouter APE 47.91A (gratuit, Phase 1 ROADMAP)
- [ ] **0 €** — Finaliser Stripe KYC (gratuit, Phase 1 ROADMAP)
- [ ] **~12 €** — Renouveler le domaine `.fr` si pas déjà fait
- [ ] **~150 €** — Souscrire assurance RC pro (Hiscox, Allianz, Generali)
- [ ] **~100 €** — Imprimer 2 500 flyers test (Printoclock)
- [ ] **~15 €** — S'abonner Canva Pro 1 mois (pour visuels flyers + posts)
- [ ] **0 €** — Activer Free Listings Google Shopping (Phase 6 ROADMAP)

### Récurrent à provisionner mensuellement (juillet → décembre)

- [ ] Si MINIMALISTE : **~30 €/mois** (fixes + Canva)
- [ ] Si RAISONNABLE : **~500 €/mois** (fixes + Canva + 300 € pub)
- [ ] Si AMBITIEUX : **~2 000 €/mois** (fixes + outils + 1500 € pub + comptable)

### Décision M+1 (1er août)

À la fin de juillet, mesurer :
- Conversion rate organique sur 30 jours
- Top 3 produits qui vendent
- ROI flyering via code `VOISIN10`

Selon résultats :
- Si conversion > 1 % → **monter à RAISONNABLE** (activer pubs Meta 10 €/jour)
- Si conversion < 0,5 % → **rester MINIMALISTE**, identifier friction (UX, prix, preuve sociale) avant de cramer du cash en pub

---

## 10. Template de suivi mensuel

À remplir le 1er de chaque mois, en append à la fin de ce fichier.

```
## [MOIS ANNÉE] — Bilan mensuel

### Trafic
- Sessions uniques : _____
- Sources top 3 : _____

### Conversion
- Commandes : _____
- Panier moyen : _____ €
- Taux conversion : _____ %

### Revenue
- CA brut : _____ €
- Marge brute : _____ €
- Net après URSSAF + Stripe + pub : _____ €

### Dépenses
- Pubs Meta : _____ €
- Pubs TikTok : _____ €
- Autres (flyers, outils) : _____ €
- **Total dépensé** : _____ €

### KPIs clés
- ROAS : ____ ×
- CPA : ____ €
- LTV (cumulé) : ____ €
- Note Trustpilot : ____ / 5
- Nombre d'avis : _____

### Décisions du mois
- _____

### Prochaines actions
- _____
```

---

## 11. Documents liés

- `ROADMAP.md` — plan d'action 8 phases (chemin technique vers profit auto)
- `PRICING_GUIDE.md` — formules de prix détaillées
- `CLAUDE.md` — état projet + règles
- `MARKETING_IDS.md` — IDs marketing
- `SESSION_LOG.md` — journal continu
