<template>
  <!-- <UiAutocompletePortal> -->
  <ComboboxContent v-bind="forwarded" :class="styles({ class: props.class })">
    <UiAutocompleteViewport>
      <slot />
    </UiAutocompleteViewport>
  </ComboboxContent>
  <!-- </UiAutocompletePortal> -->
</template>

<script lang="ts" setup>
  import { ComboboxContent, useForwardPropsEmits } from "radix-vue";
  import type { ComboboxContentEmits, ComboboxContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      ComboboxContentProps & {
        class?: any;
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
    base: "z-50 max-h-[300px] w-[var(--radix-popper-anchor-width)] min-w-[8rem] overflow-hidden overflow-y-auto rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
