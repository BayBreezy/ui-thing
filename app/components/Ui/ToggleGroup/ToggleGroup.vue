<template>
  <ToggleGroupRoot
    v-slot="{ modelValue }"
    data-slot="toggle-group"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :model-value="modelValue" />
  </ToggleGroupRoot>
</template>

<script lang="ts" setup>
  import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ToggleVariants } from "../Toggle.vue";
  import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ToggleGroupRootProps & {
        /** custom class to add to the parent */
        class?: HTMLAttributes["class"];
        variant?: ToggleVariants["variant"];
        size?: ToggleVariants["size"];
      }
    >(),
    {
      type: "single",
    }
  );

  const emit = defineEmits<ToggleGroupRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"), emit);

  const styles = tv({
    base: "flex items-center justify-center gap-1",
  });

  provide("toggleGroup", { variant: props.variant, size: props.size });
</script>
