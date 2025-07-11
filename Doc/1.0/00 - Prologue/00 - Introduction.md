# 🌟 SOMADoc

**SOMADoc** is a lightweight CSS & JS framework designed to build **beautiful, responsive, and easy-to-maintain documentation websites** in seconds. Whether you're documenting an app, a library, or a product, SOMA gives you a ready-to-use structure and features out of the box.


---

## 🎯 Why SOMADoc ?

- ⚡ **Fast to set up**: Drop in the files and you're ready to go.
- 🎨 **Customizable**: Built with SCSS for easy theming and layout changes.
- 📱 **Responsive**: Looks great on mobile, tablet, and desktop.
- 🌙 **Light/Dark Mode**: One toggle to switch themes dynamically.
- 🧭 **Auto Page Navigation**: Auto-generates a table of contents from headings.
- 🔍 **Search-ready**: Includes a search input (hook up your logic).
- 🧩 **Modular structure**: Split your content by sections and easily navigate through them.

---

## 🛠️ How It Works

### 🧪 1. Include the Assets

CSS & JS

> `marked.js` is used to render Markdown directly in your HTML via `<md>` tags.

---

### 📦 2. Structure Your HTML

```html
<md>
# Welcome to SOMA Docs

## Installation
Steps to install...

## Usage
How to use...

</md>
```

> All your Markdown content goes inside the `<md>` tag. The framework will automatically render it and generate in-page navigation.

---

### 🌓 3. Theme Toggle

SOMA comes with a **dark mode switch** out of the box. Users can toggle between light and dark themes effortlessly.

## ✨ Notable Features

### 🧭 Auto-generated Page Nav

A dynamic sidebar is generated from your `<h2>` and `<h3>` titles, making navigation clear and efficient — especially for long docs.

### 📱 Mobile Navigation Drawer

A hamburger menu toggle (`#navToggle`) enables clean navigation on small screens. It slides in the sidebar and locks the page scroll when open.

### 🌀 zLoad Loader

SOMA comes bundled with an ultra-simple loading spinner utility:

```js
zLoad(
    state = true,        // Show or hide
    color = '#68b8fd',   // Spinner color
    scale = 1,           // Size multiplier
    opacity = 0.5        // Background opacity
);
```

> Demo available [here](https://delord-c.github.io/zLoad/)

---

## 📚 Ideal For

- Developer documentation
- API manuals
- Product onboarding
- Internal tools and README pages

---

## 🔗 Live Demo

> You can see a live example [here](https://codepen.io/Zulgard/pen/OPVexYJ)

---

## 📥 Get Started Now

1. Download the `style.css` and `script.js` files.
2. Create your HTML with the `<md>` tag.
3. Customize with your content and enjoy 🎉