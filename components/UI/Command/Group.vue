<template>
  <ComboboxGroup :as-child="asChild" :class="styles({ class: props.class })">
    <slot name="heading">
      <UICommandLabel v-if="heading" :label="heading" />
    </slot>
    <slot> </slot>
  </ComboboxGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    heading?: any;
    class?: any;
  }>();

  const styles = tv({
    base: "overflow-hidden p-1 text-foreground",
  });
</script>
