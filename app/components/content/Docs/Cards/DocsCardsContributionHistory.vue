<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Contribution History</UiCardTitle>
      <UiCardDescription>Last 6 months of activity</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div
        class="flex h-[200px] w-full items-end gap-3"
        role="img"
        aria-label="Last 6 months of contribution activity"
      >
        <div
          v-for="(item, index) in chartData"
          :key="item.month"
          class="flex h-full flex-1 flex-col justify-end gap-2"
        >
          <div
            :data-index="index"
            class="data-[index=0]:bg-primary/40 data-[index=1]:bg-primary/60 data-[index=2]:bg-primary/50 data-[index=3]:bg-primary data-[index=4]:bg-primary/70 min-h-2 rounded-lg"
            :style="{ height: `${(item.amount / maxAmount) * 100}%` }"
          />
          <span class="text-muted-foreground text-center text-xs">{{ item.month }}</span>
        </div>
      </div>
    </UiCardContent>
    <UiCardContent>
      <div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
        <UiItem variant="muted" class="flex-col items-stretch">
          <UiItemContent class="gap-1">
            <UiItemDescription
              class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
            >
              Upcoming
            </UiItemDescription>
            <span class="text-base font-semibold">May 2024</span>
            <span class="text-muted-foreground text-sm">Scheduled</span>
          </UiItemContent>
        </UiItem>
        <UiItem variant="muted" class="hidden flex-col items-stretch xl:flex">
          <UiItemContent class="gap-1">
            <UiItemDescription
              class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
            >
              Savings Plan
            </UiItemDescription>
            <span class="text-base font-semibold">Accelerated</span>
            <span class="text-muted-foreground text-sm">Recurring</span>
          </UiItemContent>
        </UiItem>
      </div>
    </UiCardContent>
    <UiCardFooter>
      <UiButton class="w-full"> View Full Report </UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const chartData = [
    { month: "Dec", amount: 800 },
    { month: "Jan", amount: 1100 },
    { month: "Feb", amount: 900 },
    { month: "Mar", amount: 1300 },
    { month: "Apr", amount: 750 },
  ];

  const maxAmount = Math.max(...chartData.map((item) => item.amount));
</script>
