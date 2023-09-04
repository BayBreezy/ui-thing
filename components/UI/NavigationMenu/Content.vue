<template>
  <NavigationMenuContent
    :as-child="asChild"
    :disable-outside-pointer-events="disableOutsidePointerEvents"
    :forceMount="forceMount"
    @escapeKeyDown="emits('escapeKeyDown', $event)"
    @pointerDownOutside="emits('pointerDownOutside', $event)"
    @focusOutside="emits('focusOutside', $event)"
    @interactOutside="emits('interactOutside', $event)"
    :class="styles({ class: props.class })"
  >
    <slot></slot>
  </NavigationMenuContent>
</template>

<script lang="ts" setup>
  import { type NavigationMenuContentEmits } from "radix-vue/dist/NavigationMenu/NavigationMenuContent";
  const props = defineProps<{
    asChild?: boolean;
    disableOutsidePointerEvents?: boolean;
    forceMount?: boolean;
    class?: any;
  }>();

  const emits = defineEmits<{
    escapeKeyDown: NavigationMenuContentEmits["escapeKeyDown"];
    pointerDownOutside: NavigationMenuContentEmits["pointerDownOutside"];
    focusOutside: NavigationMenuContentEmits["focusOutside"];
    interactOutside: NavigationMenuContentEmits["interactOutside"];
  }>();

  const styles = tv({
    base: "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
  });
</script>
