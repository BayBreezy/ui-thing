import proseComponents from "~~/server/utils/prose";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Validates dependencies and generates installation instructions for components, blocks, or prose elements. Returns CLI commands to install all required UI Thing components, npm packages, composables, plugins, and utilities. Use this before implementing any component/block to ensure all dependencies are properly installed and to avoid missing dependency errors.",
  inputSchema: {
    items: z
      .array(z.string())
      .min(1)
      .describe(
        "Array of component/block/prose names to validate (e.g., ['button', 'accordion', 'Header 1', 'callout'])"
      ),
  },
  annotations: {
    readOnlyHint: true, // Just validates and returns commands
    destructiveHint: false, // Doesn't execute anything
    idempotentHint: true, // Same items = same validation
    openWorldHint: false, // Local validation only
  },
  cache: {
    maxAge: "10m",
    getKey: (args) => `validate-${args.items.sort().join(",")}`,
  },
  handler: async ({ items }) => {
    try {
      const uiThingComponents = new Set<string>();
      const npmPackages = new Set<string>();
      const composables = new Set<string>();
      const plugins = new Set<string>();

      // Process each item
      for (const item of items) {
        const searchTerm = item.toLowerCase();

        // Check components
        const component = comp.find(
          (c) => c.name.toLowerCase() === searchTerm || c.value.toLowerCase() === searchTerm
        );
        if (component) {
          if (component.deps) {
            component.deps.forEach((dep) => {
              if (dep.startsWith("npm:")) {
                npmPackages.add(dep.replace("npm:", ""));
              } else {
                uiThingComponents.add(dep);
              }
            });
          }
          if (component.composables) {
            component.composables.forEach((c: any) => {
              if (c.name) composables.add(c.name);
            });
          }
          if (component.plugins) {
            component.plugins.forEach((p: any) => {
              if (p.fileName) plugins.add(p.fileName);
            });
          }
        }

        // Check blocks
        const block = blockExamples.find(
          (b) => b.name.toLowerCase() === searchTerm || b.fileName.toLowerCase() === searchTerm
        );
        if (block) {
          if (block.components) {
            block.components.forEach((comp) => uiThingComponents.add(comp));
          }
        }

        // Check prose
        const prose = proseComponents.find(
          (p) =>
            p.name.toLowerCase() === searchTerm ||
            p.value.toLowerCase() === searchTerm ||
            p.fileName.toLowerCase() === searchTerm
        );
        if (prose) {
          if (prose.components) {
            prose.components.forEach((comp) => uiThingComponents.add(comp));
          }
          if (prose.deps) {
            prose.deps.forEach((dep) => {
              if (dep.startsWith("npm:")) {
                npmPackages.add(dep.replace("npm:", ""));
              }
            });
          }
          if (prose.composables) {
            prose.composables.forEach((c: any) => {
              if (c.name) composables.add(c.name);
            });
          }
          if (prose.plugins) {
            prose.plugins.forEach((p: any) => {
              if (p.fileName) plugins.add(p.fileName);
            });
          }
        }
      }

      // Generate installation steps
      const installationSteps: string[] = [];
      const uiThingCommandArray = Array.from(uiThingComponents);
      const npmPackageArray = Array.from(npmPackages);

      if (npmPackageArray.length > 0) {
        installationSteps.push(`Install npm packages: npm install ${npmPackageArray.join(" ")}`);
      }

      if (uiThingCommandArray.length > 0) {
        installationSteps.push(
          `Install UI Thing components: npx ui-thing@latest add ${uiThingCommandArray.join(" ")}`
        );
      }

      if (composables.size > 0) {
        installationSteps.push(
          `Required composables (auto-imported): ${Array.from(composables).join(", ")}`
        );
      }

      if (plugins.size > 0) {
        installationSteps.push(
          `Required plugins (auto-imported): ${Array.from(plugins).join(", ")}`
        );
      }

      return jsonResult(
        {
          uiThingCommands: uiThingCommandArray,
          npmPackages: npmPackageArray,
          composables: Array.from(composables),
          plugins: Array.from(plugins),
          totalDependencies:
            uiThingCommandArray.length + npmPackageArray.length + composables.size + plugins.size,
          installationSteps,
        },
        true
      );
    } catch (error: any) {
      return errorResult(`Error validating dependencies: ${error.message || "Unknown error"}`);
    }
  },
});
