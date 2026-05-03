<template>
  <div class="flex items-center justify-center">
    <UiCollapsible v-slot="{ open }" class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-2">
        <div class="flex items-center gap-3">
          <UiAvatar src="https://behonbaker.com/icon.png" class="ring-muted/50 ring" />
          <h4 class="text-sm font-semibold">BayBreezy starred 3 repositories</h4>
        </div>
        <UiCollapsibleTrigger as-child>
          <UiButton variant="ghost" size="icon-sm">
            <Icon
              name="lucide:chevron-down"
              class="size-4 transform duration-300"
              :class="[open && 'rotate-180']"
            />
            <span class="sr-only">View starred repositories</span>
          </UiButton>
        </UiCollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm font-semibold">nuxt/nuxt</div>
      <UiCollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm font-semibold">
          BayBreezy/ui-thing
        </div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm font-semibold">unjs/c12</div>
      </UiCollapsibleContent>
    </UiCollapsible>
  </div>
</template>
