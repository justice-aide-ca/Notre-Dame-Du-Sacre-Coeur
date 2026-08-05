# Audit et recommandations — Plateforme « Paroisse AI »

**Objet** : https://paroisse-ai.onrender.com/
**Date de l'audit** : 4 août 2026
**Cadre retenu** : droit canonique universel (Code de droit canonique de 1983 — CIC), particularités diocésaines configurables.
**Contexte d'application** : unité pastorale **Notre-Dame-du-Sacré-Cœur**, confiée à un prêtre modérateur (CIC c. 517 §1) et regroupant les paroisses Assomption, Saint-Georges, Saint-André et Saint-Michel — Diocèse d'Edmundston (Nouveau-Brunswick, Canada). L'unité dessert une communauté francophone et une communauté anglophone. Dans ce diocèse, le conseil pour les affaires économiques de la paroisse (CIC c. 537) porte le nom de « Conseil paroissial pour les affaires économiques » (CAPÉ/CPAÉ).

---

## 1. État actuel de la plateforme

### Ce que fait la plateforme aujourd'hui
- Une page unique avec un formulaire bilingue (français / anglais).
- Champs : pays (liste), diocèse, unité pastorale, paroisse (champs libres), type de demande (7 sacrements + funérailles, catéchèse, retour à l'Église, autre), contexte, besoin, nom, date souhaitée.
- À l'envoi, l'API (`/api/submit-paroisse-request`) renvoie une « réponse pastorale » générée par IA et un numéro de référence.
- Un message renvoie vers le secrétariat paroissial pour contacter un prêtre.

### Points forts
- Ton d'accueil bienveillant, adapté à des personnes parfois éloignées de l'Église.
- Couverture de tous les sacrements dès le départ.
- Simplicité technique (une page, une API).

### Limites identifiées
1. **Pas de parcours structuré.** La plateforme se limite à recueillir une demande ; elle n'accompagne ni la préparation ni la célébration. Or le besoin réel d'un service paroissial couvre toute la chaîne : **demande → instruction canonique → préparation → célébration → enregistrement**.
2. **Réponse IA générique.** Testée, elle donne des informations vagues et renvoie systématiquement vers le secrétariat. Elle ne cite ni les exigences canoniques applicables, ni les documents à fournir, ni les étapes concrètes.
3. **Aucun outil pour la paroisse.** Le secrétariat ne dispose d'aucun tableau de suivi : impossible de savoir où en est une demande, de planifier une célébration ou de vérifier les conditions canoniques.
4. **Aucune aide aux rapports diocésains.** Chaque année, les paroisses doivent remonter des statistiques sacramentelles à la chancellerie (baptêmes, confirmations, mariages, funérailles…) et tenir les registres (CIC c. 535). Rien n'y répond.
5. **Champs libres sources d'erreurs.** Diocèse et paroisse saisis à la main, sans validation, ce qui compromet le suivi et les statistiques.
6. **Risque pastoral.** Une IA qui répond seule à des situations sacramentelles (mariage après divorce, onction des malades, etc.) peut induire en erreur ; le renvoi vers le prêtre doit être intégré au parcours, pas laissé en bas de page.

---

## 2. Recommandations (appliquées dans le prototype reconstruit)

### R1 — Structurer le parcours en 4 étapes
Chaque demande suit un cycle visible par le fidèle et géré par la paroisse :
1. **Demande** — formulaire guidé, adapté à chaque sacrement (seuls les champs pertinents sont affichés).
2. **Instruction** — vérification des conditions canoniques : le fidèle voit les exigences du CIC et les documents à préparer ; la paroisse coche les points de contrôle.
3. **Préparation** — étapes concrètes (rencontres, sessions, célébrations préparatoires) avec suivi d'avancement.
4. **Célébration** — ce qui se passera, qui célèbre, et enregistrement de la date réelle pour les registres et statistiques.

### R2 — Remplacer la « réponse IA » par un contenu canonique fiable
Pour chaque sacrement, un contenu rédigé et vérifiable : fondement canonique (numéros de canons du CIC 1983), conditions requises, documents, étapes de préparation, déroulé de la célébration. L'IA peut rester en appoint pour l'accueil, mais ne doit plus porter l'information sacramentelle. Les directives particulières du diocèse sont saisies par la paroisse dans les paramètres et affichées au fidèle.

### R3 — Créer un espace paroisse (back-office)
- Tableau des demandes avec statuts : *Nouvelle → En instruction → En préparation → Prête pour célébration → Célébrée*.
- Fiche détaillée par demande avec liste de contrôle canonique.
- Enregistrement de la date de célébration (alimente les rapports).

### R4 — Module « Rapports » (pastoraux et financiers)
- **Rapports pastoraux** : statistiques sacramentelles mensuelles et annuelles, par paroisse ou consolidées pour l'unité pastorale, exportables (CSV / impression) ; rappel des registres à tenir (baptêmes c. 877, confirmations c. 895, mariages c. 1121, décès c. 1182).
- **Rapports financiers** : saisie mensuelle des revenus et dépenses par paroisse (quêtes, dîme, messes annoncées, salaires, bâtiments, contribution au diocèse…), rapports mensuels et annuels, vue consolidée de l'unité — répondant à l'obligation de rendre compte de l'administration des biens (c. 1287) et au travail du CAPÉ (c. 537).

### R5 — Simplifier l'interface
- Supprimer les champs inutiles, n'afficher que ce qui sert l'étape en cours.
- Une page d'accueil avec deux entrées claires : **« Je suis un fidèle »** / **« Espace paroisse »**.

---

## 3. Le prototype reconstruit

Le prototype joint met en œuvre l'ensemble de ces recommandations :

| Module | Contenu |
|---|---|
| Bilingue FR/EN | Bascule français/anglais (bouton dans l'en-tête) pour tout le **côté fidèle** : accueil, demandes de sacrements, suivi, vie liturgique, bénévoles, horaire des messes. Les contenus sacramentels (exigences canoniques, documents, étapes), les guides liturgiques, les 17 ministères et les conditions pour être bénévole existent dans les deux langues. Le côté paroisse (back-office, rapports financiers et pastoraux) demeure en français |
| Horaire des messes | Carte sur la page d'accueil ; temps ordinaire pré-rempli (mardi 19h Saint-Georges avec chapelet et adoration dès 18h ; mercredi 19h Saint-Michel ; jeudi 9h Saint-André ; vendredi 9h en anglais à l'Assomption), modifiable dans Paramètres (ajout/retrait, messes dominicales possibles) ; pour les temps forts (Avent, Noël, Carême, Triduum), zone de texte libre fixée par l'équipe pastorale |
| Accueil | Deux entrées : fidèle / paroisse |
| Données initiales | Reprise unique des registres paroissiaux (statistiques sacramentelles et totaux financiers annuels, par paroisse et par année) : les rapports affichent d'emblée la comparaison avec les années antérieures ; pré-rempli avec les chiffres réels 2024-2025 d'Assomption |
| Bénévoles | 17 services de l'unité (ÉAP, liturgie, lecteurs, servants, sacristains, ministres de la communion, musiciens et chorales, décors, accueil, quête, CPAÉ, Développement et Paix, préparation aux baptêmes, catéchèse) ; conditions pour être bénévole rappelées (engagement, formation, code de conduite, vérification des antécédents pour les services auprès de personnes vulnérables) ; formulaire « Je veux servir » avec consentements ; gestion des bénévoles actifs et des candidatures ; répertoire imprimable avec coordonnées, export CSV — **avec en tête la liste des prêtres de l'unité** (modérateur et prêtres collaborateurs, coordonnées saisies dans Paramètres) |
| Demande guidée | 7 sacrements + funérailles ; formulaire adapté à chaque cas ; exigences CIC affichées |
| Espace paroisse | Suivi des demandes, avancement des étapes, liste de contrôle canonique |
| Rapports pastoraux | Statistiques mensuelles et annuelles par paroisse et consolidées, export CSV, rappel des registres |
| Rapports financiers | Saisie mensuelle par paroisse selon le **plan comptable réel de la paroisse** (état des résultats + bilan), rapports mensuels et annuels avec comparaison d'année en année, consolidé de l'unité, export CSV |
| Rapport annuel (AGA) | Document d'assemblée générale annuelle sur le modèle de la Paroisse de l'Assomption : ordre du jour, synthèse financière comparative et rapport statistique insérés automatiquement, sections narratives (CPAÉ, projets, ÉAP, catéchèse, liturgie, chorales, événements), génération imprimable |
| Vie liturgique | Guides des célébrations spéciales (pénitentielles de l'Avent et du Carême, veillée de Noël, Triduum pascal) : déroulé, préparation pratique, repères liturgiques et canoniques, dates calculées automatiquement (comput pascal). Sources indiquées par communauté : « Vie liturgique » (Novalis) et « Vivre et célébrer » (Office national de liturgie de la CECC) pour la francophone ; publications du secteur anglais de la CECC (Liturgical Calendar with Guidelines for Pastoral Liturgy, National Bulletin on Liturgy) pour l'anglophone. Trois volets ajoutés : **calendrier liturgique** (les 7 temps avec couleurs et plages de dates calculées, principales fêtes de l'année, fêtes d'obligation au Canada), **suggestions de prière** par temps (couronne de l'Avent, chemin de croix, Regina Caeli, adoration du mardi 18h à Saint-Georges, Carême de partage, mois du rosaire…), **suggestions visuelles** par temps (couleurs, crèche, cierge pascal, voiles de la Passion, décor d'Action de grâce…) |
| Paramètres | Identité de la paroisse, diocèse, directives particulières, répartition des coûts partagés de l'unité (salaires des prêtres : Assomption 33 %, Saint-Georges 30 %, Saint-Michel 22 %, Saint-André 15 %), liens des guides diocésains annuels, horaire des messes (temps ordinaire et temps forts) |

**Alignement comptable** : le module financier reprend le plan comptable utilisé par la Paroisse Assomption (rapports QuickBooks de mai 2026) : groupes et sous-comptes de revenus (4001 Quête, 4100 Pastorale, 4200 Dons et souscriptions, 4600 Funéraires, 4700 Luminaires et rameaux…) et de dépenses (5001 Salaires, 5300 Culte, 5500 Contribution diocésaine — cathédratique et caisse ecclésiastique — 5600 Entretien, 5800 Chauffage…). Le rapport annuel reproduit le format « comparaison avec l'année précédente » ($ Change, % Change). Le **bilan** (actif/passif) est tenu par paroisse — chaque paroisse étant une personne juridique distincte (c. 515 §3) — avec contrôle automatique de l'équilibre actif = passif + capitaux, le résultat de l'exercice étant calculé automatiquement à partir des feuilles mensuelles.

**Limites du prototype** : il fonctionne entièrement dans le navigateur — les données sont conservées localement (localStorage) et non sur un serveur. Pour une mise en production, il faudra raccorder ces écrans à votre base de données existante (ou à une nouvelle API) et sécuriser l'espace paroisse par une authentification. Le prototype sert de base validée fonctionnellement pour ce développement.

---

## 4. Pistes pour la mise en production

1. **Persistance** : réutiliser l'API Render existante en remplaçant la génération IA par le stockage des demandes et des statuts.
2. **Authentification** de l'espace paroisse (mot de passe du secrétariat, ou compte diocésain).
3. **Notifications** : courriel au fidèle à chaque changement d'étape.
4. **Annuaire** : liste fermée des paroisses du diocèse au lieu des champs libres.
5. **Multilingue** : le couple français/anglais est en place côté fidèle ; en production, prévoir la traduction professionnelle des contenus ajoutés au fil de l'eau (actualités, guides diocésains annuels).
6. **Validation diocésaine** : faire relire les contenus sacramentels par le vicaire épiscopal ou le chancelier avant diffusion.
