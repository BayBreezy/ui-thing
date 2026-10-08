<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Create issue</UiCardTitle>
          <UiCardDescription>Describe the problem and label it.</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeInput name="title" label="Title" placeholder="Something is broken" required />
          <UiVeeTagGroup
            name="priority"
            label="Priority"
            selection-mode="single"
            :options="priorities"
            disallow-empty-selection
            required
          />
          <UiVeeTagGroup
            name="labels"
            label="Labels"
            hint="Pick between 1 and 3 labels."
            :options="labels"
            variant="soft"
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

  const priorities = [
    { value: "low", label: "Low", color: "sky", dot: true },
    { value: "medium", label: "Medium", color: "amber", dot: true },
    { value: "high", label: "High", color: "orange", dot: true },
    { value: "critical", label: "Critical", color: "red", dot: true },
  ] as const;

  const labels = [
    { value: "bug", label: "Bug", color: "red" },
    { value: "feature", label: "Feature", color: "green" },
    { value: "docs", label: "Docs", color: "blue" },
    { value: "design", label: "Design", color: "pink" },
    { value: "perf", label: "Performance", color: "amber" },
  ] as const;

  const schema = object({
    title: string().label("Title").required().min(3).trim(),
    priority: string().label("Priority").required("Please pick a priority"),
    labels: array(string().required())
      .label("Labels")
      .min(1, "Pick at least one label")
      .max(3, "Pick 3 labels at most"),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { priority: "medium", labels: [] },
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Issue created", {
      description: `${values.title} (${values.priority}) with ${(values.labels ?? []).length} label(s).`,
    });
    resetForm();
  });
</script>
