import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
  description:
    "List UI Thing changelog entries as a slim discovery index with dates, titles, categories, tags, and breaking-change flags, newest first.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "1h",
  async handler() {
    const entries = await queryCollection(useEvent(), "changelog")
      .order("date", "DESC")
      .select("slug", "date", "title", "category", "tags", "breaking", "summary")
      .all();

    return jsonResult(
      {
        totalCount: entries.length,
        categories: [...new Set(entries.map((entry) => entry.category))],
        entries,
      },
      true
    );
  },
});
