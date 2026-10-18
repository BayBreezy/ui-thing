<template>
  <!--
    Getting started checklist card
    Features: Progress bar with a count, checkbox for every task, task descriptions and a call to action on the next task, completed tasks struck through and an all done message
  -->
  <UiContainer class="py-16 lg:py-24">
    <UiCard class="mx-auto max-w-xl">
      <UiCardHeader>
        <UiCardTitle>{{ title }}</UiCardTitle>
        <UiCardDescription>{{ description }}</UiCardDescription>
        <div class="mt-3 flex items-center gap-3">
          <UiProgress :model-value="percent" class="h-2" aria-label="Checklist progress" />
          <span
            class="text-muted-foreground text-sm whitespace-nowrap tabular-nums"
            aria-live="polite"
          >
            {{ done }} of {{ tasks.length }}
          </span>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <ul class="divide-y">
          <li v-for="task in tasks" :key="task.id" class="flex items-start gap-3 py-4">
            <UiCheckbox
              :id="`task-${task.id}`"
              class="mt-0.5 rounded-full"
              :model-value="task.done"
              @update:model-value="task.done = Boolean($event)"
            />
            <div class="min-w-0 flex-1">
              <UiLabel
                :for="`task-${task.id}`"
                class="cursor-pointer font-medium"
                :class="task.done ? 'text-muted-foreground line-through' : ''"
              >
                {{ task.title }}
              </UiLabel>
              <p v-if="!task.done" class="text-muted-foreground mt-1 text-sm">
                {{ task.description }}
              </p>
              <UiButton
                v-if="task.id === next?.id"
                size="sm"
                class="mt-3"
                @click="useSonner.info(`Opening: ${task.title}`)"
              >
                {{ task.action }}
                <Icon name="lucide:arrow-right" class="size-4" />
              </UiButton>
            </div>
          </li>
        </ul>
        <p
          v-if="!next"
          class="mt-4 flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400"
          role="status"
        >
          <Icon name="lucide:party-popper" class="size-4" />
          Everything is done. Nice work!
        </p>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = { id: string; title: string; description: string; action: string; done: boolean };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      items?: Task[];
    }>(),
    {
      title: "Get started with Acme",
      description: "Five quick steps to get the most out of your workspace.",
      items: () => [
        {
          id: "profile",
          title: "Complete your profile",
          description: "Add a photo and your job title.",
          action: "Edit profile",
          done: true,
        },
        {
          id: "project",
          title: "Create your first project",
          description: "Start from scratch or use a template.",
          action: "New project",
          done: true,
        },
        {
          id: "invite",
          title: "Invite a teammate",
          description: "Projects are better with company.",
          action: "Invite people",
          done: false,
        },
        {
          id: "integrate",
          title: "Connect an integration",
          description: "Sync with Slack, GitHub or Google Calendar.",
          action: "Browse integrations",
          done: false,
        },
        {
          id: "publish",
          title: "Publish your first update",
          description: "Share progress with your team.",
          action: "Write an update",
          done: false,
        },
      ],
    }
  );

  const tasks = ref<Task[]>(props.items.map((item) => ({ ...item })));

  const done = computed(() => tasks.value.filter((task) => task.done).length);
  const percent = computed(() => (done.value / tasks.value.length) * 100);
  const next = computed(() => tasks.value.find((task) => !task.done));
</script>
