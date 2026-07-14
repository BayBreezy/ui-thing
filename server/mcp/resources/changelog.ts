import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
  name: "changelog",
  title: "UI Thing Changelog Index",
  uri: "resource://uithing/changelog",
  description:
    "Slim discovery index for UI Thing changelog entries with dates, titles, categories, tags, and breaking-change flags, newest first.",
  cache: "1h",
  async handler(uri: URL) {
    const entries = await queryCollection(useEvent(), "changelog")
      .order("date", "DESC")
      .select("slug", "date", "title", "category", "tags", "breaking", "summary")
      .all();

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: entries.length,
              categories: [...new Set(entries.map((entry) => entry.category))],
              entries,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
