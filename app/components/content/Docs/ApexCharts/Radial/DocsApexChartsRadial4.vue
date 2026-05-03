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
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([76]);

  const options = ref<ApexOptions>({
    colors: ["var(--color-blue-500)"],
    stroke: { lineCap: "butt" },
    plotOptions: {
      radialBar: {
        track: { strokeWidth: "40%" },
        dataLabels: {
          name: {
            color: "var(--color-muted-foreground)",
            fontSize: "14px",
            fontWeight: "600",
            offsetY: 28,
          },
          value: {
            color: "var(--color-blue-500)",
            fontSize: "40px",
            fontWeight: "bold",
            offsetY: -15,
            formatter() {
              return "1,260";
            },
          },
        },
        hollow: { size: "65%" },
      },
    },
    labels: ["Visitors"],
    states: { hover: { filter: { type: "none" } } },
  });
</script>
