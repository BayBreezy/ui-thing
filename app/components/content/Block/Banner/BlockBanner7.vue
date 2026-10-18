<template>
  <!--
    Upgrade banner driven by plan usage
    Features: Usage meter that turns amber near the limit, list of what Pro unlocks, primary and secondary actions, left accent edge, dismiss
  -->
  <div class="px-4 py-6">
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="overflow-hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <div
          class="bg-card relative mx-auto flex max-w-4xl overflow-hidden rounded-xl border shadow-sm"
        >
          <div class="w-1.5 shrink-0" :class="nearLimit ? 'bg-amber-500' : 'bg-primary'" />
          <div class="flex flex-1 flex-col gap-5 p-5 pr-12 lg:flex-row lg:items-center lg:gap-8">
            <div class="flex-1 space-y-3">
              <div class="flex items-center gap-2">
                <UiFancyIcon
                  icon="lucide:crown"
                  theme="light"
                  :color="nearLimit ? 'warning' : 'primary'"
                  size="sm"
                />
                <h3 class="font-semibold">
                  {{
                    nearLimit ? "You're close to your project limit" : "Get more out of your plan"
                  }}
                </h3>
                <UiBadge v-if="props.discount" variant="secondary">{{ props.discount }}</UiBadge>
              </div>
              <div>
                <div class="mb-1.5 flex justify-between text-xs">
                  <span class="text-muted-foreground">Projects used</span>
                  <span class="font-medium tabular-nums"
                    >{{ props.used }} of {{ props.limit }}</span
                  >
                </div>
                <div class="bg-muted h-2 overflow-hidden rounded-full">
                  <div
                    class="h-full rounded-full transition-[width] duration-700"
                    :class="nearLimit ? 'bg-amber-500' : 'bg-primary'"
                    :style="{ width: `${percent}%` }"
                  />
                </div>
              </div>
              <ul class="flex flex-wrap gap-x-4 gap-y-1.5">
                <li
                  v-for="perk in props.perks"
                  :key="perk"
                  class="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                  <Icon name="lucide:check" class="text-primary size-3.5" />
                  {{ perk }}
                </li>
              </ul>
            </div>
            <div class="flex shrink-0 flex-wrap gap-2">
              <slot>
                <UiButton>
                  Upgrade to Pro
                  <Icon name="lucide:arrow-right" class="size-4" />
                </UiButton>
                <UiButton variant="outline">Compare plans</UiButton>
              </slot>
            </div>
          </div>
          <button
            type="button"
            class="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 flex size-7 items-center justify-center rounded-md transition-colors"
            aria-label="Dismiss upgrade banner"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="text-center">
      <UiButton variant="ghost" size="sm" @click="visible = true">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      used?: number;
      limit?: number;
      discount?: string;
      perks?: string[];
    }>(),
    {
      used: 9,
      limit: 10,
      discount: "20% off annual",
      perks: () => ["Unlimited projects", "Priority support", "Advanced analytics"],
    }
  );

  const percent = computed(() => Math.min(100, (props.used / props.limit) * 100));
  const nearLimit = computed(() => percent.value >= 80);
  const visible = ref(true);
</script>
