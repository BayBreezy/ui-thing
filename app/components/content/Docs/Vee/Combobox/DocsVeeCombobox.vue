<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCombobox
        name="framework"
        label="Framework"
        hint="Pick the framework you want to start with."
        placeholder="Select a framework"
        :options="frameworks"
        empty-text="No framework found"
        required
      />
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  // The form stores the `value` of the selected option, the input shows its `label`
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const schema = object({
    framework: string().label("Framework").required("Please select a framework"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Saved", { description: `Framework: ${values.framework}` });
  });
</script>
