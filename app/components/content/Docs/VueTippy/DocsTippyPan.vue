<template>
  <div class="flex flex-col items-center gap-20">
    <div class="inline-grid w-fit grid-cols-3 gap-1">
      <UiButton
        v-tippy.top="'Pan top'"
        class="col-start-2"
        variant="outline"
        size="icon"
        aria-label="Pan camera up"
      >
        <Icon name="lucide:chevron-up" size="16" aria-hidden="true" />
      </UiButton>
      <UiButton
        v-tippy.left="'Pan left'"
        class="col-start-1"
        variant="outline"
        size="icon"
        aria-label="Pan camera left"
      >
        <Icon name="lucide:chevron-left" size="16" aria-hidden="true" />
      </UiButton>
      <div class="flex items-center justify-center" aria-hidden="true">
        <Icon name="lucide:circle" size="20" class="opacity-60" />
      </div>
      <UiButton
        v-tippy.right="'Pan right'"
        variant="outline"
        size="icon"
        aria-label="Pan camera right"
      >
        <Icon name="lucide:chevron-right" size="16" aria-hidden="true" />
      </UiButton>
      <UiButton
        v-tippy.bottom="'Pan down'"
        class="col-start-2"
        variant="outline"
        size="icon"
        aria-label="Pan camera down"
      >
        <Icon name="lucide:chevron-down" size="16" aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>
