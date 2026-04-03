<template>
  <div class="flex flex-col items-center gap-5">
    <div ref="container">
      <UiButton variant="outline">Hello World</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  import { DocsAlertSubData } from "#components";

  const container = ref();
  useTippy(container, {
    interactive: true,
    content: h(DocsAlertSubData, { class: tw`border-none p-2` }),
  });
</script>
