import { buildProjectSetup } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description: "Return a scaffold-first setup plan for starting a new Nuxt project with UI Thing.",
  inputSchema: {
    projectName: z
      .string()
      .min(1)
      .optional()
      .default("my-app")
      .describe("Project directory name to use in the generated commands."),
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
    maxAge: "1h",
    getKey: (args) => `project-setup-${args.packageManager}-${args.projectName}`,
  },
  async handler({ projectName = "my-app", packageManager = "npm" }) {
    return jsonResult(buildProjectSetup(projectName, packageManager), true);
  },
});
