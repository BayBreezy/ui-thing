<template>
  <div>
    <ClientOnly>
      <UiTabs defaultValue="preview">
        <UiTabsList class="not-prose">
          <UiTabsTrigger value="preview">Preview</UiTabsTrigger>
          <UiTabsTrigger value="code">Code</UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent value="preview">
          <iframe
            v-if="!isLoading"
            :src="`/block-renderer?component=${props.component}`"
            class="relative z-10 h-[500px] w-full"
            @load="isLoading = false"
          ></iframe>
        </UiTabsContent>
        <UiTabsContent v-if="codeBlock" value="code"> </UiTabsContent>
      </UiTabs>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { codeToHtml } from "shiki";

  const props = withDefaults(
    defineProps<{
      blockPath?: string;
      component?: string;
    }>(),
    {
      blockPath: "",
    }
  );

  const isLoading = ref(true);
  const colorMode = useColorMode();

  const codeBlock = ref<string | null>(null);
  const importPath = async () => {
    if (!props.blockPath) return console.error("Block path is required.");
    const blockImports = import.meta.glob<string>("./**/*.vue", {
      query: "?raw",
      import: "default",
    });
    const path = blockImports[`./${props.blockPath}.vue`];
    codeBlock.value = await path();
    codeBlock.value = await codeToHtml(codeBlock.value, {
      lang: "vue",
      theme: "material-theme-palenight",
    });
  };

  await importPath();

  watch(
    () => colorMode.value,
    () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 100);
    }
  );
</script>
