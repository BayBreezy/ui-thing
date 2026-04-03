<template>
  <UiInput
    v-bind="forwarded"
    data-slot="input-group-input"
    :class="inputGroupInputStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </UiInput>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";

  import type { InputProps } from "@/components/Ui/Input.vue";

  const inputGroupInputStyles = tv({
    base: "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
  });
</script>

<script lang="ts" setup>
  const props = defineProps<InputProps>();

  const forwarded = reactiveOmit(props, ["class"]);
</script>
