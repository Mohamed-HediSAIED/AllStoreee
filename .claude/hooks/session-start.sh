#!/usr/bin/env bash
# SessionStart hook AllStore — sync repo + injection auto du contexte projet
# pour que Claude "se souvienne" de la situation au demarrage d'une nouvelle conversation.

set -uo pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 0

# 1. Sync avec origin (silent)
git pull --ff-only >/dev/null 2>&1 || true

# 2. Collecte du contexte
BRANCH=$(git branch --show-current 2>/dev/null || echo "?")
LAST_COMMITS=$(git log --oneline -10 2>/dev/null || echo "(pas de commits)")
DIRTY=$(git status --short 2>/dev/null)
[ -z "$DIRTY" ] && DIRTY="(working tree propre)"

# 3. TODOs ouvertes dans CLAUDE.md (lignes commençant par "- [ ]" ou "[ ]")
TODOS=$(grep -E '^\s*-?\s*\[\s*\]' CLAUDE.md 2>/dev/null | head -20)
[ -z "$TODOS" ] && TODOS="(aucune TODO ouverte trouvee dans CLAUDE.md)"

# 4. Identification du destinataire (Mohamed/Thomas) via la branche
case "$BRANCH" in
    claude/thomas-*) WHO="Thomas (charger THOMAS_BRIEF.md)" ;;
    claude/mohamed-*) WHO="Mohamed (charger MOHAMED_BRIEF.md)" ;;
    main) WHO="?" ;;
    *) WHO="? (branche ne suit pas la convention claude/<nom>-*)" ;;
esac

# 5. Construction du message — heredoc puis jq -Rs pour echaper en JSON-safe
CTX=$(cat <<EOF
=== ALLSTORE — contexte projet (injecte automatiquement par SessionStart hook) ===

Tu reprends une session sur le dossier AllStoreee. Le projet a une memoire
continue : CLAUDE.md a la racine + ce contexte = tout ce qu'il faut savoir.

Branche actuelle : $BRANCH
Utilisateur probable : $WHO

10 derniers commits :
$LAST_COMMITS

Working tree :
$DIRTY

TODOs ouvertes dans CLAUDE.md :
$TODOS

Rappel : a la fin de chaque jalon, mets a jour la section "Etat du projet"
de CLAUDE.md dans le meme commit que le livrable. C'est ce qui maintient
la memoire vivante entre sessions.
EOF
)

# 6. Emission JSON pour le harnais Claude
if command -v jq >/dev/null 2>&1; then
    JSON_CTX=$(printf '%s' "$CTX" | jq -Rs .)
else
    # Fallback sans jq : echappement minimal
    JSON_CTX=$(printf '%s' "$CTX" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' 2>/dev/null \
        || printf '"%s"' "$(printf '%s' "$CTX" | sed 's/\\/\\\\/g; s/"/\\"/g; s/$/\\n/' | tr -d '\n')")
fi

printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":%s}}\n' "$JSON_CTX"
