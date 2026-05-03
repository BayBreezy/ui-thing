<template>
  <UiTimeline>
    <UiTimelineItem
      v-for="item in items"
      :key="item.id"
      :step="item.id"
      class="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
    >
      <UiTimelineHeader>
        <UiTimelineSeparator
          class="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5"
        />
        <UiTimelineTitle class="mt-0.5">
          {{ item.title }}
          <span class="text-muted-foreground text-sm font-normal">
            {{ item.action }}
          </span>
        </UiTimelineTitle>
        <UiTimelineIndicator
          class="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7"
        >
          <img :src="item.image" :alt="item.title" class="size-6 rounded-full" />
        </UiTimelineIndicator>
      </UiTimelineHeader>
      <UiTimelineContent class="text-foreground mt-2 rounded-lg border px-4 py-3">
        {{ item.description }}
        <UiTimelineDate class="mt-1 mb-0">{{ item.date }}</UiTimelineDate>
      </UiTimelineContent>
    </UiTimelineItem>
  </UiTimeline>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "15 minutes ago",
      title: "Hannah Kandell",
      action: "opened a new issue",
      description:
        "I'm having trouble with the new component library. It's not rendering properly.",
      image: "https://randomuser.me/api/portraits/med/women/75.jpg",
    },
    {
      id: 2,
      date: "10 minutes ago",
      title: "Chris Tompson",
      action: "commented on",
      description:
        "Hey Hannah, I'm having trouble with the new component library. It's not rendering properly.",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
    },
    {
      id: 3,
      date: "5 minutes ago",
      title: "Emma Davis",
      action: "assigned you to",
      description: "The new component library is not rendering properly. Can you take a look?",
      image: "https://randomuser.me/api/portraits/med/women/15.jpg",
    },
    {
      id: 4,
      date: "2 minutes ago",
      title: "Alex Morgan",
      action: "closed the issue",
      description: "The issue has been fixed. Please review the changes.",
      image: "https://randomuser.me/api/portraits/med/men/50.jpg",
    },
  ];
</script>
