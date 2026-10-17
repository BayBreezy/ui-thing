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

0. Read \`resource://uithing/design-patterns\` and \`resource://uithing/conventions\` before writing UI.
1. Call \`get-project-setup\` to get a Nuxt 4 + UI Thing setup plan (non-interactive commands).
2. Call \`plan-app\` for a whole product, or \`plan-page\` / \`plan-form\` for a single page or form.
3. Call \`resolve-library-item\` if the user gives a fuzzy component or block request.
4. Call \`get-install-plan\` once you know the pieces you want to use. Run every command it returns and apply its notes.
5. Call \`get-component\`, \`get-block\`, or \`get-documentation-page\` for exact implementation details.

Use the list and search tools for discovery:

- \`list-components\`
- \`list-blocks\`
- \`list-documentation-pages\`
- \`search-components\`
- \`search-documentation-pages\`

Resources are intentionally small indexes. Full source code is returned by the detail tools only.`,
        },
      ],
    };
  },
});
