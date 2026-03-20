import { listComponentSummaries } from "~~/server/mcp/utils/library";

export default defineMcpResource({
  name: "components",
  title: "UI Thing Components Index",
  uri: "resource://uithing/components",
  description:
    "Slim discovery index for UI Thing components with exact names, install values, docs paths, categories, and dependency counts.",
  cache: "1h",
  async handler(uri: URL) {
    const components = listComponentSummaries();

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: components.length,
              categories: [...new Set(components.map((component) => component.category))],
              components,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
