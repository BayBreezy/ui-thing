import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
  description:
    "Lists all documentation pages from the entire Nuxt Content collection. Returns comprehensive metadata for getting started guides, component docs, block docs, form guides, chart examples, prose components, goodies, and more. Each entry includes title, description, path, ID, label, and navigation links. Use this as the primary discovery tool to find any documentation, then use get-documentation-page to fetch the full markdown content for specific pages.",

  annotations: {
    readOnlyHint: true, // Safe read-only query
    destructiveHint: false, // No modifications
    idempotentHint: true, // Consistent results
    openWorldHint: false, // Local content collection only
  },
  cache: "1h", // Cache for 1 hour
  async handler() {
    const event = useEvent();

    const pages = await queryCollection(event, "content").all();

    // Extract unique sections from paths
    const sections = [
      ...new Set(
        pages
          .map((doc) => {
            const match = doc.path?.match(/^\/(\d+\.)([^/]+)/);
            return match ? match[2] : null;
          })
          .filter(Boolean)
      ),
    ].sort();

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
        sections,
      },
      true
    ); // Pretty print
  },
});
