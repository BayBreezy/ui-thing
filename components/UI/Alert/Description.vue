<template>
  <div :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "text-sm [&_p]:leading-relaxed",
  });

  const props = defineProps<{
    class?: any;
    description?: string;
  }>();
</script>
