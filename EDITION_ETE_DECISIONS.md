# Édition Été 2026 — Décisions Mohamed (founder)

> Décidé le 2026-04-28 par Mohamed.
> À lire par Thomas avant d'attaquer la branche `claude/thomas-edition-ete-home`.
> Source de coordination : `MOHAMED_BRIEF.md` + `THOMAS_BRIEF.md`.

---

## 1. Mood + tagline retenus

**Direction : A — Riviera Quiet Luxury**

- **Tagline officielle :** *« L'été se porte authentique. »*
- **Mood :** lumière dorée fin de journée, lin, blanc cassé, sable, terracotta.
- **Palette :** sable / blanc cassé / terracotta / accents olive ou marine profond.
- **Hero référence :** silhouette en chemise lin + casquette Loro Piana + sneakers blanches basses, dos tourné vers une côte (pas de plage cliché, plutôt rivage rocheux ou terrasse).
- **Marques pivot :** Loro Piana, Casablanca, Miu Miu (lunettes), LV (Keepall), Margiela.

**Rejeté :** B (Club House preppy-tennis) — trop daté, et public moins aligné avec featured actuel. **Rejeté :** C (Festival) — trop jeune, casse le quiet luxury.

**Note Mohamed → Thomas :** si tu veux capturer l'énergie "Club House" malgré tout, tu peux faire **une section catégorie dédiée plus bas dans la home** (bandeau polos Burberry + Casablanca + casquettes Alo + Margiela). Mais le hero + la tagline + le mood général restent A pur.

---

## 2. Produits hivernaux à HIDE en home

**Décision Mohamed : hide TOUS les articles hiver (clear + mi-saison hoodies Burberry).**

Total : **20 produits** à cacher de la home, mais à conserver dans `/boutique`.

### Clear hiver (17)
| Catégorie | IDs |
|---|---|
| Écharpes Burberry | `burberry-echarpe-1`, `burberry-echarpe-2`, `burberry-echarpe-3`, `burberry-echarpe-4`, `burberry-echarpe-5`, `burberry-echarpe-6`, `burberry-echarpe-7` |
| Pulls laine/cachemire Burberry EKD | `burberry-ekd-1`, `burberry-ekd-2`, `burberry-ekd-3`, `burberry-ekd-4` |
| Cardigans | `moncler-cardigan-1`, `moncler-cardigan-2`, `cg-cardigan-1` |
| Doudoune Canada Goose | `cg-doudoune-sm-1` |
| Vestes lourdes | `courreges-veste-1`, `rl-zip-1`, `rl-zip-2` |

### Mi-saison hoodies Burberry (3) — hide aussi
| Produit | Note |
|---|---|
| `burberry-gris` | ⚠️ Actuellement dans `FEATURED_IDS` → à retirer aussi des featured |
| `burberry-noir` | Hide home |
| `burberry-marine` | Hide home |

### À garder visible en home (mi-saison crewnecks)
- `si-pull-noir` (Stone Island, **reste en FEATURED**) — streetwear 3 saisons, soir d'été.
- `si-pull-blanc` (Stone Island).
- `on-allday-noir` (zip On).

---

## 3. Conséquence FEATURED_IDS

`FEATURED_IDS` actuel (11) : `prada-cup-noir`, `nike-mind-1`, `lv-keepall-1`, `margiela-1`, `burberry-gris`, `si-pull-noir`, `gg-1`, `miumiu-carte-noir`, `airpods-max-noir`, `casa-tshirt-1`, `lp-casquette-noir`.

**À faire (Thomas) :** retirer `burberry-gris` et le remplacer par un produit été. Suggestions Mohamed (à confirmer Thomas) :
- `lunettes-miumiu` (booste catégorie lunettes, peu de stock à mettre en avant donc impact fort)
- ou `gd24h-1` (sac week-end Gerard Darel, premier vrai produit "été" en featured)

Ma préférence : **`lunettes-miumiu`** parce que c'est la SEULE entrée lunettes du catalogue → donc l'avoir en featured pendant l'été c'est cohérent.

---

## 4. Assets à sourcer (Mohamed, dépendant des specs Thomas)

En attente que Thomas précise les dimensions/cadrage. Pré-anticipation :
- Hero desktop **16:9** (≥1920×1080) — silhouette lin, fin de journée, mood A
- Hero mobile **9:16** (≥1080×1920) — version portrait du hero
- 4-6 photos catégories été (casquettes / lunettes / tees / sneakers basses / sacs week-end)

**Sources autorisées :** libre de droits (Unsplash/Pexels), shooting perso, ou pages produits marques officielles (lv.com, casablancaparis.com, loropiana.com, etc.).

**Dépôt :** `ALLSTORE 2 IMAGES/edition-ete/` puis copie dans `AllStore-SITE-WEB/assets/ete/` une fois validé.

---

## 5. "VU SUR INSTAGRAM"

À recharger en mood été : 6-8 stories clients en casquette / sneakers blanches / sac plage. Pas de hoodie ni écharpe en arrière-plan. À arbitrer entre Mohamed et Thomas selon dispo (les 2 ont les accès `@allstore.tm`).

---

## 6. Revert édition automne

Date suggérée : **15 septembre 2026**. Programmer un rappel calendrier ou routine Claude planifiée.

---

## Hand-off à Thomas

Thomas, quand tu prends la session :
1. Branche-toi sur `claude/thomas-edition-ete-home` (à créer depuis `main` à jour).
2. Lis ce fichier comme source de vérité founder.
3. Code le filtre `season` dans `products-data.js`, le hide en home, l'éventuelle section "Club House" plus bas, et le hero avec la tagline retenue.
4. Liste-moi (Mohamed) les dimensions/cadrages exacts d'images dont tu as besoin → je source.
5. Ouvre une PR `→ main` quand prêt, je review la preview Vercel et je merge si OK.

Deadline live : **avant le 10 mai 2026**.
