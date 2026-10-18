<template>
  <!--
    Sticky page header that condenses as you scroll
    Features: Title shrinks and the description collapses smoothly, blurred background and border appear once scrolled, actions stay visible, includes a scrollable demo area
  -->
  <div class="h-[26rem] overflow-y-auto rounded-xl border" @scroll.passive="onScroll">
    <header
      class="sticky top-0 z-10 border-b transition-[background-color,box-shadow,border-color] duration-300"
      :class="
        condensed
          ? 'bg-background/85 supports-backdrop-filter:bg-background/70 shadow-sm backdrop-blur'
          : 'bg-background border-transparent'
      "
    >
      <div
        class="flex items-center justify-between gap-4 px-4 transition-[padding] duration-300 md:px-8"
        :class="condensed ? 'py-3' : 'py-6'"
      >
        <div class="min-w-0">
          <slot name="title">
            <h1
              class="origin-left font-bold tracking-tight transition-[font-size] duration-300"
              :class="condensed ? 'text-lg' : 'text-3xl'"
            >
              {{ props.title }}
            </h1>
          </slot>
          <div
            class="grid transition-[grid-template-rows,opacity] duration-300"
            :class="condensed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'"
          >
            <div class="overflow-hidden">
              <slot name="description">
                <p class="text-muted-foreground mt-1.5 text-sm">{{ props.description }}</p>
              </slot>
            </div>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <slot>
            <UiButton variant="outline" :size="condensed ? 'sm' : 'default'">
              <Icon name="lucide:filter" class="size-4" />
              <span class="hidden sm:inline">Filter</span>
            </UiButton>
            <UiButton :size="condensed ? 'sm' : 'default'">
              <Icon name="lucide:plus" class="size-4" />
              New
            </UiButton>
          </slot>
        </div>
      </div>
    </header>

    <slot name="content">
      <ul class="divide-y px-4 md:px-8">
        <li v-for="row in 24" :key="row" class="flex items-center gap-4 py-4">
          <span class="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
            <Icon name="lucide:file-text" class="text-muted-foreground size-5" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">Quarterly report {{ row }}</p>
            <p class="text-muted-foreground truncate text-xs">Updated {{ row }} days ago</p>
          </div>
          <UiBadge variant="secondary">Draft</UiBadge>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      /** How far the user must scroll, in pixels, before the header condenses. */
      threshold?: number;
    }>(),
    {
      title: "Reports",
      description: "Scroll the list below. The header shrinks to give your content more room.",
      threshold: 24,
    }
  );

  // A small hysteresis stops the header flickering when the scroll position hovers at the edge.
  const condensed = ref(false);

  function onScroll(event: Event) {
    const top = (event.currentTarget as HTMLElement).scrollTop;
    if (!condensed.value && top > props.threshold + 8) condensed.value = true;
    else if (condensed.value && top < props.threshold - 8) condensed.value = false;
  }
</script>
