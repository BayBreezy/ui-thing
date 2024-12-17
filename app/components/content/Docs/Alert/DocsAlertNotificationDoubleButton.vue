<template>
  <TransitionScale :scale="0.98">
    <UiAlert
      v-if="open"
      icon="lucide:circle-check"
      class="items-center"
      icon-class="text-emerald-500"
    >
      <UiAlertDescription class="flex items-center justify-between">
        Message sent
        <div class="flex items-center gap-1">
          <UiButton variant="link" class="text-sm" size="xs">View</UiButton>
          <span>•</span>
          <UiButton variant="link" class="text-sm" size="xs">Undo</UiButton>
          <UiButton variant="ghost" size="icon-xs" class="ml-2 size-6" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </div>
      </UiAlertDescription>
    </UiAlert>
  </TransitionScale>
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
