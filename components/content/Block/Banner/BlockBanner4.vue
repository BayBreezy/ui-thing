<template>
  <UiContainer
    class="flex justify-between gap-4 rounded-lg border p-4 shadow-md lg:items-center lg:p-3"
  >
    <div class="flex grow flex-col justify-center gap-2 lg:flex-row lg:items-center">
      <p class="font-semibold lg:text-sm">{{ title }}</p>
      <p class="text-muted-foreground lg:text-sm">{{ description }}</p>
    </div>
    <UiButton class="shrink-0" size="icon" variant="ghost">
      <Icon name="lucide:x" class="h-5 w-5 text-muted-foreground" />
    </UiButton>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
    }>(),
    {
      title: "We've just launched a new feature!",
      description: "Check out the new dashboard.",
      icon: "lucide:x",
    }
  );
</script>
