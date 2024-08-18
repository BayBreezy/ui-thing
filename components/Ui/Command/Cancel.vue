<template>
  <ComboboxCancel v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <Icon name="lucide:x" class="h-4 w-4 text-muted-foreground/70" />
    </slot>
  </ComboboxCancel>
</template>

<script lang="ts" setup>
  import { ComboboxCancel } from "radix-vue";
  import type { ComboboxCancelProps } from "radix-vue";

  const props = defineProps<ComboboxCancelProps & { class?: any }>();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
