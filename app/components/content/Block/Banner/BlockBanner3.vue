<template>
  <UiContainer
    class="flex flex-col justify-between gap-4 rounded-lg border p-4 shadow-md lg:flex-row lg:items-center lg:p-3"
  >
    <div class="flex items-center justify-between">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-lg border">
        <Icon :name="icon" />
      </div>
      <UiButton class="shrink-0 lg:hidden" size="icon-sm" variant="ghost">
        <Icon name="lucide:x" class="text-muted-foreground size-4" />
      </UiButton>
    </div>
    <div class="flex grow flex-col gap-2 lg:flex-row lg:items-center">
      <p class="font-semibold lg:text-sm">{{ title }}</p>
      <p class="text-muted-foreground lg:text-sm">{{ description }}</p>
    </div>
    <div class="ml-auto grid w-full grid-cols-2 gap-3 lg:flex lg:w-auto lg:items-center">
      <UiButton size="sm" class="" variant="outline">Decline</UiButton>
      <UiButton size="sm" class="">Allow</UiButton>
    </div>
    <UiButton class="hidden shrink-0 lg:flex" size="icon-sm" variant="ghost">
      <Icon name="lucide:x" class="text-muted-foreground" />
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
