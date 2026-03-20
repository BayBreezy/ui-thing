<template>
  <div data-slot="table-container" class="relative w-full overflow-x-auto">
    <table
      data-slot="table"
      :class="styles({ class: normalizeClass(props.class) || undefined })"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({ base: "w-full caption-bottom text-sm" });
</script>
