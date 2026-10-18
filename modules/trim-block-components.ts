import { defineNuxtModule } from "@nuxt/kit";

// Blocks are previewed through an iframe to `/block-renderer`, which loads them with
// `import.meta.glob`, so they don't need to be in Nuxt's component registry. Registering
// them puts every block into `components.d.ts` and the Nuxt Content component manifest
// (which in dev contains *every* registered component).
const BLOCK_DIR = "/components/content/Block/";

// Block components that are used directly as tags in markdown.
const KEEP = new Set(["BlockShowcase", "BlockDashboards4"]);

export default defineNuxtModule({
  meta: {
    name: "ui-thing:trim-block-components",
  },
  setup(_options, nuxt) {
    nuxt.hook("components:extend", (components) => {
      for (let i = components.length - 1; i >= 0; i--) {
        const component = components[i]!;
        if (!component.filePath.replaceAll("\\", "/").includes(BLOCK_DIR)) continue;
        if (KEEP.has(component.pascalName)) continue;
        components.splice(i, 1);
      }
    });
  },
});
