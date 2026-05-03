<template>
  <Motion
    as-child
    initial="init"
    while-in-view="animate"
    :variants="{
      init: { opacity: 0, y: 10 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.1) },
      },
    }"
  >
    <UiContainer class="bg-background relative rounded-lg border shadow-md">
      <Motion
        as-child
        :variants="{
          init: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
        }"
      >
        <UiButton
          aria-label="Close banner"
          size="icon-sm"
          variant="ghost"
          class="absolute top-3 right-4 z-10 lg:hidden"
        >
          <Icon name="lucide:x" class="text-muted-foreground size-4" />
        </UiButton>
      </Motion>
      <div class="flex flex-col gap-y-3 py-4 lg:flex-row">
        <div class="flex flex-1 items-start gap-4">
          <div class="relative shrink-0">
            <Motion
              :variants="{
                init: { scale: 0, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
              }"
              class="via-primary/5 to-primary dark:from-primary/50 dark:via-primary/10 flex size-12 items-center justify-center rounded-full bg-radial dark:bg-linear-to-b dark:to-transparent"
            >
              <Icon :name="icon" class="text-primary size-6" />
            </Motion>
          </div>
          <div>
            <Motion
              :variants="{
                init: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
              }"
              as-child
            >
              <h3 class="text-sm font-semibold" v-html="title" />
            </Motion>
            <Motion
              :variants="{
                init: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
              }"
              as-child
            >
              <p class="text-muted-foreground text-sm" v-html="description" />
            </Motion>
            <div class="mt-3 grid grid-cols-2 gap-2 md:flex md:items-center">
              <Motion
                v-for="(action, i) in actions"
                :key="i"
                :variants="{
                  init: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                }"
                as-child
              >
                <UiButton
                  size="sm"
                  :variant="i === 0 ? 'default' : 'outline'"
                  class="h-8 px-3 text-xs"
                >
                  <Icon :name="action.icon" class="size-3.5" />
                  {{ action.label }}
                </UiButton>
              </Motion>
            </div>
          </div>
        </div>

        <Motion
          :variants="{
            init: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="flex shrink-0 items-start gap-2 pl-16 lg:flex-col lg:items-end lg:pl-0"
        >
          <div class="lg:text-right">
            <p class="text-muted-foreground text-xs">{{ timeLabel }}</p>
            <p class="text-sm font-semibold">{{ timeValue }}</p>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      count?: number;
      timeLabel?: string;
      timeValue?: string;
      actions?: Array<{ label: string; icon: string }>;
    }>(),
    {
      title: "You have new notifications",
      description: "Check your inbox for important updates and messages from your team.",
      icon: "lucide:bell",
      count: 5,
      timeLabel: "Last updated",
      timeValue: "2 min ago",
      actions: () => [
        { label: "View all", icon: "lucide:eye" },
        { label: "Mark as read", icon: "lucide:check" },
      ],
    }
  );
</script>
