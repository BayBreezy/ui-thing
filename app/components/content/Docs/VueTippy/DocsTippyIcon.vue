<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">W/ Icon</UiButton>
      <template #content>
        <div class="flex gap-3 p-2">
          <Icon name="lucide:globe" class="mt-1 size-4 shrink-0 opacity-60" aria-hidden="true" />
          <div class="space-y-1">
            <p class="text-[13px] font-medium">Tooltip with title and icon</p>
            <p class="text-xs text-muted-foreground">
              Tooltips are made to be highly customizable, with features like dynamic placement,
              rich content, and a robust API.
            </p>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>
