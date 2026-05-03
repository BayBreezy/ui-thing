<template>
  <UiCard class="@container">
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="grid aspect-auto w-full grid-cols-1 gap-4 @[450px]:grid-cols-2">
      <div class="@[700px]:h-[100px]">
        <UiApexchart type="area" :series :options />
      </div>
      <div class="@[700px]:h-[100px]">
        <UiApexchart type="area" :series="series2" :options />
      </div>
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
        { x: "January", y: 30 },
        { x: "February", y: 250 },
        { x: "March", y: 110 },
        { x: "April", y: 200 },
        { x: "May", y: 400 },
        { x: "June", y: 440 },
      ],
    },
  ]);
  const series2 = ref<ApexOptions["series"]>([
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { width: 1 },
    yaxis: { labels: { show: false } },
    chart: {
      sparkline: { enabled: true },
    },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
