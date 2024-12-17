<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">W/ Title</UiButton>
      <template #content>
        <div class="space-y-1 px-2 py-2">
          <p class="text-[13px] font-medium">Tooltip with title</p>
          <p class="text-xs text-muted-foreground">
            Tooltips are made to be highly customizable, with features like dynamic placement, rich
            content, and a robust API. You can even use them as a full-featured dropdown menu by
            setting the <code>trigger</code> prop to <code>click</code>.
          </p>
        </div>
      </template>
    </Tippy>
  </div>
</template>
