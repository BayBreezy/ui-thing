<template>
  <UiSeparator
    orientation="horizontal"
    data-slot="item-separator"
    :decorative="props.decorative"
    :class="itemSeparatorStyles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { UiSeparatorProps } from "@/components/Ui/Separator.vue";

  export const itemSeparatorStyles = tv({
    base: "my-0",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<Omit<UiSeparatorProps, "orientation">>(), {});
</script>
