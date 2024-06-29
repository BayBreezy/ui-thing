<template>
  <QuillEditor
    v-model:content="model"
    toolbar="#my-toolbar"
    theme="snow"
    placeholder="Write something..."
    content-type="html"
  >
    <template #toolbar>
      <div id="my-toolbar">
        <!-- Add buttons as you would before -->
        <button class="ql-bold" />
        <button class="ql-header" value="1" aria-label="header: 1" />
        <button class="ql-header" value="2" aria-label="header: 2" />
        <button class="ql-italic" />
      </div>
    </template>
  </QuillEditor>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  const model = ref(
    `<h3><b>Quill Editor</b></h3>
<p>Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
`
  );
</script>
