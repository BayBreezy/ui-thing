<template>
  <MenubarRadioItem
    @select="emits('select', $event)"
    :as-child="asChild"
    :value="value"
    :disabled="disabled"
    :text-value="textValue"
    :class="styles({ class: props.class })"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UIMenubarItemIndicator>
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />
      </UIMenubarItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </MenubarRadioItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    value: string;
    disabled?: boolean;
    textValue?: string;
    class?: any;
    icon?: string;
    title?: string;
  }>();

  const emits = defineEmits<{
    select: [value: Event];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
