#!/bin/bash
# ============================================
# Script de nettoyage — Notre-Dame-Du-Sacre-Coeur
# Supprime tous les fichiers parasites en une fois
# ============================================

echo "🔍 Vérification du dépôt..."

# Vérifier qu'on est bien dans le bon dossier
if [ ! -f "index.html" ]; then
    echo "❌ ERREUR : Vous n'êtes pas dans le dossier du projet."
    echo "   Placez-vous dans le dossier Notre-Dame-Du-Sacre-Coeur et relancez."
    exit 1
fi

echo "🗑️  Suppression des fichiers .page..."
git rm *.page 2>/dev/null
if [ $? -eq 0 ]; then
    echo "   ✅ Fichiers .page supprimés"
else
    echo "   ⚠️  Aucun fichier .page trouvé (déjà supprimés ?)"
fi

echo "🗑️  Suppression des doublons et fichiers invalides..."
git rm "index (6).html" 2>/dev/null
git rm saint-georges_histoire.pptd 2>/dev/null
git rm saint-andre_histoire.pptd 2>/dev/null
git rm saint-michel_histoire.pptd 2>/dev/null
git rm assomption_histoire.pptd 2>/dev/null

echo "📤 Envoi sur GitHub..."
git commit -m "Nettoyage : suppression fichiers .page, doublons et .pptd invalides"
git push origin main

echo ""
echo "✅ TERMINÉ ! Votre dépôt est maintenant propre."
echo "   Rafraîchissez https://github.com/justice-aide-ca/Notre-Dame-Du-Sacre-Coeur"
