# ⚙️ Configuration

## 🧾 Fichier `somadoc.config.yml`

SOMADoc peut être configuré en déposant un fichier `somadoc.config.yml` à la racine du projet.

### 🧾 Exemple

```yaml
title: "Ma Super Doc"
theme: "auto"
toc: true
watch: true
baseUrl: "/docs/"
output: "./build"
plugins:
  - search
  - dark-mode-toggle
```

## 🛠️ Options disponibles

| Clé        | Type    | Valeur par défaut | Description                                      |
|------------|---------|-------------------|--------------------------------------------------|
| `title`    | string  | `Documentation`   | Titre affiché dans l’en-tête                     |
| `theme`    | string  | `auto`            | `clair`, `sombre` ou `auto`                     |
| `toc`      | bool    | `true`            | Active/désactive la table de navigation          |
| `watch`    | bool    | `false`           | Mode développement avec rechargement automatique |
| `baseUrl`  | string  | `/`               | Préfixe pour tous les liens                      |
| `output`   | string  | `./build`         | Dossier de sortie pour le HTML généré            |
| `plugins`  | array   | `[]`              | Liste des plugins à charger                      |