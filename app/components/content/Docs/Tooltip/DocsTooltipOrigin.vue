<template>
  <div class="@container">
    <div
      class="grid grid-cols-1 *:flex *:items-center *:justify-center *:p-10 @[400px]:grid-cols-2"
    >
      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">Tiny</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="px-2 py-1 text-xs"> This is a simple tooltip </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">Dark</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="dark px-2 py-1 text-xs">
            This tooltip will be always dark
          </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">W/ arrow</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="dark px-2 py-1 text-xs" :show-arrow="true">
            This tooltip has an arrow
          </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">W/ title</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="py-3">
            <div class="space-y-1">
              <p class="text-[13px] font-medium">Tooltip with title</p>
              <p class="text-muted-foreground text-xs">
                Tooltips are made to be highly customizable, with features like dynamic placement,
                rich content, and a robust API. You can even use them as a full-featured dropdown
                menu by setting the
                <code>trigger</code>
                prop to
                <code>click</code>
                .
              </p>
            </div>
          </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">W/ icon</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="dark py-3">
            <div class="flex gap-3">
              <Icon
                name="lucide:globe"
                class="mt-0.5 size-4 shrink-0 opacity-60"
                aria-hidden="true"
              />
              <div class="space-y-1">
                <p class="text-[13px] font-medium">Tooltip with title and icon</p>
                <p class="text-muted-foreground text-xs">
                  Tooltips are made to be highly customizable, with features like dynamic placement,
                  rich content, and a robust API.
                </p>
              </div>
            </div>
          </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">W/ image</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="py-3">
            <div class="space-y-2">
              <img
                class="w-full rounded"
                src="https://images.unsplash.com/photo-1515865404355-ddb5b0910878?q=50&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="382"
                height="216"
                alt="I should have bought you flowers 😘"
              />
              <div class="space-y-1">
                <p class="text-[13px] font-medium">Tooltip with title and icon</p>
                <p class="text-muted-foreground text-xs">
                  Tooltips are made to be highly customizable, with features like dynamic placement,
                  rich content, and a robust API.
                </p>
              </div>
            </div>
          </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">Stats</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="py-3">
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
          </UiTooltipContent>
        </UiTooltip>
      </div>

      <div>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="outline" size="sm">Chart</UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent class="py-2">
            <div class="space-y-2">
              <div class="text-[13px] font-medium">Tuesday, Aug 13</div>
              <div class="flex items-center gap-2 text-xs">
                <svg
                  width="8"
                  height="8"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  class="shrink-0 text-indigo-500"
                  aria-hidden="true"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
                <span class="flex grow gap-2">
                  Sales
                  <span class="ml-auto">$40</span>
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <svg
                  width="8"
                  height="8"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  class="shrink-0 text-purple-500"
                  aria-hidden="true"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
                <span class="flex grow gap-2">
                  Revenue
                  <span class="ml-auto">$74</span>
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <svg
                  width="8"
                  height="8"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  class="shrink-0 text-rose-500"
                  aria-hidden="true"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
                <span class="flex grow gap-2">
                  Costs
                  <span class="ml-auto">$410</span>
                </span>
              </div>
            </div>
          </UiTooltipContent>
        </UiTooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
