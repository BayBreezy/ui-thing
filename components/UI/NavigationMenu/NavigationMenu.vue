<template>
  <NavigationMenuRoot
    :class="styles({ class: props.class })"
    :model-value="modelValue"
    :default-value="props.defaultValue"
    :delay-duration="props.delayDuration"
    :skip-delay-duration="props.skipDelayDuration"
    :dir="props.dir"
    :orientation="props.orientation"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <slot></slot>
    <UINavigationMenuViewport />
  </NavigationMenuRoot>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    modelValue?: string;
    defaultValue?: string;
    delayDuration?: number;
    skipDelayDuration?: number;
    dir?: "ltr" | "rtl";
    orientation?: "horizontal" | "vertical";
  }>();

  const styles = tv({
    base: "relative flex max-w-max flex-1 items-center justify-center",
  });

  const emits = defineEmits<{
    "update:modelValue": [value: string];
  }>();
</script>
