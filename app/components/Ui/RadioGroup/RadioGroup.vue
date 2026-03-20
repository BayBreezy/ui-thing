<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </RadioGroupRoot>
</template>

<script lang="ts" setup>
  import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      RadioGroupRootProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
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
