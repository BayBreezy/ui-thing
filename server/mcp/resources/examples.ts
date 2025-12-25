import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
  name: "examples",
  title: "UI Thing Example Applications",
  uri: "resource://uithing/examples",
  description: `Real-world example applications built with UI Thing components and blocks.

🎯 PURPOSE:
Showcases complete, production-ready applications that demonstrate best practices
and real-world usage of UI Thing components.

📱 AVAILABLE EXAMPLES:
- Dashboard: Full-featured admin dashboard
- Cards Showcase: Various card layouts and patterns
- Schema Visualizer: Interactive database schema viewer
- (More examples available in the examples collection)

💡 VALUE FOR AI:
- See complete implementations
- Understand component composition
- Learn best practices
- Get inspiration for layouts
- Reference code patterns`,
  _meta: {
    framework: "Vue 3 + Nuxt 3",
    category: "examples",
  },
  cache: "1h",
  async handler(uri: URL) {
    const event = useEvent();
    const examples = await queryCollection(event, "content")
      .where("path", "LIKE", "%/examples/%")
      .all();

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              meta: {
                total: examples.length,
                lastUpdated: new Date().toISOString(),
                viewOnline: "https://uithing.com/examples",
              },
              examples: examples.map((ex) => ({
                title: ex.title,
                description: ex.description,
                path: ex.path,
                slug: ex.path?.split("/").pop(),
                viewUrl: `https://uithing.com${ex.path}`,
              })),
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
