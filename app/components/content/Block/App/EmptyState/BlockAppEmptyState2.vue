<template>
  <!--
    No payment methods with a fanned card illustration
    Features: Three stacked cards built from theme tokens so it works in dark mode, add button badge, primary and secondary actions
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="flex w-full max-w-md flex-col items-center gap-8 text-center">
      <slot name="image">
        <Motion
          class="relative h-40 w-56"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ type: 'spring', stiffness: 120, damping: 18 }"
          aria-hidden="true"
        >
          <div class="bg-muted/60 absolute inset-x-2 top-3 h-32 -rotate-12 rounded-2xl border" />
          <div class="bg-muted absolute inset-x-2 top-3 h-32 rotate-6 rounded-2xl border" />
          <div
            class="bg-card absolute inset-x-0 top-6 h-32 rounded-2xl border p-4 text-left shadow-lg"
          >
            <div class="bg-muted/80 h-5 w-7 rounded" />
            <div class="mt-8 flex gap-3">
              <div v-for="n in 4" :key="n" class="bg-muted h-2.5 w-8 rounded-full" />
            </div>
            <div class="mt-3 flex justify-between">
              <div class="bg-muted/70 h-2 w-14 rounded-full" />
              <div class="bg-muted/70 h-2 w-8 rounded-full" />
            </div>
          </div>
          <div
            class="bg-primary text-primary-foreground absolute -right-1 bottom-0 flex size-10 items-center justify-center rounded-full border-4 shadow-md"
            :style="{ borderColor: 'var(--background)' }"
          >
            <Icon name="lucide:plus" class="size-5" />
          </div>
        </Motion>
      </slot>

      <div class="flex flex-col gap-2">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground text-sm text-balance">{{ props.description }}</p>
        </slot>
      </div>

      <slot>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UiButton>
            <Icon name="lucide:credit-card" class="size-4" />
            Add payment method
          </UiButton>
          <UiButton variant="ghost">
            <Icon name="lucide:shield-check" class="size-4" />
            How we protect it
          </UiButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "No payment methods yet",
      description:
        "Add a card to start your subscription. We never store full card numbers on our servers.",
    }
  );
</script>
