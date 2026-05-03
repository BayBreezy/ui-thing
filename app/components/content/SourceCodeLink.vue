<template>
  <ui-tooltip>
    <ui-tooltip-trigger>
      <a :href="sourceCodeUrl" target="_blank">
        {{ text || "here" }}
        <span class="sr-only"> {{ titleText }}</span>
      </a>
    </ui-tooltip-trigger>
    <ui-tooltip-content
      >{{ titleText }}
      <ui-tooltip-arrow />
    </ui-tooltip-content>
  </ui-tooltip>
</template>

<script lang="ts" setup>
  import type { Collections } from "@nuxt/content";

  const props = withDefaults(
    defineProps<{
      text?: string;
      branch?: string;
      folder?: string;
      component: string;
      collection?: keyof Collections;
    }>(),
    {
      branch: "v2",
      folder: "Ui",
      collection: "docs",
    }
  );

  const sourceCodeUrl = computed(() => {
    return `https://github.com/BayBreezy/ui-thing/tree/${props.branch}/app/components/${props.folder}/${props.component}`;
  });

  const route = useRoute();
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection(props.collection).path(route.path).first();
  });
  const titleText = computed(() =>
    page?.value ? `View source code for ${page.value.title}` : "View source code"
  );
</script>
