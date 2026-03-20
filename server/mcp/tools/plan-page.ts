import { buildPagePlan } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Recommend blocks, components, section order, and an install plan for a page scaffold in a new Nuxt project.",
  inputSchema: {
    pageType: z
      .enum(["landing", "dashboard", "auth", "docs", "pricing", "about", "contact", "custom"])
      .describe("Page type to plan."),
    sections: z
      .string()
      .optional()
      .describe("Optional comma-separated sections. Best for custom pages."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: {
    maxAge: "15m",
    getKey: (args) => `plan-page-${args.pageType}-${args.sections || ""}`,
  },
  async handler({ pageType, sections }) {
    return jsonResult(buildPagePlan(pageType, sections), true);
  },
});
