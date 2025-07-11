# 🛠️ Installation

## Prérequis

- Un navigateur moderne
- Un éditeur de texte
- De l’amour pour le Markdown 💘

## 📥 Étapes

### 1. Téléchargement

Récupérez les fichiers suivants :

- `style.css`
- `script.js`
- `marked.js`

Placez-les dans votre dossier `assets/`.

### 2. Structure de base

```html
<html>
<head>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <md>
    # Hello World
    Bienvenue dans votre documentation ✨
    </md>
    <script src="assets/marked.js"></script>
    <script src="assets/script.js"></script>
</body>
</html>
```

### 3. Affichage

Ouvrez le fichier `.html` dans votre navigateur : la magie opère !

> 🔁 Le contenu entre balises `<md>` est automatiquement transformé.