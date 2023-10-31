<template>
  <div class="flex w-full justify-center">
    <UITooltip disable-closing-trigger>
      <template #trigger>
        <UITooltipTrigger as-child>
          <UIButton variant="outline">Hover me</UIButton>
        </UITooltipTrigger>
      </template>
      <template #content>
        <UITooltipContent>
          <p>Add to library</p>
        </UITooltipContent>
      </template>
    </UITooltip>
  </div>
</template>
