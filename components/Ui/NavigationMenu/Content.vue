<template>
  <NavigationMenuContent v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </NavigationMenuContent>
</template>

<script lang="ts" setup>
  import { NavigationMenuContent, useForwardPropsEmits } from "radix-vue";
  import type { NavigationMenuContentEmits, NavigationMenuContentProps } from "radix-vue";

  const props = defineProps<
    NavigationMenuContentProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const emits = defineEmits<NavigationMenuContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
  });
</script>
