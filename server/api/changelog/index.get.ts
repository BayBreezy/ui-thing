import { queryCollection } from "@nuxt/content/server";
import fuse from "fuse.js";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { search, category, tag, breaking, limit, offset } = await getValidatedQuery(
    event,
    z.object({
      search: z.coerce.string().trim().nullish(),
      category: z.enum(["feature", "update", "docs", "dx", "announcement"]).nullish(),
      tag: z.coerce.string().trim().nullish(),
      breaking: z.coerce.boolean().nullish(),
      limit: z.coerce.number().int().positive().nullish(),
      offset: z.coerce.number().int().nonnegative().nullish(),
    }).parse
  );

  let entries = await queryCollection(event, "changelog").order("date", "DESC").all();

  if (category) {
    entries = entries.filter((e) => e.category === category);
  }
  if (tag) {
    entries = entries.filter((e) => e.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  }
  if (breaking) {
    entries = entries.filter((e) => e.breaking);
  }
  if (search) {
    const fuseInstance = new fuse(entries, {
      keys: ["title", "summary", "tags"],
      threshold: 0.3,
    });
    entries = fuseInstance.search(search).map((r) => r.item);
  }

  const total = entries.length;
  const start = offset ?? 0;
  const end = limit ? start + limit : undefined;

  return {
    total,
    entries: entries.slice(start, end),
  };
});
