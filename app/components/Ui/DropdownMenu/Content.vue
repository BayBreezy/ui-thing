<template>
  <UiDropdownMenuPortal>
    <DropdownMenuContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ class: props.class })"
    >
      <slot />
    </DropdownMenuContent>
  </UiDropdownMenuPortal>
</template>

<script lang="ts" setup>
  import { DropdownMenuContent, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      DropdownMenuContentProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      loop: true,
      align: "center",
      sideOffset: 5,
      side: "bottom",
      avoidCollisions: true,
      sticky: "partial",
    }
  );

  const emits = defineEmits<DropdownMenuContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
