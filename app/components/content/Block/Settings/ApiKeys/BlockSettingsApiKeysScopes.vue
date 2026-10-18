<template>
  <!--
    API key scopes
    Features: A preset select for read only, read and write or custom access, a row for each resource with none, read and write choices, a summary count, a warning when a key can write to billing and a save button that is only enabled after a change
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Scopes for "{{ keyName }}"</UiCardTitle>
      <UiCardDescription>Give the key only the access it needs.</UiCardDescription>
      <UiCardAction>
        <UiSelect :model-value="preset" @update:model-value="(value) => applyPreset(String(value))">
          <UiSelectTrigger class="w-40" aria-label="Preset"><UiSelectValue /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="read">Read only</UiSelectItem>
            <UiSelectItem value="write">Read and write</UiSelectItem>
            <UiSelectItem value="custom">Custom</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-4">
      <ul class="divide-y rounded-lg border">
        <li
          v-for="resource in resources"
          :key="resource.id"
          class="flex flex-wrap items-center gap-3 px-4 py-3"
        >
          <div class="min-w-0 flex-1">
            <p :id="`scope-${resource.id}`" class="text-sm font-medium">{{ resource.label }}</p>
            <p class="text-muted-foreground text-xs">{{ resource.hint }}</p>
          </div>
          <UiToggleGroup
            :model-value="levels[resource.id]"
            type="single"
            variant="outline"
            size="sm"
            :aria-labelledby="`scope-${resource.id}`"
            @update:model-value="(value) => setLevel(resource.id, (value as Level) || 'none')"
          >
            <UiToggleGroupItem value="none">None</UiToggleGroupItem>
            <UiToggleGroupItem value="read">Read</UiToggleGroupItem>
            <UiToggleGroupItem value="write">Write</UiToggleGroupItem>
          </UiToggleGroup>
        </li>
      </ul>
      <UiAlert
        v-if="levels.billing === 'write'"
        icon="lucide:triangle-alert"
        title="This key can change billing"
        description="Anyone with the key can update payment details and plans. Keep it out of client side code."
        role="status"
      />
      <p class="text-muted-foreground text-sm" aria-live="polite">{{ summary }}</p>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline" :disabled="!dirty" @click="reset">Reset</UiButton>
      <UiButton :disabled="!dirty" @click="save">Save scopes</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  type Level = "none" | "read" | "write";
  type Resource = { id: string; label: string; hint: string };

  const props = withDefaults(
    defineProps<{
      keyName?: string;
      resources?: Resource[];
      initial?: Record<string, Level>;
    }>(),
    {
      keyName: "Production server",
      resources: () => [
        { id: "projects", label: "Projects", hint: "Create, read and update projects." },
        { id: "members", label: "Members", hint: "List people and invite new ones." },
        { id: "files", label: "Files", hint: "Upload and download files." },
        { id: "webhooks", label: "Webhooks", hint: "Manage endpoints and events." },
        { id: "billing", label: "Billing", hint: "Invoices, plans and payment methods." },
      ],
      initial: () => ({
        projects: "write",
        members: "read",
        files: "write",
        webhooks: "read",
        billing: "none",
      }),
    }
  );

  const levels = reactive<Record<string, Level>>({ ...props.initial });
  const saved = ref<Record<string, Level>>({ ...props.initial });

  const preset = computed(() => {
    const values = props.resources.map((resource) => levels[resource.id]);
    if (values.every((value) => value === "read")) return "read";
    if (values.every((value) => value === "write")) return "write";
    return "custom";
  });
  const dirty = computed(() =>
    props.resources.some((resource) => levels[resource.id] !== saved.value[resource.id])
  );
  const summary = computed(() => {
    const read = props.resources.filter((resource) => levels[resource.id] === "read").length;
    const write = props.resources.filter((resource) => levels[resource.id] === "write").length;
    const none = props.resources.length - read - write;
    return `${write} with write access, ${read} read only, ${none} without access.`;
  });

  function setLevel(id: string, level: Level) {
    levels[id] = level;
  }

  function applyPreset(value: string) {
    if (value === "custom") return;
    for (const resource of props.resources) levels[resource.id] = value as Level;
  }

  function reset() {
    Object.assign(levels, saved.value);
  }

  function save() {
    saved.value = { ...levels };
    useSonner.success("Scopes saved");
  }
</script>
