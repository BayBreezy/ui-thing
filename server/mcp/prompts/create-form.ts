import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to create accessible forms using UI Thing form components",
  inputSchema: {
    formType: z
      .enum(["login", "signup", "contact", "settings", "checkout", "survey", "custom"])
      .describe("Type of form to create"),
    fields: z
      .string()
      .optional()
      .describe(
        "Comma-separated list of field types needed (e.g., 'email,password,checkbox,select')"
      ),
  },
  handler: async ({ formType, fields }) => {
    const fieldGuidance = fields
      ? `\n\nRequired fields: ${fields}`
      : `\n\nDetermine appropriate fields for a ${formType} form.`;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are creating a ${formType} form using UI Thing components with full validation and accessibility.${fieldGuidance}

**Available Form Components:**

Use list-components or search-components to find:
- Input, Textarea, Select, Checkbox, Radio, Switch
- DatePicker, DateField, Calendar
- Autocomplete, Combobox
- CurrencyInput, InputGroup
- Form (wrapper with validation)

**Implementation Steps:**

1. **Component Discovery**:
   - Search for form components: search-components with query "input" or "form"
   - Identify all components needed for the form fields
   - Prefer the Vee-Validate integrated components if available
   - Get component details using get-component tool

2. **Validation Setup**:
   - Use the Form component as wrapper
   - Integrate with vee-validate. Schemas can be defined using Yup or Zod
   - Define validation rules for each field:
     - Required fields
     - Format checks (email, phone, etc.)
     - Custom rules as needed
   - Add proper error messages

3. **Accessibility Requirements**:
   - Use Field component for proper label association
   - Include aria-describedby for errors
   - Ensure keyboard navigation works
   - Add focus management

4. **Form Structure**:
\`\`\`vue
<template>
  <UiForm @submit="handleSubmit">
    <UiField label="...">
      <UiInput />
    </UiField>
    <!-- More fields -->
    <UiButton type="submit">Submit</UiButton>
  </UiForm>
</template>
\`\`\`

Vee-Validate Example:
\`\`\`vue
<template>
  <form class="mx-auto max-w-xs" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeInput label="Full name" name="name" hint="This will be displayed to the public" />
      <UiVeeInput label="Email" name="email" type="email" />
      <UiVeeInput label="Age" name="age" type="number" />
      <UiButton :loading="isSubmitting" type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object, string } from "yup";

  const schema = object({
    name: string().required().label("Name").min(3),
    age: number()
      .required()
      .label("Age")
      .integer()
      .min(18)
      .max(120)
      .typeError("Age must be a number"),
    email: string().required().label("Email").email(),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    await promiseTimeout(3000);
    useSonner.success("Information Saved", {
      description: (_) => "We updated your information.",
    });
  });
</script>
\`\`\`

5. **Validation Pattern**:
   - Required field validation
   - Format validation (email, phone, etc.)
   - Custom validation rules
   - Real-time vs submit validation

6. **UX Considerations**:
   - Loading states during submission
   - Success/error feedback
   - Clear form button
   - Preserve data on errors

First, show me which form components we'll need and their validation requirements.`,
          },
        },
      ],
    };
  },
});
