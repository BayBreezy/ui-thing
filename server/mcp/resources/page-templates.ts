import { PAGE_TEMPLATE_INDEX } from "~~/server/mcp/utils/library";

export default defineMcpResource({
  name: "page-templates",
  title: "UI Thing Page Templates Index",
  uri: "resource://uithing/page-templates",
  description: "Compact page template index for common marketing, app, docs, and auth scaffolds.",
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: PAGE_TEMPLATE_INDEX.length,
              templates: PAGE_TEMPLATE_INDEX,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
