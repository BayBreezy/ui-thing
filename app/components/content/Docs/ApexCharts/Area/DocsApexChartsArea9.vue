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
    stroke: { curve: "smooth", width: 1 },
    tooltip: {
      // Return an array of functions to customize the tooltip
      custom: (value) => {
        const dataDesktop = value.series[0][value.dataPointIndex];
        const dataMobile = value.series[1][value.dataPointIndex];
        const month = value.w.globals.initialSeries[0].data[value.dataPointIndex].x;
        const desktopColor = value.w.globals.colors[0];
        const mobileColor = value.w.globals.colors[1];
        return `
        <div class="p-3 bg-linear-to-b to-white from-zinc-100 dark:from-zinc-900 dark:to-zinc-800 w-full min-w-32 text-xs ring-1 ring-border/50 rounded-lg shadow-xl">
          <p class="font-semibold">${month} Visitors</p>
          <div class="flex flex-col mt-4 gap-2">
            <div class="flex items-center gap-2">
              <div class="w-1 h-[14px] block rounded-full" style="background-color: ${desktopColor};"></div>
              <span class="text-muted-foreground">Desktop</span>
              <span class="font-semibold">${dataDesktop}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1 h-[14px] block rounded-full" style="background-color: ${mobileColor};"></div>
              <span class="text-muted-foreground">Mobile</span>
              <span class="font-semibold">${dataMobile}</span>
            </div>
          </div>
        </div>
        `;
      },
    },

    yaxis: { labels: { show: false } },
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
