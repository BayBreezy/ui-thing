import { buildInstallPlan } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Build one normalized install plan for a mixed set of UI Thing components, blocks, or prose components.",
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
    getKey: (args) => `install-plan-${args.packageManager}-${args.items.sort().join(",")}`,
  },
  async handler({ items, packageManager = "npm" }) {
    return jsonResult(buildInstallPlan(items, packageManager), true);
  },
});
