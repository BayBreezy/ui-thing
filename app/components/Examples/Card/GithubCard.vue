<template>
  <UiCard>
    <template #header>
      <UiCardHeader class="flex items-start justify-between gap-3">
        <div class="flex flex-col gap-1">
          <UiCardTitle>UI Thing</UiCardTitle>
          <UiCardDescription>
            Beautifully designed components built with Radix Ui and Tailwind CSS.
          </UiCardDescription>
        </div>
        <div class="flex items-center gap-1">
          <UiButton size="icon-sm" variant="secondary" class="shadow-none"
            ><Icon name="lucide:star" class="size-4" />
          </UiButton>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="secondary" size="icon-sm" class="shadow-none"
                ><Icon name="lucide:chevron-down" class="size-4"
              /></UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" :align-offset="-5" class="w-[200px]">
              <UiDropdownMenuLabel>Suggested Lists</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuCheckboxItem :model-value="true">
                Future Ideas
              </UiDropdownMenuCheckboxItem>
              <UiDropdownMenuCheckboxItem>My Stack</UiDropdownMenuCheckboxItem>
              <UiDropdownMenuCheckboxItem>Inspiration</UiDropdownMenuCheckboxItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem>
                <Icon name="lucide:plus" class="mr-2 size-4" /> Create List
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiCardHeader>
    </template>
    <template #content>
      <UiCardContent>
        <div class="text-muted-foreground flex space-x-4 text-sm">
          <div class="flex items-center">
            <Icon name="lucide:circle" class="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            TypeScript
          </div>
          <div class="flex items-center">
            <Icon name="lucide:star" class="mr-1 h-3 w-3" />
            20k
          </div>
          <div>Updated {{ useDateFormat(new Date(), "MMMM YYYY").value }}</div>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>
