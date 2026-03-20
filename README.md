# UI Thing

A modern set of Nuxt components built with Reka UI & TailwindCSS

Inspired by [shadcn/ui](https://ui.shadcn.com/) & [shadcn-vue](https://www.shadcn-vue.com/).

![Cover Image](/public/cover.png)

## 📖 Documentation

[🔗 **You can read the full docs here**](https://uithing.com/)

## Agent Skill

This repo also ships an installable `uithing` agent skill for the open skills ecosystem.

Install it from this repo with:

```bash
npx skills add https://github.com/BayBreezy/ui-thing --skill uithing
```

The installable skill lives in [`skills/uithing`](./skills/uithing). The repo-local authoring copy used by Codex lives in [`.agents/skills/uithing`](./.agents/skills/uithing).

After updating the source skill, refresh the installable copy with:

```bash
npm run sync:skills
```

## 🚀 Quick Start

Initialize UI Thing in your Nuxt project with one command:

```bash
npx ui-thing@latest init
```

Start the dev server:

```bash
npm run dev
```

Add components on the fly:

```bash
npx ui-thing@latest add
```

## ⚡️ Commands

| Command     | Description                                      |
| ----------- | ------------------------------------------------ |
| `init`      | Install dependencies and configure your project. |
| `add`       | Add selected components to your project.         |
| `theme`     | Apply a theme to your project.                   |
| `prettier`  | Add Prettier config for consistent formatting.   |
| `shortcuts` | Add keyboard shortcut composables.               |

## 🎨 Credits

Huge thanks to the projects that inspired or power this library:

- [shadcn/ui](https://ui.shadcn.com/)
- [Reka UI](https://www.reka-ui.com/)
- [TailwindCSS for Nuxt](https://tailwindcss.nuxtjs.org/)
- [Nuxt](https://nuxt.com/)
- [Nuxt UI](https://ui.nuxt.com)

## 💸 Support Me

If this project helps you, consider supporting:

<a href="https://buymeacoffee.com/llehXIrI8g" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important" ></a>
