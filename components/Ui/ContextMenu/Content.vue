<template>
  <UiContextMenuPortal>
    <ContextMenuContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ class: props.class })"
    >
      <slot />
    </ContextMenuContent>
  </UiContextMenuPortal>
</template>

<script lang="ts" setup>
  import { ContextMenuContent, useForwardPropsEmits } from "radix-vue";
  import type { ContextMenuContentEmits, ContextMenuContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      ContextMenuContentProps & {
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      loop: true,
      avoidCollisions: true,
      collisionPadding: 5,
      sticky: "partial",
    }
  );

  const emits = defineEmits<ContextMenuContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
