import { z } from "zod";

export default defineMcpPrompt({
  description: "Help debug and fix issues with UI Thing components",
  inputSchema: {
    componentName: z.string().describe("Name of the component having issues"),
    issue: z
      .enum([
        "not-rendering",
        "styling-broken",
        "typescript-error",
        "missing-dependency",
        "accessibility",
        "dark-mode",
        "other",
      ])
      .describe("Type of issue encountered"),
    errorMessage: z.string().optional().describe("Error message if any"),
  },
  handler: async ({ componentName, issue, errorMessage }) => {
    const errorContext = errorMessage ? `\n\nError message: "${errorMessage}"` : "";

    const troubleshootingSteps: Record<string, string> = {
      "not-rendering": `1. Verify component is imported correctly
2. Check if dependencies are installed: validate-dependencies tool
3. Ensure composables are available (auto-imported in Nuxt)
4. Check browser console for errors
5. Verify props are passed correctly`,

      "styling-broken": `1. Ensure Tailwind CSS is configured
2. Check tailwind-variants is installed
3. Verify dark mode classes are in tailwind.config
4. Check if custom theme is interfering
5. Use browser DevTools to inspect applied classes`,

      "typescript-error": `1. Get fresh component code: get-component tool
2. Check TypeScript version compatibility
3. Verify all type imports are available
4. Check if @types packages are installed
5. Review component props types match usage`,

      "missing-dependency": `1. Run validate-dependencies with ["${componentName}"]
2. Install all npm packages listed
3. Add UI Thing components: npx ui-thing@latest add <components>
4. Restart dev server
5. Check package.json for all dependencies`,

      accessibility: `1. Get component docs: get-documentation-page
2. Review ARIA attributes in source
3. Test keyboard navigation (Tab, Enter, Escape)
4. Check focus management
5. Use accessibility testing tools (axe, Lighthouse)`,

      "dark-mode": `1. Verify dark mode is enabled in Nuxt config
2. Check Tailwind dark mode strategy (class or media)
3. Ensure dark: variants are in component
4. Test theme toggle functionality
5. Check CSS variable definitions`,

      other: `1. Get component details: get-component "${componentName}"
2. Check documentation: get-documentation-page
3. Review component source for requirements
4. Verify environment setup
5. Check for console errors`,
    };

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are debugging an issue with the "${componentName}" UI Thing component.

**Issue Type**: ${issue}${errorContext}

**Diagnostic Workflow:**

${troubleshootingSteps[issue]}

**Debugging Tools Available:**

- \`get-component\` - Get fresh source code and documentation
- \`validate-dependencies\` - Verify all dependencies are installed
- \`get-documentation-page\` - Read component documentation
- \`search-components\` - Find related components

**Common Solutions:**

🔧 **Missing Dependencies**
- Run: \`validate-dependencies({ items: ["${componentName}"] })\`
- Install npm packages shown
- Add UI Thing components shown

🔧 **Import Issues**
- Components auto-import in Nuxt (no manual import needed)
- Composables auto-import (useFormField, etc.)
- Check components/ directory structure

🔧 **TypeScript Errors**
- Get fresh component: \`get-component({ componentName: "${componentName}" })\`
- Use exact source code returned
- Don't modify component internals

🔧 **Styling Issues**
- Components use Tailwind + tailwind-variants
- Dark mode uses \`dark:\` variants
- Custom styling via props, not source modification

**Next Steps:**

1. Describe the current behavior and expected behavior
2. Share any error messages or console output  
3. I'll help diagnose and provide the fix

What specifically is happening with the component?`,
          },
        },
      ],
    };
  },
});
