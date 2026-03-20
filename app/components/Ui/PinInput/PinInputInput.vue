<template>
  <PinInputInput
    data-slot="pin-input-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { PinInputInput } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PinInputInputProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PinInputInputProps & {
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: [
      "size-9 rounded-md border border-input bg-transparent p-1 text-center text-sm font-medium shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    ],
  });
</script>
