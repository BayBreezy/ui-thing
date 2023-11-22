<template>
  <SelectScrollUpButton v-bind="reactiveOmit(props, 'icon')">
    <slot>
      <Icon :name="icon || 'lucide:chevron-up'" class="h-5 w-5" />
    </slot>
  </SelectScrollUpButton>
</template>

<script lang="ts" setup>
  import { SelectScrollUpButton } from "radix-vue";
  import type { SelectScrollUpButtonProps } from "radix-vue";

  const props = defineProps<
    SelectScrollUpButtonProps & {
      /** Icon to render */
      icon?: string;
    }
  >();
</script>
