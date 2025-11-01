<template>
  <UiDrawer v-model:open="mobileNavState" should-scale-background>
    <UiDrawerContent class="h-full px-2 pb-4">
      <UiDrawerTitle class="sr-only mb-1.5">Mobile Menu</UiDrawerTitle>
      <UiDrawerDescription class="sr-only">
        A list of navigation items for mobile
      </UiDrawerDescription>

      <div class="relative overflow-y-auto">
        <DocsNav :links="content" @clicked="mobileNavState = false" />
      </div>

      <UiDrawerClose class="absolute top-3 right-4" as-child>
        <UiButton variant="ghost" size="icon-sm" class="opacity-50 hover:opacity-100">
          <Icon name="lucide:x" />
        </UiButton>
      </UiDrawerClose>
    </UiDrawerContent>
  </UiDrawer>
</template>

<script lang="ts" setup>
  const { content } = await useDocNavigation();
  const mobileNavState = useMobileNavState();
</script>
