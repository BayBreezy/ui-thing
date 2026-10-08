<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <UiVeeCombobox
        name="languages"
        label="Languages"
        hint="Pick up to 4 languages."
        placeholder="Select languages"
        :options="languages"
        empty-text="No language found"
        multiple
        clearable
        show-trigger
      />
      <UiButton type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";

  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "Rust",
    "Ruby",
    "PHP",
    "Java",
    "Kotlin",
    "Swift",
  ];

  const schema = object({
    languages: array(string().required())
      .label("Languages")
      .min(1, "Select at least one language")
      .max(4, "Select 4 languages at most"),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { languages: ["TypeScript"] },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: (values.languages ?? []).join(", ") });
  });
</script>
