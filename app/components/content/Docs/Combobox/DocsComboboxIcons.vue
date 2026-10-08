<template>
  <div class="mx-auto max-w-sm">
    <UiCombobox v-model="value" by="id">
      <UiComboboxAnchor>
        <Icon
          :name="value?.icon ?? 'lucide:circle-dashed'"
          class="text-muted-foreground mr-2 size-4 shrink-0"
        />
        <UiComboboxInput
          placeholder="Set a status"
          :display-value="(status: Status) => status?.label ?? ''"
        />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No status found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem
            v-for="status in statuses"
            :key="status.id"
            :value="status"
            :text-value="status.label"
          >
            <div class="flex items-center gap-2">
              <Icon :name="status.icon" :class="['size-4', status.class]" />
              <div>
                <p class="leading-none font-medium">{{ status.label }}</p>
                <p class="text-muted-foreground mt-1 text-xs">{{ status.description }}</p>
              </div>
            </div>
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </div>
</template>

<script lang="ts" setup>
  type Status = {
    id: string;
    label: string;
    description: string;
    icon: string;
    class: string;
  };

  const statuses: Status[] = [
    {
      id: "backlog",
      label: "Backlog",
      description: "Not planned yet",
      icon: "lucide:circle-dashed",
      class: "text-muted-foreground",
    },
    {
      id: "todo",
      label: "Todo",
      description: "Ready to be picked up",
      icon: "lucide:circle",
      class: "text-blue-500",
    },
    {
      id: "in-progress",
      label: "In progress",
      description: "Someone is working on it",
      icon: "lucide:loader-circle",
      class: "text-amber-500",
    },
    {
      id: "done",
      label: "Done",
      description: "Shipped and verified",
      icon: "lucide:circle-check",
      class: "text-green-500",
    },
    {
      id: "canceled",
      label: "Canceled",
      description: "Won't be worked on",
      icon: "lucide:circle-x",
      class: "text-red-500",
    },
  ];

  const value = ref<Status>();
</script>
