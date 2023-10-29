<template>
  <SelectIcon v-bind="forwarded">
    <slot>
      <Icon :class="styles({ class: props.class })" :name="icon || 'lucide:chevrons-up-down'" />
    </slot>
  </SelectIcon>
</template>

<script lang="ts" setup>
  import { SelectIcon, useForwardProps } from "radix-vue";
  import type { SelectIconProps } from "radix-vue";

  const props = defineProps<
    SelectIconProps & {
      icon?: string;
      class?: any;
    }
  >();

  const styles = tv({
    base: "h-4 w-4 shrink-0 text-muted-foreground opacity-70",
  });

  const forwarded = useForwardProps(useOmit(props, ["icon", "class"]));
</script>
