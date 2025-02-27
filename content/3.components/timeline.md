---
title: Timeline
description: A timeline component to display a series of events in chronological order.
label: New
---

## Credits

Thanks to the team at [Origin UI](https://originui.com/timeline) for creating this component ❤️. I just made a vue version of it.

## Source code

Click :SourceCodeLink{component="Timeline"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add timeline
```

## Usage

### Basic

::ShowCase

:DocsTimeline

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimeline.vue" code lang="vue" -->

```vue [DocsTimeline.vue]
<template>
  <div class="flex justify-center">
    <UiTimeline :model-value="3">
      <template v-for="(item, i) of items" :key="i">
        <UiTimelineItem :step="item.id">
          <UiTimelineHeader>
            <UiTimelineSeparator />
            <UiTimelineTitle class="-mt-0.5">{{ item.title }}</UiTimelineTitle>
            <UiTimelineIndicator />
          </UiTimelineHeader>
        </UiTimelineItem>
      </template>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description:
        "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description:
        "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend API implementation and frontend component development in progress.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description:
        "Quality assurance testing, performance optimization, and production deployment preparation.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Date Left

::ShowCase

:DocsTimelineDateLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineDateLeft.vue" code lang="vue" -->

```vue [DocsTimelineDateLeft.vue]
<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem
        v-for="item in items"
        :key="item.id"
        :step="item.id"
        class="sm:group-data-[orientation=vertical]/timeline:ms-32"
      >
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineDate
            class="sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-left-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-right"
          >
            {{ item.date }}
          </UiTimelineDate>
          <UiTimelineTitle class="sm:-mt-0.5">{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
        <UiTimelineContent>{{ item.description }}</UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description:
        "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description:
        "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend API implementation and frontend component development in progress.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description:
        "Quality assurance testing, performance optimization, and production deployment preparation.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Date Top

::ShowCase

:DocsTimelineDateTop

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineDateTop.vue" code lang="vue" -->

```vue [DocsTimelineDateTop.vue]
<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem v-for="item in items" :key="item.id" :step="item.id">
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineDate>{{ item.date }}</UiTimelineDate>
          <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
        <UiTimelineContent>{{ item.description }}</UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description:
        "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description:
        "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend API implementation and frontend component development in progress.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description:
        "Quality assurance testing, performance optimization, and production deployment preparation.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Time Bottom

::ShowCase

:DocsTimelineTimeBottom

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineTimeBottom.vue" code lang="vue" -->

```vue [DocsTimelineTimeBottom.vue]
<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem v-for="item in items" :key="item.id" :step="item.id">
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineTitle class="-mt-0.5">{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
        <UiTimelineContent>
          {{ item.description }}
          <UiTimelineDate class="mb-0 mt-2">{{ item.date }}</UiTimelineDate>
        </UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "15 minutes ago",
      title: "Pull Request Submitted",
      description:
        "Submitted PR #342 with new feature implementation. Waiting for code review from team leads.",
    },
    {
      id: 2,
      date: "10 minutes ago",
      title: "CI Pipeline Started",
      description:
        "Automated tests and build process initiated. Running unit tests and code quality checks.",
    },
    {
      id: 3,
      date: "5 minutes ago",
      title: "Code Review Feedback",
      description:
        "Received comments on PR. Minor adjustments needed in error handling and documentation.",
    },
    {
      id: 4,
      title: "Changes Pushed",
      description:
        "Implemented requested changes and pushed updates to feature branch. Awaiting final approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Check Icon

::ShowCase

:DocsTimelineCheckIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineCheckIcon.vue" code lang="vue" -->

```vue [DocsTimelineCheckIcon.vue]
<template>
  <UiTimeline :model-value="3">
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
        <UiTimelineDate>{{ item.date }}</UiTimelineDate>
        <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
        <UiTimelineIndicator
          class="flex size-6 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7 group-data-[completed=true]/timeline-item:border-none group-data-[completed=true]/timeline-item:bg-primary group-data-[completed=true]/timeline-item:text-primary-foreground"
        >
          <Icon
            name="lucide:check"
            class="size-4 group-data-[completed=false]/timeline-item:hidden"
          />
        </UiTimelineIndicator>
      </UiTimelineHeader>
      <UiTimelineContent>{{ item.description }}</UiTimelineContent>
    </UiTimelineItem>
  </UiTimeline>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description:
        "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description:
        "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend API implementation and frontend component development in progress.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description:
        "Quality assurance testing, performance optimization, and production deployment preparation.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Git

::ShowCase

:DocsTimelineGit

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineGit.vue" code lang="vue" -->

```vue [DocsTimelineGit.vue]
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
```

<!-- /automd -->

::

### Card Content

::ShowCase

:DocsTimelineCardContent

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineCardContent.vue" code lang="vue" -->

```vue [DocsTimelineCardContent.vue]
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
```

<!-- /automd -->

::

### Left & Right

::ShowCase

:DocsTimelineLeftRight

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineLeftRight.vue" code lang="vue" -->

```vue [DocsTimelineLeftRight.vue]
<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem
        v-for="item in items"
        :key="item.id"
        :step="item.id"
        class="w-[calc(50%-1.5rem)] odd:!ml-auto odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:ms-0 [&_[data-slot=timeline-indicator]]:group-data-[orientation=vertical]/timeline:even:-right-6 [&_[data-slot=timeline-indicator]]:group-data-[orientation=vertical]/timeline:even:left-auto [&_[data-slot=timeline-indicator]]:group-data-[orientation=vertical]/timeline:even:translate-x-1/2 [&_[data-slot=timeline-separator]]:group-data-[orientation=vertical]/timeline:even:-right-6 [&_[data-slot=timeline-separator]]:group-data-[orientation=vertical]/timeline:even:left-auto [&_[data-slot=timeline-separator]]:group-data-[orientation=vertical]/timeline:even:translate-x-1/2"
      >
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineDate>{{ item.date }}</UiTimelineDate>
          <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { id: 1, date: "Mar 15, 2024", title: "Project Kickoff" },
    { id: 2, date: "Mar 22, 2024", title: "Design Phase" },
    { id: 3, date: "Apr 5, 2024", title: "Development Sprint" },
    { id: 4, date: "Apr 19, 2024", title: "Testing & Deployment" },
    { id: 5, date: "May 3, 2024", title: "User Training" },
    { id: 6, date: "May 17, 2024", title: "Project Handover" },
  ];
</script>
```

<!-- /automd -->

::

### Card

::ShowCase

:DocsTimelineCard

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineCard.vue" code lang="vue" -->

```vue [DocsTimelineCard.vue]
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
```

<!-- /automd -->

::

### Activity

::ShowCase

:DocsTimelineActivity

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineActivity.vue" code lang="vue" -->

```vue [DocsTimelineActivity.vue]
<template>
  <div class="flex justify-center">
    <div class="space-y-3">
      <div class="text-xs font-medium text-muted-foreground">Activity</div>
      <UiTimeline>
        <UiTimelineItem
          v-for="item in items"
          :key="item.id"
          :step="item.id"
          class="!m-0 flex-row items-center gap-3 !py-2.5"
        >
          <Icon :name="getActionIcon(item.action)" class="size-4 text-muted-foreground/80" />
          <UiAvatar :src="item.image" :alt="item.user" class="size-6" />
          <UiTimelineContent class="flex items-center gap-2 text-foreground">
            <a class="font-medium hover:underline" href="#">
              {{ item.user }}
            </a>
            <span class="font-normal">
              {{ getActionText(item.action) }}
              <a class="hover:underline" href="#">
                {{ useTimeAgo(item.date).value }}
              </a>
            </span>
          </UiTimelineContent>
        </UiTimelineItem>
      </UiTimeline>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items: { id: number; user: string; image: string; action: ActionType; date: Date }[] = [
    {
      id: 1,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "post",
      date: new Date(Date.now() - 59000), // 59 seconds ago
    },
    {
      id: 2,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "reply",
      date: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: 3,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "edit",
      date: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 4,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "create",
      date: new Date(Date.now() - 600000), // 10 minutes ago
    },
  ];

  type ActionType = "post" | "reply" | "edit" | "create";

  function getActionIcon(action: ActionType): string {
    const icons: Record<ActionType, string> = {
      post: "lucide:book-open",
      reply: "lucide:message-circle",
      edit: "lucide:pencil",
      create: "lucide:plus",
    };
    return icons[action];
  }

  function getActionText(action: ActionType): string {
    const texts: Record<ActionType, string> = {
      post: "wrote a new post",
      reply: "replied to a comment",
      edit: "edited a post",
      create: "created a new project",
    };
    return texts[action];
  }
</script>
```

<!-- /automd -->

::

### Horizontal

::ShowCase

:DocsTimelineHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineHorizontal.vue" code lang="vue" -->

```vue [DocsTimelineHorizontal.vue]
<template>
  <div class="overflow-x-auto">
    <UiTimeline :model-value="3" orientation="horizontal">
      <UiTimelineItem v-for="item in items" :key="item.id" :step="item.id">
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineDate>{{ item.date }}</UiTimelineDate>
          <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
        <UiTimelineContent>{{ item.description }}</UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description: "Initial team meeting.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description: "Completed wireframes.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend development.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description: "Performance optimization.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Horizontal - Date Top

::ShowCase

:DocsTimelineHorizontalDateTop

#code

<!-- automd:file src="../../app/components/content/Docs/Timeline/DocsTimelineHorizontalDateTop.vue" code lang="vue" -->

```vue [DocsTimelineHorizontalDateTop.vue]
<template>
  <div class="overflow-x-auto">
    <UiTimeline :model-value="3" orientation="horizontal">
      <UiTimelineItem
        v-for="item in items"
        :key="item.id"
        :step="item.id"
        class="group-data-[orientation=horizontal]/timeline:mt-0"
      >
        <UiTimelineHeader>
          <UiTimelineSeparator class="group-data-[orientation=horizontal]/timeline:top-8" />
          <UiTimelineDate class="mb-10">{{ item.date }}</UiTimelineDate>
          <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator class="group-data-[orientation=horizontal]/timeline:top-8" />
        </UiTimelineHeader>
        <UiTimelineContent>{{ item.description }}</UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description: "Initial team meeting.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description: "Completed wireframes.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend development.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description: "Performance optimization.",
    },
  ];
</script>
```

<!-- /automd -->

::
