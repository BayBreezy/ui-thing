<template>
  <div class="text-center">
    <div class="inline-grid w-fit grid-cols-3 gap-1">
      <UiButton class="col-start-2" variant="outline" size="icon" aria-label="Pan camera up">
        <Icon name="lucide:chevron-up" class="size-4" aria-hidden="true" />
      </UiButton>
      <UiButton class="col-start-1" variant="outline" size="icon" aria-label="Pan camera left">
        <Icon name="lucide:chevron-left" class="size-4" aria-hidden="true" />
      </UiButton>
      <div class="flex items-center justify-center" aria-hidden="true">
        <Icon name="lucide:circle" class="size-5 opacity-60" />
      </div>
      <UiButton variant="outline" size="icon" aria-label="Pan camera right">
        <Icon name="lucide:chevron-right" class="size-4" aria-hidden="true" />
      </UiButton>
      <UiButton class="col-start-2" variant="outline" size="icon" aria-label="Pan camera down">
        <Icon name="lucide:chevron-down" class="size-4" aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>
