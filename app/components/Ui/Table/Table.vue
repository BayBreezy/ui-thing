<template>
  <div class="relative w-full overflow-auto">
    <table :class="styles({ class: props.class })" v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "w-full caption-bottom border-collapse text-sm",
  });
</script>
