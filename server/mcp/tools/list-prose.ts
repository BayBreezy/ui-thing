import { listProseSummaries } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "List UI Thing prose components as a slim discovery index with exact names, values, docs paths, categories, and dependency counts.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "1h",
  async handler() {
    const prose = listProseSummaries();

    return jsonResult(
      {
        totalCount: prose.length,
        categories: [...new Set(prose.map((entry) => entry.category))],
        prose,
      },
      true
    );
  },
});
