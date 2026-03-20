import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
  name: "examples",
  title: "UI Thing Examples Index",
  uri: "resource://uithing/examples",
  description: "Slim discovery index for the example pages shipped in the UI Thing docs site.",
  cache: "1h",
  async handler(uri: URL) {
    const examples = await queryCollection(useEvent(), "content")
      .where("extension", "=", "md")
      .where("path", "LIKE", "%/examples/%")
      .select("title", "description", "path")
      .all();

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              total: examples.length,
              examples: examples.map((example: any) => ({
                title: example.title,
                description: example.description ?? null,
                path: example.path,
                section: "examples",
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
