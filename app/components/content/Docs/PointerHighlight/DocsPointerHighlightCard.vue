<template>
  <div class="flex justify-center py-10">
    <UiPointerHighlight
      container-class="rounded-lg"
      rectangle-class="rounded-lg border-primary/60"
      pointer-class="text-primary"
    >
      <UiCard
        class="m-1! w-full max-w-[320px] rounded-lg border-dashed bg-linear-to-br from-background via-muted/40 to-background py-0"
      >
        <UiCardHeader class="border-b py-6">
          <UiCardTitle>Early access invite</UiCardTitle>
          <UiCardDescription>
            Join the next release preview and test features before they ship.
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4 py-6">
          <p class="text-sm text-muted-foreground">
            Get early builds, changelog previews, and a private feedback channel with the team.
          </p>
          <UiButton class="w-full">Request invite</UiButton>
        </UiCardContent>
      </UiCard>
    </UiPointerHighlight>
  </div>
</template>
