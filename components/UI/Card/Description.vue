<template>
  <div :class="styles({ class: props.class })">
    <slot>
      {{ description }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    description?: string;
    class?: any;
  }>();
  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
