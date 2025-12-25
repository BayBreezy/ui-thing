<template>
  <div class="space-y-6 flex flex-col items-center">
    <div>
      <h3 class="mb-3 text-sm font-medium">Lucide</h3>
      <div class="flex items-center gap-3">
        <UiIcon name="lucide:home" :size="24" />
        <UiIcon name="lucide:user" :size="24" />
        <UiIcon name="lucide:settings" :size="24" />
        <UiIcon name="lucide:search" :size="24" />
        <UiIcon name="lucide:mail" :size="24" />
      </div>
    </div>
    
    <div>
      <h3 class="mb-3 text-sm font-medium">Heroicons</h3>
      <div class="flex items-center gap-3">
        <UiIcon name="heroicons:home" :size="24" />
        <UiIcon name="heroicons:user" :size="24" />
        <UiIcon name="heroicons:cog" :size="24" />
        <UiIcon name="heroicons:magnifying-glass" :size="24" />
        <UiIcon name="heroicons:envelope" :size="24" />
      </div>
    </div>
    
    <div>
      <h3 class="mb-3 text-sm font-medium">Material Design Icons</h3>
      <div class="flex items-center gap-3">
        <UiIcon name="mdi:home" :size="24" />
        <UiIcon name="mdi:account" :size="24" />
        <UiIcon name="mdi:cog" :size="24" />
        <UiIcon name="mdi:magnify" :size="24" />
        <UiIcon name="mdi:email" :size="24" />
      </div>
    </div>
  </div>
</template>
