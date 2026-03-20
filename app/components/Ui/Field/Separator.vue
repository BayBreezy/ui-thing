<template>
  <div
    data-slot="field-separator"
    :data-content="!!$slots.default"
    :class="fieldSeparatorStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <UiSeparator class="absolute inset-0 top-1/2" />
    <span
      v-if="$slots.default"
      className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const fieldSeparatorStyles = tv({
    base: ["relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2"],
  });
</script>
<script lang="ts" setup>
  const props = defineProps<{
    /**
     * Additional classes to apply to the element.
     */
    class?: HTMLAttributes["class"];
  }>();
</script>
