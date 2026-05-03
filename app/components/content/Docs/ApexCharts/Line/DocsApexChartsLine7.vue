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
      name: "Desktop",
      data: [
        { x: "Chrome", y: 275 },
        { x: "Safari", y: 200 },
        { x: "Firefox", y: 187 },
        { x: "Edge", y: 173 },
        { x: "Other", y: 90 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 5, hover: { size: 7 }, shape: "square" },
    tooltip: { followCursor: true },
    dataLabels: {
      enabled: true,
      offsetY: -8,
      background: {
        backgroundColor: "var(--color-card)",
        borderWidth: 1,
        borderColor: "var(--color-border)",
        borderRadius: 4,
        opacity: 1,
        padding: 8,
        foreColor: "var(--color-foreground)",
      },
      style: { fontSize: "12px", fontWeight: 500 },
      formatter(val, opts) {
        return opts.w.globals.initialSeries?.[0]?.data[opts.dataPointIndex]?.x;
      },
    },
    yaxis: {
      labels: { show: false },
      title: { text: "Visitors" },
    },
    xaxis: {
      type: "category",
      title: { text: "Browser" },
      tooltip: { enabled: false },
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
