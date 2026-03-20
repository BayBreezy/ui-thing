import { getDocumentationContext } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Fetch the exact markdown content for a UI Thing documentation page by its absolute docs path.",
  inputSchema: {
    path: z
      .string()
      .min(1)
      .regex(/^\//, "Path must start with /")
      .describe("Absolute documentation path, such as '/components/button' or '/blocks/hero'."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "30m",
  async handler({ path }) {
    const documentation = await getDocumentationContext(useEvent(), path);

    if (!documentation) {
      return errorResult(
        `Documentation page '${path}' not found. Use list-documentation-pages or search-documentation-pages first.`
      );
    }

    return {
      content: [
        {
          type: "text" as const,
          text: documentation.markdown,
        },
      ],
      structuredContent: {
        path: documentation.page.path,
        title: documentation.page.title,
        description: documentation.page.description,
        section: documentation.page.section,
        content: documentation.markdown,
      },
    };
  },
});
