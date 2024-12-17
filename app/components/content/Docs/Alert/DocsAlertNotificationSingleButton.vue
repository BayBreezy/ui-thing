<template>
  <TransitionScale :scale="0.98">
    <UiAlert
      v-if="open"
      icon="lucide:circle-check"
      class="items-center"
      icon-class="text-emerald-500"
    >
      <UiAlertDescription class="flex items-center justify-between">
        Your profile has been updated!
        <div class="flex items-center gap-3">
          <UiButton class="text-xs" size="xs" @click="useSonner('Changes reverted')">Undo</UiButton>
          <UiButton variant="ghost" size="icon-xs" @click="open = false">
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
