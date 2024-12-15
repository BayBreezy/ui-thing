<template>
  <QuillEditor toolbar="full" :modules theme="snow" placeholder="Write something..." />
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";
  import BlotFormatter from "quill-blot-formatter";

  type SingleModule = {
    name: string;
    module: any;
    options?: any;
  };
  type ModuleObject = SingleModule | SingleModule[];

  const modules: ModuleObject = {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {
      /* options */
    },
  };
</script>
