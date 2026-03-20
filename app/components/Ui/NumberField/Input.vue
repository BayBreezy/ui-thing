<template>
  <NumberFieldInput
    data-slot="number-field-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { NumberFieldInput, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { NumberFieldInputProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      NumberFieldInputProps & {
        class?: HTMLAttributes["class"];
      }
    >(),
    {}
  );

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "h-full w-full grow bg-transparent text-center text-sm placeholder:text-muted-foreground/80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
