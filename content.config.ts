import { defineCollection, defineContentConfig } from "@nuxt/content";
import { useNuxt } from "@nuxt/kit";
import { joinURL } from "ufo";
import { z } from "zod";

const { options } = useNuxt();
const changelogCwd = joinURL(options.rootDir, "data/changelog");

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
      // Deliberately sourced from outside `content/` — the docd layer's `docs`
      // collection globs `content/**` with no extension filter, so files placed
      // under `content/` get swept up as bogus nav pages too.
      source: { cwd: changelogCwd, include: "entries/**/*.json" },
      schema: changelogSchema,
    }),
  },
});
