<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Power Usage</UiCardTitle>
      <UiCardDescription>Whole Home</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="flex flex-col gap-4">
      <div
        class="flex h-[140px] w-full items-end gap-2"
        role="img"
        aria-label="Power usage by hour"
      >
        <div
          v-for="item in chartData"
          :key="item.hour"
          class="flex h-full flex-1 flex-col justify-end gap-1.5"
        >
          <div
            class="bg-primary min-h-2 rounded-t"
            :style="{ height: `${(item.usage / maxUsage) * 100}%` }"
          />
          <span class="text-muted-foreground text-center text-xs">{{ item.hour }}</span>
        </div>
      </div>
      <UiSeparator />
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-0.5">
          <span class="text-muted-foreground text-sm">Currently Using</span>
          <span class="text-lg font-semibold tabular-nums">3.4 kW</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-muted-foreground text-sm">Solar Gen</span>
          <span class="text-lg font-semibold tabular-nums">+1.2 kW</span>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const chartData = [
    { hour: "6a", usage: 1.2 },
    { hour: "8a", usage: 2.8 },
    { hour: "10a", usage: 3.1 },
    { hour: "12p", usage: 2.4 },
    { hour: "2p", usage: 3.4 },
    { hour: "4p", usage: 2.9 },
    { hour: "6p", usage: 3.8 },
    { hour: "8p", usage: 3.2 },
  ];

  const maxUsage = computed(() => Math.max(...chartData.map((item) => item.usage)));
</script>
