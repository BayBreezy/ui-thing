<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Polar Area Chart</UiCardTitle>
        <UiCardDescription> Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="polarArea" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 1000, max: 2400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 0 },
        spokes: { strokeWidth: 0 },
      },
    },
    yaxis: { show: false },
    fill: { opacity: 1 },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  });
</script>
