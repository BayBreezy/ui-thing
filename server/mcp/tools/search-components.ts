import Fuse from "fuse.js";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Searches through all UI components, blocks, and prose components using fuzzy matching on names, descriptions, and tags. Returns relevant matches ranked by relevance score to help discover the right component for a specific use case. More flexible than list tools when you're not sure of the exact component name.",
  inputSchema: {
    query: z
      .string()
      .min(1)
      .describe(
        "Search query to find components, blocks, or prose elements (e.g., 'date picker', 'form', 'hero section', 'code block', 'chart')"
      ),
    type: z
      .enum(["all", "components", "blocks", "prose"])
      .optional()
      .default("all")
      .describe("Filter results by type: all, components, blocks, or prose"),
    limit: z
      .number()
      .min(1)
      .max(50)
      .optional()
      .default(10)
      .describe("Maximum number of results to return"),
  },
  annotations: {
    readOnlyHint: true, // Safe read-only search
    destructiveHint: false, // No modifications
    idempotentHint: true, // Same query = same results
    openWorldHint: false, // Searches local data
  },
  cache: {
    maxAge: "15m",
    getKey: (args) => `search-${args.query}-${args.type}-${args.limit}`,
  },
  handler: async ({ query, type = "all", limit = 10 }) => {
    try {
      const results: any[] = [];

      // Search components using Fuse.js
      if (type === "all" || type === "components") {
        const componentFuse = new Fuse(comp, {
          keys: ["name", "value", "docsPath"],
          threshold: 0.3,
          includeScore: true,
        });
        const componentResults = componentFuse.search(query);
        componentResults.forEach((result) => {
          results.push({
            type: "component" as const,
            name: result.item.name,
            filePath: result.item.docsPath,
            relevance: result.score ? 1 - result.score : 1, // Invert score (lower is better in Fuse)
          });
        });
      }

      // Search blocks using Fuse.js
      if (type === "all" || type === "blocks") {
        const blockFuse = new Fuse(blockExamples, {
          keys: ["name", "fileName", "path"],
          threshold: 0.3,
          includeScore: true,
        });
        const blockResults = blockFuse.search(query);
        blockResults.forEach((result) => {
          results.push({
            type: "block" as const,
            name: result.item.name,
            fileName: result.item.fileName,
            filePath: result.item.path,
            relevance: result.score ? 1 - result.score : 1,
          });
        });
      }

      // Search prose components using Fuse.js
      if (type === "all" || type === "prose") {
        const proseFuse = new Fuse(prose, {
          keys: ["name", "value", "description"],
          threshold: 0.3,
          includeScore: true,
        });
        const proseResults = proseFuse.search(query);
        proseResults.forEach((result) => {
          results.push({
            type: "prose" as const,
            name: result.item.name,
            description: result.item.description,
            fileName: result.item.fileName,
            filePath: result.item.filePath,
            relevance: result.score ? 1 - result.score : 1,
          });
        });
      }

      // Sort by relevance (highest first) and limit results
      const sortedResults = results.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
      const limitedResults = sortedResults.slice(0, limit);

      return jsonResult(
        {
          results: limitedResults,
          totalFound: results.length,
          query,
        },
        true
      );
    } catch (error: any) {
      return errorResult(`Error searching components: ${error.message || "Unknown error"}`);
    }
  },
});
