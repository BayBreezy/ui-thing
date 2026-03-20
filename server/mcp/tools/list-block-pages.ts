import { listDocumentationPages } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description: "List block documentation pages only, using exact block docs paths under /blocks/.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "1h",
  async handler() {
    const pages = (await listDocumentationPages(useEvent())).filter((page) =>
      page.path.startsWith("/blocks/")
    );

    return jsonResult(
      {
        totalCount: pages.length,
        pages,
      },
      true
    );
  },
});
