<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The default slot replaces the generated suggestions. -->
      <UiVeeAutocomplete
        name="assignee"
        label="Assignee"
        hint="Search your team by name."
        placeholder="Who is this assigned to?"
        icon="lucide:user-round"
        empty-text="Nobody matches that name"
      >
        <UiAutocompleteGroup v-for="team in teams" :key="team.name">
          <UiAutocompleteLabel>{{ team.name }}</UiAutocompleteLabel>
          <UiAutocompleteItem v-for="m in team.members" :key="m.name" :value="m.name">
            <div class="flex w-full items-center justify-between gap-3">
              <span>{{ m.name }}</span>
              <span class="text-muted-foreground text-xs">{{ m.role }}</span>
            </div>
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiVeeAutocomplete>
      <UiButton type="submit">Assign</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const teams = [
    {
      name: "Design",
      members: [
        { name: "Ada Lovelace", role: "Lead" },
        { name: "Grace Hopper", role: "Designer" },
      ],
    },
    {
      name: "Engineering",
      members: [
        { name: "Alan Turing", role: "Staff engineer" },
        { name: "Margaret Hamilton", role: "Engineer" },
        { name: "Linus Torvalds", role: "Engineer" },
      ],
    },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(object({ assignee: string().label("Assignee").required() })),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Assigned", { description: `Assigned to ${values.assignee}` });
  });
</script>
