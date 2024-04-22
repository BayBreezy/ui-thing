<template>
  <SwitchThumb :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </SwitchThumb>
</template>

<script lang="ts" setup>
  import { SwitchThumb } from "radix-vue";
  import type { SwitchThumbProps } from "radix-vue";

  const props = defineProps<
    SwitchThumbProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();

  const styles = tv({
    base: "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  });
</script>
