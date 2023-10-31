<template>
  <div class="flex items-center justify-center">
    <UIHoverCard>
      <UIHoverCardTrigger as-child>
        <UIButton variant="link"> @vuejs </UIButton>
      </UIHoverCardTrigger>
      <UIHoverCardContent class="w-80">
        <div class="flex justify-between space-x-4">
          <UIAvatar class="ring-1 ring-muted">
            <UIAvatarImage src="https://github.com/vuejs.png" />
            <UIAvatarFallback>VC</UIAvatarFallback>
          </UIAvatar>
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
      </UIHoverCardContent>
    </UIHoverCard>
  </div>
</template>
