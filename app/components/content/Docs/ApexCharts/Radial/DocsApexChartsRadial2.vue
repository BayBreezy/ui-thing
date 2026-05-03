<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radial Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="radialBar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 20, max: 80 }))
  );

  const options = ref<ApexOptions>({
    plotOptions: {
      radialBar: {
        barLabels: {
          enabled: true,
          fontSize: "10px",
          offsetX: -7,
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
          },
        },
      },
    },
    legend: { show: true, position: "bottom" },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  });
</script>
