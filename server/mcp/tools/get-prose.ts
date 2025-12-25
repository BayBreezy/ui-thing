import proseComponents from "~~/server/utils/prose";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Retrieves complete details for a specific prose/documentation component including full Vue SFC source code, required composables, plugins, dependencies, and usage documentation. Prose components are specialized for content display like code blocks, callouts, diagrams, tabs, and more. Returns everything needed to implement the prose component without hallucination.",
  inputSchema: {
    componentName: z
      .string()
      .min(1)
      .describe(
        "The exact name or value of the prose component to fetch (e.g., 'code', 'callout', 'mermaid', 'prose-table'). Must match a valid prose component from the list-prose tool."
      ),
  },
  annotations: {
    readOnlyHint: true, // Safe, no side effects
    destructiveHint: false, // Never modifies data
    idempotentHint: true, // Same input = same output
    openWorldHint: false, // Uses local data
  },
  cache: "30m", // Cache for 30 minutes
  handler: async ({ componentName }) => {
    try {
      // Try to find by name or value
      const prose = proseComponents.find(
        (p) =>
          p.name.toLowerCase() === componentName.toLowerCase() ||
          p.value.toLowerCase() === componentName.toLowerCase() ||
          p.fileName.toLowerCase() === componentName.toLowerCase()
      );

      if (!prose) {
        return errorResult(
          `Prose component '${componentName}' not found. Use list-prose tool to see available prose component names.`
        );
      }

      return jsonResult(prose, true); // Pretty print
    } catch (error: any) {
      return errorResult(
        `Error fetching prose component "${componentName}": ${error.message || "Unknown error"}`
      );
    }
  },
});
