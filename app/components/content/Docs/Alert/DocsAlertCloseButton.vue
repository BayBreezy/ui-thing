<template>
  <TransitionScale :scale="0.98">
    <UiAlert
      v-model="open"
      icon="lucide:circle-alert"
      variant="destructive"
      icon-class="mt-0.5"
      description="An error occurred!"
    >
      <UiAlertDescription class="flex w-full items-center justify-between">
        This is a description of the error that occurred.
        <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
          <Icon name="lucide:x" class="size-3.5" />
        </UiButton>
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
