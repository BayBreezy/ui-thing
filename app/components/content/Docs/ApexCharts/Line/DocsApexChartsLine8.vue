<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Line Chart</UiCardTitle>
      <UiCardDescription>January - June 2024</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[300px] w-full">
      <UiApexchart :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            Showing total visitors for the last 6 months
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
      name: "Visitors",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 205 },
        { x: "March", y: -207 },
        { x: "April", y: 173 },
        { x: "May", y: -209 },
        { x: "June", y: 214 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    plotOptions: {
      line: {
        colors: {
          threshold: 0,
          colorAboveThreshold: "var(--color-blue-500)",
          colorBelowThreshold: "var(--color-rose-500)",
        },
      },
    },
    colors: ["var(--color-blue-500)"],
    tooltip: { followCursor: true },
    stroke: { width: 2, curve: "smooth" },
    markers: { colors: ["var(--color-blue-500)"] },
    xaxis: {
      type: "category",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
