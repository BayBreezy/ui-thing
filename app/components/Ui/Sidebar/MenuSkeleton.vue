<template>
  <div
    data-sidebar="menu-skeleton"
    :class="sideBarMenuSkeletonStyles().wrapper({ class: props.class })"
  >
    <UiSkeleton
      v-if="showIcon"
      :class="sideBarMenuSkeletonStyles().skeleton1()"
      data-sidebar="menu-skeleton-icon"
    />

    <UiSkeleton
      :class="sideBarMenuSkeletonStyles().skeleton2()"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarMenuSkeletonStyles = tv({
    slots: {
      wrapper: "flex h-8 items-center gap-2 rounded-md px-2",
      skeleton1: "size-4 rounded-md",
      skeleton2: "h-4 max-w-[--skeleton-width] flex-1",
    },
  });
</script>
<script setup lang="ts">
  const props = defineProps<{
    /**
     * Whether to show the icon skeleton.
     */
    showIcon?: boolean;
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  }>();

  const width = computed(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });
</script>
