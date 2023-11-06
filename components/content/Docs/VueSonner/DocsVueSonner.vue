<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UIButton
      @click="
        useSonner('Default', {
          description: 'This is a description',
        })
      "
      variant="outline"
      >Show default</UIButton
    >
    <UIButton
      @click="
        useSonner('', {
          description: 'Send new notification to customer?',
          duration: Infinity,
          onDismiss() {
            useSonner.warning('', { description: 'Notification not sent' });
          },
          onAutoClose() {
            useSonner.warning('', { description: 'Notification not sent' });
          },
          action: {
            label: 'Send',
            onClick() {
              useSonner.success('', { description: 'Notification sent' });
            },
          },
        })
      "
      variant="outline"
      >Show action</UIButton
    >
    <UIButton
      v-for="(t, i) in types"
      @click="
        useSonner[t](useCapitalize(t), {
          description: `This is a ${t} message`,
        })
      "
      variant="outline"
      >Show {{ t }}</UIButton
    >
    <UIButton
      @click="
        useSonner.promise(promise, {
          loading: 'Checking API for tools...',
          success: (d) => d as string,
          error: (d) => 'API returned error',
        })
      "
      variant="outline"
      >Show promise</UIButton
    >
    <UIButton
      @click="
        useSonner(markRaw(Headless), {
          duration: Infinity,
        })
      "
      variant="outline"
      >Show custom</UIButton
    >
  </div>
</template>

<script lang="ts" setup>
  import Headless from "./DocsVueSonnerHeadless.vue";

  const types = ["success", "info", "warning", "error"] as const;

  const promise = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve("There are 16 tools ready for use"), 2000)
    );
</script>
