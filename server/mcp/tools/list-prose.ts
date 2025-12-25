import proseComponents from "~~/server/utils/prose";

export default defineMcpTool({
  description:
    "Lists all 47 prose/documentation components available for technical documentation and content display. Includes specialized components for code blocks (with syntax highlighting and copy buttons), callouts/alerts, file trees, diagrams (Mermaid), tabs, steps/sequences, tables, badges, keyboard shortcuts, and more. Each prose component has full Vue SFC source code, required composables, plugins, and dependencies. Use this to discover available prose components, especially when building documentation pages, blog posts, or content-rich interfaces.",

  annotations: {
    readOnlyHint: true, // Safe read-only operation
    destructiveHint: false, // No modifications
    idempotentHint: true, // Always returns the same list
    openWorldHint: false, // Local data only
  },
  cache: "1h", // Cache for 1 hour
  async handler() {
    // Categorize prose components
    const categories = [
      "Code Display",
      "Alerts & Callouts",
      "Content Organization",
      "Diagrams & Visualizations",
      "Typography & Formatting",
      "Interactive Elements",
    ];

    return jsonResult(
      {
        proseComponents: proseComponents,
        totalCount: proseComponents.length,
        categories,
      },
      true
    ); // Pretty print
  },
});
