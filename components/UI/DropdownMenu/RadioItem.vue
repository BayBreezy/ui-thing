<template>
  <DropdownMenuRadioItem v-bind="forwarded" :class="styles({ class: props.class })">
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
  import { DropdownMenuRadioItem, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuRadioItemProps & {
      class?: any;
      icon?: string;
      title?: string;
    }
  >();

  const emits = defineEmits<DropdownMenuRadioItemEmits>();
  const forwarded = useForwardPropsEmits(useOmit(props, ["class", "icon"]), emits);

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  });
</script>
