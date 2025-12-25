import { z } from "zod";

export default defineMcpTool({
  description:
    "Retrieves the complete markdown documentation content for any page in the UI Thing documentation. Returns raw markdown with frontmatter, examples, installation instructions, usage guidelines, props tables, and code snippets. Use this to get detailed human-readable documentation for components, blocks, or guides.",
  inputSchema: {
    path: z
      .string()
      .min(1)
      .regex(/^\//, "Path must start with /")
      .describe(
        "The absolute URL path to the documentation page (e.g., '/components/button', '/getting-started/setup', '/blocks/hero-section'). Must start with /. Use list-documentation-pages to discover available paths."
      ),
  },
  outputSchema: {
    content: z.string(),
    path: z.string(),
  },
  annotations: {
    readOnlyHint: true, // Safe, read-only operation
    destructiveHint: false, // No modifications
    idempotentHint: true, // Same path = same content
    openWorldHint: false, // Uses local content files
  },
  cache: "30m", // Cache documentation for 30 minutes
  async handler({ path }) {
    try {
      // Normalize path - ensure it starts with /
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;

      const result = await $fetch<string>(`/api/md${normalizedPath}`);

      // Return as text content (markdown)
      return {
        content: [
          {
            type: "text" as const,
            text: result,
          },
        ],
        // Add structured metadata
        structuredContent: {
          content: result,
          path: normalizedPath,
        },
      };
    } catch (error: any) {
      return errorResult(
        `Failed to fetch documentation page "${path}": ${error.message || error}. Verify the path exists using list-documentation-pages tool.`
      );
    }
  },
});
