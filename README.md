# Unité pastorale Notre-Dame-du-Sacré-Cœur

Plateforme de services pastoraux de l'unité pastorale Notre-Dame-du-Sacré-Cœur
(Assomption, Saint-Georges, Saint-André, Saint-Michel) — Diocèse d'Edmundston,
Nouveau-Brunswick, Canada.

## Contenu

Un seul fichier à déployer : **`index.html`** (aucune installation requise —
HTML, CSS et JavaScript autonomes).

- **Demandes de sacrements** (bilingue FR/EN) : les 7 sacrements + funérailles,
  de la demande jusqu'à la célébration, selon le Code de droit canonique (CIC 1983)
  et les directives diocésaines configurables.
- **Suivi des demandes** par numéro de référence ; espace paroisse pour l'équipe
  pastorale (instruction, préparation, célébration, liste de contrôle canonique).
- **Horaire des messes** : temps ordinaire modifiable, temps forts en texte libre.
- **Vie liturgique** : guides des célébrations spéciales (Avent, Carême, Noël,
  Triduum), calendrier liturgique calculé automatiquement, suggestions de prière
  et de visuel — sources « Vie liturgique » (Novalis) et CECC/CCCB.
- **Bénévoles** : 17 ministères, conditions, formulaire, répertoire des contacts.
- **Rapports** : pastoraux et financiers, mensuels et annuels (plan comptable
  réel des paroisses, bilan, rapport annuel AGA imprimable).
- **Données initiales** : reprise des registres paroissiaux pour la comparaison
  d'année en année.

## Important — données

Ce prototype fonctionne entièrement dans le navigateur : les données saisies sont
conservées **localement** (localStorage), rien n'est envoyé sur un serveur.
Pour la production (base de données sécurisée, authentification de l'espace
paroisse), voir le document d'audit et de recommandations.

## Déploiement

Site statique : hébergeable tel quel sur GitHub Pages, Render, Netlify ou tout
hébergement web. `index.html` est le point d'entrée.
