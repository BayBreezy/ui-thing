<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Create project</UiCardTitle>
          <UiCardDescription>Choose a framework and where to deploy it.</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeInput name="name" label="Project name" placeholder="my-app" required />
          <UiVeeCombobox
            name="framework"
            label="Framework"
            placeholder="Select a framework"
            :options="frameworks"
            empty-text="No framework found"
            show-trigger
            required
          />
          <UiVeeCombobox
            name="regions"
            label="Regions"
            placeholder="Select regions"
            hint="Pick at least one region."
            :options="regions"
            multiple
            clearable
            required
          />
        </UiCardContent>

        <UiCardFooter>
          <UiButton type="button" variant="ghost" @click="resetForm()">Reset</UiButton>
          <UiButton :loading="isSubmitting" type="submit">Create</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const regions = [
    { value: "us-east", label: "US East (N. Virginia)" },
    { value: "us-west", label: "US West (Oregon)" },
    { value: "eu-west", label: "Europe (Ireland)" },
    { value: "eu-central", label: "Europe (Frankfurt)" },
    { value: "ap-southeast", label: "Asia Pacific (Singapore)" },
    { value: "ap-northeast", label: "Asia Pacific (Tokyo)" },
  ];

  const schema = object({
    name: string().label("Project name").required().min(2).trim(),
    framework: string().label("Framework").required("Please select a framework"),
    regions: array(string().required())
      .label("Regions")
      .required("Please select at least one region")
      .min(1, "Please select at least one region"),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (vals) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Project created", {
      description: `${vals.name} (${vals.framework}) in ${(vals.regions ?? []).length} region(s).`,
    });
    resetForm();
  });
</script>
