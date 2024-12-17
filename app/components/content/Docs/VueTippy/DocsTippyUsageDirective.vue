<template>
  <div class="flex flex-col items-center gap-5">
    <UiButton v-tippy="'Hello 👋🏽'" variant="outline">String</UiButton>
    <UiButton v-tippy="objectOptions" variant="outline">Object</UiButton>
  </div>
</template>

<script lang="ts" setup>
  import type { TippyOptions } from "vue-tippy";

  const objectOptions: TippyOptions = {
    content: "Hello 👋🏽",
    placement: "bottom",
    arrow: true,
    hideOnClick: false,
  };
</script>
