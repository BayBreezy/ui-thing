export default defineMcpTool({
  description:
    "Returns a complete list of all 100+ pre-built UI blocks available in UI Thing. Each block includes full Vue SFC source code, required components, dependencies, installation commands, and usage examples. Blocks are categorized sections like headers, heroes, features, testimonials, CTAs, footers, pricing, FAQs, contact forms, team sections, stats, and more. Use this to discover available blocks before fetching specific ones.",

  annotations: {
    readOnlyHint: true, // Safe read-only operation
    destructiveHint: false, // No modifications
    idempotentHint: true, // Always returns the same list
    openWorldHint: false, // Uses local data only
  },
  cache: "1h", // Cache for 1 hour - blocks don't change often
  async handler() {
    // Extract unique categories from block names
    const categories = [
      ...new Set(
        blockExamples.map((block) => {
          // Extract category from name (e.g., "Header 1" -> "Header")
          const match = block.name.match(/^([A-Za-z\s]+)\s*\d*$/);
          return match ? match[1].trim() : "Other";
        })
      ),
    ];

    return jsonResult(
      {
        blocks: blockExamples,
        totalCount: blockExamples.length,
        categories: categories.sort(),
      },
      true
    ); // Pretty print
  },
});
