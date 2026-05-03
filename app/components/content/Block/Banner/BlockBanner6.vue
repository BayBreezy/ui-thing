<template>
  <Motion :variants="parentVariant" while-in-view="animate" initial="initial">
    <div class="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:p-5">
      <Motion
        :variants="iconVariant"
        :transition="{ type: 'spring', stiffness: 200, damping: 25 }"
        class="border-primary/50 bg-primary/5 flex size-16 shrink-0 items-center justify-center rounded-xl border-2 border-dashed"
      >
        <Icon :name="icon" class="text-primary size-6" />
      </Motion>

      <div class="flex-1">
        <div class="flex items-start justify-between gap-3">
          <div>
            <Motion :variants="childVariant" :transition="{ delay: 0.1 }">
              <div class="flex items-center gap-2">
                <h3 class="font-bold" v-html="title" />
                <UiBadge variant="default" class="h-5 text-xs">
                  {{ badgeText }}
                </UiBadge>
              </div>
            </Motion>
            <Motion :variants="childVariant" :transition="{ delay: 0.2 }">
              <p class="text-muted-foreground text-sm" v-html="description" />
            </Motion>
            <Motion :variants="childVariant" :transition="{ delay: 0.3 }">
              <div class="mt-2 flex flex-wrap gap-2">
                <UiBadge v-for="feature in features" :key="feature" variant="outline">
                  <Icon name="lucide:check" class="size-3.5" />
                  {{ feature }}
                </UiBadge>
              </div>
            </Motion>
          </div>
          <UiButton
            class="absolute top-4 right-4 shrink-0 lg:hidden"
            size="icon-sm"
            variant="ghost"
          >
            <Icon name="lucide:x" class="text-muted-foreground size-4" />
          </UiButton>
        </div>
      </div>

      <Motion
        :variants="buttonVariant"
        :transition="{ delay: 0.4 }"
        class="grid shrink-0 grid-cols-2 gap-2 lg:flex lg:items-end"
      >
        <UiButton size="sm">
          Upgrade Now
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
        <UiButton variant="outline" size="sm"> View pricing </UiButton>
      </Motion>

      <UiButton class="hidden shrink-0 lg:flex" size="icon-sm" variant="ghost">
        <Icon name="lucide:x" class="text-muted-foreground size-4" />
      </UiButton>
    </div>

    <Motion
      :variants="progressVariant"
      class="from-primary via-primary/50 h-1 origin-left bg-linear-to-r to-transparent"
    />
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: stagger(0.1) } },
  };
  const iconVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
  };
  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };
  const buttonVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };
  const progressVariant: MotionProps["variants"] = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 1 } },
  };
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      badgeText?: string;
      features?: string[];
    }>(),
    {
      title: "Upgrade to Pro",
      description: "Unlock advanced features and take your experience to the next level.",
      icon: "lucide:crown",
      badgeText: "50% OFF",
      features: () => ["Unlimited projects", "Priority support", "Advanced analytics"],
    }
  );
</script>
