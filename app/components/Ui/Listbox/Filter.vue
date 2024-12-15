<template>
  <ListboxFilter v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ListboxFilter, useForwardPropsEmits } from "radix-vue";
  import type { ListboxFilterEmits, ListboxFilterProps } from "radix-vue";

  const props = defineProps<ListboxFilterProps & { class?: any; placeholder?: string }>();
  const emits = defineEmits<ListboxFilterEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
