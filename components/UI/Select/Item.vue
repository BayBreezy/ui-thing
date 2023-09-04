<template>
  <SelectItem
    :value="value"
    :disabled="disabled"
    :text-value="textValue"
    :as-child="asChild"
    :class="styles({ class: props.class })"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <UISelectItemIndicator :icon="icon" />
    </span>
    <UISelectItemText>
      <slot>{{ text }}</slot>
    </UISelectItemText>
  </SelectItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    value: string;
    disabled?: boolean;
    textValue?: string;
    asChild?: boolean;
    class?: any;
    icon?: string;
    text?: string;
  }>();

  const styles = tv({
    base: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  });
</script>
