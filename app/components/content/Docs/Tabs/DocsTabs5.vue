<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList :pill="false" class="relative bg-transparent">
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :pill="false"
            :value="`tab-${t}`"
            class="hover:bg-accent hover:text-foreground data-[state=active]:hover:bg-accent relative data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
