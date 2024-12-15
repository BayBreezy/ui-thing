<template>
  <div class="mx-auto max-w-md">
    <form @submit="submit">
      <UiVeeMultiSelect
        name="hero"
        form-label="Hero"
        groups
        placeholder="Select a hero"
        :options="options"
      />
      <UiButton type="submit" class="mt-4"> Submit </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { z } from "zod";

  const options = [
    {
      label: "DC",
      options: ["Batman", "Robin", "Joker"],
    },
    {
      label: "Marvel",
      options: ["Spiderman", "Iron Man", "Captain America"],
    },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        hero: z.string({
          required_error: "Please select a hero",
          invalid_type_error: "Please select a hero",
        }),
      })
    ),
  });

  const submit = handleSubmit(
    async (values) => {
      useSonner.success("Awesome!", {
        description: `You selected ${values.hero}`,
      });
    },
    ({ errors }) => {
      // This is how you would scroll to the first error in the form
      const firstError = Object.keys(errors)[0];
      const el: HTMLInputElement | null = document.querySelector(`[name="${firstError}"]`);
      el?.scrollIntoView({
        behavior: "smooth",
      });
      el?.focus();

      useSonner.error("No hero :(", {
        description: "Please select a hero",
      });
    }
  );
</script>
