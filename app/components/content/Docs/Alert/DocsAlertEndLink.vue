<template>
  <div>
    <UiAlert
      icon-class="mt-0.5 size-4 text-amber-500"
      icon="lucide:triangle-alert"
      description="Some information is missing!"
    >
      <UiAlertDescription class="flex w-full items-center justify-between">
        Some information is missing!
        <NuxtLink
          href="#"
          class="group flex items-center gap-2 transition-colors hover:text-amber-500"
          >Add it
          <Icon
            name="lucide:arrow-right"
            class="size-4 shrink-0 transform transition-transform group-hover:translate-x-1"
        /></NuxtLink>
      </UiAlertDescription>
    </UiAlert>
  </div>
</template>
