<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton
      variant="outline"
      @click="
        useSonner('Default', {
          description: 'This is a description',
        })
      "
      >Show default</UiButton
    >
    <UiButton
      variant="outline"
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
      >Show action</UiButton
    >
    <UiButton
      v-for="(t, i) in types"
      :key="i"
      variant="outline"
      @click="
        (useSonner[t](t),
        {
          description: `This is a ${t} message`,
        })
      "
      >Show {{ t }}</UiButton
    >
    <UiButton
      variant="outline"
      @click="
        useSonner.promise(promise, {
          loading: 'Checking API for tools...',
          success: (d: any) => d,
          error: (d: any) => 'API returned error',
        })
      "
      >Show promise</UiButton
    >
    <UiButton
      variant="outline"
      @click="
        useSonner.custom(markRaw(Headless), {
          duration: Infinity,
        })
      "
      >Show custom</UiButton
    >
  </div>
</template>

<script lang="ts" setup>
  import Headless from "./DocsVueSonnerHeadless.vue";

  const types = ["success", "info", "warning", "error"] as const;

  const promise = () =>
    new Promise<string>((resolve) =>
      setTimeout(() => resolve("There are 16 tools ready for use"), 2000)
    );
</script>
