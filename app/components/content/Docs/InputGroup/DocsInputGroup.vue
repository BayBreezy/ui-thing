<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupInput placeholder="Search..." />
      <UiInputGroupAddon>
        <Icon name="lucide:search" />
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">12 results</UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="example.com" class="!pl-1" />
      <UiInputGroupAddon>
        <UiInputGroupText>https://</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiInputGroupButton class="rounded-full" size="icon-xs">
              <Icon name="lucide:info" />
            </UiInputGroupButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            This is content in a tooltip.
            <UiTooltipArrow />
          </UiTooltipContent>
        </UiTooltip>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupTextarea placeholder="Ask, Search or Chat..." />
      <UiInputGroupAddon align="block-end">
        <UiInputGroupButton variant="outline" class="rounded-full" size="icon-xs">
          <Icon name="lucide:plus" />
        </UiInputGroupButton>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiInputGroupButton variant="ghost">Auto</UiInputGroupButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent side="top" align="start" class="[--radius:0.95rem]">
            <UiDropdownMenuItem>Auto</UiDropdownMenuItem>
            <UiDropdownMenuItem>Agent</UiDropdownMenuItem>
            <UiDropdownMenuItem>Manual</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
        <UiInputGroupText class="ml-auto">52% used</UiInputGroupText>
        <UiSeparator orientation="vertical" class="!h-4" />
        <UiInputGroupButton variant="default" class="rounded-full" size="icon-xs" disabled>
          <Icon name="lucide:arrow-up" />
          <span class="sr-only">Send</span>
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="@uithing" />
      <UiInputGroupAddon align="inline-end">
        <div
          class="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full"
        >
          <Icon name="lucide:check" class="size-3" />
        </div>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
