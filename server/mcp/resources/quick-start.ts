export default defineMcpResource({
  name: "quick-start",
  title: "UI Thing MCP Quick Start",
  uri: "resource://uithing/quick-start",
  description: "Short MCP-first workflow guide for using UI Thing in a Nuxt project.",
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/markdown",
          text: `# UI Thing MCP Quick Start

Use the MCP layer in this order when you are starting a new Nuxt project:

1. Call \`get-project-setup\` to get a Nuxt 4 + UI Thing setup plan.
2. Call \`plan-page\` or \`plan-form\` if the user is building a page or form scaffold.
3. Call \`resolve-library-item\` if the user gives a fuzzy component, block, or prose request.
4. Call \`get-install-plan\` once you know the pieces you want to use.
5. Call \`get-component\`, \`get-block\`, \`get-prose\`, or \`get-documentation-page\` for exact implementation details.

Use the list and search tools for discovery:

- \`list-components\`
- \`list-blocks\`
- \`list-prose\`
- \`list-documentation-pages\`
- \`search-components\`
- \`search-documentation-pages\`

Resources are intentionally small indexes. Full source code is returned by the detail tools only.`,
        },
      ],
    };
  },
});
