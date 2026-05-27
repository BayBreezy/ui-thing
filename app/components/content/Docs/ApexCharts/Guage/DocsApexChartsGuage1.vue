<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Performance Score</UiCardTitle>
        <UiCardDescription>Overall system health</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Performing well this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">Based on the last 30 days of metrics</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([72]);

  const options = ref<ApexOptions>({
    labels: ["Score"],
    colors: ["var(--color-primary)"],
    plotOptions: {
      radialBar: {
        startAngle: -125,
        endAngle: 125,
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-muted-foreground)",
            offsetY: 30,
          },
          value: {
            fontSize: "40px",
            fontWeight: "bold",
            color: "var(--color-primary)",
            offsetY: -5,
          },
        },
        hollow: { size: "70%", background: "transparent" },
      },
    },
    states: { hover: { filter: { type: "lighten" } } },
  });
</script>
