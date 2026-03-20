import { listDocumentationPages } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "List UI Thing documentation pages with title, description, section, and exact path so a follow-up get-documentation-page call can be exact.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "1h",
  async handler() {
    const pages = await listDocumentationPages(useEvent());

    return jsonResult(
      {
        totalCount: pages.length,
        sections: [...new Set(pages.map((page) => page.section))],
        pages,
      },
      true
    );
  },
});
