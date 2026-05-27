<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Storage Usage</UiCardTitle>
        <UiCardDescription>Disk capacity overview</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[260px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Consider expanding storage soon <Icon name="lucide:hard-drive" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">237 GB of 512 GB used</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([46]);

  const options = ref<ApexOptions>({
    labels: ["Used"],
    colors: ["var(--color-primary)"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-muted-foreground)",
            offsetY: 0,
          },
          value: {
            fontSize: "36px",
            fontWeight: "bold",
            color: "var(--color-primary)",
            offsetY: -40,
          },
        },
        hollow: { size: "65%" },
      },
    },
    states: { hover: { filter: { type: "none" } } },
  });
</script>
