<template>
  <QuillEditor
    v-model:content="model"
    :toolbar="toolbarOptions"
    theme="snow"
    placeholder="Write something..."
    content-type="html"
  />
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", { align: [] }],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    ["link", "image", "video"],
    ["clean"],
  ];

  const model = ref(
    `<h3><b>Quill Editor</b></h3>
<p>Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
`
  );
</script>
