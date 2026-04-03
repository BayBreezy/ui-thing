<template>
  <div class="flex items-center justify-center gap-3">
    <UiButton>
      <UiIcon name="lucide:download" :size="16" />
      Download
    </UiButton>

    <UiButton variant="outline">
      <UiIcon name="lucide:share-2" :size="16" />
      Share
    </UiButton>

    <UiButton size="icon" variant="ghost">
      <UiIcon name="lucide:heart" :size="20" />
    </UiButton>
  </div>
</template>
