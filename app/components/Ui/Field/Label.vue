<template>
  <UiLabel
    v-bind="props"
    data-slot="field-label"
    :class="fieldLabelStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </UiLabel>
</template>
<script lang="ts">
  import { normalizeClass } from "vue";
  import type { LabelProps } from "@/components/Ui/Label.vue";

  export const fieldLabelStyles = tv({
    base: [
      "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
      "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
    ],
  });
</script>
<script lang="ts" setup>
  const props = defineProps<LabelProps>();
</script>
