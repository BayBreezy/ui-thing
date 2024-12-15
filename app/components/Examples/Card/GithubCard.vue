<template>
  <UiCard>
    <template #header>
      <UiCardHeader class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div class="space-y-1">
          <UiCardTitle class="text-lg">shadcn/ui</UiCardTitle>
          <UiCardDescription>
            Beautifully designed components built with Radix Ui and Tailwind CSS.
          </UiCardDescription>
        </div>
        <div class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <UiButton variant="secondary" class="px-3 shadow-none"
            ><Icon name="lucide:star" class="h-4 w-4" /> Star</UiButton
          >
          <UiSeparator orientation="vertical" class="h-[20px]" />
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="secondary" class="px-2 shadow-none"
                ><Icon name="lucide:chevron-down" class="h-4 w-4"
              /></UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" :align-offset="-5" class="w-[200px]">
              <UiDropdownMenuLabel>Suggested Lists</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuCheckboxItem checked> Future Ideas </UiDropdownMenuCheckboxItem>
              <UiDropdownMenuCheckboxItem>My Stack</UiDropdownMenuCheckboxItem>
              <UiDropdownMenuCheckboxItem>Inspiration</UiDropdownMenuCheckboxItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Create List
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiCardHeader>
    </template>
    <template #content>
      <UiCardContent>
        <div class="flex space-x-4 text-sm text-muted-foreground">
          <div class="flex items-center">
            <Icon name="lucide:circle" class="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            TypeScript
          </div>
          <div class="flex items-center">
            <Icon name="lucide:star" class="mr-1 h-3 w-3" />
            20k
          </div>
          <div>Updated {{ format(new Date(), "MMMM yyyy") }}</div>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { format } from "date-fns";
</script>
