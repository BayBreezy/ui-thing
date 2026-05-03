import { z } from "zod";
import { resolveLibraryItem } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "Resolve a fuzzy component or block request to the exact UI Thing library item before calling get-component or get-block.",
  inputSchema: {
    query: z.string().min(1).describe("User-facing component or block request."),
    type: z
      .enum(["all", "component", "block"])
      .optional()
      .default("all")
      .describe("Optional kind constraint."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: {
    maxAge: "15m",
    getKey: (args) => `resolve-library-${args.type}-${args.query}`,
  },
  async handler({ query, type = "all" }) {
    return jsonResult(resolveLibraryItem(query, type), true);
  },
});
