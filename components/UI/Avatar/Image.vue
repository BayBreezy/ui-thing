<template>
  <AvatarImage
    @loading-status-change="onLoadingStatusChange"
    :class="styles({ class: props.class })"
    :as-child="asChild"
    :src="src"
    :alt="alt"
  />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    src: string;
    alt?: string;
    asChild?: boolean;
    class?: any;
    onLoadingStatusChange?: (v: "idle" | "loading" | "loaded" | "error") => void;
  }>();

  const styles = tv({
    base: "aspect-square h-full w-full object-cover",
  });
</script>
