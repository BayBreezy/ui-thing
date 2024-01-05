<template>
  <a :href="sourceCodeUrl" target="_blank">
    {{ text || "here" }}
  </a>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    text?: string;
    component: string;
  }>();

  const sourceCodeUrl = computed(() => {
    return `https://github.com/BayBreezy/ui-thing/tree/main/components/Ui/${props.component}`;
  });
</script>
