<template>
  <form class="mx-auto max-w-md" @submit="submit">
    <UiVeeMultiSelect
      form-label="Hero"
      value-prop="id"
      label="name"
      placeholder="Select a hero"
      :options="options"
      name="heroObject"
    />
    <UiButton type="submit" class="mt-5"> Submit </UiButton>
  </form>
</template>

<script setup lang="ts">
  import { z } from "zod";

  const options = [
    { name: "Batman", id: 1, disabled: true },
    { name: "Robin", id: 2 },
    { name: "Joker", id: 3 },
    { name: "Catwoman", id: 4 },
    { name: "Bane", id: 5 },
    { name: "Scarecrow", id: 6 },
    { name: "Riddler", id: 7 },
    { name: "Two-Face", id: 8 },
    { name: "Penguin", id: 9 },
    { name: "Poison Ivy", id: 10 },
    { name: "Harley Quinn", id: 11 },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        heroObject: z.number({
          required_error: "Please select a hero",
          invalid_type_error: "Please select a hero",
        }),
      })
    ),
  });

  const submit = handleSubmit(
    async (values) => {
      useSonner.success("Awesome!", {
        description: `You selected ${options.find((o) => o.id === values.heroObject)?.name}`,
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
