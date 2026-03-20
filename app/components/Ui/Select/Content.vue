<template>
  <UiSelectPortal :to="to">
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ position, class: normalizeClass(props.class) || undefined })"
    >
      <UiSelectScrollUpButton />
      <UiSelectViewport :position="position">
        <slot />
      </UiSelectViewport>
      <UiSelectScrollDownButton />
    </SelectContent>
  </UiSelectPortal>
</template>

<script lang="ts" setup>
  import { SelectContent, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { SelectContentEmits, SelectContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      SelectContentProps & {
        /** Where to render the portal */
        to?: string | HTMLElement;
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      position: "popper",
      side: "bottom",
      align: "center",
      avoidCollisions: true,
      sticky: "partial",
    }
  );

  const emits = defineEmits<SelectContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);

  const styles = tv({
    base: "relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] origin-(--reka-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    variants: {
      position: {
        popper:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        "item-aligned": "",
      },
    },
  });
</script>
