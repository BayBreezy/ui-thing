<template>
  <MenubarItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </MenubarItemIndicator>
</template>

<script lang="ts" setup>
  import { MenubarItemIndicator } from "radix-vue";
  import type { MenubarItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    MenubarItemIndicatorProps & {
      /** The icon to display */
      icon?: string;
      /** The class(es) to apply to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "flex shrink-0 items-center justify-center",
  });
</script>
