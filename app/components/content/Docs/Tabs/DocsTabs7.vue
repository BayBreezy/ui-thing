<template>
  <div>
    <UiTabs default-value="tab-1" class="flex flex-col justify-center">
      <UiTabsList
        :pill="false"
        class="before:bg-border relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px"
      >
        <UiTabsTrigger
          v-for="t in 3"
          :key="t"
          :pill="false"
          :value="`tab-${t}`"
          class="border-border bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >Tab {{ t }}</UiTabsTrigger
        >
      </UiTabsList>

      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="text-muted-foreground p-4 text-center text-sm">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
