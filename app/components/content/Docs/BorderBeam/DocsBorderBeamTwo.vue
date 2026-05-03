<template>
  <UiCard class="relative mx-auto w-[350px] overflow-hidden border-0">
    <UiCardHeader>
      <UiCardTitle>Now Playing</UiCardTitle>
      <UiCardDescription>Stairway to Heaven - Led Zeppelin</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div class="flex flex-col items-center gap-4">
        <div class="size-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-xs" />
        <UiProgress :model-value="26.5" class="h-1" />
        <div class="text-muted-foreground flex w-full justify-between text-sm">
          <span>2:45</span>
          <span>8:02</span>
        </div>
      </div>
    </UiCardContent>
    <UiCardFooter class="flex justify-center gap-4">
      <UiButton variant="outline" size="icon" class="rounded-full">
        <Icon name="lucide:skip-back" class="size-4" />
      </UiButton>
      <UiButton size="icon" class="rounded-full">
        <Icon name="lucide:play" class="size-4" />
      </UiButton>
      <UiButton variant="outline" size="icon" class="rounded-full">
        <Icon name="lucide:skip-forward" class="size-4" />
      </UiButton>
    </UiCardFooter>
    <UiBorderBeam :duration="6" :size="400" class="from-transparent via-red-500 to-transparent" />
    <UiBorderBeam
      :size="400"
      :delay="3"
      :duration="6"
      class="from-transparent via-blue-500 to-transparent"
    />
  </UiCard>
</template>
