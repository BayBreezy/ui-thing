<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Floating Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="right"
        variant="floating"
        title="Floating Sheet"
        description="This sheet floats off the edge with spacing around it"
      >
        <template #content>
          <UiGradientDivider class="-my-2" />
          <div class="space-y-4 p-4">
            <p class="text-muted-foreground text-sm">
              The floating variant adds visual separation from the viewport edges, creating a more
              modern and less intrusive appearance.
            </p>
            <div class="space-y-2">
              <UiLabel for="email">Email</UiLabel>
              <UiInput id="email" type="email" placeholder="Enter your email" />
            </div>
            <div class="space-y-2">
              <UiLabel for="message">Message</UiLabel>
              <UiTextarea id="message" placeholder="Type your message..." :rows="4" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter>
            <UiSheetClose as-child>
              <UiButton variant="outline">Cancel</UiButton>
            </UiSheetClose>
            <UiSheetClose as-child>
              <UiButton>Send</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
