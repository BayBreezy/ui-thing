import { listComponentSummaries } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "List UI Thing components as a slim discovery index with exact names, install values, docs paths, categories, and dependency counts.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "1h",
  async handler() {
    const components = listComponentSummaries();

    return jsonResult(
      {
        totalCount: components.length,
        categories: [...new Set(components.map((component) => component.category))],
        components,
      },
      true
    );
  },
});
