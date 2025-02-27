<template>
  <div class="mx-auto max-w-lg">
    <UiTimeline class="divide-y rounded-lg border">
      <UiTimelineItem v-for="item in items" :key="item.id" :step="item.id" class="!m-0 !px-4 !py-3">
        <UiTimelineContent class="text-foreground">
          {{ item.description }}
          <UiTimelineDate class="mt-1">
            {{ item.date }}
          </UiTimelineDate>
        </UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const format = "MMMM DD YYYY [at] hh:mm A";
  const items = [
    {
      id: 1,
      date: dayjs().format(format),
      description: "System backup completed successfully.",
    },
    {
      id: 2,
      date: dayjs().subtract(11, "minutes").format(format),
      description: "User authentication service restarted due to configuration update.",
    },
    {
      id: 3,
      date: dayjs().subtract(23, "minutes").format(format),
      description: "Warning: High CPU usage detected on worker node-03.",
    },
    {
      id: 4,
      date: dayjs().subtract(44, "minutes").format(format),
      description: "New deployment initiated for api-service v2.1.0.",
    },
  ];
</script>
