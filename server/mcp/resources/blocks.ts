import { listBlockSummaries } from "~~/server/mcp/utils/library";

export default defineMcpResource({
  name: "blocks",
  title: "UI Thing Blocks Index",
  uri: "resource://uithing/blocks",
  description:
    "Slim discovery index for UI Thing blocks with exact names, identifiers, docs paths, categories, and dependency counts.",
  cache: "1h",
  async handler(uri: URL) {
    const blocks = listBlockSummaries();

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: blocks.length,
              categories: [...new Set(blocks.map((block) => block.category))],
              blocks,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
