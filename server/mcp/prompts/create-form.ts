import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to scaffold an accessible form with UI Thing and vee-validate.",
  inputSchema: {
    formType: z
      .enum(["login", "signup", "contact", "settings", "checkout", "survey", "custom"])
      .describe("Form type to create."),
    fields: z
      .string()
      .optional()
      .describe("Optional comma-separated fields, especially useful for custom forms."),
  },
  handler: async ({ formType, fields }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a ${formType} form with UI Thing and vee-validate.${fields ? ` Requested fields: ${fields}.` : ""}

Preferred workflow:
1. Call plan-form first.
2. Call get-install-plan for the final component set.
3. Call get-component for any field wrappers or form primitives you need to inspect.
4. Preserve labels, errors, and keyboard behavior in the final implementation.

Return:
- installation commands first
- field and validation plan
- then the final Vue/Nuxt implementation`,
          },
        },
      ],
    };
  },
});
