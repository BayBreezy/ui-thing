<template>
  <MenubarRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </MenubarRoot>
</template>

<script lang="ts" setup>
  import { MenubarRoot, useForwardPropsEmits } from "radix-vue";
  import type { MenubarRootEmits, MenubarRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      MenubarRootProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      loop: true,
    }
  );

  const emits = defineEmits<MenubarRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "inline-flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
  });
</script>
