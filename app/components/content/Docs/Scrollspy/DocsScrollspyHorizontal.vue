<template>
  <div class="space-y-5">
    <div class="flex w-full gap-2">
      <UiScrollspy :offset="10" :target="parentRef" class="flex gap-2.5">
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
    <div class="w-full">
      <div ref="parentRef" class="-me-5 h-[500px] grow overflow-y-auto pe-5">
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
    { id: "section-6", label: "Section 1" },
    { id: "section-7", label: "Section 2" },
    { id: "section-8", label: "Section 3" },
    { id: "section-9", label: "Section 4" },
    { id: "section-10", label: "Section 5" },
  ];
</script>
