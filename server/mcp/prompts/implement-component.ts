import { z } from "zod";

export default defineMcpPrompt({
  description:
    "Guide AI to properly implement a UI Thing component with all dependencies and best practices",
  inputSchema: {
    componentName: z
      .string()
      .describe("Name of the UI Thing component to implement (e.g., 'button', 'datepicker')"),
    useCase: z
      .string()
      .optional()
      .describe(
        "Specific use case or context for the component (e.g., 'login form', 'settings page')"
      ),
  },
  handler: async ({ componentName, useCase }) => {
    const useCaseContext = useCase ? ` for ${useCase}` : "";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are implementing the "${componentName}" UI Thing component${useCaseContext}.

Follow this workflow:

1. **Validate First**: Use the validate-dependencies tool with ["${componentName}"] to get installation commands
2. **Get Component Details**: Use get-component tool with componentName: "${componentName}" to retrieve:
   - Complete Vue SFC source code
   - Required composables and plugins
   - Dependencies
   - Documentation

3. **Implementation Guidelines**:
   - Use the EXACT source code from the component.file.fileContent
   - Do NOT modify the component code
   - Follow Vue 3 Composition API patterns
   - Ensure all imports are correct
   - Use TypeScript types properly

4. **Dependencies**:
   - Install ALL npm packages from the validation result
   - Add UI Thing components using: npx ui-thing@latest add <components>
   - Composables and plugins are auto-imported by Nuxt

5. **Accessibility**:
   - Preserve all ARIA attributes
   - Maintain keyboard navigation
   - Keep focus management intact

6. **Styling**:
   - Components use Tailwind CSS and tailwind-variants
   - Dark mode is supported by default
   - Customize using the component props, not by modifying source

Show me the installation commands first, then provide the implementation.`,
          },
        },
      ],
    };
  },
});
