<template>
  <UICard>
    <template #header>
      <UICardHeader class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div class="space-y-1">
          <UICardTitle class="text-lg">shadcn/ui</UICardTitle>
          <UICardDescription>
            Beautifully designed components built with Radix UI and Tailwind CSS.
          </UICardDescription>
        </div>
        <div class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <UIButton variant="secondary" class="px-3 shadow-none"
            ><Icon name="lucide:star" class="h-4 w-4" /> Star</UIButton
          >
          <UISeparator orientation="vertical" class="h-[20px]" />
          <UIDropdownMenu>
            <UIDropdownMenuTrigger asChild>
              <UIButton variant="secondary" class="px-2 shadow-none"
                ><Icon name="lucide:chevron-down" class="h-4 w-4"
              /></UIButton>
            </UIDropdownMenuTrigger>
            <UIDropdownMenuContent align="end" :alignOffset="-5" class="w-[200px]">
              <UIDropdownMenuLabel>Suggested Lists</UIDropdownMenuLabel>
              <UIDropdownMenuSeparator />
              <UIDropdownMenuCheckboxItem checked> Future Ideas </UIDropdownMenuCheckboxItem>
              <UIDropdownMenuCheckboxItem>My Stack</UIDropdownMenuCheckboxItem>
              <UIDropdownMenuCheckboxItem>Inspiration</UIDropdownMenuCheckboxItem>
              <UIDropdownMenuSeparator />
              <UIDropdownMenuItem>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Create List
              </UIDropdownMenuItem>
            </UIDropdownMenuContent>
          </UIDropdownMenu>
        </div>
      </UICardHeader>
    </template>
    <template #content>
      <UICardContent>
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
      </UICardContent>
    </template>
  </UICard>
</template>

<script lang="ts" setup>
  import { format } from "date-fns";
</script>
