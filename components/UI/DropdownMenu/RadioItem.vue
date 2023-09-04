<template>
  <DropdownMenuRadioItem
    :as-child="asChild"
    :disabled="disabled"
    :value="value"
    :text-value="textValue"
    :class="styles({ class: props.class })"
    @select="emits('select', $event)"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UIDropdownMenuItemIndicator>
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />
      </UIDropdownMenuItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </DropdownMenuRadioItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    value: any;
    disabled?: boolean;
    textValue?: string;
    icon?: string;
    title?: string;
  }>();

  const emits = defineEmits<{
    select: [e: Event];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  });
</script>
