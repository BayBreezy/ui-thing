import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
  uri: "resource://uithing/documentation-pages",
  description: "Complete list of available UI Thing documentation pages",
  cache: "1h",
  async handler(uri: URL) {
    const event = useEvent();

    const pages = await queryCollection(event, "content").all();

    const result = pages.map((doc) => ({
      title: doc.title,
      description: doc.description,
      path: doc.path,
      id: doc.id,
      label: doc.label,
      links: doc.links,
    }));

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
});
