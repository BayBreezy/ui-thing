import { buildProseDetail, findProse } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Get the exact UI Thing prose component contract, source, docs markdown, dependencies, and install plan for a single prose component.",
  inputSchema: {
    componentName: z
      .string()
      .min(1)
      .describe("Exact prose component name or value, such as 'callout', 'tabs', or 'code-group'."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "30m",
  async handler({ componentName }) {
    const prose = findProse(componentName);

    if (!prose) {
      return errorResult(
        `Prose component '${componentName}' not found. Use list-prose or resolve-library-item first.`
      );
    }

    return jsonResult(await buildProseDetail(useEvent(), prose), true);
  },
});
