<template>
  <AutocompleteInput
    data-slot="autocomplete-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { AutocompleteInput, useForwardPropsEmits } from "reka-ui";
  import type { AutocompleteInputEmits, AutocompleteInputProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    AutocompleteInputProps & {
      /** Custom placeholder text for the input. */
      placeholder?: HTMLAttributes["placeholder"];
      /** Custom class(es) to add to the input. */
      class?: HTMLAttributes["class"];
    }
  >();

  const emits = defineEmits<AutocompleteInputEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground size-full min-w-0 grow rounded bg-transparent focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
