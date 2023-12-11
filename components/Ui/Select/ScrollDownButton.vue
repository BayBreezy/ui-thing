<template>
  <SelectScrollDownButton v-bind="reactiveOmit(props, 'icon')">
    <slot> <Icon :name="icon || 'lucide:chevron-down'" class="h-5 w-5" /></slot>
  </SelectScrollDownButton>
</template>

<script lang="ts" setup>
  import { SelectScrollDownButton } from "radix-vue";
  import type { SelectScrollDownButtonProps } from "radix-vue";

  const props = defineProps<
    SelectScrollDownButtonProps & {
      /** Icon to render */
      icon?: string;
    }
  >();
</script>
