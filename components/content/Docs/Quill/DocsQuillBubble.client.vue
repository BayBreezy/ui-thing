<template>
  <QuillEditor
    v-model:content="model"
    theme="bubble"
    toolbar="full"
    placeholder="Write something..."
    content-type="html"
  />
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  const model = ref(
    `<h3><b>Quill Editor</b></h3>
<p>Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
`
  );
</script>
