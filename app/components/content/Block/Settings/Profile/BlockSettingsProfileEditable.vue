<template>
  <!--
    Profile details as a list of rows that edit in place
    Features: Read-only rows with an edit button, inline input with save and cancel, no page-level form
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="divide-y p-0">
      <div
        v-for="field in fields"
        :key="field.key"
        class="grid gap-3 px-6 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
      >
        <p class="text-muted-foreground text-sm font-medium">{{ field.label }}</p>

        <form
          v-if="editing === field.key"
          class="flex items-center gap-2 sm:contents"
          @submit.prevent="commit(field.key)"
        >
          <UiInput
            v-model="draft"
            :type="field.type ?? 'text'"
            :aria-label="field.label"
            autofocus
            class="h-8"
          />
          <div class="flex gap-1">
            <UiButton type="submit" size="sm">Save</UiButton>
            <UiButton type="button" size="sm" variant="ghost" @click="editing = undefined">
              Cancel
            </UiButton>
          </div>
        </form>

        <template v-else>
          <p class="text-sm">{{ values[field.key] }}</p>
          <UiButton variant="ghost" size="sm" class="justify-self-start" @click="edit(field.key)">
            <Icon name="lucide:pencil" class="size-3.5" />
            Edit
          </UiButton>
        </template>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type FieldKey = "name" | "email" | "phone" | "location" | "website";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Personal details",
      description: "Click edit on any row to change it.",
    }
  );

  const fields: { key: FieldKey; label: string; type?: string }[] = [
    { key: "name", label: "Full name" },
    { key: "email", label: "Email address", type: "email" },
    { key: "phone", label: "Phone number", type: "tel" },
    { key: "location", label: "Location" },
    { key: "website", label: "Website", type: "url" },
  ];

  const values = reactive<Record<FieldKey, string>>({
    name: "Maya Chen",
    email: "maya@uithing.com",
    phone: "+1 (555) 010-2030",
    location: "Melbourne, Australia",
    website: "https://uithing.com",
  });

  const editing = ref<FieldKey>();
  const draft = ref("");

  function edit(key: FieldKey) {
    editing.value = key;
    draft.value = values[key];
  }

  function commit(key: FieldKey) {
    values[key] = draft.value.trim() || values[key];
    editing.value = undefined;
    useSonner.success("Saved");
  }
</script>
