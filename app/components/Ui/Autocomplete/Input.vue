<template>
  <ComboboxInput
    data-slot="autocomplete-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { ComboboxInput, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComboboxInputEmits, ComboboxInputProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxInputProps & {
      /** Custom placeholder text for the input */
      placeholder?: HTMLAttributes["placeholder"];
      /** Custom class(es) to add to the input */
      class?: HTMLAttributes["class"];
    }
  >();

  const emits = defineEmits<ComboboxInputEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "size-full min-w-0 grow rounded bg-transparent selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
