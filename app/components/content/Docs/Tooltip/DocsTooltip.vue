<template>
  <div class="flex w-full justify-center">
    <UiTooltip disable-closing-trigger>
      <template #trigger>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline">Hover me</UiButton>
        </UiTooltipTrigger>
      </template>
      <template #content>
        <UiTooltipContent>
          <p>Add to library</p>
        </UiTooltipContent>
      </template>
    </UiTooltip>
  </div>
</template>
