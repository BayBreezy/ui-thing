<template>
  <ClientOnly>
    <QuillEditor
      v-if="modules"
      toolbar="full"
      :modules
      theme="snow"
      placeholder="Write something..."
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  type SingleModule = {
    name: string;
    module: any;
    options?: any;
  };
  type ModuleObject = SingleModule | SingleModule[];

  const modules = ref<ModuleObject | null>(null);

  onMounted(async () => {
    const BlotFormatter = (await import("quill-blot-formatter")).default;
    modules.value = {
      name: "blotFormatter",
      module: BlotFormatter,
      options: {/* options */},
    };
  });
</script>
