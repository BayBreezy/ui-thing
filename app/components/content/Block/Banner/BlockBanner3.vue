<template>
  <UiContainer
    class="flex flex-col justify-between gap-4 rounded-lg border p-4 shadow-md lg:flex-row lg:items-center lg:p-3"
  >
    <div class="flex items-center justify-between">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border">
        <Icon :name="icon" class="h-6 w-6" />
      </div>
      <UiButton class="shrink-0 lg:hidden" size="icon-sm" variant="ghost">
        <Icon name="lucide:x" class="h-4 w-4 text-muted-foreground" />
      </UiButton>
    </div>
    <div class="flex grow flex-col gap-2 lg:flex-row lg:items-center">
      <p class="font-semibold lg:text-sm">{{ title }}</p>
      <p class="text-muted-foreground lg:text-sm">{{ description }}</p>
    </div>
    <div class="ml-auto flex w-full items-center gap-3 lg:w-auto">
      <UiButton class="w-full whitespace-nowrap lg:w-auto" variant="outline">Decline</UiButton>
      <UiButton class="w-full whitespace-nowrap lg:w-auto">Allow</UiButton>
    </div>
    <UiButton class="hidden shrink-0 lg:block" size="icon" variant="ghost">
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
      title: "We use third-party cookies in order to personalize your experience",
      icon: "lucide:flag",
      description: "Read our Cookie Policy.",
    }
  );
</script>
