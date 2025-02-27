<template>
  <UiTimeline :model-value="2">
    <UiTimelineItem
      v-for="item in items"
      :key="item.id"
      :step="item.id"
      class="group-data-[orientation=vertical]/timeline:ms-10"
    >
      <UiTimelineHeader>
        <UiTimelineSeparator
          class="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-[1.625rem]"
        />
        <UiTimelineTitle class="mt-0.5">{{ item.title }}</UiTimelineTitle>
        <UiTimelineIndicator
          class="flex size-6 items-center justify-center border-none bg-primary/10 group-data-[orientation=vertical]/timeline:-left-7 group-data-[completed=true]/timeline-item:bg-primary group-data-[completed=true]/timeline-item:text-primary-foreground"
        >
          <Icon :name="item.icon" class="size-4" />
        </UiTimelineIndicator>
      </UiTimelineHeader>
      <UiTimelineContent>
        {{ item.description }}
        <UiTimelineDate class="mb-0 mt-2">{{ item.date }}</UiTimelineDate>
      </UiTimelineContent>
    </UiTimelineItem>
  </UiTimeline>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "15 minutes ago",
      title: "Forked Repository",
      description: "Forked the repository to create a new branch for development.",
      icon: "lucide:git-fork",
    },
    {
      id: 2,
      date: "10 minutes ago",
      title: "Pull Request Submitted",
      description:
        "Submitted PR #342 with new feature implementation. Waiting for code review from team leads.",
      icon: "lucide:git-pull-request",
    },
    {
      id: 3,
      date: "5 minutes ago",
      title: "Comparing Branches",
      description:
        "Received comments on PR. Minor adjustments needed in error handling and documentation.",
      icon: "lucide:git-compare",
    },
    {
      id: 4,
      title: "Merged Branch",
      description: "Merged the feature branch into the main branch. Ready for deployment.",
      icon: "lucide:git-merge",
    },
  ];
</script>
