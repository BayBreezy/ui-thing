<template>
  <UISelectPortal :to="to">
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ position, class: props.class })"
    >
      <UISelectScrollUpButton />
      <UISelectViewport :position="position">
        <slot></slot>
      </UISelectViewport>
      <UISelectScrollDownButton />
    </SelectContent>
  </UISelectPortal>
</template>

<script lang="ts" setup>
  import { SelectContent, useForwardPropsEmits } from "radix-vue";
  import type { SelectContentEmits, SelectContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      SelectContentProps & {
        to?: string | HTMLElement;
        class?: any;
      }
    >(),
    {
      position: "popper",
      side: "bottom",
      align: "start",
      avoidCollisions: true,
      sticky: "partial",
    }
  );

  const emits = defineEmits<SelectContentEmits>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    variants: {
      position: {
        popper:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        "item-aligned": "",
      },
    },
  });
</script>
