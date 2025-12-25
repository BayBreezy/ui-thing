export default defineMcpResource({
  name: "components",
  title: "UI Thing Components Library",
  uri: "resource://uithing/components",
  description: `Comprehensive library of 60+ production-ready, accessible UI components.

⚡ WHAT ARE COMPONENTS?
Components are the fundamental building blocks - individual UI elements like buttons, cards, 
inputs, dialogs, etc. They follow shadcn/ui design principles with full TypeScript support.

📦 STRUCTURE:
Each component includes:
- name: Human-readable name (e.g., "Button", "Card", "Dialog")
- value: CLI install name (e.g., "button", "card", "dialog")
- description: Purpose and use cases
- files: Array of Vue component files with full source code
  - fileName: Component file name
  - dirPath: Directory path (typically app/components/Ui/)
  - fileContent: Complete Vue SFC source
- docsPath: Documentation page path (prepend https://uithing.com)
- utils: Utility functions with source code (if any)
- composables: Vue composables with source code (if any)
- plugins: Nuxt plugins with source code (if any)
- deps: External NPM dependencies required
- devDeps: External NPM dev dependencies required
- nuxtModules: Nuxt modules needed

💡 USAGE FOR AI:
1. Browse components to find UI elements matching user requirements
2. Use 'value' field for installation via CLI
3. Review 'files' array for complete implementation details
4. Check 'deps' & 'devDeps' for required NPM packages
5. Install dependencies listed in 'utils', 'composables', 'plugins'
6. Combine components to build complex interfaces

🛠️ INSTALLATION:
Install via UI Thing CLI:
\`npx ui-thing@latest add [component-name]\`

Examples:
- \`npx ui-thing@latest add button card dialog\`
- \`bunx ui-thing@latest add input form\`
- \`pnpm dlx ui-thing@latest add table datatable\`

🎯 COMPONENT CATEGORIES:
- Form Controls: Button, Input, Select, Checkbox, Radio, Switch, Textarea
- Data Display: Card, Table, DataTable, Badge, Avatar, Chip
- Feedback: Alert, Toast/Sonner, Dialog, Drawer, Popover, Tooltip
- Navigation: Tabs, Breadcrumbs, Dropdown Menu, Context Menu, Command
- Layout: Container, Divider, Separator, Collapsible, Accordion
- Advanced: Calendar, DatePicker, AutoComplete, Combobox, File Upload

🎨 DESIGN SYSTEM:
- Built on Reka UI primitives for accessibility
- Styled with Tailwind CSS + tailwind-variants
- Full TypeScript support
- Dark mode compatible
- Customizable via design tokens

📊 TOTAL COMPONENTS: ${comp.length}`,
  _meta: {
    totalComponents: comp.length,
    framework: "Vue 3 + Nuxt 3",
    uiLibrary: "Reka UI",
    styling: "Tailwind CSS + tailwind-variants",
    typescript: true,
    accessible: true,
    darkMode: true,
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
                total: comp.length,
                lastUpdated: new Date().toISOString(),
                installCommand: "npx ui-thing@latest add [component-name]",
                documentation: "https://uithing.com",
              },
              components: comp,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
