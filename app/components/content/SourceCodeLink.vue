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
    return `https://github.com/BayBreezy/ui-thing/tree/main/app/components/Ui/${props.component}`;
  });

  const route = useRoute();
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection("content").path(route.path).first();
  });
  const titleText = computed(() =>
    page?.value ? `View source code for ${page.value.title}` : "View source code"
  );
</script>
