import { z } from "zod";

export default defineMcpTool({
  description:
    "Retrieves complete component details including full source code, dependencies (composables, plugins, utils), TypeScript types, installation instructions, usage examples, and comprehensive markdown documentation. Returns everything needed to implement the component in a project without hallucination.",
  inputSchema: {
    componentName: z
      .string()
      .min(1)
      .describe(
        "The exact name of the UI component to fetch (e.g., 'button', 'accordion', 'datepicker'). Must match a valid component name from the components list."
      ),
  },
  annotations: {
    readOnlyHint: true, // Safe to call - no side effects
    destructiveHint: false, // Never modifies data
    idempotentHint: true, // Same input = same output
    openWorldHint: false, // No external API calls, uses local data
  },
  cache: "30m", // Cache component details for 30 minutes
  handler: async ({ componentName }) => {
    try {
      // Make fetch call to the component API endpoint
      const response = await $fetch(`/api/components/${componentName}`);
      const page = await queryCollection(useEvent(), "content")
        .where("path", "LIKE", `%${response.docsPath}`)
        .where("extension", "=", "md")
        .select("id", "title", "description", "path", "label", "links")
        .first();

      if (!page) {
        return errorResult(
          `Component '${componentName}' not found in documentation. Use list-components tool to see available component names.`
        );
      }

      const documentation = await $fetch<string>(`/api/md${page.path}`);

      // Return structured data with full component details
      return jsonResult(
        {
          componentName,
          component: response,
          success: true,
          title: page.title,
          description: page.description,
          documentation,
          documentationUrl: `https://uithing.com${page.path}`,
        },
        true
      ); // Pretty print JSON
    } catch (error: any) {
      return errorResult(
        `Error fetching component "${componentName}": ${error.message || "Unknown error"}. Ensure the component name is valid by checking list-components first.`
      );
    }
  },
});
