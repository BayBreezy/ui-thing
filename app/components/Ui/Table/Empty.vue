<template>
  <UiTableRow>
    <UiTableCell
      :colspan="colspan"
      :class="styles({ class: normalizeClass(props.class) || undefined })"
    >
      <div data-slot="table-empty" class="flex items-center justify-center py-10">
        <slot />
      </div>
    </UiTableCell>
  </UiTableRow>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      colspan?: number;
      class?: HTMLAttributes["class"];
    }>(),
    {
      colspan: 1,
    }
  );

  const styles = tv({
    base: "text-foreground p-4 align-middle text-sm whitespace-nowrap",
  });
</script>
