# Third-Party Registries

`ui-thing add` installs components from any shadcn-style registry (the `registry-item.json` format shared by shadcn/ui and shadcn-vue). That means animated components from sites like [Vue Bits](https://vue-bits.dev) and [NXUI](https://nxui.geoql.in) can be added with one command instead of being converted by hand.

## Contents

- Commands
- Choose the registry explicitly
- What the CLI does
- Review checklist (always do this)
- Updating and removing

---

## Commands

```bash
npx ui-thing@latest registry list                    # configured registries (@vue-bits and @nxui are built in)
npx ui-thing@latest registry list @nxui              # every item in one registry
npx ui-thing@latest registry search glass            # search all configured registries
npx ui-thing@latest registry search holo @vue-bits

npx ui-thing@latest add @vue-bits/HoloMosaic --yes
npx ui-thing@latest add https://nxui.geoql.in/r/fluid-glass.json --yes

npx ui-thing@latest registry add-namespace @acme https://acme.dev/r/{name}.json
```

Namespaces are saved under `registries` in `ui-thing.config.ts` (a URL template with `{name}`, or `{ url, headers, params }` with `${ENV_VAR}` expansion for private registries).

Without `--yes`, `add` lists the files and packages and asks for confirmation. That prompt exists because registry items are remote code: **read the list**.

---

## Choose the registry explicitly

When the user asks for "a glass effect" or "an animated background", search first (`registry search`) and tell the user which registry the item comes from. If several registries could match and the user did not name one, ask. Never silently install from a registry the user did not choose. If the user already named a registry or URL, use it.

---

## What the CLI does

- Fetches and validates the item and its `registryDependencies` (other registry items; plain names resolve to UI Thing components).
- Maps shadcn-style paths onto the project: `components/ui/<folder>/...` goes to the configured components folder (for example `app/components/Ui/fluid-glass/`), sub-folders are kept. Items without a `target` are placed by file type.
- Installs the item's npm `dependencies` and `devDependencies`.
- Merges `css`, `cssVars` and `envVars` into the Tailwind CSS file and `.env` without duplicating or overwriting.
- Creates a `cn` helper at `<srcDir>/lib/utils.ts` (`clsx` + `tailwind-merge`) when an item imports `cn` from `~/lib/utils` and none exists.
- Refuses to write outside the project.
- Records everything in `ui-thing.lock.json`.

It does **not** rewrite the imports inside the downloaded files.

---

## Review checklist (always do this)

After installing, read the added files and the lockfile entry, then check:

1. **Component name.** Nuxt derives the tag from the file path. Run `npx nuxi prepare` and check `.nuxt/components.d.ts` for the exact name before using it. Do not guess.
2. **Imports.** Items written for shadcn-vue import `@/components/ui/button` and similar. UI Thing projects use auto-imported `Ui*` components (`<UiButton>`), so rewrite those imports and tags, or prefer registries that are plain Vue (Vue Bits, NXUI) and need nothing from the UI library. Check that `~/lib/utils` and any other imported paths exist.
3. **Server-side rendering.** Canvas, WebGL, `window`, `document` and `requestAnimationFrame` break SSR. Wrap the component in `<ClientOnly>` or rename it to `Name.client.vue`. See [rules/states-and-accessibility.md](./rules/states-and-accessibility.md).
4. **Styling.** Replace raw colors in the item with semantic tokens where it should follow the theme. Plain `<style>` blocks (Vue Bits) are fine, but check dark mode. Make sure Tailwind v4 picks up the classes (the files live inside the project, so it does).
5. **Helper `.ts` files and the barrel.** Nuxt scans `.ts` files in the components folder as components too. A registry item's `index.ts` barrel (`export { default as X } from "./X.vue"`) collides with `X.vue` and logs `NUXT_B3011 Two component files resolving to the same name`. If nothing imports the barrel (`grep` for it), delete it. Other helper `.ts` files only register harmless extra component names; if they bother you, move them out of the components folder and update the relative imports.
6. **Dependencies.** Confirm the packages in the plan are in `package.json` and installed. Run the project's build or type check.
7. **Props and usage.** Read the component's props from its source or the registry's docs page. Do not invent props.
8. **Performance and accessibility.** Heavy animated or WebGL backgrounds should be used sparingly (one per page), respect `prefers-reduced-motion`, and never cover content that needs to be readable or focusable.
9. **Placeholder content.** Replace demo text, images and links.

---

## Updating and removing

- `ui-thing update <name>` re-fetches a registry item from the source in `ui-thing.lock.json` and overwrites the files (local edits are lost; commit first).
- `ui-thing remove <name>` deletes only the files recorded for that item. Shared files such as the generated `cn` helper stay.
- `ui-thing list --installed` shows registry items alongside UI Thing components.
