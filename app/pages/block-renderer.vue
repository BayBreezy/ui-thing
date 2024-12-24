<template>
  <ClientOnly>
    <NuxtLayout name="blank">
      <component :is="params.component" :class="[params.containerClass]" />
      <div class="fixed bottom-5 right-5 z-20 rounded-md border bg-background">
        <ThemePopover />
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const params = useUrlSearchParams();
  console.log(params?.component);

  defineOgImageComponent("UIThing", {
    title: "Blocks",
    description: "Copy and paste blocks of code into your project.",
  });
</script>
