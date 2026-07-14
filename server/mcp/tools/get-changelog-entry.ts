import { queryCollection } from "@nuxt/content/server";
import { z } from "zod";

export default defineMcpTool({
  description: "Get the full body, links, and metadata for a single UI Thing changelog entry.",
  inputSchema: {
    slug: z
      .string()
      .min(1)
      .describe(
        "Exact changelog entry slug, such as '2026-07-13-ai-chat-components'. Use list-changelog first to find slugs."
      ),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "30m",
  async handler({ slug }) {
    const entry = await queryCollection(useEvent(), "changelog").where("slug", "=", slug).first();

    if (!entry) {
      return errorResult(`Changelog entry '${slug}' not found. Use list-changelog first.`);
    }

    return jsonResult(entry, true);
  },
});
