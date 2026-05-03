<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="pie" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [70, 30, 60];

  const options: ApexOptions = {
    plotOptions: {
      pie: {
        dataLabels: {
          minAngleToShowLabel: 50,
          offset: -10,
        },
        expandOnClick: true,
      },
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      show: true,
      position: "bottom",
      labels: {
        colors: "var(--color-muted-foreground)",
      },
    },
    stroke: {
      lineCap: "round",
      colors: ["transparent"],
      width: 2,
    },
    colors: ["var(--color-violet-400)", "var(--color-violet-700)", "var(--color-violet-900)"],
    chart: {
      toolbar: {
        show: window.innerWidth > 768,
      },
    },
    labels: ["Apples", "Oranges", "Bananas"],
  };
</script>

<style>
  .apexcharts-menu {
    border-color: var(--color-border);
    background-color: var(--color-background);
    color: var(--color-foreground);

    .apexcharts-menu-item {
      &:hover {
        background-color: var(--color-primary) !important;
        color: var(--color-primary-foreground) !important;
      }
    }
  }
</style>
