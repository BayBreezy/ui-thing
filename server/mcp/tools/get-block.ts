import { buildBlockDetail, findBlock } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Get the exact UI Thing block contract, source, linked docs when available, dependencies, and install plan for a single block.",
  inputSchema: {
    blockName: z
      .string()
      .min(1)
      .describe("Exact block name, file name, or block path, such as 'Hero 1' or 'BlockHero1'."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: "30m",
  async handler({ blockName }) {
    const block = findBlock(blockName);

    if (!block) {
      return errorResult(
        `Block '${blockName}' not found. Use list-blocks or resolve-library-item first.`
      );
    }

    return jsonResult(await buildBlockDetail(useEvent(), block), true);
  },
});
