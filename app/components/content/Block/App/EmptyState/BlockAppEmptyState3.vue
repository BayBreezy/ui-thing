<template>
  <!--
    No data with a pulsing orbit illustration
    Features: Dashed concentric rings with icon tiles, softly pulsing outer ring, create and refresh actions
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="flex w-full max-w-md flex-col items-center text-center">
      <div class="relative flex size-56 items-center justify-center" aria-hidden="true">
        <Motion
          class="border-border absolute inset-0 rounded-full border border-dashed"
          :animate="{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
        />
        <div class="border-border absolute inset-9 rounded-full border border-dashed" />
        <div
          class="from-primary/10 absolute inset-[4.5rem] rounded-full bg-radial to-transparent"
        />

        <div
          v-for="(tile, i) in tiles"
          :key="tile.icon"
          class="bg-background absolute flex size-11 items-center justify-center rounded-xl border shadow-sm"
          :class="tile.position"
        >
          <Motion
            :animate="{ y: [0, -4, 0] }"
            :transition="{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }"
          >
            <Icon :name="tile.icon" class="text-muted-foreground size-5" />
          </Motion>
        </div>

        <div
          class="bg-primary text-primary-foreground relative flex size-16 items-center justify-center rounded-2xl shadow-lg"
        >
          <Icon :name="props.icon" class="size-8" />
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-2">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground text-sm text-balance">{{ props.description }}</p>
        </slot>
      </div>

      <slot>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
          <UiButton>
            <Icon name="lucide:plus" class="size-4" />
            Create new
          </UiButton>
          <UiButton variant="outline">
            <Icon name="lucide:refresh-ccw" class="size-4" />
            Refresh
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
      icon?: string;
    }>(),
    {
      title: "No data yet",
      description:
        "Once something is created or imported it will show up here. You can also refresh to check for new activity.",
      icon: "lucide:database",
    }
  );

  const tiles = [
    { icon: "lucide:file-text", position: "top-3 left-10" },
    { icon: "lucide:calendar", position: "top-8 right-5" },
    { icon: "lucide:users", position: "bottom-5 left-6" },
  ];
</script>
