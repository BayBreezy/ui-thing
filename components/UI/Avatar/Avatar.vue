<template>
  <AvatarRoot :class="styles({ class: props.class })">
    <slot>
      <slot name="image">
        <UIAvatarImage
          @loading-status-change="onLoadingStatusChange"
          v-if="src"
          :src="src"
          :alt="alt"
          :class="imageClass"
        />
      </slot>
      <slot name="fallback">
        <UIAvatarFallback :delay-ms="delayMs" :class="fallbackClass" :fallback="fallback" />
      </slot>
    </slot>
  </AvatarRoot>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      imageClass?: any;
      fallbackClass?: any;
      src?: string;
      alt?: string;
      fallback?: string;
      delayMs?: number;
      onLoadingStatusChange?: (v: "idle" | "loading" | "loaded" | "error") => void;
    }>(),
    {}
  );
  const styles = tv({
    base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  });
</script>
