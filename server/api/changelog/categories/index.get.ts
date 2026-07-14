import { queryCollection } from "@nuxt/content/server";

export default defineCachedEventHandler(
  async (event) => {
    const entries = await queryCollection(event, "changelog").select("category").all();
    const counts = entries.reduce(
      (acc, { category }) => {
        acc[category] = (acc[category] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  },
  { maxAge: 60 * 60 * 24 * 5 }
);
