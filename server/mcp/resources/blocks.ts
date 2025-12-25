export default defineMcpResource({
  name: "blocks",
  title: "UI Thing Blocks Library",
  uri: "resource://uithing/blocks",
  description: `Complete catalog of pre-built, production-ready UI blocks for rapid website development.

🎨 WHAT ARE BLOCKS?
Blocks are complete, self-contained sections of a web page (e.g., hero sections, about pages, 
team grids, testimonials, pricing tables). They're ready to copy and use immediately.

📦 STRUCTURE:
Each block contains:
- name: Human-readable name (e.g., "Hero 1", "About Team Grid")
- fileName: Vue component filename (e.g., "BlockHero1.vue")
- category: Block type (e.g., "Hero", "About", "Pricing", "Contact", "Footer")
- path: File location within the repository
- components: Array of UI Thing components needed (for CLI installation)
- file: Complete Vue SFC source code

💡 USAGE FOR AI:
1. Browse blocks by category to find sections matching user requirements
2. Extract the 'file' content to see the complete implementation
3. Identify required 'components' array to know dependencies
4. Combine multiple blocks to create complete page layouts
5. Customize blocks by modifying the template, styling, or data

🛠️ INSTALLATION:
Blocks can be installed via UI Thing CLI:
\`npx ui-thing@latest add [component-names]\`

Example: For a block using ["card", "button", "badge"], run:
\`npx ui-thing@latest add card button badge\`

📊 AVAILABLE CATEGORIES:
${[...new Set(blockExamples.map((b) => b.category))].sort().join(", ")}

📈 TOTAL BLOCKS: ${blockExamples.length}`,
  _meta: {
    totalBlocks: blockExamples.length,
    categories: [...new Set(blockExamples.map((b) => b.category))].sort(),
    framework: "Vue 3 + Nuxt 3",
    styling: "Tailwind CSS + UI Thing Design System",
  },
  cache: "1h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              meta: {
                total: blockExamples.length,
                categories: [...new Set(blockExamples.map((b) => b.category))].sort(),
                lastUpdated: new Date().toISOString(),
              },
              blocks: blockExamples,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
