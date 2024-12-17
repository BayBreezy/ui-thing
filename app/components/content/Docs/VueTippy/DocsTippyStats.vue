<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">Stats</UiButton>
      <template #content>
        <div class="space-y-2 p-2">
          <ul class="grid gap-3 text-xs">
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Status</span>
              <span class="font-medium">Completed</span>
            </li>
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Code Coverage</span>
              <span class="font-medium">94.3%</span>
            </li>
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Last Deploy</span>
              <span class="font-medium">Today at 15:42</span>
            </li>
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Performance Score</span>
              <span class="font-medium">98/100</span>
            </li>
          </ul>
        </div>
      </template>
    </Tippy>
  </div>
</template>
