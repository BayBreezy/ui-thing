<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Without Blur</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="right"
        :is-blurred="false"
        title="Clear Overlay"
        description="This sheet has no blur effect on the overlay"
      >
        <template #content>
          <UiGradientDivider class="-my-2" />
          <div class="space-y-4 p-4">
            <p class="text-muted-foreground text-sm">
              Notice how the background content is clearly visible without any blur effect. This can
              be useful for maintaining full context visibility.
            </p>
            <div class="border-border bg-muted/50 rounded-lg border p-3">
              <p class="text-sm font-medium">Background Content Visible</p>
              <p class="text-muted-foreground text-xs">
                You can see the page clearly behind this sheet
              </p>
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter>
            <UiSheetClose as-child>
              <UiButton>Close</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
