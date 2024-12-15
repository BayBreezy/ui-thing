<template>
  <SelectTrigger :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>
      <UiSelectValue :placeholder="placeholder" />
    </slot>
    <UiSelectIcon :icon="icon" />
  </SelectTrigger>
</template>

<script lang="ts" setup>
  import { SelectTrigger } from "radix-vue";
  import type { SelectTriggerProps } from "radix-vue";

  const props = defineProps<
    SelectTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** Icon to render */
      icon?: string;
      /** Placeholder text */
      placeholder?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon", "placeholder");
  const styles = tv({
    base: "line-clamp-1 flex h-10 w-full items-center justify-between truncate rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",
  });
</script>
