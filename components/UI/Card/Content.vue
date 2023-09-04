<template>
  <div :class="styles({ class: props.class })">
    <slot>
      {{ content }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    content?: string;
    class?: any;
  }>();
  const styles = tv({
    base: "p-6 pt-0",
  });
</script>
