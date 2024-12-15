<template>
  <ToggleGroupRoot
    v-slot="{ modelValue }"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot :model-value="modelValue" />
  </ToggleGroupRoot>
</template>

<script lang="ts" setup>
  import { ToggleGroupRoot, useForwardPropsEmits } from "radix-vue";
  import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ToggleGroupRootProps & {
        /** custom class to add to the parent */
        class?: any;
      }
    >(),
    {
      type: "single",
    }
  );

  const emit = defineEmits<ToggleGroupRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);

  const styles = tv({
    base: "flex items-center justify-center gap-1",
  });
</script>
