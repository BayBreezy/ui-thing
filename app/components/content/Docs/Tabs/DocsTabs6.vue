<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList
          :pill="false"
          class="relative h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
        >
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :pill="false"
            :value="`tab-${t}`"
            class="rounded-none border first:rounded-s data-[state=active]:bg-muted [&:nth-child(3n)]:rounded-e"
            >Tab {{ t }}</UiTabsTrigger
          >
          <UiTabsIndicator />
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
