import { listBlockSummaries } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "List UI Thing blocks as a slim discovery index with exact names, identifiers, docs paths, categories, and dependency counts.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "1h",
  async handler() {
    const blocks = listBlockSummaries();

    return jsonResult(
      {
        totalCount: blocks.length,
        categories: [...new Set(blocks.map((block) => block.category))],
        blocks,
      },
      true
    );
  },
});
