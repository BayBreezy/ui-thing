<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The default slot replaces the generated options. Object values need `by` and `display-value`. -->
      <UiVeeCombobox
        name="assignee"
        label="Assignee"
        hint="Search your team by name."
        placeholder="Who is this assigned to?"
        icon="lucide:user-round"
        empty-text="Nobody matches that name"
        by="id"
        :display-value="(m: Member) => m?.name ?? ''"
      >
        <UiComboboxGroup v-for="team in teams" :key="team.name">
          <UiComboboxLabel>{{ team.name }}</UiComboboxLabel>
          <UiComboboxItem v-for="m in team.members" :key="m.id" :value="m" :text-value="m.name">
            <div class="flex w-full items-center justify-between gap-3">
              <span>{{ m.name }}</span>
              <span class="text-muted-foreground text-xs">{{ m.role }}</span>
            </div>
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiVeeCombobox>
      <UiButton type="submit">Assign</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { mixed, object } from "yup";

  type Member = { id: number; name: string; role: string };

  const teams: { name: string; members: Member[] }[] = [
    {
      name: "Design",
      members: [
        { id: 1, name: "Ada Lovelace", role: "Lead" },
        { id: 2, name: "Grace Hopper", role: "Designer" },
      ],
    },
    {
      name: "Engineering",
      members: [
        { id: 3, name: "Alan Turing", role: "Staff engineer" },
        { id: 4, name: "Margaret Hamilton", role: "Engineer" },
        { id: 5, name: "Linus Torvalds", role: "Engineer" },
      ],
    },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({ assignee: mixed<Member>().label("Assignee").required("Please pick someone") })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Assigned", { description: `Assigned to ${values.assignee.name}` });
  });
</script>
