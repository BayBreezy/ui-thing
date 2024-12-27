<template>
  <ClientOnly>
    <component :is="params.component" :class="[params.containerClass]" />
    <div class="fixed bottom-5 right-5 z-20 rounded-md border bg-background">
      <ThemePopover />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: "blank" });
  const params = useUrlSearchParams();

  defineOgImageComponent("UIThing", {
    title: params?.component || "Blocks",
    description: "Copy and paste blocks of code into your project.",
  });
</script>
