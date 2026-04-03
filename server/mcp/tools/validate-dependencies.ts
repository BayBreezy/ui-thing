import { z } from "zod";
import { buildInstallPlan } from "~~/server/mcp/utils/library";

export default defineMcpTool({
  description:
    "Compatibility alias for get-install-plan. Build a single install plan for mixed components, blocks, and prose selections.",
  inputSchema: {
    items: z.array(z.string()).min(1).describe("Component, block, or prose selections to include."),
    packageManager: z
      .enum(["npm", "pnpm", "yarn", "bun"])
      .optional()
      .default("npm")
      .describe("Package manager used for command generation."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: {
    maxAge: "10m",
    getKey: (args) => `validate-${args.packageManager}-${args.items.sort().join(",")}`,
  },
  async handler({ items, packageManager = "npm" }) {
    return jsonResult(
      {
        aliasOf: "get-install-plan",
        ...buildInstallPlan(items, packageManager),
      },
      true
    );
  },
});
