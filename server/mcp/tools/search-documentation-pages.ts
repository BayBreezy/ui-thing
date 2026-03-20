import { searchDocumentationPages } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description: "Fuzzy search UI Thing documentation pages by title, description, section, or path.",
  inputSchema: {
    query: z.string().min(1).describe("Documentation search query."),
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
    getKey: (args) => `search-docs-${args.query}-${args.limit}`,
  },
  async handler({ query, limit = 10 }) {
    const results = await searchDocumentationPages(useEvent(), query, limit);

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
