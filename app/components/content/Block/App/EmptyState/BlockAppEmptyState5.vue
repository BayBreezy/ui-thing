<template>
  <!--
    Empty dashboard with a ghost preview behind a call to action
    Features: Faded stat tiles, chart and table skeletons showing what the page will look like, an overlay card with primary and secondary actions
  -->
  <div class="flex items-center justify-center px-4 py-10 sm:px-6">
    <div class="relative w-full max-w-3xl overflow-hidden rounded-2xl border">
      <div class="mask-[linear-gradient(to_bottom,black_35%,transparent)] p-5" aria-hidden="true">
        <div class="grid grid-cols-3 gap-3">
          <div v-for="stat in 3" :key="stat" class="bg-card rounded-xl border p-4">
            <div class="bg-muted h-2 w-1/2 rounded-full" />
            <div class="bg-muted mt-3 h-5 w-2/3 rounded-md" />
            <div class="bg-muted/70 mt-3 h-2 w-1/3 rounded-full" />
          </div>
        </div>
        <div class="bg-card mt-3 rounded-xl border p-4">
          <div class="bg-muted h-2.5 w-24 rounded-full" />
          <div class="mt-6 flex h-32 items-end gap-3">
            <div
              v-for="(bar, i) in bars"
              :key="i"
              class="bg-muted flex-1 rounded-t-md"
              :style="{ height: `${bar}%` }"
            />
          </div>
        </div>
        <div class="mt-3 space-y-2">
          <div
            v-for="row in 3"
            :key="row"
            class="bg-card flex items-center gap-3 rounded-lg border p-3"
          >
            <div class="bg-muted size-7 rounded-full" />
            <div class="bg-muted h-2 flex-1 rounded-full" />
            <div class="bg-muted/70 h-2 w-12 rounded-full" />
          </div>
        </div>
      </div>

      <div class="absolute inset-0 flex items-center justify-center p-4">
        <Motion
          class="bg-background/95 flex w-full max-w-sm flex-col items-center rounded-2xl border p-7 text-center shadow-xl backdrop-blur"
          :initial="{ opacity: 0, y: 16, scale: 0.97 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ type: 'spring', stiffness: 140, damping: 18 }"
        >
          <div
            class="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl"
          >
            <Icon :name="props.icon" class="size-6" />
          </div>
          <slot name="title">
            <h2 class="mt-4 text-lg font-bold tracking-tight">{{ props.title }}</h2>
          </slot>
          <slot name="description">
            <p class="text-muted-foreground mt-1.5 text-sm text-balance">{{ props.description }}</p>
          </slot>
          <slot>
            <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
              <UiButton>
                <Icon name="lucide:plug-zap" class="size-4" />
                Connect data
              </UiButton>
              <UiButton variant="outline">
                <Icon name="lucide:book-open" class="size-4" />
                Learn more
              </UiButton>
            </div>
          </slot>
        </Motion>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
    }>(),
    {
      title: "Your dashboard is waiting",
      description: "Connect a data source and your metrics, charts and activity will appear here.",
      icon: "lucide:layout-dashboard",
    }
  );

  const bars = [35, 55, 42, 70, 52, 85, 60, 78, 48, 66];
</script>
