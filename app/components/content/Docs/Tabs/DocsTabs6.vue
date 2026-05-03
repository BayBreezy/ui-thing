<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList
          :pill="false"
          class="bg-background relative h-auto -space-x-px p-0 shadow-xs shadow-black/5 rtl:space-x-reverse"
        >
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :pill="false"
            :value="`tab-${t}`"
            class="data-[state=active]:bg-muted rounded-none border first:rounded-s [&:nth-child(3n)]:rounded-e"
            >Tab {{ t }}</UiTabsTrigger
          >
          <UiTabsIndicator />
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="text-muted-foreground p-4 text-center text-sm">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
