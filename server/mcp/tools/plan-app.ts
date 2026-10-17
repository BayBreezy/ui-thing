import { z } from "zod";
import { buildAppPlan } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "Plan a complete multi-page app: route map, layouts, page types with block and component candidates, shared components and one combined install plan. Use before plan-page when the user wants a whole product, not a single screen.",
  inputSchema: {
    description: z
      .string()
      .min(1)
      .describe(
        "What the app is and does, such as 'invoicing SaaS with customer management, billing and a public marketing site'."
      ),
    features: z
      .string()
      .optional()
      .describe(
        "Optional comma-separated features to force in, such as 'pricing, settings, ai chat'."
      ),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: {
    maxAge: "15m",
    getKey: (args) => `plan-app-${args.description}-${args.features || ""}`,
  },
  async handler({ description, features }) {
    return jsonResult(buildAppPlan(description, features), true);
  },
});
