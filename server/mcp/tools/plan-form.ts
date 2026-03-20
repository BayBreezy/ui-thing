import { buildFormPlan } from "~~/server/mcp/utils/library";
import { z } from "zod";

export default defineMcpTool({
  description:
    "Recommend Vee/UI Thing components, field strategy, validation stack, and an install plan for a form scaffold.",
  inputSchema: {
    formType: z
      .enum(["login", "signup", "contact", "settings", "checkout", "survey", "custom"])
      .describe("Form type to plan."),
    fields: z
      .string()
      .optional()
      .describe("Optional comma-separated fields. Best for custom forms."),
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  cache: {
    maxAge: "15m",
    getKey: (args) => `plan-form-${args.formType}-${args.fields || ""}`,
  },
  async handler({ formType, fields }) {
    return jsonResult(buildFormPlan(formType, fields), true);
  },
});
