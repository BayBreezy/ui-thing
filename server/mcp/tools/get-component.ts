import { buildComponentDetail, findComponent } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Get the exact UI Thing component contract, full source, docs markdown, dependencies, and install plan for a single component.",
  inputSchema: {
    componentName: z
      .string()
      .min(1)
      .describe("Exact component name or install value, such as 'button' or 'accordion'."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "30m",
  async handler({ componentName }) {
    const component = findComponent(componentName);

    if (!component) {
      return errorResult(
        `Component '${componentName}' not found. Use list-components or resolve-library-item first.`
      );
    }

    return jsonResult(await buildComponentDetail(useEvent(), component), true);
  },
});
