import { listDocumentationPages } from "~~/server/mcp/utils/library";

export default defineMcpResource({
  name: "documentation-pages",
  title: "UI Thing Documentation Index",
  uri: "resource://uithing/documentation-pages",
  description:
    "Slim discovery index for UI Thing documentation pages with exact paths, titles, descriptions, and sections.",
  cache: "1h",
  async handler(uri: URL) {
    const pages = await listDocumentationPages(useEvent());

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: pages.length,
              sections: [...new Set(pages.map((page) => page.section))],
              pages,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
