<template>
  <UiTimeline>
    <UiTimelineItem
      v-for="item in items"
      :key="item.id"
      :step="item.id"
      class="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:[&:not(:last-child)]:pb-8"
    >
      <UiTimelineHeader>
        <UiTimelineSeparator
          class="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-[1.625rem]"
        />
        <UiTimelineTitle class="mt-0.5">
          {{ item.title }}
          <span class="text-sm font-normal text-muted-foreground">{{ item.action }}</span>
        </UiTimelineTitle>
        <UiTimelineIndicator
          class="flex size-6 items-center justify-center border-none bg-primary/10 group-data-[orientation=vertical]/timeline:-left-7 group-data-[completed=true]/timeline-item:bg-primary group-data-[completed=true]/timeline-item:text-primary-foreground"
        >
          <UiAvatar :src="item.image" :alt="item.title" class="size-6" />
        </UiTimelineIndicator>
      </UiTimelineHeader>
      <UiTimelineContent class="mt-2 rounded-lg border px-4 py-3 text-foreground">
        {{ item.description }}
        <UiTimelineDate class="mb-0 mt-1">{{ item.date }}</UiTimelineDate>
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
