# Site de l'Unité Pastorale Notre-Dame-du-Sacré-Cœur

## Déploiement sur GitHub Pages

1. Créez un nouveau repository sur GitHub (ex: `notre-dame-sacre-coeur`)
2. Téléversez tous les fichiers de ce dossier à la racine du repository
3. Allez dans **Settings > Pages**
4. Sélectionnez la branche `main` et le dossier `/ (root)`
5. Votre site sera accessible à `https://votre-org.github.io/notre-dame-sacre-coeur/`

## Structure du site

```
├── index.html              # Page d'accueil
├── horaires.html           # Horaires des messes
├── bulletin.html           # Bulletin paroissial
├── transparence.html       # Rapports financiers et pastoraux
├── partenaires.html        # Page des commanditaires
├── css/
│   └── style.css           # Styles complets
├── js/
│   └── main.js             # Scripts (menu mobile)
├── paroisses/
│   ├── assomption.html     # Page paroisse Assomption
│   ├── saint-georges.html  # Page paroisse Saint-Georges
│   ├── saint-andre.html    # Page paroisse Saint-André
│   └── saint-michel.html   # Page paroisse Saint-Michel
└── documents/              # Dossier pour les PDF (rapports, bulletins)
```

## Personnalisation

Remplacez les éléments marqués `[À compléter]` par vos informations réelles :
- Numéros de téléphone
- Adresses postales
- Adresses courriel
- Coordonnées du secrétariat

## Ajouter un partenaire

1. Remplacez les placeholders dans `partenaires.html`
2. Ajoutez le logo dans le dossier `images/` (à créer)
3. Mettez à jour le bandeau dans le footer de toutes les pages

## Ajouter un rapport

1. Placez le PDF dans le dossier `documents/`
2. Ajoutez une entrée dans `transparence.html`

## Mises à jour du bulletin

Modifiez directement `bulletin.html` chaque semaine, ou créez des pages archivées.
