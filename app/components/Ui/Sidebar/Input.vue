<template>
  <UiInput
    v-model="model"
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="sideBarInputStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </UiInput>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarInputStyles = tv({
    base: "h-8 w-full bg-background shadow-none",
  });
</script>
<script setup lang="ts">
  const props = defineProps<{
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  }>();

  const model = defineModel<any>();
</script>
