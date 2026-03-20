import { listProseSummaries } from "~~/server/mcp/utils/library";

export default defineMcpResource({
  name: "prose",
  title: "UI Thing Prose Index",
  uri: "resource://uithing/prose",
  description:
    "Slim discovery index for UI Thing prose components with exact names, values, docs paths, categories, and dependency counts.",
  cache: "1h",
  async handler(uri: URL) {
    const prose = listProseSummaries();

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: prose.length,
              categories: [...new Set(prose.map((entry) => entry.category))],
              prose,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
