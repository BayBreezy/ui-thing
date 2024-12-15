<template>
  <div class="flex items-center justify-center">
    <UiCollapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-2">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <UiCollapsibleTrigger as-child>
          <UiButton variant="ghost" size="sm" class="w-9 p-0">
            <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </UiButton>
        </UiCollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
      <UiCollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
      </UiCollapsibleContent>
    </UiCollapsible>
  </div>
</template>
