import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**",
      schema: z.object({
        icon: z.string().optional(),
        label: z.string().optional(),
        links: z
          .array(
            z.object({
              title: z.string(),
              href: z.string(),
              icon: z.string().optional(),
            })
          )
          .optional(),
      }),
    }),
  },
});
