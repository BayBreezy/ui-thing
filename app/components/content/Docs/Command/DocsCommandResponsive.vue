<template>
  <div class="flex items-center justify-center">
    <UseTemplate>
      <UiCommand v-model="selectedStatus" class="rounded-none! md:rounded-lg!">
        <UiCommandInput placeholder="Filter status..." />
        <UiCommandList>
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="status of statuses"
              :key="status.value"
              :value="status"
              @select="onStatusSelect"
            >
              {{ status.label }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UseTemplate>

    <UiPopover v-if="isDesktop" v-model:open="isOpen">
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" class="w-[150px] justify-start">
          {{ selectedStatus ? selectedStatus.label : "+ Set status" }}
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-[200px] p-0" align="start">
        <StatusList />
      </UiPopoverContent>
    </UiPopover>

    <UiDrawer v-else v-model:open="isOpen">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline" class="w-[150px] justify-start">
          {{ selectedStatus ? selectedStatus.label : "+ Set status" }}
        </UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <UiDrawerTitle class="sr-only">Set Status</UiDrawerTitle>
        <UiDrawerDescription class="sr-only"> Select a status for the task. </UiDrawerDescription>
        <div class="mt-4 border-t">
          <StatusList />
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
  import { ref } from "vue";

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

  const [UseTemplate, StatusList] = createReusableTemplate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = ref(false);
  const selectedStatus = ref<Status | null>(null);

  const onStatusSelect = () => (isOpen.value = false);
</script>
