<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },

    fill: { type: "solid", opacity: 0.3 },
    yaxis: { labels: { show: false } },
    xaxis: {
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
