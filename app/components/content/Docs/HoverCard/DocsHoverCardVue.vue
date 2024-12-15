<template>
  <div class="flex items-center justify-center">
    <UiHoverCard>
      <UiHoverCardTrigger as-child>
        <UiButton variant="link"> @vuejs </UiButton>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="w-80">
        <div class="flex justify-between space-x-4">
          <UiAvatar class="ring-1 ring-muted">
            <UiAvatarImage src="https://github.com/vuejs.png" />
            <UiAvatarFallback>VC</UiAvatarFallback>
          </UiAvatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">@vuejs</h4>
            <p class="text-sm">
              Progressive JavaScript framework for building modern web interfaces.
            </p>
            <div class="flex items-center pt-2">
              <Icon name="lucide:calendar-days" class="mr-2 h-4 w-4 opacity-70" />
              <span class="text-xs text-muted-foreground"> Joined January 2014 </span>
            </div>
          </div>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
