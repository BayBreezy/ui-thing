<template>
  <QuillEditor theme="snow" placeholder="Write something...">
    <template v-for="(_, name) of $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </QuillEditor>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";
</script>
