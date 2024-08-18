<template>
  <SelectItem v-bind="forwarded" :class="styles({ class: props.class })">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <UiSelectItemIndicator :icon="icon" />
    </span>
    <UiSelectItemText>
      <slot>{{ text }}</slot>
    </UiSelectItemText>
  </SelectItem>
</template>

<script lang="ts" setup>
  import { SelectItem } from "radix-vue";
  import type { SelectItemProps } from "radix-vue";

  const props = defineProps<
    SelectItemProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** Icon to show */
      icon?: string;
      /** Text to show */
      text?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon", "text");
  const styles = tv({
    base: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  });
</script>
