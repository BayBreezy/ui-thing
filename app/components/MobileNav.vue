<template>
  <UiDrawer v-model:open="mobileNavState" should-scale-background>
    <UiDrawerContent class="h-[600px]">
      <template #knob>
        <div
          class="mx-auto my-5 h-1 w-[60px] shrink-0 cursor-grab rounded-full bg-muted active:cursor-grabbing"
        />
      </template>
      <div>
        <UiDrawerTitle class="sr-only mb-1.5">Mobile Menu</UiDrawerTitle>
        <UiDrawerDescription class="sr-only">
          A list of navigation items for mobile
        </UiDrawerDescription>

        <div class="relative h-[calc(100dvh-230px)] overflow-y-auto pl-6 pr-2">
          <DocsNav :links="navigation" @clicked="mobileNavState = false" />
        </div>

        <UiDrawerClose class="absolute right-4 top-3 h-7 w-7" as-child>
          <UiButton variant="ghost" size="icon-sm" class="opacity-50 hover:opacity-100">
            <Icon name="lucide:x" />
          </UiButton>
        </UiDrawerClose>
      </div>
    </UiDrawerContent>
  </UiDrawer>
</template>

<script lang="ts" setup>
  import type { ContentNavigationItem } from "@nuxt/content";

  const navigation = inject<Ref<ContentNavigationItem[]>>("navigation", ref([]));
  const mobileNavState = useMobileNavState();
</script>
