<template>
  <SelectScrollUpButton v-bind="forwarded">
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
  const forwarded = reactiveOmit(props, "icon");
</script>
