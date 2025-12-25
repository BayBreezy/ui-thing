import { z } from "zod";

export default defineMcpTool({
  description:
    "Retrieves complete details for a specific UI block including full Vue SFC source code, all required components, dependencies (composables, plugins, utils), installation commands, and usage examples. Blocks are pre-built page sections like headers, heroes, features, testimonials, pricing, CTAs, footers, and more. Returns everything needed to implement the block without hallucination.",
  inputSchema: {
    blockName: z
      .string()
      .min(1)
      .describe(
        "The exact name or value of the block to fetch (e.g., 'Header 1', 'hero-section', 'feature-grid'). Must match a valid block name from the list-blocks tool."
      ),
  },
  cache: "30m", // Cache for 30 minutes
  handler: async ({ blockName }) => {
    try {
      // Try to find by name, value, or fileName
      const block = blockExamples.find(
        (b) =>
          b.name.toLowerCase() === blockName.toLowerCase() ||
          b.fileName.toLowerCase().includes(blockName.toLowerCase())
      );

      if (!block) {
        return errorResult(
          `Block '${blockName}' not found. Use list-blocks tool to see available block names.`
        );
      }

      return jsonResult(block, true); // Pretty print
    } catch (error: any) {
      return errorResult(
        `Error fetching block "${blockName}": ${error.message || "Unknown error"}`
      );
    }
  },
});
