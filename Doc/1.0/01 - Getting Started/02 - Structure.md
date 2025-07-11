# 🧱 Structure d’un projet

## 📁 Arborescence classique

```
mon-projet/
├── index.html
├── assets/
│   ├── style.css
│   ├── marked.js
│   └── script.js
├── docs/
│   ├── introduction.md
│   ├── installation.md
│   ├── configuration.md
│   └── release-note.md
└── somadoc.config.yml
```

## 📚 Dossier `docs/`

Contient tous vos fichiers Markdown. Chaque fichier devient une page, automatiquement liée s’il est intégré via `<md>` ou via un menu latéral (si vous le configurez).

## 🎨 Personnalisation

- **Thème clair/sombre** activé via `darkmode` dans le HTML.
- Personnalisation via SCSS possible en surchargeant `style.css`.

## 🧩 Fichiers spéciaux

- `marked.js` : moteur de rendu Markdown.
- `script.js` : ajoute navigation, thème, et comportement dynamique.