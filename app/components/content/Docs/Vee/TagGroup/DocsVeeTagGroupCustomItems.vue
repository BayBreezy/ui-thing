<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The `item` slot customizes the content of every tag -->
      <UiVeeTagGroup
        name="members"
        label="Assign to"
        hint="Select everyone who should be notified."
        :options="members"
        variant="modern"
        size="lg"
      >
        <template #item="{ option, selected }">
          <span :class="selected && 'font-semibold'">{{ option.label }}</span>
          <span class="text-muted-foreground text-xs">{{ option.role }}</span>
        </template>
      </UiVeeTagGroup>
      <UiButton type="submit">Notify</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";

  const members = [
    { value: "ada", label: "Ada", role: "Lead", avatar: "https://i.pravatar.cc/150?img=1" },
    { value: "grace", label: "Grace", role: "Design", avatar: "https://i.pravatar.cc/150?img=5" },
    { value: "alan", label: "Alan", role: "Eng", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  const schema = object({
    members: array(string().required()).label("Members").min(1, "Select at least one person"),
  });

  const { handleSubmit } = useForm({ validationSchema: toTypedSchema(schema) });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Notified", { description: `${values.members?.length ?? 0} people` });
  });
</script>
