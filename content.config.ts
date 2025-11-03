import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: {
        include: "**/*",
      },
      schema: z.object({
        icon: z.string().optional(),
        label: z.string().optional(),
        layout: z.string().optional(),
        navigation: z
          .object({
            title: z.string().optional(),
            description: z.string().optional(),
            icon: z.string().optional(),
            label: z.string().optional(),
            target: z.string().optional(),
          })
          .optional(),
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
