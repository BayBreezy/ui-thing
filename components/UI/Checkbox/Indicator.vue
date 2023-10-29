<template>
  <CheckboxIndicator :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>
      <Icon :name="icon" class="h-4 w-4" />
    </slot>
  </CheckboxIndicator>
</template>

<script lang="ts" setup>
  import { CheckboxIndicator, useForwardProps } from "radix-vue";
  import type { CheckboxIndicatorProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      CheckboxIndicatorProps & {
        class?: any;
        icon?: string;
      }
    >(),
    {
      icon: "lucide:check",
    }
  );
  const forwarded = useForwardProps(useOmit(props, ["icon", "class"]));

  const styles = tv({
    base: "flex items-center justify-center text-current",
  });
</script>
