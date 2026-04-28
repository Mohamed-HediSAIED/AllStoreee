# Journal de session AllStore — mémoire continue Mohamed/Thomas/Claude

> **Append-only.** Ne jamais éditer ou supprimer une entrée existante.
> Chaque entrée = un fait, une décision, une préférence, ou un apprentissage qui doit
> survivre entre sessions Claude. Format : `[YYYY-MM-DD HH:MM] [WHO] [TYPE] message`.
>
> WHO = `MOHAMED` | `THOMAS` | `CLAUDE` | `SYSTEM`
> TYPE = `DECISION` | `INFO` | `PREFERENCE` | `BUG` | `LEARN` | `BLOCKER`
>
> Les ~20 dernières entrées sont injectées au démarrage de chaque session par le hook SessionStart.
> Pour les détails complets, voir les fichiers de référence (CLAUDE.md, MOHAMED_BRIEF.md, etc.)

---

## 2026-04-28

[2026-04-28 08:42] [MOHAMED] [DECISION] Lance le chantier Édition Été côté Mohamed (validation founder + sourcing assets). Thomas pilote la créa+code.
[2026-04-28 09:30] [MOHAMED] [DECISION] Édition Été — hide complet 20 produits hivernaux en home (17 clear + 3 hoodies Burberry, dont burberry-gris à retirer aussi de FEATURED_IDS). Stone Island + On All-Day restent visibles.
[2026-04-28 09:32] [MOHAMED] [DECISION] Édition Été — mood retenu = "A. Riviera Quiet Luxury" (rejette B Club House et C Festival). Tagline : « L'été se porte authentique. ». Détails : EDITION_ETE_DECISIONS.md.
[2026-04-28 09:38] [CLAUDE] [INFO] Catalogue products-data.js = 326 entrées (variantes incluses), 6 catégories, pas de champ `season` (à ajouter par Thomas). 11 produits dans FEATURED_IDS.
[2026-04-28 09:46] [MOHAMED] [LEARN] URSSAF micro-entrepreneur prélève 12,3% sur le **CA brut** (vente marchandises), pas sur la marge. C'est le défaut majeur du régime micro pour resellers à faible marge.
[2026-04-28 10:00] [MOHAMED] [LEARN] La marge brute reseller AllStore actuelle (~25%) est trop faible : il reste ~6 €/vente net après URSSAF/Stripe/livraison. Cible saine = 40-60% de marge brute.
[2026-04-28 10:13] [CLAUDE] [DECISION] Formule pricing AllStore officielle : `PV = (PF × 2) + 15` (prix vente cible) et `Plancher = (PF × 1,6) + 10` (limite absolue). Donne ~30-35% bénéfice net après tous frais. Détails : PRICING_GUIDE.md.
[2026-04-28 10:25] [MOHAMED] [INFO] A déjà un SIRET actif pour Uber Eats (livraison, prestation services BIC ~21,2%). PAS besoin d'en créer un nouveau pour AllStore — il faut juste ajouter activité secondaire commerce détail (APE 47.91A) sur formalites.entreprises.gouv.fr (~15 min, gratuit, confirmation 1-7 jours).
[2026-04-28 17:23] [MOHAMED] [PREFERENCE] Veut que TOUS les échanges (même les plus minimes) soient persistants entre sessions. Mise en place de SESSION_LOG.md + hook qui inject au démarrage.
[2026-04-28 17:28] [SYSTEM] [INFO] Création initiale de SESSION_LOG.md + modification hook SessionStart pour charger les 20 dernières entrées.
