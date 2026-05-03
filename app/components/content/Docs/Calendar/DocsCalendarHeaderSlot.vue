<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar show-weeknumbers>
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="text-muted-foreground size-4" name="lucide:chevron-down" />
        </div>
      </template>
    </UiCalendar>
  </div>
</template>
