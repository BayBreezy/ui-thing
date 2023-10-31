<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker show-weeknumbers>
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="h-4 w-4 text-muted-foreground" name="lucide:chevron-down" />
        </div>
      </template>
    </UIDatepicker>
  </div>
</template>
