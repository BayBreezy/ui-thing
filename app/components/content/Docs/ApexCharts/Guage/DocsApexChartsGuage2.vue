<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Risk Level</UiCardTitle>
        <UiCardDescription>Portfolio risk assessment</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Moderate risk detected <Icon name="lucide:shield-alert" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">Review your portfolio allocations</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([55]);

  const options = ref<ApexOptions>({
    labels: ["Risk"],
    colors: [
      typeof series.value?.[0] === "number" && series.value[0] > 66
        ? "var(--color-red-500)"
        : typeof series.value?.[0] === "number" && series.value[0] > 33
          ? "var(--color-yellow-500)"
          : "var(--color-emerald-500)",
    ],
    plotOptions: {
      radialBar: {
        bands: [
          { from: 0, to: 33, color: "var(--color-emerald-500)", label: "Low" },
          { from: 33, to: 66, color: "var(--color-yellow-500)", label: "Medium" },
          { from: 66, to: 100, color: "var(--color-red-500)", label: "High" },
        ],
        bandsStyle: { strokeWidth: "40%", gap: 2, hideTrackWhenPresent: true, linecap: "round" },
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-muted-foreground)",
            offsetY: 35,
          },
          value: {
            fontSize: "40px",
            fontWeight: "bold",
            offsetY: -5,
            formatter(val) {
              return val + "%";
            },
          },
        },
        hollow: { size: "60%" },
      },
    },
    states: { hover: { filter: { type: "none" } } },
  });
</script>
