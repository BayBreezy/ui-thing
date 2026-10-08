<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- Every option can have its own color, icon, avatar or dot -->
      <UiVeeTagGroup
        name="labels"
        label="Labels"
        hint="Each label has its own color."
        :options="labels"
      />
      <UiButton type="submit">Apply</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";

  const labels = [
    { value: "bug", label: "Bug", color: "red", icon: "lucide:bug" },
    { value: "feature", label: "Feature", color: "green", icon: "lucide:sparkles" },
    { value: "docs", label: "Docs", color: "blue", icon: "lucide:book-open" },
    { value: "design", label: "Design", color: "pink", icon: "lucide:palette" },
    { value: "perf", label: "Performance", color: "amber", icon: "lucide:zap" },
    { value: "wontfix", label: "Won't fix", color: "gray", icon: "lucide:ban" },
  ] as const;

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(object({ labels: array(string().required()).label("Labels") })),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Applied", { description: (values.labels ?? []).join(", ") || "No labels" });
  });
</script>
