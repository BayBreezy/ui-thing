<template>
  <UiContainer
    class="flex flex-col justify-between gap-4 rounded-lg border p-4 shadow-md lg:flex-row lg:items-start lg:p-3"
  >
    <div class="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border lg:flex">
      <Icon :name="icon" class="h-6 w-6" />
    </div>
    <div>
      <div class="mb-1 flex items-start justify-between gap-2">
        <p class="font-semibold">{{ title }}</p>
        <UiButton class="-mt-1 shrink-0 lg:hidden" size="icon-sm" variant="ghost">
          <Icon name="lucide:x" class="h-5 w-5 text-muted-foreground" />
        </UiButton>
      </div>
      <p class="text-muted-foreground lg:text-sm">{{ description }}</p>
    </div>
    <form class="flex w-full shrink-0 flex-col gap-3 lg:w-[400px] lg:flex-row lg:items-end">
      <div class="w-full lg:w-[70%]">
        <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
      </div>
      <div>
        <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit">Subscribe</UiButton>
      </div>
    </form>
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
      title: "Stay up to date with the latest news and updates",
      icon: "lucide:mail",
      description:
        "Subscribe to our newsletter and stay up to date with the latest news and updates.",
    }
  );
</script>
