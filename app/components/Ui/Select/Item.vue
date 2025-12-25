<template>
  <SelectItem data-slot="select-item" v-bind="forwarded" :class="styles({ class: props.class })">
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <UiSelectItemIndicator :icon="icon" />
    </span>
    <UiSelectItemText>
      <slot>{{ text }}</slot>
    </UiSelectItemText>
  </SelectItem>
</template>

<script lang="ts" setup>
  import { SelectItem } from "reka-ui";
  import type { SelectItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SelectItemProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** Icon to show */
      icon?: string;
      /** Text to show */
      text?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon", "text");
  const styles = tv({
    base: "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
  });
</script>
