<template>
  <UiContainer
    class="flex flex-col gap-4 rounded-lg border p-4 shadow-md lg:flex-row lg:items-start lg:p-3"
  >
    <div class="hidden size-10 shrink-0 items-center justify-center rounded-lg border lg:flex">
      <Icon :name="icon" />
    </div>
    <div>
      <div class="flex items-start justify-between gap-2">
        <p class="font-semibold">{{ title }}</p>
        <UiButton class="-mt-1 shrink-0 lg:hidden" size="icon-sm" variant="ghost">
          <Icon name="lucide:x" class="text-muted-foreground h-5 w-5" />
        </UiButton>
      </div>
      <p class="text-muted-foreground lg:text-sm">{{ description }}</p>
    </div>
    <form
      class="flex w-full shrink-0 flex-col gap-3 lg:ml-auto lg:w-[400px] lg:flex-row lg:items-end"
    >
      <div class="w-full lg:w-[70%]">
        <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
      </div>
      <div>
        <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit">Subscribe</UiButton>
      </div>
    </form>
    <UiButton class="hidden shrink-0 lg:flex" size="icon" variant="ghost">
      <Icon name="lucide:x" class="text-muted-foreground h-5 w-5" />
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
      title: "Stay up to date with our newsletter",
      icon: "lucide:mail",
      description: "Subscribe to our newsletter and stay up to date",
    }
  );
</script>
