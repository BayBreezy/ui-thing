<template>
  <UiContextMenuPortal>
    <ContextMenuSubContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ class: props.class })"
    >
      <slot />
    </ContextMenuSubContent>
  </UiContextMenuPortal>
</template>

<script lang="ts" setup>
  import { ContextMenuSubContent, useForwardPropsEmits } from "radix-vue";
  import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      ContextMenuSubContentProps & {
        /**Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      loop: true,
      avoidCollisions: true,
      collisionPadding: 8,
      sticky: "partial",
    }
  );

  const emits = defineEmits<ContextMenuSubContentEmits>();

  const styles = tv({
    base: "z-50 min-w-[100px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });

  const forwarded = useForwardPropsEmits(props, emits);
</script>
