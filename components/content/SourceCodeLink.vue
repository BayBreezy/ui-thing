<template>
  <a :href="sourceCodeUrl" target="_blank" :title="titleText">
    {{ text || "here" }}
  </a>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    text?: string;
    component: string;
  }>();

  const sourceCodeUrl = computed(() => {
    return `https://github.com/baybreezy/ui-thing/tree/main/components/Ui/${props.component}`;
  });

  const { page } = useContent();
  const titleText = computed(() =>
    page?.value ? `View source code for ${page.value.title}` : "View source code"
  );
</script>
