# Unité pastorale Sacré-Cœur — Site de gestion pastorale

Site statique complet avec gestion d'activités pastorales via localStorage (niveau 1).

## 📁 Structure

```
├── index.html              → Tableau de bord (stats, formulaire, graphiques)
├── horaires.html           → Horaires des messes des 4 paroisses
├── services.html           → Baptême, mariage, funérailles, onction, catéchèse, bénévolat
├── bulletin.html           → Bulletin paroissial Le Sacré-Cœur
├── transparence.html       → Rapports financiers et pastoraux
├── partenaires.html        → Commanditaires + espace "Devenir partenaire"
├── videos.html             → Films et vidéos pastorales
├── musique.html            → Mélodies mariales + lecteur audio
├── paroisses/
│   ├── assomption.html
│   ├── saint-georges.html
│   ├── saint-andre.html
│   └── saint-michel.html
├── css/style.css           → Feuille de styles unique
├── js/app.js               → Logique complète (localStorage, stats, rapports, lecteur)
├── images/                 → Placez vos images ici
├── videos/                 → Placez vos MP4 ici
├── audio/                  → Placez vos MP3 ici
└── documents/              → Placez vos PDF de rapports ici
```

## 🚀 Utilisation immédiate (niveau 1)

1. **Téléchargez** le ZIP et extrayez-le sur votre ordinateur
2. **Double-cliquez** sur `index.html` — le site s'ouvre dans votre navigateur
3. **Testez** le formulaire d'activité : remplissez, cliquez "Enregistrer", voyez les stats se mettre à jour
4. **Naviguez** entre les pages via le menu en haut

> ⚠️ En niveau 1, les données restent dans **votre navigateur uniquement** (localStorage). Chaque ordinateur voit ses propres données. Pour un accès partagé depuis plusieurs appareils, passez au niveau 2 (Firebase).

## 🎵 Médias

- **Vidéos** : placez vos fichiers MP4 dans `videos/`
- **Musique** : placez vos fichiers MP3 dans `audio/`
- Les pages `videos.html` et `musique.html` les afficheront automatiquement

## 📊 Rapports

- Allez dans l'onglet **Rapports** (intégré au tableau de bord via le menu)
- Sélectionnez un mois et une année
- Le bilan se génère automatiquement à partir des activités enregistrées
- Cliquez sur **Exporter** pour télécharger le rapport en fichier texte

## 🛠 Personnalisation

Ouvrez les fichiers HTML dans un éditeur de texte (Notepad, VS Code, etc.) et modifiez :
- Les numéros de téléphone `(506) XXX-XXXX`
- Les adresses courriel `[À compléter]`
- Les noms des paroisses et du curé
- Les horaires de messes

## 🔮 Passage au niveau 2 (Firebase)

Si vous souhaitez que le secrétariat, le curé et les bénévoles voient les mêmes données depuis n'importe quel appareil :

1. Créez un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activez **Cloud Firestore**
3. Remplacez la logique localStorage par les appels Firebase dans `js/app.js`
4. Déployez sur GitHub Pages ou Firebase Hosting

---

*Unité pastorale Sacré-Cœur — Diocèse d'Edmundston*
