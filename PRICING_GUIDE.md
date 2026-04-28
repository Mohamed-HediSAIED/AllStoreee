# Guide de pricing AllStore — Mohamed

> Comment fixer un prix de vente quand tu connais le prix fournisseur.
> Calculable au tel / à la calculatrice. Mis à jour 2026-04-28.

---

## 🎯 Formule rapide (à retenir par cœur)

```
PRIX VENTE = (PRIX FOURNISSEUR × 2) + 15 €
```

Résultat : **bénéfice net ≈ 30-35% du prix de vente**, après TOUS les coûts (URSSAF, Stripe, livraison, emballage, impôt 1%).

### Exemples
| Prix fournisseur | Prix vente AllStore | Bénéfice net (toi) |
|---|---|---|
| 20 € | **55 €** | ~17 € |
| 30 € | **75 €** | ~25 € |
| 50 € | **115 €** | ~38 € |
| 80 € | **175 €** | ~58 € |
| 100 € | **215 €** | ~71 € |
| 150 € | **315 €** | ~106 € |
| 200 € | **415 €** | ~140 € |
| 300 € | **615 €** | ~210 € |
| 500 € | **1015 €** | ~350 € |

À diviser par 2 (toi + Thomas) si vous partagez à 50/50.

---

## 📞 Cas pratique : un pote te demande un prix

> *"T'as une casquette Loro Piana ? Combien ?"*

1. T'écris à ton fournisseur → il dit **30 €**.
2. **Tu calcules dans ta tête : 30 × 2 + 15 = 75 €.**
3. Tu réponds **75 €**. Tu sais que ça te fait ~25 € net.

Si le pote négocie à 65 € → tu peux accepter (~17 € net, c'est OK). En dessous de 60 € pour un coût d'achat de 30 € → tu commences à perdre, dis non.

### Le seuil de "casser" un prix
**Prix plancher absolu = (Prix fournisseur × 1.6) + 10 €**
En dessous, tu travailles à perte une fois URSSAF prélevée.

| Prix fournisseur | Prix plancher (ne JAMAIS descendre en dessous) |
|---|---|
| 20 € | 42 € |
| 30 € | 58 € |
| 50 € | 90 € |
| 100 € | 170 € |
| 200 € | 330 € |

---

## 🧮 D'où sort la formule ? (le calcul détaillé)

Pour un produit acheté à un prix `C` (coût) et vendu à un prix `P` :

```
Recette brute (CA encaissé) : P
─────────────────────────────────
Coût produit (fournisseur) :   -C
Livraison Colissimo offerte :   -7 €
Frais Stripe (1.4% + 0.25 €):   -(0.014P + 0.25)
Emballage + sticker :           -1 €
URSSAF (12.3% du CA) :          -0.123P
Versement libératoire (1%) :    -0.01P
─────────────────────────────────
Bénéfice net = P - C - 8.25 - 0.147P
            = 0.853 × P - C - 8.25
```

**Si tu veux que le bénéfice net = 30% du prix de vente :**
```
0.853P - C - 8.25 = 0.30P
0.553P = C + 8.25
P = (C + 8.25) / 0.553
P ≈ 1.81 × C + 15
```

Arrondi à **`P = 2C + 15`** pour faire le calcul de tête. Cette légère sur-marge compense les imprévus (retours, SAV, frais bancaires, pub).

### Vérification sur la casquette LP à 30 €
```
P = 30 × 2 + 15 = 75 €
─────────────────────────
CA encaissé           75.00
Coût produit         -30.00
Livraison             -7.00
Stripe (1.4% + 0.25) -1.30
Emballage             -1.00
URSSAF (12.3%)       -9.23
Impôt (1%)           -0.75
─────────────────────────
Bénéfice net          25.72 €  (34% du PV) ✅
```

---

## 🔧 Variantes selon contexte

### Si tu offres PAS la livraison (client paie 7 €)
Tu peux baisser un peu : **`P = 1.8 × C + 8`**
→ Plus compétitif sur les petits articles (casquettes, lunettes, accessoires).

### Si c'est une pré-commande (zéro stock, paiement avant achat)
Cashflow positif → tu peux être plus agressif :
**`P = 1.7 × C + 12`** (marge nette ~25%)

### Si c'est un produit "appel" (booster les ventes / pub)
Marge réduite, on accepte 15% net pour générer du volume :
**`P = 1.5 × C + 10`** (à utiliser avec parcimonie, sinon le business meurt)

### Si c'est du HAUT luxe (>500 € fournisseur — sacs LV, montres, etc.)
Marge plus large justifiée par le SAV / le risque / le ticket élevé :
**`P = 2.2 × C + 20`**

---

## 📋 Workflow recommandé pour remplir `pricing-gabarit.csv`

Pour chacun des 123 produits "À sourcer" :

1. Demande au fournisseur le **prix d'achat** (avec frais d'import si applicable).
2. Reporte dans la colonne `prix_sourcing_eur`.
3. Calcule `prix_vente_eur = round((prix_sourcing × 2 + 15) / 5) × 5` (arrondi au 5€ supérieur, ça fait plus pro : 73 € → 75 €, 217 € → 220 €).
4. Reporte `marge_eur = prix_vente_eur - prix_sourcing_eur` (marge brute, hors charges).
5. Reporte `marge_pct = round((marge_eur / prix_vente_eur) × 100)`.
6. Statut → "Prix défini".

