<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList>
          <UiTabsTrigger v-for="t in 3" :key="t" :value="`tab-${t}`">Tab {{ t }}</UiTabsTrigger>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
