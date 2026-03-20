import { resolveLibraryItem } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Resolve a fuzzy component, block, or prose request to the exact UI Thing library item before calling get-component, get-block, or get-prose.",
  inputSchema: {
    query: z.string().min(1).describe("User-facing component, block, or prose request."),
    type: z
      .enum(["all", "component", "block", "prose"])
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
