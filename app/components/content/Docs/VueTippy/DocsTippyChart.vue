<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">Chart</UiButton>
      <template #content>
        <div class="space-y-2 p-2">
          <div class="text-[13px] font-medium">Tuesday, Aug 13</div>
          <div class="flex items-center gap-2 text-xs">
            <span class="size-2 rounded-full bg-purple-500" />
            <span class="flex grow gap-2"> Sales <span class="ml-auto">$40</span> </span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="size-2 rounded-full bg-teal-500" />
            <span class="flex grow gap-2"> Revenue <span class="ml-auto">$74</span> </span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="size-2 rounded-full bg-blue-500" />
            <span class="flex grow gap-2"> Costs <span class="ml-auto">$410</span> </span>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>
