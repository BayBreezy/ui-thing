<template>
  <div class="flex grow gap-5">
    <div class="flex w-[150px] flex-col gap-2">
      <UiScrollspy :target="parentRef" class="sticky top-16 flex flex-col gap-2.5">
        <UiButton
          v-for="item in nav"
          :key="item.id"
          variant="outline"
          :data-scrollspy-anchor="item.id"
          class="data-[active=true]:bg-accent data-[active=true]:text-primary"
        >
          {{ item.label }}
        </UiButton>
      </UiScrollspy>
    </div>
    <div class="grow">
      <div ref="parentRef" class="-me-5 h-[300px] overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-foreground text-base">{{ item.label }}</h3>
            <div class="bg-muted h-[350px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");
  const nav = [
    { id: useId(), label: "Section 1" },
    { id: useId(), label: "Section 2" },
    { id: useId(), label: "Section 3" },
    { id: useId(), label: "Section 4" },
    { id: useId(), label: "Section 5" },
  ];
</script>
