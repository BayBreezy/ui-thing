import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to debug a UI Thing component issue.",
  inputSchema: {
    componentName: z.string().describe("Component with the issue."),
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
      .describe("Issue category."),
    errorMessage: z.string().optional().describe("Optional error message."),
  },
  handler: async ({ componentName, issue, errorMessage }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Debug the UI Thing component "${componentName}".

Issue type: ${issue}${errorMessage ? `\nError: ${errorMessage}` : ""}

Preferred workflow:
1. Call resolve-library-item if the component name is not exact.
2. Call get-component for the current source and docs.
3. Call get-install-plan if dependencies may be missing.
4. Call get-documentation-page if the docs likely explain expected behavior.

Focus on the smallest defensible fix first.`,
          },
        },
      ],
    };
  },
});
