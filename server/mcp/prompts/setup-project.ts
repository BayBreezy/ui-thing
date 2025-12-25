export default defineMcpPrompt({
  description: "Provide complete setup instructions for using UI Thing in a project",
  handler: async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are helping set up UI Thing in a Nuxt project. Here's everything you need to know:

**UI Thing Overview:**
- 60+ accessible UI components built on Reka UI
- 100+ pre-built page blocks (headers, heroes, features, etc.)
- 47 prose/documentation components
- Full TypeScript support
- Tailwind CSS + tailwind-variants for styling
- Dark mode support built-in
- Accessible (ARIA, keyboard navigation, focus management)

**Available MCP Tools:**

Discovery:
- \`list-components\` - See all 60+ components with categories
- \`list-blocks\` - See all 100+ blocks with categories  
- \`list-prose\` - See all 47 prose components
- \`search-components\` - Fuzzy search across everything

Details:
- \`get-component\` - Get full source code + docs for a component
- \`get-block\` - Get full source code for a block
- \`get-prose\` - Get full source code for a prose component

Validation:
- \`validate-dependencies\` - **ALWAYS USE THIS FIRST** - Gets installation commands

Documentation:
- \`list-documentation-pages\` - Browse all docs
- \`get-documentation-page\` - Read specific documentation

**Installation Workflow:**

1. **Create Nuxt 3 project** (if needed):
   \`\`\`bash
   npx nuxi@latest init my-app
   cd my-app
   npm install
   \`\`\`

2. **Setup UI Thing**:
   \`\`\`bash
   npm install -D @ui-thing/cli
   npx ui-thing@latest init
   \`\`\`

3. **Add components as needed**:
   \`\`\`bash
   npx ui-thing@latest add button card
   \`\`\`

**Best Practices:**

✅ Always use validate-dependencies before implementing
✅ Use search-components when unsure of component names
✅ Get full component details with get-component
✅ Use the exact source code returned (don't modify)
✅ Follow the installation commands from validation
✅ Components auto-import in Nuxt (no manual imports needed)

**Next Steps:**

Tell me what you want to build:
- Landing page? → Use build-page prompt
- Form? → Use create-form prompt  
- Specific component? → Use implement-component prompt
- Documentation page? → Use list-prose to see available prose components

What would you like to create?`,
          },
        },
      ],
    };
  },
});
