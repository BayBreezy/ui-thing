<template>
  <Motion
    while-in-view="animate"
    initial="initial"
    :variants="{
      initial: { opacity: 0, y: 5 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.1) },
      },
    }"
    class="w-full overflow-hidden border-b p-4"
  >
    <div class="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex flex-1 items-start gap-4">
        <Motion
          :variants="{
            initial: { scale: 0, rotate: -180 },
            animate: { scale: 1, rotate: 0 },
          }"
          class="flex size-16 items-center justify-center rounded-full bg-radial via-primary/5 to-primary/40"
        >
          <Icon :name="icon" class="size-6 text-primary" />
        </Motion>

        <div class="flex-1">
          <Motion
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            as-child
          >
            <h3 class="text-lg font-bold" v-html="title" />
          </Motion>

          <Motion
            as-child
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <p class="text-sm text-muted-foreground" v-html="description" />
          </Motion>

          <div class="mt-2 flex items-center gap-3">
            <Motion
              v-for="(stat, i) in stats"
              :key="i"
              :variants="{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
              }"
              class="flex items-center gap-1.5"
            >
              <Icon :name="stat.icon" class="size-4 text-muted-foreground" />
              <span class="text-sm font-semibold">{{ stat.value }}</span>
              <span class="text-sm text-muted-foreground">{{ stat.label }}</span>
            </Motion>
          </div>
        </div>
      </div>

      <Motion
        :variants="{
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
        }"
        as-child
      >
        <div class="grid grid-cols-2 gap-2 pl-20 lg:flex lg:items-center lg:pl-0">
          <UiButton size="sm" variant="outline">
            {{ secondaryButtonText }}
          </UiButton>
          <UiButton size="sm">
            {{ primaryButtonText }}
            <Icon name="lucide:external-link" class="size-4" />
          </UiButton>
          <UiButton class="hidden lg:flex" size="icon-sm" variant="ghost">
            <Icon name="lucide:x" class="size-3.5 text-muted-foreground" />
          </UiButton>
        </div>
      </Motion>

      <UiButton class="absolute top-0 right-2 z-10 lg:hidden" size="icon-sm" variant="ghost">
        <Icon name="lucide:x" class="size-3.5 text-muted-foreground" />
      </UiButton>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      badgeText?: string;
      primaryButtonText?: string;
      secondaryButtonText?: string;
      linkText?: string;
      stats?: Array<{ icon: string; value: string; label: string }>;
    }>(),
    {
      title: "Summer Sale Event",
      description:
        "Don't miss out on our biggest sale of the year. Exclusive deals on all products.",
      icon: "lucide:gift",
      badgeText: "Limited Time",
      primaryButtonText: "Shop Now",
      secondaryButtonText: "Browse",
      linkText: "Terms apply",
      stats: () => [
        { icon: "lucide:clock", value: "3", label: "days left" },
        { icon: "lucide:tag", value: "50%", label: "off" },
      ],
    }
  );
</script>
