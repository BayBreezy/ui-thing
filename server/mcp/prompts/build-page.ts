import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to scaffold a page with UI Thing blocks and components.",
  inputSchema: {
    pageType: z
      .enum(["landing", "dashboard", "auth", "docs", "pricing", "about", "contact", "custom"])
      .describe("Page type to build."),
    sections: z
      .string()
      .optional()
      .describe("Optional comma-separated sections, especially useful for custom pages."),
  },
  handler: async ({ pageType, sections }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Build a ${pageType} page with UI Thing.${sections ? ` Requested sections: ${sections}.` : ""}

Preferred workflow:
1. Call plan-page first.
2. Use resolve-library-item if any block or component names are fuzzy.
3. Call get-install-plan for the final selection.
4. Call get-block and get-component for exact implementation details.

Return:
- installation commands first
- section order
- then the final Vue/Nuxt implementation`,
          },
        },
      ],
    };
  },
});
