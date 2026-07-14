import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const changelogSchema = z.object({
  slug: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected an ISO date (YYYY-MM-DD)"),
  title: z.string(),
  category: z.enum(["feature", "update", "docs", "dx", "announcement"]),
  tags: z.array(z.string()).default([]),
  summary: z.string(),
  body: z.string(),
  breaking: z.boolean().default(false),
  links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
});

export default defineContentConfig({
  collections: {
    changelog: defineCollection({
      type: "data",
      source: "changelog/entries/**/*.json",
      schema: changelogSchema,
    }),
  },
});
