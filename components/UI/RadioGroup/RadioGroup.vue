<template>
  <RadioGroupRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot></slot>
  </RadioGroupRoot>
</template>

<script lang="ts" setup>
  import { RadioGroupRoot, useForwardPropsEmits } from "radix-vue";
  import type { RadioGroupRootEmits, RadioGroupRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      RadioGroupRootProps & {
        class?: any;
      }
    >(),
    {
      orientation: "vertical",
      loop: true,
    }
  );

  const emits = defineEmits<RadioGroupRootEmits>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({ base: "grid gap-3" });
</script>
