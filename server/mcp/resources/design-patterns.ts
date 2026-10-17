export default defineMcpResource({
  name: "design-patterns",
  title: "UI Thing Design Guide",
  uri: "resource://uithing/design-patterns",
  description:
    "How to make UI built with UI Thing look polished: composition order, tokens, theming, typography, spacing, icons, states, motion and common mistakes. Read before writing any UI.",
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/markdown",
          text: `# UI Thing Design Guide

Follow this in order. Most "generic AI UI" comes from skipping step 1 and hardcoding styles in step 3.

## 1. Compose from blocks first, components second

- Start every marketing page, auth screen and app shell from a **block** (\`plan-page\`, \`list-blocks\`). Blocks are already art-directed: spacing, hierarchy, responsive behavior and motion are tuned.
- Use **components** for the parts blocks do not cover: forms, tables, dialogs, anything wired to data.
- Never rebuild a primitive that exists (\`UiButton\`, \`UiCard\`, \`UiDialog\`, \`UiDropdownMenu\`...). Call \`search-components\` first.
- Pick **one block per section** and keep a consistent tone across the page (all centered, or all split). Mixing six unrelated hero/feature styles reads as a template collage.
- After copying a block, **replace every placeholder**: copy, links, images, the \`COMPANY_NAME\` constant. Shipping lorem ipsum is the fastest way to look unfinished.

## 2. Use semantic tokens, never raw colors

Colors come from CSS variables in \`app/assets/css/tailwind.css\`. Use the semantic utilities so light and dark mode and every theme keep working:

| Need | Use |
| --- | --- |
| Page / surface | \`bg-background\`, \`bg-card\`, \`bg-popover\`, \`bg-muted\` |
| Text | \`text-foreground\`, \`text-muted-foreground\` (secondary copy), \`text-primary\` (eyebrows, links) |
| Brand actions | \`bg-primary text-primary-foreground\` (or \`<UiButton>\`) |
| Subtle emphasis | \`bg-accent\`, \`bg-secondary\`, \`bg-primary/10\` tinted chips |
| Borders and inputs | \`border\` (default border token), \`border-input\`, \`ring-ring\` |
| Destructive | \`text-destructive\`, \`bg-destructive\` |

Do not write \`bg-white\`, \`text-gray-500\`, \`border-slate-200\` or hex colors in UI. They break dark mode and theming.

## 3. Theming and dark mode

- Pick the brand color with \`ui-thing@latest theme\` (Zinc, Slate, Stone, Gray, Neutral, Red, Rose, Orange, Green, Blue, Violet...). It rewrites the token block in \`tailwind.css\`. Run it once, early.
- Change corner roundness through the \`--radius\` token in the theme block, not per-component classes, so every surface stays consistent.
- Dark mode is the \`.dark\` class set by \`@nuxtjs/color-mode\` (components read \`$colorMode\`). Provide a toggle (\`useColorMode()\`) and test every screen in both modes.

## 4. Typography and spacing rhythm

Blocks follow a consistent scale; match it:

- Section: \`<UiContainer class="py-16 lg:py-24">\`. \`UiContainer\` handles max width and gutters; do not hand-roll \`max-w-7xl mx-auto\`.
- Eyebrow: \`text-primary font-semibold\`, then H2 \`text-3xl font-semibold lg:text-4xl\`, then lead \`text-muted-foreground text-lg\`.
- Cap line length with \`max-w-2xl\`/\`text-balance\` on headings and lead paragraphs.
- Grids use \`gap-6\` to \`gap-8\`; stack related items with \`space-y-2\` to \`space-y-4\`. Use one spacing step between siblings, a larger step between groups.
- Make mobile work first: single column, then \`md:\` / \`lg:\` for multi-column. Check 375px.

## 5. Buttons, icons, imagery

- \`UiButton\` variants: \`default\`, \`secondary\`, \`outline\`, \`ghost\`, \`link\`, \`destructive\`, \`gradient\`. Sizes: \`xs\`, \`sm\`, default, \`lg\`, \`icon\`, \`icon-sm\`, \`icon-lg\`. Use exactly **one** \`default\` button per view as the primary action; secondary actions are \`outline\` or \`ghost\`.
- Icons: \`<Icon name="lucide:check" class="size-4" />\` (Nuxt Icon). Use **lucide** for UI icons, \`logos:*\` for brand logos. Do not mix icon families in one view.
- Icon-only buttons need an accessible name (\`aria-label\`) and usually a \`UiTooltip\`.
- Avatars use \`UiAvatar\`; give images explicit aspect ratios (\`UiAspectRatio\`) to avoid layout shift.

## 6. Design every state

A screen is not done until it handles:

- **Loading**: \`UiSkeleton\` shaped like the final content, or the \`loading\` prop on \`UiButton\`.
- **Empty**: \`UiEmpty\` or the EmptyState blocks, with a clear next action.
- **Error**: \`UiAlert variant="destructive"\` or field-level messages from the \`UiVee*\` inputs.
- **Success / feedback**: \`useSonner("Saved")\` (render \`<UiSonner />\` once in \`app.vue\`).
- **Destructive**: confirm with \`UiAlertDialog\`.
- **Focus and keyboard**: components already ship Reka UI focus handling. Do not strip it or replace interactive components with \`div\` + \`@click\`.

## 7. Motion

- Blocks use \`motion-v\` (\`<Motion>\`, \`while-in-view\`). Keep it subtle: fade/translate on entry, 200-500ms, stagger children.
- Animate at most one idea per section. Respect reduced motion; do not animate layout-critical content on every scroll tick.
- Reuse the block's \`variants\` pattern instead of inventing new animation setups.

## 8. Forms

- Use \`UiVee*\` wrappers inside a \`<form @submit="onSubmit">\` with \`useForm({ validationSchema })\`. Every field needs a \`label\`; add \`hint\` for format help.
- Group long forms into \`UiCard\`s or sections with headings; keep one column on mobile.
- Call \`plan-form\` for field/component mapping and a wiring example.

## 9. Common mistakes

1. Hardcoding colors instead of tokens.
2. Rebuilding Button/Card/Dialog from scratch.
3. Leaving block placeholder text, \`#\` links or unused sections.
4. Forgetting the empty, loading and error states.
5. Importing blocks that need \`motion-v/nuxt\` or \`@nuxt/icon\` without registering them (\`get-install-plan\` lists these).
6. Several primary buttons per view, or mixing icon sets.
7. Rendering ApexCharts on the server; use the \`.client\` variants or \`<ClientOnly>\`.
8. Editing generated component internals when a prop or class override would do. The files are yours, but prefer \`class\` overrides for small changes.`,
        },
      ],
    };
  },
});
