<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open">
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          We Value Your Privacy 🍪
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          We use cookies to improve your experience, and show personalized content.
        </p>
        <div class="flex items-center gap-2">
          <UiButton class="text-xs" size="xs">Accept</UiButton>
          <UiButton class="text-xs" size="xs" variant="outline">Decline</UiButton>
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
