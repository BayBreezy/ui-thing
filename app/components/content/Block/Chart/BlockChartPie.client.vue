<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="pie" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import { _muted, _violet } from "#tailwind-config/theme/colors";
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
        colors: _muted.foreground,
      },
    },
    stroke: {
      lineCap: "round",
      colors: ["transparent"],
      width: 2,
    },
    colors: [_violet["400"], _violet["700"], _violet["900"]],
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
    @apply border-border bg-background text-foreground;
    .apexcharts-menu-item {
      @apply hover:!bg-primary hover:!text-primary-foreground;
    }
  }
</style>
