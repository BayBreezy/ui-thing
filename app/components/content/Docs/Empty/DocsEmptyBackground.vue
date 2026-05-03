<template>
  <div class="flex items-center justify-center">
    <UiEmpty class="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <Icon name="lucide:bell" />
        </UiEmptyMedia>
        <UiEmptyTitle>No Notifications</UiEmptyTitle>
        <UiEmptyDescription>
          You're all caught up. New notifications will appear here.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton variant="outline" size="sm">
          <Icon name="lucide:refresh-ccw" />
          Refresh
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
