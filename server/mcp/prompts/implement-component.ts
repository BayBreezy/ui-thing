import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to implement a specific UI Thing component cleanly.",
  inputSchema: {
    componentName: z.string().describe("Exact or fuzzy component request."),
    useCase: z.string().optional().describe("Optional use-case context."),
  },
  handler: async ({ componentName, useCase }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Implement the UI Thing component "${componentName}"${useCase ? ` for ${useCase}` : ""}.

Preferred workflow:
1. Call resolve-library-item if the component name is not exact.
2. Call get-component for the exact component details.
3. Call get-install-plan before implementation.
4. Preserve the copied source contract instead of rewriting internals from scratch.

Return installation commands first, then the implementation.`,
          },
        },
      ],
    };
  },
});
