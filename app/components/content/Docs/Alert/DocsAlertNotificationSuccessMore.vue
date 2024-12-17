<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open" icon="lucide:circle-check" icon-class="text-emerald-500 mt-0.5">
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          Your request was completed!
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          It demonstrates that the task or request has been processed.
        </p>
        <UiButton class="text-xs" size="xs">Learn more</UiButton>
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
