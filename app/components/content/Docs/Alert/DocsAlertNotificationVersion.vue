<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open">
        <template #icon>
          <UiFancyIcon size="md" circle>
            <Icon name="lucide:refresh-cw" class="size-4" />
          </UiFancyIcon>
        </template>
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          Version 1.4 is now available!
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          This update contains several bug fixes and performance improvements.
        </p>
        <div class="flex items-center gap-2">
          <UiButton class="text-xs" size="xs">Install</UiButton>
          <UiButton class="text-xs" size="xs" variant="link">Later</UiButton>
        </div>
      </UiAlert>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
