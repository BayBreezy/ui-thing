<template>
  <UiContainer>
    <div class="bg-background rounded-md border p-4 lg:p-5">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div class="flex flex-1 items-start gap-4">
          <Motion
            :initial="{ opacity: 0, rotate: -90 }"
            :while-in-view="{ opacity: 1, rotate: 0 }"
            :transition="{ type: 'spring', stiffness: 200, damping: 20 }"
            class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
          >
            <Icon :name="icon" class="size-5" />
            <span class="sr-only">{{ title }}</span>
          </Motion>
          <div class="flex-1">
            <Motion
              :initial="{ opacity: 0, y: -10 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.1 }"
            >
              <h3 class="font-semibold" v-html="title" />
            </Motion>
            <Motion
              :initial="{ opacity: 0 }"
              :while-in-view="{ opacity: 1 }"
              :transition="{ delay: 0.2 }"
            >
              <p class="text-muted-foreground mt-1 text-sm" v-html="description" />
            </Motion>
            <Motion
              :initial="{ opacity: 0, y: 10 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.3 }"
            >
              <div class="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
                <Icon name="lucide:clock" class="size-3.5" />
                <span>{{ timeText }}</span>
                <UiSeparator orientation="vertical" class="h-3" />
                <Icon name="lucide:users" class="size-3.5" />
                <span>{{ usersText }}</span>
              </div>
            </Motion>
          </div>
        </div>

        <Motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ delay: 0.4 }"
          class="grid shrink-0 grid-cols-2 gap-2 lg:flex lg:items-center"
        >
          <UiButton size="sm" variant="outline"> Remind me later </UiButton>
          <UiButton size="sm"> View details </UiButton>
          <UiButton
            size="icon-sm"
            variant="ghost"
            class="hidden shrink-0 lg:flex"
            aria-label="Close banner"
          >
            <Icon name="lucide:x" class="text-muted-foreground size-4" />
          </UiButton>
        </Motion>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      timeText?: string;
      usersText?: string;
    }>(),
    {
      title: "System Maintenance Scheduled",
      description:
        "We'll be performing scheduled maintenance on our systems. Expect brief interruptions.",
      icon: "lucide:alert-triangle",
      timeText: "Tomorrow at 2:00 AM",
      usersText: "Affects all users",
    }
  );
</script>
