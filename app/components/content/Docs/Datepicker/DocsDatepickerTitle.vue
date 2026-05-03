<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker :model-value="new Date()" show-weeknumbers="left-outside">
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="text-muted-foreground size-4" name="lucide:chevron-down" />
        </div>
      </template>
    </UiDatepicker>
  </div>
</template>
