<template>
  <ComboboxContent
    data-slot="autocomplete-content"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <UiAutocompleteViewport>
      <slot />
    </UiAutocompleteViewport>
  </ComboboxContent>
</template>

<script lang="ts" setup>
  import { ComboboxContent, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComboboxContentEmits, ComboboxContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      ComboboxContentProps & {
        /** Custom class(es) to add to the content */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      position: "popper",
      bodyLock: true,
      side: "bottom",
      sideOffset: 8,
      class: undefined,
    }
  );

  const emits = defineEmits<ComboboxContentEmits>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "z-50 max-h-[300px] w-(--reka-combobox-trigger-width) min-w-[8rem] overflow-hidden overflow-y-auto rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  });
</script>
