
# SOMADoc

**SOMADoc** is a super easy-to-use documentation framework — just drop your Markdown files in the right folder, and you're good to go! 🧾✨

It automatically turns your `.md` files into a full-featured, browsable documentation site, without requiring a complex setup or build system.

---

## 🕹️ Demo

YOu can find a very short demo here : [https://codepen.io/Zulgard/full/OPVexYJ](https://codepen.io/Zulgard/full/OPVexYJ)

---

## 🚀 Features

- ✅ **Plug-and-play**: Just add your Markdown files — no configuration needed.
- 🧭 **Auto-generated navigation**: 
  - **Sidebar navigation** based on your folder structure.
  - **On-page navigation** based on headings.
- 🔍 **Built-in search**: Instant search across all your docs.
- 🎨 **Customizable design**:
  - Easily change the whole color scheme by editing a single variable in `style.scss`.
  - Styles built with SCSS — just recompile using [`sass`](https://sass-lang.com/install) after edits.

---

## 🛠 Installation

1. Clone or download this repository.
2. Deploy the folder to a PHP-compatible web server.
3. Start adding your documentation in Markdown format inside the `/Doc` folders, following the folder and file naming convention 
4. Visit the `index.php` file in your browser to see the magic!

___

## 📁 Project Structure

```
SOMADoc/
├── .env                   # Optional environment config
├── .htaccess              # Apache config (URL rewriting, etc.)
├── index.php              # Main entry point
├── App/
│   ├── functions.php      # Core logic for navigation and parsing
│   ├── Css/
│   │   └── style.scss     # Modify `$main-color` here to change theme
│   ├── Js/
│   │   └── script.js      # Client-side logic and interactions
│   └── Templates/
│       └── Doc.html       # Main HTML template
```

---

## 📁 Doc Folder and Files Structure

```
Doc/
├─ VERSION/
│ ├─ 00 - CATERGORY 1/
│ │ └─ 00 - PAGE 1.md
│ ├─ 01 - CATERGORY 2/
│ │ └─ 00 - PAGE 2.md
│ └─ ...
└─ ...
```

___

## 🎨 Customization

To change the main color of the website:

1. Open `App/Css/style.scss`
2. Modify the first variable (`$primary`)
3. Recompile using SASS:

```bash
sass style.scss style.css
```

---

## 📦 Requirements

- PHP 7.4+
- Web server
- [SASS](https://sass-lang.com/) (only needed if modifying `style.scss`)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share it as you like!

---

## 👤 Author

**Clément DELORD**  
🔗 [github.com/DELORD-C](https://github.com/DELORD-C)

---

## 🙌 Contributions

Suggestions, issues, or pull requests are very welcome ! Feel free to contribute to improve SOMADoc for everyone.