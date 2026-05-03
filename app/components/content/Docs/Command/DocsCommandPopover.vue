<template>
  <div class="flex items-center justify-center space-x-4">
    <p class="text-muted-foreground text-sm">Status</p>
    <UiPopover v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" size="sm" class="w-[150px] justify-start">
          <template v-if="selectedStatus">
            {{ selectedStatus?.label }}
          </template>
          <template v-else> + Set status </template>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="max-w-[200px] p-0" side="right" align="start">
        <UiCommand>
          <UiCommandInput placeholder="Change status..." />
          <UiCommandList>
            <UiCommandEmpty>No results found.</UiCommandEmpty>
            <UiCommandGroup>
              <UiCommandItem
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
                @select="
                  () => {
                    selectedStatus = status;
                    open = false;
                  }
                "
              >
                {{ status.label }}
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
  interface Status {
    value: string;
    label: string;
  }

  const statuses: Status[] = [
    {
      value: "backlog",
      label: "Backlog",
    },
    {
      value: "todo",
      label: "Todo",
    },
    {
      value: "in progress",
      label: "In Progress",
    },
    {
      value: "done",
      label: "Done",
    },
    {
      value: "canceled",
      label: "Canceled",
    },
  ];

  const open = ref(false);
  const selectedStatus = ref<Status>();
</script>