Une fois la colonne `prix_vente_eur` remplie sur tout ou partie du CSV, **dis à Claude** : *"Injecte les prix dans products-data.js"* → on bascule du gabarit au site live.

---

## 🚨 Quand NE PAS appliquer la formule

| Situation | Action |
|---|---|
| Produit en surplus / fin de série fournisseur | Tu peux baisser à `1.5C + 10` pour écouler |
| Produit où le marché reseller a un prix de référence < `2C + 15` (StockX, GOAT, Vestiaire) | Aligne-toi sur le marché −5%, sinon tu vendras pas |
| Produit ultra demandé / hype (sneakers à drop) | Monte à `2.5C + 20`, le marché suivra |
| Tu connais pas le prix fournisseur | Va le chercher AVANT de pricer. JAMAIS de prix sorti du chapeau. |

### Vérification marché systématique
Avant de poster un prix sur le site, **check rapide** :
- StockX / GOAT (sneakers + sacs)
- Vestiaire Collective (luxe)
- Site officiel marque (prix neuf retail)

Ton prix doit être :
- **Inférieur** au prix neuf retail marque (sinon le client va sur le site officiel)
- **Cohérent** avec StockX/Vestiaire ±10%
- **Supérieur** à ton prix plancher (`1.6C + 10`)

Sweet spot : -15% à -25% sous le prix retail marque.

---

## 🧠 Mémo carte de visite (à garder dans ton tel)

```
PRIX FOURNISSEUR connu → PRIX VENTE = (×2) + 15
Plancher (jamais en dessous) = (×1.6) + 10
Bénéfice net moyen attendu = 30% du prix vente
```

Trois opérations, calculable en 5 secondes au tel.

---

## ⚠️ Limites de ce guide

- Hypothèses URSSAF (12.3%) valables uniquement en régime micro-entrepreneur vente de marchandises, en France métropolitaine, sans dépasser le seuil de 188 700 € CA/an.
- Versement libératoire 1% IR : seulement si tu y es éligible (revenu fiscal de référence du foyer < seuil). Sinon impôt classique → marge nette légèrement plus basse.
- La pub (CAC) n'est PAS incluse dans le calcul. Si tu fais 20% de CAC sur un produit, retire 20% de la marge nette estimée.
- TVA non incluse (hypothèse franchise en base de TVA, valable < 85 800 € CA marchandises/an).
