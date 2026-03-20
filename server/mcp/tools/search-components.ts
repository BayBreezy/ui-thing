import { searchLibrary } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Fuzzy search across UI Thing components, blocks, and prose components. Use search-documentation-pages for docs content search.",
  inputSchema: {
    query: z
      .string()
      .min(1)
      .describe("Search query, such as 'date picker', 'hero', or 'code tabs'."),
    type: z
      .enum(["all", "component", "block", "prose"])
      .optional()
      .default("all")
      .describe("Optional library kind filter."),
    limit: z.number().min(1).max(50).optional().default(10).describe("Maximum results to return."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: {
    maxAge: "15m",
    getKey: (args) => `search-components-${args.query}-${args.type}-${args.limit}`,
  },
  async handler({ query, type = "all", limit = 10 }) {
    const results = searchLibrary(query, type, limit);

    return jsonResult(
      {
        query,
        totalFound: results.length,
        results,
      },
      true
    );
  },
});
