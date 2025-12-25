import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
  description:
    "Lists all block documentation pages from the Nuxt Content collection. Returns metadata for each block's documentation including title, description, path, ID, label, and navigation links. Use this to discover available block documentation, then use get-documentation-page to fetch the full markdown content for specific blocks.",

  annotations: {
    readOnlyHint: true, // Read-only query
    destructiveHint: false, // No modifications
    idempotentHint: true, // Same results each time
    openWorldHint: false, // Queries local content collection
  },
  cache: "1h", // Cache for 1 hour
  async handler() {
    const event = useEvent();

    const pages = await queryCollection(event, "content")
      .where("path", "LIKE", "%/blocks/%")
      .where("extension", "=", "md")
      .all();

    return jsonResult(
      {
        pages: pages.map((doc) => ({
          title: doc.title,
          description: doc.description,
          path: doc.path,
          id: doc.id,
          label: doc.label,
          links: doc.links,
        })),
        totalCount: pages.length,
      },
      true
    ); // Pretty print
  },
});
