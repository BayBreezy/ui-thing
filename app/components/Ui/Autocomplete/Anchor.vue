<template>
  <ComboboxAnchor
    data-slot="autocomplete-anchor"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ComboboxAnchor>
</template>

<script lang="ts" setup>
  import { ComboboxAnchor } from "reka-ui";
  import type { ComboboxAnchorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxAnchorProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "border-input bg-background selection:bg-primary selection:text-primary-foreground focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex h-9 w-full items-center rounded-md border px-3 text-base shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] focus-within:outline-none",
  });
</script>
