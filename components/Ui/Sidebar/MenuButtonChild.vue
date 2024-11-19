<template>
  <Primitive
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    :class="sidebarMenuButtonVariants({ variant, size, class: props.class })"
    :as="as"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";
  import type { HTMLAttributes } from "vue";

  export interface SidebarMenuButtonProps extends PrimitiveProps {
    /**
     * The variant of the button.
     * @default "default"
     */
    variant?: SidebarMenuButtonVariants["variant"];
    /**
     * The size of the button.
     * @default "default"
     */
    size?: SidebarMenuButtonVariants["size"];
    /**
     * Whether the button is active.
     */
    isActive?: boolean;
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
    as: "button",
    variant: "default",
    size: "default",
  });
</script>
