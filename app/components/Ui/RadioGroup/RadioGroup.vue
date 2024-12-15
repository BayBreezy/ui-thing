<template>
  <RadioGroupRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </RadioGroupRoot>
</template>

<script lang="ts" setup>
  import { RadioGroupRoot, useForwardPropsEmits } from "radix-vue";
  import type { RadioGroupRootEmits, RadioGroupRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      RadioGroupRootProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      orientation: "vertical",
      loop: true,
    }
  );

  const emits = defineEmits<RadioGroupRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({ base: "grid gap-3" });
</script>
