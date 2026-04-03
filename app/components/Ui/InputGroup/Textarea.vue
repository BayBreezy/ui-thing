<template>
  <UiTextarea
    v-bind="forwarded"
    data-slot="input-group-textarea"
    :class="inputGroupTextareaStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </UiTextarea>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";

  import type { TextareaProps } from "@/components/Ui/Textarea.vue";

  const inputGroupTextareaStyles = tv({
    base: "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
  });
</script>

<script lang="ts" setup>
  const props = defineProps<TextareaProps>();

  const forwarded = reactiveOmit(props, ["class"]);
</script>
