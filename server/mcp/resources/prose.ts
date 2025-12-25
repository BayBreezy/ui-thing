import proseComponents from "~~/server/utils/prose";

export default defineMcpResource({
  name: "prose",
  title: "UI Thing Prose Components",
  uri: "resource://uithing/prose",
  description: `Complete collection of specialized prose/documentation components for content-rich applications.

📝 WHAT ARE PROSE COMPONENTS?
Prose components are specialized UI elements designed for documentation, markdown content, and 
rich text displays. They are meant to be used with the content module for Nuxt. They enhance standard HTML elements with beautiful styling and interactive features.

📦 STRUCTURE:
Each prose component contains:
- name: Human-readable name (e.g., "Callout", "Code Group", "Tabs")
- value: Component identifier/slug (e.g., "callout", "code-group")
- description: Detailed explanation of purpose and use cases
- fileName: Vue component filename
- filePath: Full path within the repository
- file: Complete component source with fileName, dirPath, and fileContent
- components: Array of UI Thing components used (if any)
- prose: Array of other prose components it depends on
- composables: Array of Vue composables with full source code
- plugins: Array of Nuxt plugins with full source code
- deps: NPM dependencies required
- modules: Nuxt modules needed
- docsUrl: Link to documentation page

💡 USAGE FOR AI:
1. Use prose components to enhance markdown/documentation displays
2. Implement interactive code examples with syntax highlighting
3. Create beautiful callouts, tabs, and collapsible sections
4. Build comprehensive documentation with proper structure
5. Components are global - automatically available in .md and .vue files

🎯 KEY CATEGORIES:
- Code Display: Pre, CodeGroup, CodeCollapse, CodeCopy, CodeSnippet
- Content Organization: Tabs, Collapsible, Steps, Card
- Alerts & Info: Callout (variants: info, warning, error, success, tip)
- Package Managers: PmInstall, PmRun, PmX (supports npm, pnpm, yarn, bun)
- Documentation: Field, FieldGroup, CodeTree
- Typography: Headings (H1-H6), Lists, Tables, Links, Blockquotes
- Media: Image, ColorModeImage
- Diagrams: Mermaid (for flowcharts and diagrams)

🛠️ INSTALLATION:
Prose components are typically pre-installed in UI Thing projects.
For dependencies: \`npm install [package-names]\`

📊 TOTAL COMPONENTS: ${proseComponents.length}`,
  _meta: {
    totalComponents: proseComponents.length,
    componentTypes: [
      "code-display",
      "content-organization",
      "alerts",
      "package-managers",
      "documentation",
      "typography",
      "media",
      "diagrams",
    ],
    framework: "Vue 3 + Nuxt 3 + Nuxt Content",
    styling: "Tailwind CSS",
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
                total: proseComponents.length,
                lastUpdated: new Date().toISOString(),
                usage:
                  "Prose components are global and work in both .vue files and .md content files",
              },
              components: proseComponents,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
