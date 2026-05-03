<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Pie Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="pie" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      pie: { expandOnClick: false },
    },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#3b82f6" } },
    dataLabels: {
      enabled: true,
      style: { fontWeight: 600, fontSize: "10px" },
      dropShadow: { enabled: false },
    },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
