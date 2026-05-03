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
    annotations: {
      yaxis: [
        {
          y: 0,
          y2: 73,
          fillColor: "var(--color-red-500)",
          opacity: 1,
          strokeDashArray: 0,
          borderColor: "transparent",
          borderWidth: 0,
          label: {
            text: "Lowest",
            borderColor: "var(--color-border)",
            borderRadius: 6,
            offsetY: -5,
            offsetX: -10,
            style: {
              color: "var(--color-popover-foreground)",
              background: "var(--color-popover)",
              fontSize: "12px",
              padding: {
                bottom: 4,
                top: 4,
                left: 8,
                right: 8,
              },
            },
          },
        },
      ],
      points: [
        {
          x: "Feb",
          y: 305,
          // Do something when the point is clicked
          click() {
            useSonner("Most Visitors", {
              description: "February had the highest number of visitors.",
            });
          },
          marker: {
            size: 5,
            fillColor: "var(--color-emerald-500)",
            strokeColor: "var(--color-emerald-500)",
          },
          label: {
            text: "Most Visitors",
            borderColor: "var(--color-border)",
            borderRadius: 6,
            style: {
              background: "var(--color-popover)",
              color: "var(--color-popover-foreground)",
              padding: {
                bottom: 4,
                top: 4,
                left: 8,
                right: 8,
              },
            },
          },
        },
      ],
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
