<template>
  <div class="flex grow gap-8">
    <div class="w-[180px] shrink-0">
      <UiScrollspy
        :target="parentRef"
        mode="multiple"
        :offset="10"
        :history="false"
        class="sticky top-16"
      >
        <UiZigZagRail dashed>
          <nav class="flex flex-col gap-2 text-sm">
            <button
              v-for="item in nav"
              :key="item.id"
              type="button"
              :data-scrollspy-anchor="item.id"
              :data-depth="item.depth"
              :style="{ marginInlineStart: `${(item.depth - 2) * 8}px` }"
              class="text-muted-foreground hover:text-primary data-[active=true]:text-primary line-clamp-1 text-start transition-colors"
            >
              {{ item.label }}
            </button>
          </nav>
        </UiZigZagRail>
      </UiScrollspy>
    </div>
    <div class="grow">
      <div ref="parentRef" class="-me-5 h-[300px] overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-foreground text-base">{{ item.label }}</h3>
            <div class="bg-muted h-[160px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");
  const nav = [
    { id: useId(), label: "Overview", depth: 2 },
    { id: useId(), label: "Features", depth: 3 },
    { id: useId(), label: "Details", depth: 4 },
    { id: useId(), label: "Pricing", depth: 2 },
    { id: useId(), label: "FAQ", depth: 2 },
  ];
</script>
