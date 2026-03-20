import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to review accessibility in a UI Thing implementation.",
  inputSchema: {
    scope: z
      .enum(["component", "page", "form", "navigation", "modal"])
      .describe("Accessibility review scope."),
  },
  handler: async ({ scope }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Review ${scope} accessibility with WCAG 2.1 AA in mind.

Preferred workflow:
1. Call get-component for exact source when reviewing a single component.
2. Call get-documentation-page when existing docs are relevant.
3. Preserve existing Reka/UI Thing accessibility behavior instead of replacing it.

Check:
- semantics
- keyboard support
- focus management
- labels and descriptions
- color contrast`,
          },
        },
      ],
    };
  },
});
